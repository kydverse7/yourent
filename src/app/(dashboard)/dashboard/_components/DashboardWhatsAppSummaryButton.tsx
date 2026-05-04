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
};

export default function DashboardWhatsAppSummaryButton() {
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (isSending) return;

    setIsSending(true);
    try {
      const res = await fetch('/api/whatsapp/daily-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      const payload = (await res.json().catch(() => ({}))) as SummaryResponse;

      if (!res.ok || !payload?.data?.sent) {
        const message = payload?.error || 'Échec de l’envoi WhatsApp';
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
