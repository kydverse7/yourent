'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { MIN_RESERVATION_DAYS } from '@/lib/constants';
import { formatPrice } from '@/lib/format';
import { calcNbJours, calcTarifTotal } from '@/lib/pricing';
import { useLocale } from '@/lib/i18n';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useToday } from '../../_lib/useToday';
import { parseFormPhone } from '../_lib/phone';
import { DIAL_CODES, DIAL_CODE_VALUES, dialCodeLabel } from '../_lib/dialCodes';

const DAY_MS = 86_400_000;
const addDaysIso = (iso: string, days: number) =>
  new Date(Date.parse(`${iso}T00:00:00Z`) + days * DAY_MS).toISOString().slice(0, 10);

/* En mobile, l'icône native du calendrier devient invisible et couvre le champ : la date tient en entier. */
const dateField =
  'field relative px-3 font-semibold [color-scheme:dark] cursor-pointer max-sm:[&::-webkit-calendar-picker-indicator]:absolute max-sm:[&::-webkit-calendar-picker-indicator]:inset-0 max-sm:[&::-webkit-calendar-picker-indicator]:h-full max-sm:[&::-webkit-calendar-picker-indicator]:w-full max-sm:[&::-webkit-calendar-picker-indicator]:opacity-0';
const labelBase = 'mb-1.5 block text-sm font-medium text-cream-muted';

type FieldName = 'debutAt' | 'finAt' | 'prenom' | 'nom' | 'telephone' | 'whatsapp';

interface Props {
  vehiculeId: string;
  vehiculeSlug: string;
  redirectSlug: string;
  tarifJour: number;
  tarifJour10Plus?: number;
  highSeason?: boolean;
  /** Dates pré-remplies depuis la recherche par disponibilité. */
  initialDu?: string;
  initialAu?: string;
}

