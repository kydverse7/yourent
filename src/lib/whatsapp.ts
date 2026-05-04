/**
 * WhatsApp notification via Green API
 * Docs: https://green-api.com/docs/api/
 *
 * Échoue silencieusement (log only) pour ne pas bloquer le flux principal.
 */

const ID_INSTANCE = process.env.GREEN_API_ID_INSTANCE;
const API_TOKEN = process.env.GREEN_API_TOKEN;
const NOTIFY_PHONE = process.env.GREEN_API_NOTIFY_PHONE; // numéro admin (format international sans +)
const NOTIFY_CHAT_ID = process.env.GREEN_API_NOTIFY_CHAT_ID; // chat ID du groupe (optionnel)
const MAX_WHATSAPP_MESSAGE_LENGTH = 3200;

function isConfigured(): boolean {
  return !!(ID_INSTANCE && API_TOKEN);
}

function normalizePhoneChatId(phone: string): string {
  return `${phone.replace(/\+/g, '').trim()}@c.us`;
}

function normalizeGroupChatId(chatId: string): string {
  const value = chatId.trim();
  if (!value) return value;
  if (value.endsWith('@g.us') || value.endsWith('@c.us')) return value;
  return `${value}@g.us`;
}

function resolveDefaultRecipient(): string | null {
  if (NOTIFY_CHAT_ID?.trim()) return normalizeGroupChatId(NOTIFY_CHAT_ID);
  if (NOTIFY_PHONE?.trim()) return normalizePhoneChatId(NOTIFY_PHONE);
  return null;
}

function chunkMessage(message: string): string[] {
  const trimmed = message.trim();
  if (!trimmed) return [];
  if (trimmed.length <= MAX_WHATSAPP_MESSAGE_LENGTH) return [trimmed];

  const chunks: string[] = [];
  const lines = trimmed.split('\n');
  let current = '';

  for (const line of lines) {
    const candidate = current ? `${current}\n${line}` : line;
    if (candidate.length <= MAX_WHATSAPP_MESSAGE_LENGTH) {
      current = candidate;
      continue;
    }

    if (current) chunks.push(current);

    if (line.length <= MAX_WHATSAPP_MESSAGE_LENGTH) {
      current = line;
      continue;
    }

    for (let i = 0; i < line.length; i += MAX_WHATSAPP_MESSAGE_LENGTH) {
      chunks.push(line.slice(i, i + MAX_WHATSAPP_MESSAGE_LENGTH));
    }
    current = '';
  }

  if (current) chunks.push(current);
  return chunks;
}

async function sendWhatsAppChunk(recipient: string, message: string): Promise<boolean> {
  const url = `https://api.green-api.com/waInstance${ID_INSTANCE}/sendMessage/${API_TOKEN}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: recipient,
        message,
      }),
      signal: AbortSignal.timeout(20_000),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[WhatsApp] Erreur ${res.status}: ${text}`);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[WhatsApp] Échec envoi:', err);
    return false;
  }
}

/**
 * Envoie un message texte WhatsApp via Green API.
 * Si chatId est fourni, envoie au groupe. Sinon envoie au numéro individuel.
 */
export async function sendWhatsApp(message: string, to?: string): Promise<boolean> {
  if (!isConfigured()) {
    console.warn('[WhatsApp] Green API non configurée — notification ignorée');
    return false;
  }

  const recipient = to ? normalizePhoneChatId(to) : resolveDefaultRecipient();

  if (!recipient) {
    console.warn('[WhatsApp] Aucun destinataire configuré — notification ignorée');
    return false;
  }

  const chunks = chunkMessage(message);
  if (chunks.length === 0) {
    console.warn('[WhatsApp] Message vide — notification ignorée');
    return false;
  }

  for (const chunk of chunks) {
    const ok = await sendWhatsAppChunk(recipient, chunk);
    if (!ok) return false;
  }

  console.log('[WhatsApp] Message envoyé avec succès via Green API');
  return true;
}

/**
 * Envoie un message WhatsApp à un client (numéro individuel).
 */
export async function sendWhatsAppToClient(to: string, message: string): Promise<boolean> {
  return sendWhatsApp(message, to);
}

/**
 * Envoie un message au groupe WhatsApp configuré (GREEN_API_NOTIFY_CHAT_ID).
 */
export async function sendWhatsAppToGroup(message: string): Promise<boolean> {
  if (!isConfigured()) {
    console.warn('[WhatsApp] Green API non configurée — notification ignorée');
    return false;
  }

  if (!NOTIFY_CHAT_ID?.trim()) {
    console.warn('[WhatsApp] GREEN_API_NOTIFY_CHAT_ID manquant — envoi groupe ignoré');
    return false;
  }

  const recipient = normalizeGroupChatId(NOTIFY_CHAT_ID);
  const chunks = chunkMessage(message);
  if (chunks.length === 0) {
    console.warn('[WhatsApp] Message vide — notification ignorée');
    return false;
  }

  for (const chunk of chunks) {
    const ok = await sendWhatsAppChunk(recipient, chunk);
    if (!ok) return false;
  }

  console.log('[WhatsApp] Message groupe envoyé avec succès via Green API');
  return true;
}

/**
 * Formate et envoie une notification de nouvelle réservation.
 */
export async function notifyNewReservation(data: {
  clientName: string;
  clientPhone?: string;
  vehicleName: string;
  debutAt: string | Date;
  finAt: string | Date;
  heureDepart?: string;
  totalEstime: number;
}): Promise<boolean> {
  const debut = new Date(data.debutAt).toLocaleDateString('fr-MA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const fin = new Date(data.finAt).toLocaleDateString('fr-MA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const lines = [
    '🚗 *Nouvelle réservation !*',
    '',
    `👤 *Client :* ${data.clientName}`,
    data.clientPhone ? `📞 *Tél :* ${data.clientPhone}` : '',
    `🚘 *Véhicule :* ${data.vehicleName}`,
    `📅 *Du :* ${debut}${data.heureDepart ? ` à ${data.heureDepart}` : ''}`,
    `📅 *Au :* ${fin}`,
    `💰 *Total estimé :* ${data.totalEstime.toLocaleString('fr-MA')} MAD`,
    '',
    '👉 Connectez-vous à Yourent pour confirmer ou refuser.',
  ].filter(Boolean);

  return sendWhatsApp(lines.join('\n'));
}
