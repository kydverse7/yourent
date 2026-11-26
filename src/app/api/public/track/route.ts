import { createHash } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { rateLimit } from '@/lib/rateLimit';
import {
  TRACK_MAX_BYTES,
  buildVisitWrites,
  isBotUserAgent,
  trackPayloadSchema,
  visitorContext,
} from '@/lib/tracking/ingest';
import { SiteVisit } from '@/models/SiteVisit';

export const dynamic = 'force-dynamic';

/**
 * Mesure d'audience maison du site public (envois navigator.sendBeacon de Analytics.tsx).
 * Accessible sans connexion. Écrit en base uniquement en production (VERCEL_ENV === 'production') :
 * en local et en préproduction, l'envoi est validé puis ignoré.
 */
function empty(status = 204): Response {
  return new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });
}

function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === (req.headers.get('x-forwarded-host') ?? req.headers.get('host'));
  } catch {
    return false;
  }
}

function isDuplicateKey(error: unknown): boolean {
  return typeof error === 'object' && error !== null && (error as { code?: number }).code === 11000;
}

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req) || isBotUserAgent(req.headers.get('user-agent'))) return empty();

  if (Number(req.headers.get('content-length') ?? 0) > TRACK_MAX_BYTES) return empty(413);
  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return empty(400);
  }
  if (raw.length > TRACK_MAX_BYTES) return empty(413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return empty(400);
  }
  const parsed = trackPayloadSchema.safeParse(body);
  if (!parsed.success) return empty(400);

  if (process.env.VERCEL_ENV !== 'production') return empty();

  const context = visitorContext(req.headers);
  /* Clé de limitation : empreinte de l'IP, éphémère (fenêtre d'une minute dans Redis). */
  const key = createHash('sha256').update(context.ip ?? 'inconnue').digest('base64url').slice(0, 22);
  const limited = await rateLimit('track', key);
  if (!limited.success) return empty(429);

  try {
    await connectDB();
    const writes = buildVisitWrites(parsed.data, context, new Date()) as unknown as Parameters<
      typeof SiteVisit.collection.bulkWrite
    >[0];
    try {
      await SiteVisit.collection.bulkWrite(writes, { ordered: true });
    } catch (error) {
      /* Deux envois simultanés pour une nouvelle visite : le second retrouve le document créé par le premier. */
      if (!isDuplicateKey(error)) throw error;
      await SiteVisit.collection.bulkWrite(writes, { ordered: true });
    }
  } catch (error) {
    console.error('[track] enregistrement impossible', error);
  }
  return empty();
}
