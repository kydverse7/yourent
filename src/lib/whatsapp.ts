/**
 * WhatsApp notification via Green API
 * Docs: https://green-api.com/docs/api/
 *
 * Échoue silencieusement (log only) pour ne pas bloquer le flux principal.
 */

const MAX_WHATSAPP_MESSAGE_LENGTH = 3200;

type WhatsAppRuntimeConfig = {
  idInstance: string;
  apiToken: string;
  notifyPhone: string;
  notifyChatId: string;
};

export type WhatsAppConfigStatus = {
  hasIdInstance: boolean;
  hasApiToken: boolean;
  hasNotifyPhone: boolean;
  hasNotifyChatId: boolean;
};

export type WhatsAppSendResult = {
  ok: boolean;
  recipient: string | null;
  config: WhatsAppConfigStatus;
  status?: number;
  error?: string;
  responseText?: string;
};

function readConfig(): WhatsAppRuntimeConfig {
  return {
    idInstance: (process.env.GREEN_API_ID_INSTANCE ?? '').trim(),
    apiToken: (process.env.GREEN_API_TOKEN ?? '').trim(),
    notifyPhone: (process.env.GREEN_API_NOTIFY_PHONE ?? '').trim(),
    notifyChatId: (process.env.GREEN_API_NOTIFY_CHAT_ID ?? '').trim(),
  };
}

export function getWhatsAppConfigStatus(): WhatsAppConfigStatus {
  const config = readConfig();
  return {
    hasIdInstance: !!config.idInstance,
    hasApiToken: !!config.apiToken,
    hasNotifyPhone: !!config.notifyPhone,
    hasNotifyChatId: !!config.notifyChatId,
  };
}

function isConfigured(config: WhatsAppRuntimeConfig): boolean {
  return !!(config.idInstance && config.apiToken);
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

function resolveDefaultRecipient(config: WhatsAppRuntimeConfig): string | null {
  if (config.notifyChatId) return normalizeGroupChatId(config.notifyChatId);
  if (config.notifyPhone) return normalizePhoneChatId(config.notifyPhone);
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

async function sendWhatsAppChunk(
  config: WhatsAppRuntimeConfig,
  recipient: string,
  message: string,
): Promise<WhatsAppSendResult> {
  const url = `https://api.green-api.com/waInstance${config.idInstance}/sendMessage/${config.apiToken}`;
  const status = getWhatsAppConfigStatus();

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
      return {
        ok: false,
        recipient,
        config: status,
        status: res.status,
        error: `Green API ${res.status}`,
        responseText: text.slice(0, 400),
      };
    }

    return {
      ok: true,
      recipient,
      config: status,
      status: res.status,
    };
  } catch (err) {
    console.error('[WhatsApp] Échec envoi:', err);
    return {
      ok: false,
      recipient,
      config: status,
      error: err instanceof Error ? err.message : 'Erreur réseau Green API',
    };
  }
}

export async function sendWhatsAppDetailed(message: string, to?: string): Promise<WhatsAppSendResult> {
  const config = readConfig();
  const status = getWhatsAppConfigStatus();

  if (!isConfigured(config)) {
    console.warn('[WhatsApp] Green API non configurée — notification ignorée');
    return {
      ok: false,
      recipient: null,
      config: status,
      error: 'Variables Green API manquantes: GREEN_API_ID_INSTANCE ou GREEN_API_TOKEN',
    };
  }

  const recipient = to ? normalizePhoneChatId(to) : resolveDefaultRecipient(config);

  if (!recipient) {
    console.warn('[WhatsApp] Aucun destinataire configuré — notification ignorée');
    return {
      ok: false,
      recipient: null,
      config: status,
      error: 'Aucun destinataire configuré: GREEN_API_NOTIFY_CHAT_ID ou GREEN_API_NOTIFY_PHONE',
    };
  }

  const chunks = chunkMessage(message);
  if (chunks.length === 0) {
    console.warn('[WhatsApp] Message vide — notification ignorée');
    return {
      ok: false,
      recipient,
      config: status,
      error: 'Message WhatsApp vide',
    };
  }

  for (const chunk of chunks) {
    const result = await sendWhatsAppChunk(config, recipient, chunk);
    if (!result.ok) return result;
  }

  return {
    ok: true,
    recipient,
    config: status,
  };
}

/**
 * Envoie un message texte WhatsApp via Green API.
 * Si chatId est fourni, envoie au groupe. Sinon envoie au numéro individuel.
 */
export async function sendWhatsApp(message: string, to?: string): Promise<boolean> {
  const result = await sendWhatsAppDetailed(message, to);
  if (!result.ok) {
    console.error('[WhatsApp] Envoi échoué:', result);
    return false;
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
  const config = readConfig();

  if (!isConfigured(config)) {
    console.warn('[WhatsApp] Green API non configurée — notification ignorée');
    return false;
  }

  if (!config.notifyChatId) {
    console.warn('[WhatsApp] GREEN_API_NOTIFY_CHAT_ID manquant — envoi groupe ignoré');
    return false;
  }

  const recipient = normalizeGroupChatId(config.notifyChatId);
  const chunks = chunkMessage(message);
  if (chunks.length === 0) {
    console.warn('[WhatsApp] Message vide — notification ignorée');
    return false;
  }

  for (const chunk of chunks) {
    const result = await sendWhatsAppChunk(config, recipient, chunk);
    if (!result.ok) return false;
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
