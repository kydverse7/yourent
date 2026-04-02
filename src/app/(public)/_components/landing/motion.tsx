'use client';

import { type ReactNode } from 'react';
import {
  motion,
  type Variants,
  type HTMLMotionProps,
} from 'framer-motion';

/* =================================================================
   Shared animation variants & wrapper components — v2
   Modern scroll-driven · blur reveals · 3D tilts · spring overshoot
================================================================= */

const SMOOTH = [0.22, 1, 0.36, 1] as const;
const SPRING = [0.34, 1.56, 0.64, 1] as const;
const ONCE = { once: true, amount: 0.18 } as const;

/* ── Fade Up (default scroll reveal) ── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: SMOOTH } },
};

/* ── Fade Down ── */
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: SMOOTH } },
};

/* ── Fade In ── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: [0.0, 0.0, 0.58, 1.0] } },
};

/* ── Scale Up with blur ── */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.88, filter: 'blur(12px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease: SMOOTH } },
};

/* ── Slide Left ── */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -80, filter: 'blur(6px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: SMOOTH } },
};

/* ── Slide Right ── */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 80, filter: 'blur(6px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: SMOOTH } },
};

/* ── 3D Tilt Up ── */
export const tiltUp: Variants = {
  hidden: { opacity: 0, y: 80, rotateX: 12, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { duration: 1, ease: SMOOTH } },
};

/* ── Pop In (spring overshoot) ── */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6, filter: 'blur(16px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: SPRING } },
};

/* ── Rise + subtle rotate ── */
export const riseRotate: Variants = {
  hidden: { opacity: 0, y: 50, rotate: -3, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: SMOOTH } },
};

/* ── Stagger container ── */
export const stagger = (staggerDelay = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: staggerDelay, delayChildren } },
});

/* ── Stagger item (fade up + blur) ── */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: SMOOTH } },
};

/* ── Stagger item (scale) ── */
export const staggerScale: Variants = {
  hidden: { opacity: 0, scale: 0.82, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: SMOOTH } },
};

/* ── Stagger item (3D card flip) ── */
export const staggerCard: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: 15, scale: 0.9, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.75, ease: SMOOTH } },
};

/* ── Brand info panel (AnimatePresence) ── */
export const brandInfoVariants: Variants = {
  initial: { opacity: 0, x: 60, filter: 'blur(10px)', scale: 0.95 },
  animate: { opacity: 1, x: 0, filter: 'blur(0px)', scale: 1, transition: { duration: 0.6, ease: SMOOTH } },
  exit: { opacity: 0, x: -40, filter: 'blur(8px)', scale: 0.95, transition: { duration: 0.35, ease: 'easeIn' } },
};

/* ── Car slide in/out (cinematic) ── */
export const carSlideVariants: Variants = {
  initial: { opacity: 0, x: 120, scale: 0.78, rotateY: -18, filter: 'blur(24px) brightness(1.6)' },
  animate: { opacity: 1, x: 0, scale: 1, rotateY: 0, filter: 'blur(0px) brightness(1)', transition: { duration: 0.85, ease: SMOOTH } },
  exit: { opacity: 0, x: -120, scale: 0.78, rotateY: 18, filter: 'blur(24px) brightness(0.4)', transition: { duration: 0.5, ease: 'easeIn' } },
};

/* ── Blur-fade (headers / text) ── */
export const blurFade: Variants = {
  hidden: { opacity: 0, filter: 'blur(16px)', y: 30 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.9, ease: SMOOTH } },
};

/* ── Draw line ── */
export const drawLine: Variants = {
  hidden: { scaleX: 0, originX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 1.4, ease: SMOOTH } },
};

/* ── Hero cascade (after loader) ── */
export const heroBase = (baseDelay: number) => ({
  bg: {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: SMOOTH, delay: baseDelay } },
  },
  topBar: {
    initial: { opacity: 0, y: -30, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: SMOOTH, delay: baseDelay + 0.15 } },
  },
  wordmark: {
    initial: { opacity: 0, scale: 0.85, filter: 'blur(24px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.1, ease: SMOOTH, delay: baseDelay + 0.3 } },
  },
  car: {
    initial: { opacity: 0, scale: 0.78, y: 80, filter: 'blur(28px) brightness(1.8)' },
    animate: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px) brightness(1)', transition: { duration: 1.3, ease: SMOOTH, delay: baseDelay + 0.5 } },
  },
  carGlow: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { opacity: 1, scale: 1.2, transition: { duration: 1.8, ease: [0.0, 0.0, 0.58, 1.0] as const, delay: baseDelay + 0.7 } },
  },
  pills: (sd = 0.15) => stagger(sd, baseDelay + 0.8),
});

/* ═══ Wrapper Components ═══ */

type ScrollRevealProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  viewport?: { once?: boolean; amount?: number; margin?: string };
};

export function ScrollReveal({ children, variants = fadeUp, className, viewport, ...rest }: ScrollRevealProps) {
  return (
    <motion.div variants={variants} initial="hidden" whileInView="visible" viewport={viewport ?? ONCE} className={className} {...rest}>
      {children}
    </motion.div>
  );
}

type StaggerContainerProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  viewport?: { once?: boolean; amount?: number; margin?: string };
};

export function StaggerContainer({ children, staggerDelay = 0.12, delayChildren = 0, className, viewport, ...rest }: StaggerContainerProps) {
  return (
    <motion.div variants={stagger(staggerDelay, delayChildren)} initial="hidden" whileInView="visible" viewport={viewport ?? ONCE} className={className} {...rest}>
      {children}
    </motion.div>
  );
}

export { motion, type Variants } from 'framer-motion';
export { AnimatePresence } from 'framer-motion';
export { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';