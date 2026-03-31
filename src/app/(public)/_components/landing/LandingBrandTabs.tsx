import type { SliderBrandData, BrandAmbientColor } from './types';
import { BRAND_AMBIENT } from './constants';
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
 * Brand tab buttons with autoplay progress indicator.
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
  const [ar, ag, ab] = ambient;
  const brightRgb = `${Math.min(255, ar + 50)},${Math.min(255, ag + 50)},${Math.min(255, ab + 50)}`;

  return (
    <div className="relative z-40 flex shrink-0 flex-nowrap items-center gap-2 overflow-x-auto px-4 pb-6 md:justify-center md:px-6 md:pb-9 scrollbar-hide">
      {items.map((b, i) => {
        const isActive = i === brandIndex;
        return (
          <motion.button
            key={b.brand}
            onClick={() => onTabSelect(i)}
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
          </motion.button>
        );
      })}
    </div>
  );
}
