'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { addDays } from 'date-fns';
import { MIN_RESERVATION_DAYS } from '@/lib/constants';
import { calcNbJours, calcTarifTotal, formatCurrency } from '@/lib/utils';
import { useLocale } from '@/lib/i18n';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const INDICATIFS = [
  { code: '+212', label: '🇲🇦 +212', country: 'Maroc' },
  { code: '+33', label: '🇫🇷 +33', country: 'France' },
  { code: '+34', label: '🇪🇸 +34', country: 'Espagne' },
  { code: '+39', label: '🇮🇹 +39', country: 'Italie' },
  { code: '+44', label: '🇬🇧 +44', country: 'UK' },
  { code: '+49', label: '🇩🇪 +49', country: 'Allemagne' },
  { code: '+31', label: '🇳🇱 +31', country: 'Pays-Bas' },
  { code: '+32', label: '🇧🇪 +32', country: 'Belgique' },
  { code: '+41', label: '🇨🇭 +41', country: 'Suisse' },
  { code: '+1', label: '🇺🇸 +1', country: 'USA/Canada' },
  { code: '+966', label: '🇸🇦 +966', country: 'Arabie S.' },
  { code: '+971', label: '🇦🇪 +971', country: 'EAU' },
  { code: '+216', label: '🇹🇳 +216', country: 'Tunisie' },
  { code: '+213', label: '🇩🇿 +213', country: 'Algérie' },
];

/* ── Styles réutilisables pour les champs du formulaire ── */
const fieldBase =
  'w-full h-12 rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-[#f7f1e8] text-[0.95rem] placeholder:text-[#a99880]/55 transition-all duration-200 outline-none hover:border-[rgba(201,168,76,0.25)] focus:border-[rgba(201,168,76,0.5)] focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.12)]';
const selectBase =
  'h-12 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 text-[#f7f1e8] text-sm appearance-none cursor-pointer transition-all duration-200 outline-none hover:border-[rgba(201,168,76,0.25)] focus:border-[rgba(201,168,76,0.5)] focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.12)]';
