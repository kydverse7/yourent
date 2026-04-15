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

function isConfigured(): boolean {
  return !!(ID_INSTANCE && API_TOKEN);
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

  const chatId = to ? `${to.replace(/\+/g, '')}@c.us` : NOTIFY_CHAT_ID;
  const recipient = chatId ?? (NOTIFY_PHONE ? `${NOTIFY_PHONE}@c.us` : null);

  if (!recipient) {
    console.warn('[WhatsApp] Aucun destinataire configuré — notification ignorée');
    return false;
  }

  const url = `https://api.green-api.com/waInstance${ID_INSTANCE}/sendMessage/${API_TOKEN}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: recipient,
        message,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[WhatsApp] Erreur ${res.status}: ${text}`);
      return false;
    }

    console.log('[WhatsApp] Message envoyé avec succès via Green API');
    return true;
  } catch (err) {
    console.error('[WhatsApp] Échec envoi:', err);
    return false;
  }
}

/**
 * Envoie un message WhatsApp à un client (numéro individuel).
 */
export async function sendWhatsAppToClient(to: string, message: string): Promise<boolean> {
  return sendWhatsApp(message, to);
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
