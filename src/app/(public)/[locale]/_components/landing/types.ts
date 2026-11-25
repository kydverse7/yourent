import type { ReactNode } from 'react';

/* ─────────── Landing page shared types ─────────── */

export type LandingVehicle = {
  _id: string;
  marque: string;
  modele: string;
  annee?: number;
  type: string;
  slug: string;
  tarifJour: number;
  featuredPhoto: string | null;
};

export type SliderBrandData = {
  brand: string;
  vehicle: LandingVehicle | null;
};

export type BrandAmbientColor = [r: number, g: number, b: number];

/** Vrais chiffres de la flotte, lus côté serveur. */
export type LandingStats = {
  vehicleCount: number;
  clientCount: number;
};

export type PublicLandingPageProps = {
  sliderBrands: SliderBrandData[];
  economicVehicles: LandingVehicle[];
  /* Sections rendues côté serveur : leur contenu n'alourdit pas le JavaScript client. */
  hero: ReactNode;
  signature: ReactNode;
  newArrival: ReactNode;
  why: ReactNode;
  steps: ReactNode;
  contact: ReactNode;
  guide: ReactNode;
  faq: ReactNode;
  finalCta: ReactNode;
};
