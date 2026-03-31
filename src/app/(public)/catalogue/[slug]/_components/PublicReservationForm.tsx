'use client';

import { useState } from 'react';
import { Input, Button } from '@/components/ui';
import { addDays } from 'date-fns';
import { MIN_RESERVATION_DAYS } from '@/lib/constants';
import { calcNbJours, calcTarifTotal, formatCurrency } from '@/lib/utils';
import { useLocale } from '@/lib/i18n';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props {
  vehiculeId: string;
  vehiculeSlug: string;
  redirectSlug: string;
  tarifJour: number;
  tarifJour10Plus?: number;
}

export default function PublicReservationForm({ vehiculeId: _vehiculeId, vehiculeSlug, redirectSlug, tarifJour, tarifJour10Plus = 0 }: Props) {
  const router = useRouter();
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    debutAt: '',
    finAt: '',
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
    notes: '',
    website: '', // honeypot anti-bot
  });

  const nbJours = form.debutAt && form.finAt
    ? calcNbJours(new Date(form.debutAt), new Date(form.finAt))
    : 0;

  const pricing = nbJours > 0 ? calcTarifTotal(nbJours, tarifJour, tarifJour10Plus) : null;
  const total = pricing?.total ?? 0;

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-bot : honeypot
    if (form.website) return;

    if (!form.debutAt || !form.finAt || !form.prenom || !form.nom || !form.telephone) {
      toast.error(t('form.required'));
      return;
    }

    if (nbJours < MIN_RESERVATION_DAYS) {
      toast.error(t('form.minDaysError').replace('{count}', String(MIN_RESERVATION_DAYS)));
      return;
    }

    setLoading(true);
    try {
      const normalizedPhone = form.telephone.replace(/[\s().-]/g, '');

      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleSlug: vehiculeSlug,
          debutAt: new Date(form.debutAt).toISOString(),
          finAt: new Date(form.finAt).toISOString(),
          prenom: form.prenom,
          nom: form.nom,
          telephone: normalizedPhone,
          email: form.email,
          optionsSupplementaires: [],
          website: form.website,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const fieldErrors = data?.details?.fieldErrors as Record<string, string[]> | undefined;
        const firstFieldError = fieldErrors
          ? Object.values(fieldErrors).flat().find(Boolean)
          : undefined;
        toast.error(firstFieldError ?? data.error ?? t('form.error'));
        return;
      }

      toast.success(t('form.success'));
      router.push(`/catalogue/${redirectSlug}/confirmation?id=${data.data?.id}`);
    } catch {
      toast.error(t('form.networkError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — caché avec CSS, jamais rempli par un humain */}
      <div className="sr-only" aria-hidden="true">
        <input tabIndex={-1} name="website" value={form.website} onChange={handleChange('website')} autoComplete="off" />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <Input
          label={t('form.startDate')}
          type="date"
          value={form.debutAt}
          onChange={handleChange('debutAt')}
          min={new Date().toISOString().split('T')[0]}
          required
        />
        <Input
          label={t('form.endDate')}
          type="date"
          value={form.finAt}
          onChange={handleChange('finAt')}
          min={form.debutAt ? addDays(new Date(form.debutAt), MIN_RESERVATION_DAYS).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
          required
        />
      </div>

      {/* Estimation tarif */}
      {nbJours > 0 && (
        <div className="p-3 bg-gold/5 border border-gold/20 rounded-lg text-sm">
          <span className="text-cream-muted">{nbJours} {t('form.days').replace(/\{s\}/g, nbJours > 1 ? 's' : '')} · {t('form.estimate')} : </span>
          <span className="text-gold font-bold">{formatCurrency(total)}</span>
          <span className="text-cream-muted text-xs"> {t('form.exDeposit')}</span>
          {pricing?.palier === '10Plus' && (
            <div className="mt-1 text-xs text-gold/80">{t('form.longRate')}</div>
          )}
        </div>
      )}

      {form.debutAt && form.finAt && nbJours < MIN_RESERVATION_DAYS && (
        <div className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-xs text-amber-200">
          {t('form.minDays').replace('{count}', String(MIN_RESERVATION_DAYS))}
        </div>
      )}

      {/* Infos client */}
      <div className="grid grid-cols-2 gap-3">
        <Input label={t('form.firstName')} value={form.prenom} onChange={handleChange('prenom')} required />
        <Input label={t('form.lastName')} value={form.nom} onChange={handleChange('nom')} required />
      </div>
      <Input label={t('form.phone')} type="tel" value={form.telephone} onChange={handleChange('telephone')} placeholder="+212 6XX XXX XXX" required />
      <Input label={t('form.email')} type="email" value={form.email} onChange={handleChange('email')} placeholder={t('form.emailOptional')} />

      <div>
        <label className="block text-xs text-cream-muted mb-1.5">{t('form.notes')}</label>
        <textarea
          value={form.notes}
          onChange={handleChange('notes')}
          rows={3}
          className="w-full bg-noir-card border border-gold/10 rounded-xl px-4 py-3 text-cream text-sm placeholder:text-cream-muted/50 focus:outline-none focus:border-gold/40 resize-none"
          placeholder={t('form.notesPlaceholder')}
        />
      </div>

      <Button type="submit" variant="gold" size="lg" loading={loading} className="w-full">
        {loading ? t('form.submitting') : t('form.submit')}
      </Button>

      <p className="text-center text-xs text-cream-muted">
        {t('form.confirm')}
      </p>
    </form>
  );
}
