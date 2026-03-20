'use client';

import { type ReactNode } from 'react';
import {
  motion,
  type Variants,
  type HTMLMotionProps,
} from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   Shared animation variants & wrapper components
   for the Yourent landing page.
═══════════════════════════════════════════════════════════ */

/* ── Viewport defaults ── */
const ONCE = { once: true, amount: 0.15 } as const;

/* ── Fade Up ── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Fade Down (for headers) ── */
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Fade In (simple) ── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

/* ── Scale Up ── */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Slide from left ── */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Slide from right ── */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Stagger container ── */
export const stagger = (staggerDelay = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

/* ── Stagger item (fade up) ── */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Stagger item (scale) ── */
export const staggerScale: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Brand info panel transition (AnimatePresence) ── */
export const brandInfoVariants: Variants = {
  initial: { opacity: 0, x: 40, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: -30,
    filter: 'blur(4px)',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

/* ── Blur-fade in ── */
export const blurFade: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 20 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Draw line (for decorative separators) ── */
export const drawLine: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
};

/* ═══════════════════════════════════════════════════════════
   Wrapper components
═══════════════════════════════════════════════════════════ */

type ScrollRevealProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  /** override viewport settings */
  viewport?: { once?: boolean; amount?: number; margin?: string };
};

/**
 * Generic scroll-reveal wrapper.
 * Fades-up by default when entering viewport.
 */
export function ScrollReveal({
  children,
  variants = fadeUp,
  className,
  viewport,
  ...rest
}: ScrollRevealProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? ONCE}
      className={className}
      {...rest}
    >
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

/**
 * Stagger container — children should use `staggerItem` (or `staggerScale`) variants.
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.12,
  delayChildren = 0,
  className,
  viewport,
  ...rest
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={stagger(staggerDelay, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? ONCE}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* Re-export motion for convenience */
export { motion, type Variants } from 'framer-motion';
export { AnimatePresence } from 'framer-motion';
export { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
