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

export type SliderMediaType = '3d' | 'image';

export type SliderItem = SliderBrandData & {
  mediaType: SliderMediaType;
};

export type BrandAmbientColor = [r: number, g: number, b: number];

export type PublicLandingPageProps = {
  signatureVehicles: LandingVehicle[];
  sliderBrands: SliderBrandData[];
  economicVehicles: LandingVehicle[];
};

export type MorphProgress = {
  /** 0–1 raw scroll progress through the hero */
  raw: number;
  /** 0–1 clamped motion progress (snaps to 1 when slider active) */
  motion: number;
  /** true when scroll has passed the hero threshold */
  sliderActive: boolean;
};
