'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.9244651933113!2d-7.6351740999999995!3d33.5813104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2c04fb9fd73%3A0xa8d85ec7af62ac53!2s25%20Rue%20Ibnou%20Mounir%2C%20Casablanca!5e0!3m2!1sfr!2sma!4v1773247373925!5m2!1sfr!2sma';

/** Carte Google de l'agence : une image fixe, la carte interactive ne se charge qu'au clic. */
export function MapEmbed({ title, showLabel, imageAlt }: { title: string; showLabel: string; imageAlt: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative min-h-72 bg-surface-2 lg:min-h-full">
      {open ? (
        <iframe
          src={MAP_SRC}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          <Image src="/image-casablanca-sombre.webp" alt={imageAlt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <button type="button" onClick={() => setOpen(true)} className="btn btn-secondary bg-noir-root/80">
              <MapPin className="h-5 w-5 text-gold" aria-hidden="true" />
              {showLabel}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