/** Indicatif : la liste complète s'ouvre au toucher, le champ fermé n'affiche que « +212 ». */
function DialCodeSelect({
  value,
  onChange,
  label,
  countryNames,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  countryNames?: Intl.DisplayNames;
}) {
  return (
    <div className="relative w-[5.75rem] shrink-0" dir="ltr">
      <span className="field pointer-events-none flex items-center justify-between gap-1 px-3 font-semibold" aria-hidden="true">
        {value}
        <ChevronDown className="h-4 w-4 text-cream-muted" />
      </span>
      <select
        value={value}
        aria-label={label}
        onChange={(event) => onChange(event.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {DIAL_CODES.map((item) => (
          <option key={item.code} value={item.code}>
            {dialCodeLabel(item, countryNames)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function PublicReservationForm({
  vehiculeId: _vehiculeId,
  vehiculeSlug,
  redirectSlug,
  tarifJour,
  tarifJour10Plus = 0,
  highSeason = false,
  initialDu,
  initialAu,
}: Props) {
  const router = useRouter();
  const { t, lp, locale } = useLocale();
  const today = useToday();
  const [loading, setLoading] = useState(false);
  const [whatsappSame, setWhatsappSame] = useState(true);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  // Noms de pays dans la langue de la page, ajoutés après le premier rendu pour rester identique au HTML du serveur.
  const [countryNames, setCountryNames] = useState<Intl.DisplayNames>();
  useEffect(() => {
    setCountryNames(new Intl.DisplayNames([locale], { type: 'region' }));
  }, [locale]);
  const [form, setForm] = useState({
    debutAt: initialDu ?? '',
    finAt: initialAu ?? '',
    prenom: '',
    nom: '',
    indicatif: '+212',
    telephone: '',
    whatsapp: '',
    email: '',
    notes: '',
    website: '', // honeypot anti-bot
  });

  const nbJours = form.debutAt && form.finAt ? calcNbJours(new Date(form.debutAt), new Date(form.finAt)) : 0;
  const pricingDays = nbJours > 0 ? Math.max(nbJours, MIN_RESERVATION_DAYS) : 0;
  const pricing =
    pricingDays > 0 ? calcTarifTotal(pricingDays, tarifJour, tarifJour10Plus, { forceStandard: highSeason }) : null;
  const total = pricing?.total ?? 0;

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field in errors) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const errorProps = (name: FieldName) =>
    errors[name] ? { 'aria-invalid': true as const, 'aria-describedby': `err-${name}` } : {};
  const ErrorText = ({ name }: { name: FieldName }) =>
    errors[name] ? (
      <p id={`err-${name}`} className="mt-1 text-sm text-rose-300">
        {errors[name]}
      </p>
    ) : null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (form.website) return; // honeypot

    const required = t('ui.formRequired');
    const next: Partial<Record<FieldName, string>> = {};
    if (!form.debutAt) next.debutAt = required;
    if (!form.finAt) next.finAt = required;
    if (!form.prenom.trim()) next.prenom = required;
    if (!form.nom.trim()) next.nom = required;
    if (!form.telephone.trim()) next.telephone = required;
    if (!whatsappSame && !form.whatsapp.trim()) next.whatsapp = required;
    if (form.debutAt && form.finAt && nbJours < MIN_RESERVATION_DAYS) {
      next.finAt = t('form.minDaysError').replace('{count}', String(MIN_RESERVATION_DAYS));
    }
    setErrors(next);
    if (Object.keys(next).length > 0) {
      toast.error(next.finAt && form.finAt ? next.finAt : t('form.required'));
      const first = (['debutAt', 'finAt', 'prenom', 'nom', 'telephone', 'whatsapp'] as FieldName[]).find((name) => next[name]);
      if (first) document.getElementById(`res-${first}`)?.focus();
      return;
    }

    setLoading(true);
    try {
      const phone = parseFormPhone(form.telephone, form.indicatif, DIAL_CODE_VALUES);
      const whatsappNumber = whatsappSame
        ? phone.international
        : parseFormPhone(form.whatsapp, phone.indicatif, DIAL_CODE_VALUES).international;

      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleSlug: vehiculeSlug,
          debutAt: new Date(form.debutAt).toISOString(),
          finAt: new Date(form.finAt).toISOString(),
          prenom: form.prenom,
          nom: form.nom,
          indicatif: phone.indicatif,
          telephone: phone.telephone,
          whatsapp: whatsappNumber,
          email: form.email,
          notes: form.notes,
          optionsSupplementaires: [],
          website: form.website,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const fieldErrors = data?.details?.fieldErrors as Record<string, string[]> | undefined;
        const firstFieldError = fieldErrors ? Object.values(fieldErrors).flat().find(Boolean) : undefined;
        toast.error(firstFieldError ?? data.error ?? t('form.error'));
        return;
      }

      toast.success(t('form.success'));
      router.push(lp(`/catalogue/${redirectSlug}/confirmation?id=${data.data?.id}`));
    } catch {
      toast.error(t('form.networkError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Honeypot — caché, jamais rempli par un humain */}
      <div className="sr-only" aria-hidden="true">
        <input tabIndex={-1} name="website" value={form.website} onChange={(e) => set('website', e.target.value)} autoComplete="off" />
      </div>

      {/* ── Dates : deux colonnes, même en mobile ── */}
      <div className="grid grid-cols-2 gap-3">
        <div className="min-w-0">
          <label htmlFor="res-debutAt" className={labelBase}>{t('form.startDate')}</label>
          <input
            id="res-debutAt"
            type="date"
            value={form.debutAt}
            onChange={(e) => set('debutAt', e.target.value)}
            min={today}
            required
            className={dateField}
            {...errorProps('debutAt')}
          />
          <ErrorText name="debutAt" />
        </div>
        <div className="min-w-0">
          <label htmlFor="res-finAt" className={labelBase}>{t('form.endDate')}</label>
          <input
            id="res-finAt"
            type="date"
            value={form.finAt}
            onChange={(e) => set('finAt', e.target.value)}
            min={form.debutAt ? addDaysIso(form.debutAt, MIN_RESERVATION_DAYS) : today}
            required
            className={dateField}
            {...errorProps('finAt')}
          />
          <ErrorText name="finAt" />
        </div>
      </div>

      {/* ── Estimation tarif ── */}
      <div aria-live="polite">
        {nbJours > 0 && (
          <div className="rounded-xl border border-gold/25 bg-gold/[0.06] p-3.5 text-[0.9375rem]">
            <span className="text-cream-muted">
              {pricingDays} {t('form.days').replace(/\{s\}/g, pricingDays > 1 ? 's' : '')} · {t('form.estimate')} :{' '}
            </span>
            <bdi className="font-bold text-gold-light">{formatPrice(total, locale)}</bdi>
            <span className="ms-1 text-sm text-cream-muted">{t('form.exDeposit')}</span>
            {pricing?.palier === '10Plus' && <p className="mt-1 text-sm text-gold-light">{t('form.longRate')}</p>}
          </div>
        )}
        {form.debutAt && form.finAt && nbJours < MIN_RESERVATION_DAYS && (
          <p className="mt-2 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-200">
            {t('form.minDays').replace('{count}', String(MIN_RESERVATION_DAYS))}
          </p>
        )}
      </div>

      {/* ── Prénom / Nom ── */}
      <div className="grid grid-cols-2 gap-3">
        <div className="min-w-0">
          <label htmlFor="res-prenom" className={labelBase}>{t('form.firstName')}</label>
          <input
            id="res-prenom"
            autoComplete="given-name"
            type="text"
            value={form.prenom}
            onChange={(e) => set('prenom', e.target.value)}
            required
            className="field"
            {...errorProps('prenom')}
          />
          <ErrorText name="prenom" />
        </div>
        <div className="min-w-0">
          <label htmlFor="res-nom" className={labelBase}>{t('form.lastName')}</label>
          <input
            id="res-nom"
            autoComplete="family-name"
            type="text"
            value={form.nom}
            onChange={(e) => set('nom', e.target.value)}
            required
            className="field"
            {...errorProps('nom')}
          />
          <ErrorText name="nom" />
        </div>
      </div>

      {/* ── Téléphone avec indicatif ── */}
      <div>
        <label htmlFor="res-telephone" className={labelBase}>{t('form.phone')}</label>
        <div className="flex gap-2">
          <DialCodeSelect
            value={form.indicatif}
            onChange={(value) => set('indicatif', value)}
            label={t('ui.dialCode')}
            countryNames={countryNames}
          />
          <input
            id="res-telephone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            dir="ltr"
            value={form.telephone}
            onChange={(e) => set('telephone', e.target.value)}
            placeholder="6XX XXX XXX"
            required
            className="field min-w-0 flex-1"
            {...errorProps('telephone')}
          />
        </div>
        <ErrorText name="telephone" />
      </div>

      {/* ── WhatsApp ── */}
      <div className="space-y-3">
        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[0.9375rem] text-cream-muted">
          <input
            type="checkbox"
            checked={whatsappSame}
            onChange={(e) => setWhatsappSame(e.target.checked)}
            className="h-5 w-5 shrink-0 accent-[#c9a84c]"
          />
          {t('form.whatsappSame')}
        </label>
        {!whatsappSame && (
          <div>
            <label htmlFor="res-whatsapp" className={labelBase}>{t('form.whatsapp')}</label>
            <div className="flex gap-2">
              <DialCodeSelect
                value={form.indicatif}
                onChange={(value) => set('indicatif', value)}
                label={t('ui.dialCode')}
                countryNames={countryNames}
              />
              <input
                id="res-whatsapp"
                type="tel"
                inputMode="tel"
                dir="ltr"
                value={form.whatsapp}
                onChange={(e) => set('whatsapp', e.target.value)}
                placeholder="6XX XXX XXX"
                required
                className="field min-w-0 flex-1"
                {...errorProps('whatsapp')}
              />
            </div>
            <ErrorText name="whatsapp" />
          </div>
        )}
      </div>

      {/* ── E-mail et précisions : facultatifs, repliés ── */}
      <details className="group rounded-xl border border-white/10">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 text-[0.9375rem] font-semibold text-cream [&::-webkit-details-marker]:hidden">
          {t('ui.formMore')}
          <ChevronDown className="h-4 w-4 shrink-0 text-gold transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="space-y-4 px-4 pb-4">
          <div>
            <label htmlFor="res-email" className={labelBase}>
              {t('form.email')} <span className="text-cream-faint">({t('form.emailOptional')})</span>
            </label>
            <input
              id="res-email"
              autoComplete="email"
              autoCapitalize="none"
              type="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              className="field"
            />
          </div>
          <div>
            <label htmlFor="res-notes" className={labelBase}>{t('form.notes')}</label>
            <textarea
              id="res-notes"
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              rows={3}
              maxLength={1000}
              className="field resize-none py-3"
              placeholder={t('form.notesPlaceholder')}
            />
          </div>
        </div>
      </details>

      {/* ── Envoi ── */}
      <button type="submit" disabled={loading} className="btn btn-primary btn-block disabled:opacity-70">
        {loading ? t('form.submitting') : t('form.submit')}
      </button>

      <p className="text-center text-sm text-cream-muted">{t('ui.formReassure')}</p>
    </form>
  );
}
