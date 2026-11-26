import { Schema, model, models, type Model } from 'mongoose';
import { VISIT_RETENTION_DAYS } from '@/lib/tracking/ingest';

/**
 * Visite du site public (une session de navigation, identifiant aléatoire tiré par le navigateur).
 * Alimentée par /api/public/track, en production uniquement ; lue par la page Statistiques du back-office.
 * Ni nom, ni téléphone, ni e-mail, ni texte saisi : seulement l'origine, le parcours et la localisation de l'IP.
 */
export interface ISiteVisitPage {
  /** Rang de la page dans la visite (0 = page d'entrée). */
  n: number;
  /** Adresse publique, sans paramètres. */
  p: string;
  /** Modèle de la fiche véhicule. */
  v?: string;
  t?: Date;
  /** Temps passé (secondes, onglet visible). */
  d?: number;
  /** Défilement maximal (0–100 %). */
  s?: number;
}

export interface ISiteVisitEvent {
  k: string;
  p: string;
  tg?: string;
  v?: string;
  lb?: string;
  t?: Date;
}

export interface ISiteVisit {
  _id: string;
  at: Date;
  last?: Date;
  ip?: string;
  city?: string;
  region?: string;
  cc?: string;
  src: string;
  sd?: string;
  med?: string;
  cmp?: string;
  entry: string;
  lang?: string;
  bl?: string;
  dev?: string;
  pv?: number;
  pages?: ISiteVisitPage[];
  ev?: ISiteVisitEvent[];
  fl?: { cat?: boolean; veh?: boolean; form?: boolean; sub?: boolean; wa?: boolean; tel?: boolean };
}

/*
 * Collection et index créés par Mongoose en production seulement : en local, la base configurée
 * est celle de production et rien ne doit y être écrit (ni données, ni index).
 */
const IS_PRODUCTION = process.env.VERCEL_ENV === 'production';

const PageSchema = new Schema<ISiteVisitPage>(
  { n: Number, p: String, v: String, t: Date, d: Number, s: Number },
  { _id: false },
);

const EventSchema = new Schema<ISiteVisitEvent>(
  { k: String, p: String, tg: String, v: String, lb: String, t: Date },
  { _id: false },
);

const SiteVisitSchema = new Schema<ISiteVisit>(
  {
    _id: { type: String, required: true },
    at: { type: Date, required: true },
    last: Date,
    ip: String,
    city: String,
    region: String,
    cc: String,
    src: { type: String, required: true },
    sd: String,
    med: String,
    cmp: String,
    entry: String,
    lang: String,
    bl: String,
    dev: String,
    pv: Number,
    pages: [PageSchema],
    ev: [EventSchema],
    fl: { cat: Boolean, veh: Boolean, form: Boolean, sub: Boolean, wa: Boolean, tel: Boolean },
  },
  {
    collection: 'site_visits',
    versionKey: false,
    autoIndex: IS_PRODUCTION,
    autoCreate: IS_PRODUCTION,
  },
);

/* Suppression automatique après la durée de conservation ; sert aussi à toutes les lectures par période. */
SiteVisitSchema.index({ at: 1 }, { expireAfterSeconds: VISIT_RETENTION_DAYS * 24 * 3600 });
/* Tableaux « par origine » et liste filtrée des visites Google Ads. */
SiteVisitSchema.index({ src: 1, at: -1 });

export const SiteVisit: Model<ISiteVisit> =
  (models.SiteVisit as Model<ISiteVisit> | undefined) || model<ISiteVisit>('SiteVisit', SiteVisitSchema);
