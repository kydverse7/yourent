'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────
   YourentLoader — Futuristic premium intro loader
   Only used on public pages (landing + catalogue).
   Shows once per session (sessionStorage gate).
───────────────────────────────────────────────────────── */

const SESSION_KEY = 'yourent-intro-seen';
const DURATION_MS = 2800;

export function YourentLoader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    setVisible(true);
    document.body.style.overflow = 'hidden';

    const start = Date.now();
    const raf = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / DURATION_MS, 1);
      setProgress(pct);
      if (pct < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SESSION_KEY, '1');
      document.body.style.overflow = '';
    }, DURATION_MS);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="yourent-loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#050505' }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── ambient orbs ── */}
          <div
            className="pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 'clamp(18rem, 60vw, 44rem)',
              height: 'clamp(12rem, 36vh, 24rem)',
              borderRadius: '999px',
              background: 'radial-gradient(circle, rgba(201,168,76,0.3) 0%, rgba(201,168,76,0.06) 50%, transparent 72%)',
              filter: 'blur(50px)',
              animation: 'loaderOrbPulse 2.4s ease-in-out infinite',
            }}
          />
          <div
            className="pointer-events-none absolute right-[10%] bottom-[20%]"
            style={{
              width: 'clamp(8rem, 20vw, 16rem)',
              height: 'clamp(6rem, 14vh, 10rem)',
              borderRadius: '999px',
              background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
              filter: 'blur(36px)',
            }}
          />

          {/* ── scanner line ── */}
          <motion.div
            className="pointer-events-none absolute inset-x-0"
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 30%, rgba(255,248,210,0.8) 50%, rgba(201,168,76,0.5) 70%, transparent 100%)',
              boxShadow: '0 0 16px rgba(201,168,76,0.4), 0 0 60px rgba(201,168,76,0.15)',
            }}
            initial={{ top: '0%' }}
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
          />

          {/* ── subtle grid ── */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* ── hexagonal ring ── */}
          <motion.div
            className="absolute"
            style={{ width: 200, height: 200 }}
            initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
            animate={{ opacity: [0, 0.6, 0.3], scale: [0.6, 1.1, 1], rotate: [-30, 0, 60] }}
            transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(201,168,76,0.6)" />
                  <stop offset="100%" stopColor="rgba(201,168,76,0.05)" />
                </linearGradient>
              </defs>
              <polygon
                points="100,10 178,55 178,145 100,190 22,145 22,55"
                fill="none"
                stroke="url(#hexGrad)"
                strokeWidth="0.8"
                strokeDasharray="600"
                strokeDashoffset="600"
                style={{ animation: 'loaderHexDraw 2s ease-out 0.3s forwards' }}
              />
            </svg>
          </motion.div>

          {/* ── logo ── */}
          <motion.div
            className="relative z-10 mb-6"
            initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.25)] shadow-[0_0_40px_rgba(201,168,76,0.2)]">
              <Image
                src="/logo-yourent.png"
                alt="Yourent"
                fill
                className="object-contain p-1.5"
                sizes="80px"
                priority
              />
            </div>
          </motion.div>

          {/* ── brand text ── */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f0ddb0 40%, #c9a84c 70%, #fff2cc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Yourent
            </h2>
            <motion.p
              className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#756858]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Location de luxe · Casablanca
            </motion.p>
          </motion.div>

          {/* ── progress bar ── */}
          <motion.div
            className="relative z-10 mt-10 h-[2px] w-48 overflow-hidden rounded-full bg-white/[0.06] sm:w-56"
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div
              className="h-full rounded-full transition-transform duration-75 origin-left"
              style={{
                transform: `scaleX(${progress})`,
                background: 'linear-gradient(90deg, #c9a84c, #f0ddb0, #c9a84c)',
                boxShadow: '0 0 12px rgba(201,168,76,0.5)',
              }}
            />
          </motion.div>

          {/* ── corner accents ── */}
          <div className="pointer-events-none absolute top-6 left-6 h-8 w-8 border-t border-l border-[rgba(201,168,76,0.2)]" />
          <div className="pointer-events-none absolute top-6 right-6 h-8 w-8 border-t border-r border-[rgba(201,168,76,0.2)]" />
          <div className="pointer-events-none absolute bottom-6 left-6 h-8 w-8 border-b border-l border-[rgba(201,168,76,0.2)]" />
          <div className="pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-b border-r border-[rgba(201,168,76,0.2)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