const labelBase = 'block text-sm font-medium text-[#b9a88f] mb-1.5';

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
  const [whatsappSame, setWhatsappSame] = useState(true);
  const [form, setForm] = useState({
    debutAt: '',
    finAt: '',
    prenom: '',
    nom: '',
    indicatif: '+212',
    telephone: '',
    whatsapp: '',
    email: '',
    notes: '',
    website: '', // honeypot anti-bot
  });

  const nbJours = form.debutAt && form.finAt
    ? calcNbJours(new Date(form.debutAt), new Date(form.finAt))
    : 0;

  const pricingDays = nbJours > 0 ? Math.max(nbJours, MIN_RESERVATION_DAYS) : 0;
  const pricing = pricingDays > 0 ? calcTarifTotal(pricingDays, tarifJour, tarifJour10Plus) : null;
  const total = pricing?.total ?? 0;

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

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
      const fullPhone = form.indicatif + normalizedPhone.replace(/^\+?\d{1,3}/, (m) => normalizedPhone.startsWith('+') || normalizedPhone.startsWith('0') ? '' : '');
      const whatsappNumber = whatsappSame ? fullPhone : form.indicatif + form.whatsapp.replace(/[\s().-]/g, '');

      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleSlug: vehiculeSlug,
          debutAt: new Date(form.debutAt).toISOString(),
          finAt: new Date(form.finAt).toISOString(),
          prenom: form.prenom,
          nom: form.nom,
          indicatif: form.indicatif,
          telephone: normalizedPhone,
          whatsapp: whatsappNumber,
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
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — caché, jamais rempli par un humain */}
      <div className="sr-only" aria-hidden="true">
        <input tabIndex={-1} name="website" value={form.website} onChange={(e) => set('website', e.target.value)} autoComplete="off" />
      </div>

      {/* ── Dates ── */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelBase}>{t('form.startDate')}</label>
          <input
            type="date"
            value={form.debutAt}
            onChange={(e) => set('debutAt', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
            className={fieldBase}
          />
        </div>
        <div>
          <label className={labelBase}>{t('form.endDate')}</label>
          <input
            type="date"
            value={form.finAt}
            onChange={(e) => set('finAt', e.target.value)}
            min={form.debutAt ? addDays(new Date(form.debutAt), MIN_RESERVATION_DAYS).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
            required
            className={fieldBase}
          />
        </div>
      </div>

      {/* ── Estimation tarif ── */}
      {nbJours > 0 && (
        <div className="rounded-xl border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.06)] p-3.5 text-sm">
          <span className="text-[#b9a88f]">{pricingDays} {t('form.days').replace(/\{s\}/g, pricingDays > 1 ? 's' : '')} · {t('form.estimate')} : </span>
          <span className="text-[#c9a84c] font-bold text-base">{formatCurrency(total)}</span>
          <span className="text-[#b9a88f] text-xs ml-1">{t('form.exDeposit')}</span>
          {pricing?.palier === '10Plus' && (
            <div className="mt-1 text-xs text-[#c9a84c]/80">{t('form.longRate')}</div>
          )}
        </div>
      )}

      {form.debutAt && form.finAt && nbJours < MIN_RESERVATION_DAYS && (
        <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-xs text-amber-200">
          {t('form.minDays').replace('{count}', String(MIN_RESERVATION_DAYS))}
        </div>
      )}

      {/* ── Nom / Prénom ── */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelBase}>{t('form.firstName')}</label>
          <input
            type="text"
            value={form.prenom}
            onChange={(e) => set('prenom', e.target.value)}
            required
            className={fieldBase}
          />
        </div>
        <div>
          <label className={labelBase}>{t('form.lastName')}</label>
          <input
            type="text"
            value={form.nom}
            onChange={(e) => set('nom', e.target.value)}
            required
            className={fieldBase}
          />
        </div>
      </div>

      {/* ── Téléphone avec indicatif ── */}
      <div>
        <label className={labelBase}>{t('form.phone')}</label>
        <div className="flex gap-2">
          <select
            value={form.indicatif}
            onChange={(e) => set('indicatif', e.target.value)}
            className={`${selectBase} w-[130px] shrink-0`}
          >
            {INDICATIFS.map((ind) => (
              <option key={ind.code} value={ind.code}>{ind.label}</option>
            ))}
          </select>
          <input
            type="tel"
            value={form.telephone}
            onChange={(e) => set('telephone', e.target.value)}
            placeholder="6XX XXX XXX"
            required
            className={`${fieldBase} flex-1`}
          />
        </div>
      </div>

      {/* ── WhatsApp ── */}
      <div className="space-y-3">
        <label className="flex items-center gap-2.5 cursor-pointer text-sm text-[#b9a88f]">
          <input
            type="checkbox"
            checked={whatsappSame}
            onChange={(e) => setWhatsappSame(e.target.checked)}
            className="h-4 w-4 rounded border-[rgba(201,168,76,0.3)] bg-[rgba(255,255,255,0.06)] text-[#c9a84c] focus:ring-[rgba(201,168,76,0.35)] focus:ring-offset-0"
          />
          {t('form.whatsappSame')}
        </label>
        {!whatsappSame && (
          <div>
            <label className={labelBase}>{t('form.whatsapp')}</label>
            <div className="flex gap-2">
              <select
                value={form.indicatif}
                onChange={(e) => set('indicatif', e.target.value)}
                className={`${selectBase} w-[130px] shrink-0`}
              >
                {INDICATIFS.map((ind) => (
                  <option key={ind.code} value={ind.code}>{ind.label}</option>
                ))}
              </select>
              <input
                type="tel"
                value={form.whatsapp}
                onChange={(e) => set('whatsapp', e.target.value)}
                placeholder="6XX XXX XXX"
                required
                className={`${fieldBase} flex-1`}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Email ── */}
      <div>
        <label className={labelBase}>{t('form.email')}</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          placeholder={t('form.emailOptional')}
          className={fieldBase}
        />
      </div>

      {/* ── Notes ── */}
      <div>
        <label className={labelBase}>{t('form.notes')}</label>
        <textarea
          value={form.notes}
          onChange={(e) => set('notes', e.target.value)}
          rows={3}
          className="w-full rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 py-3 text-[#f7f1e8] text-sm placeholder:text-[#a99880]/55 transition-all duration-200 outline-none hover:border-[rgba(201,168,76,0.25)] focus:border-[rgba(201,168,76,0.5)] focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.12)] resize-none"
          placeholder={t('form.notesPlaceholder')}
        />
      </div>

      {/* ── Submit ── */}
      <Button type="submit" variant="gold" size="lg" loading={loading} className="w-full">
        {loading ? t('form.submitting') : t('form.submit')}
      </Button>

      <p className="text-center text-xs text-[#b9a88f]">
        {t('form.confirm')}
      </p>
    </form>
  );
}
