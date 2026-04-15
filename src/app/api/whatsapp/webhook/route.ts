import { NextRequest, NextResponse } from 'next/server';

const VERIFY_TOKEN = process.env.META_WA_WEBHOOK_VERIFY_TOKEN;

/**
 * GET — Vérification du webhook par Meta (challenge).
 * Meta envoie hub.mode, hub.verify_token, hub.challenge.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[WhatsApp Webhook] Vérification réussie');
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Vérification échouée' }, { status: 403 });
}

/**
 * POST — Réception des messages / statuts entrants.
 * Pour l'instant on accuse réception (200) sans traitement.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[WhatsApp Webhook] Événement reçu:', JSON.stringify(body).slice(0, 500));
    // Optionnel : traiter les statuts de livraison, messages entrants, etc.
  } catch {
    // ignore
  }

  return NextResponse.json({ status: 'ok' }, { status: 200 });
}
