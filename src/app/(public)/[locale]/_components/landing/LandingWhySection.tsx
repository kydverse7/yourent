import { Truck, ShieldCheck, CarFront, Headphones, Sparkles } from 'lucide-react';
import { t as tr, type Locale } from '@/lib/i18n/translations';
import { LandingCountUp } from './LandingCountUp';
import { rvDelay } from './reveal';

/* ── φ = 1.618 — golden ratio design notes ──
   Typography scale : stat 2.6rem (φ²·⁰⁵), title 1rem×φ, label 0.65rem
   Card padding     : p-6 md:p-8 (32 px ≈ 16×φ¹·³⁵)
   Grid gap         : gap-4 md:gap-5 (20 px ≈ 16×φ⁰·⁵⁵)
   Icon box         : 48 px = 3rem ≈ 16×φ²
────────────────────────────────────────────── */

/* ── Advantage card data ───────────────────── */
type Advantage = {
  icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  descKey: string;
  labelKey: string;
  counter: React.ReactNode;
};

function advantagesFor(locale: Locale, vehicleCount: number): Advantage[] {
  const t = (key: string) => tr(locale, key);
  return [
    {
      icon: Truck,
      titleKey: 'why.delivery.title',
      descKey: 'why.delivery.desc',
      labelKey: 'why.delivery.label',
      counter: <>{t('why.delivery.stat')}</>,
    },
    {
      icon: ShieldCheck,
      titleKey: 'why.insurance.title',
      descKey: 'why.insurance.desc',
      labelKey: 'why.insurance.label',
      counter: (
        <>
          <LandingCountUp target={100} suffix={t('why.insurance.stat')} />
        </>
      ),
    },
    {
      icon: CarFront,
      titleKey: 'why.fleet.title',
      descKey: 'why.fleet.desc',
      labelKey: 'why.fleet.label',
      counter: <LandingCountUp target={vehicleCount} />,
    },
    {
      icon: Headphones,
      titleKey: 'why.assistance.title',
      descKey: 'why.assistance.desc',
      labelKey: 'why.assistance.label',
      counter: <>{t('why.assistance.stat')}</>,
    },
  ];
}

/* ── Section component ─────────────────────── */
export function LandingWhySection({ vehicleCount, locale }: { vehicleCount: number; locale: Locale }) {
  const t = (key: string) => tr(locale, key);
  const advantages = advantagesFor(locale, vehicleCount);

  return (
    <section className="lux-container py-16 md:py-24">
      <div className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-white/[0.015] p-6 sm:p-10 md:p-14">
        {/* Decorative glow — φ-proportioned ellipse */}
        <div className="pointer-events-none absolute inset-x-0 -top-px h-48 rounded-t-[28px] bg-[radial-gradient(ellipse_61.8%_38.2%_at_50%_0%,rgba(201,168,76,0.10),transparent)]" />

        {/* ── Header — left aligned ── */}
        <div className="rv rv-tilt-up relative mb-10 text-center md:mb-14 md:text-start">
          <span className="lux-eyebrow">
            <Sparkles className="h-3.5 w-3.5" /> {t('why.eyebrow')}
          </span>
          <h2 className="lux-title-sm mt-4">{t('why.title')}</h2>
          <p className="lux-subtitle mt-3 max-w-[48ch]">
            {t('why.subtitle')}
          </p>
        </div>

        {/* ── 2×2 grid (golden-ratio gap) ── */}
        <div data-rv-amount="0.1" className="rv rv-group relative mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 md:gap-5">
          {advantages.map((adv, i) => {
            const Icon = adv.icon;
            return (
              <div
                key={i}
                style={{ ...rvDelay(i * 0.12), perspective: 1000 }}
                className="rv-item group relative flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center transition-all hover:border-[#c9a84c]/15 hover:bg-white/[0.04] md:p-8"
              >
                {/* Icon — φ² = 48 px */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c9a84c]/20 bg-[#c9a84c]/10 transition-colors group-hover:bg-[#c9a84c]/15">
                  <Icon className="h-5 w-5 text-[#c9a84c]" />
                </div>

                {/* Stat counter — φ²·⁰⁵ scale */}
                <p className="text-[2.6rem] font-extrabold leading-none text-[#c9a84c]">
                  {adv.counter}
                </p>
                <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#756858]">
                  {t(adv.labelKey)}
                </p>

                {/* Title + desc — φ scale */}
                <h3 className="mt-4 text-base font-bold text-[#f7f1e8] md:text-lg">
                  {t(adv.titleKey)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#b9a88f]">
                  {t(adv.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
