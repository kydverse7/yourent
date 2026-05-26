'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui';

type SummaryResponse = {
  data?: {
    sent?: boolean;
    enCours?: number;
    retoursToday?: number;
    date?: string;
  };
  error?: string;
  details?: {
    status?: number;
    target?: string;
  };
};

export default function DashboardWhatsAppSummaryButton() {
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (isSending) return;

    setIsSending(true);
    try {
      const endpointCandidates = [
        '/api/whatsapp/daily-summary',
        '/api/whatsapp/send-summary',
      ];

      let res: Response | null = null;
      let sawHtml404 = false;
      for (const endpoint of endpointCandidates) {
        const attempt = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        const contentType = attempt.headers.get('content-type') || '';
        const looksLikeHtml404 = attempt.status === 404 && contentType.includes('text/html');
        if (looksLikeHtml404) {
          sawHtml404 = true;
          continue;
        }

        res = attempt;
        break;
      }

      if (!res) {
        throw new Error(
          sawHtml404
            ? 'Endpoint WhatsApp introuvable sur le serveur actif. En développement, redémarrez Next avec npm run dev.'
            : 'Endpoint WhatsApp introuvable (404)'
        );
      }

      const clone = res.clone();
      const payload = (await res.json().catch(async () => {
        const rawText = await clone.text().catch(() => '');
        return rawText ? { error: rawText.slice(0, 240) } : {};
      })) as SummaryResponse;

      if (!res.ok || !payload?.data?.sent) {
        const message = [
          payload?.error || 'Échec de l’envoi WhatsApp',
          payload?.details?.status ? `(HTTP ${payload.details.status})` : '',
        ].filter(Boolean).join(' ');
        throw new Error(message);
      }

      const enCours = Number(payload.data.enCours ?? 0);
      const retoursToday = Number(payload.data.retoursToday ?? 0);
      toast.success(
        `Résumé WhatsApp envoyé (en cours: ${enCours}, retours aujourd’hui: ${retoursToday})`
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue';
      toast.error(message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleSend}
      loading={isSending}
      leftIcon={<Send className="h-3.5 w-3.5" />}
      className="shrink-0"
      title="Envoyer maintenant le résumé WhatsApp du jour"
    >
      Envoyer WhatsApp
    </Button>
  );
}
