/**
 * WhatsApp notification via Green API
 * Docs: https://green-api.com/en/docs/api/sending/SendMessage/
 *
 * Envoie un message texte à un numéro WhatsApp.
 * Échoue silencieusement (log only) pour ne pas bloquer le flux principal.
 */

const ID_INSTANCE = process.env.GREEN_API_ID_INSTANCE;
const API_TOKEN = process.env.GREEN_API_TOKEN;
const NOTIFY_PHONE = process.env.GREEN_API_NOTIFY_PHONE;

function isConfigured(): boolean {
  return !!(ID_INSTANCE && API_TOKEN && NOTIFY_PHONE);
}

/**
 * Envoie un message WhatsApp via Green API.
 * @param message — texte du message (supporte le formatage WhatsApp : *gras*, _italique_)
 * @param phone — numéro destinataire (défaut = NOTIFY_PHONE de l'agence)
 */
export async function sendWhatsApp(message: string, phone?: string): Promise<boolean> {
  if (!isConfigured()) {
    console.warn('[WhatsApp] Green API non configurée — notification ignorée');
    return false;
  }

  const chatId = `${phone ?? NOTIFY_PHONE}@c.us`;
  const url = `https://api.green-api.com/waInstance${ID_INSTANCE}/sendMessage/${API_TOKEN}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, message }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[WhatsApp] Erreur ${res.status}: ${text}`);
      return false;
    }

    console.log('[WhatsApp] Message envoyé avec succès');
    return true;
  } catch (err) {
    console.error('[WhatsApp] Échec envoi:', err);
    return false;
  }
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
