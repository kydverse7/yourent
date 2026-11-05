import { useLocale } from '@/lib/i18n';
import type { SliderBrandData, BrandAmbientColor } from './types';
import { motion } from './motion';

type LandingBrandTabsProps = {
  items: SliderBrandData[];
  brandIndex: number;
  sliderActive: boolean;
  apKey: number;
  rgb: string;
  ambient: BrandAmbientColor;
  onTabSelect: (index: number) => void;
};

/**
 * Onglets du slider avec indicateur de lecture automatique.
 * Chaque onglet est un vrai lien vers la fiche du véhicule : tous les véhicules mis en avant
 * sont donc présents dans le HTML. Un clic simple change de diapositive, sans quitter la page.
 */
export function LandingBrandTabs({
  items,
  brandIndex,
  sliderActive,
  apKey,
  rgb,
  ambient,
  onTabSelect,
}: LandingBrandTabsProps) {
  const { lp } = useLocale();
  const [ar, ag, ab] = ambient;
  const brightRgb = `${Math.min(255, ar + 50)},${Math.min(255, ag + 50)},${Math.min(255, ab + 50)}`;

  return (
    <div className="relative z-40 flex shrink-0 flex-nowrap items-center gap-2 overflow-x-auto px-4 pb-6 md:justify-center md:px-6 md:pb-9 scrollbar-hide">
      {items.map((b, i) => {
        const isActive = i === brandIndex;
        return (
          <motion.a
            key={b.brand}
            href={lp(b.vehicle ? `/catalogue/${b.vehicle.slug}` : '/catalogue')}
            aria-current={isActive ? 'true' : undefined}
            onClick={(event) => {
              if (event.ctrlKey || event.metaKey || event.shiftKey) return;
              event.preventDefault();
              onTabSelect(i);
            }}
            className={`lp-tab-btn${isActive ? ' active' : ''} pointer-events-auto shrink-0`}
            style={
              isActive
                ? {
                    borderColor: `rgba(${rgb},0.55)`,
                    color: `rgb(${brightRgb})`,
                    background: `rgba(${rgb},0.12)`,
                    boxShadow: `0 0 22px rgba(${rgb},0.25)`,
                  }
                : undefined
            }
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            layout
          >
            {b.brand}
            {isActive && sliderActive && (
              <span
                key={apKey}
                className="lp-tab-progress"
                style={{ background: `rgb(${brightRgb})` }}
              />
            )}
          </motion.a>
        );
      })}
    </div>
  );
}
