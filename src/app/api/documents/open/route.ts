import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { apiError } from '@/lib/apiHelpers';
import { getSignedCloudinaryRawDownloadUrl } from '@/lib/cloudinary';
import { rateLimit } from '@/lib/rateLimit';

function sanitizeFileName(input: string | null): string {
  const base = (input ?? 'document.pdf')
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-');

  const normalized = base || 'document.pdf';
  return normalized.toLowerCase().endsWith('.pdf') ? normalized : `${normalized}.pdf`;
}

function isRemoteHttpUrl(value: string | null): value is string {
  if (!value) return false;

  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);

  const limited = await rateLimit('general', session.user.id);
  if (!limited.success) return apiError('Trop de requêtes', 429);

  const sourceUrl = req.nextUrl.searchParams.get('url');
  const fileName = sanitizeFileName(req.nextUrl.searchParams.get('name'));

  if (!isRemoteHttpUrl(sourceUrl)) {
    return apiError('URL de document invalide', 400);
  }

  try {
    const resolvedSourceUrl = getSignedCloudinaryRawDownloadUrl(sourceUrl) ?? sourceUrl;

    const upstream = await fetch(resolvedSourceUrl, {
      cache: 'no-store',
      redirect: 'follow',
    });

    if (!upstream.ok) {
      return apiError('Impossible de récupérer le document', 502);
    }

    const buffer = await upstream.arrayBuffer();
    const signature = new TextDecoder('ascii').decode(buffer.slice(0, 4));

    if (signature !== '%PDF') {
      return apiError('Le document distant n’est pas un PDF valide', 415);
    }

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Cache-Control': 'private, no-store, max-age=0',
        'Content-Length': String(buffer.byteLength),
      },
    });
  } catch {
    return apiError('Ouverture du PDF impossible', 500);
  }
}