// usage: node scripts/export-photos.mjs <dossier des originaux> [nom…]
//
// Photos haute définition du site public (accueil) : recadrage, étalonnage « cinéma » et export WebP + AVIF
// dans public/photos/<nom>/<variante>-<largeur>.<format>. Les originaux (JPEG pleine résolution) restent
// hors du dépôt ; leurs sources et licences sont dans public/photos/CREDITS.txt.
//
// L'assombrissement et le vignettage sont faits ICI, dans le fichier exporté (pas de filter CSS sur le site) :
// le navigateur n'a rien à recalculer, et les zones sombres pèsent moins lourd.
// Les chemins produits sont déclarés dans src/app/(public)/[locale]/_components/home/showcaseData.ts.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

/**
 * crop : [gauche, haut, droite, bas] en fractions de l'original.
 * grade : luminosité / saturation (modulate), contraste (linear), vignette (opacité du noir aux bords),
 *         top / bottom : assombrissement progressif du haut / du bas (opacité du noir au bord).
 */
const PHOTOS = [
  {
    name: 'porsche-macan',
    src: 'macan/macan-noir-3q-avant_unsplash-P11bcs0CfDU.jpg',
    grade: { brightness: 0.6, saturation: 0.72, contrast: 1.12, vignette: 0.6, top: 0.7, bottom: 0.45 },
    variants: {
      // ordinateur : cadre 3:2 entier, la voiture au centre
      paysage: { crop: [0, 0.03, 1, 1], widths: [768, 1280, 1920, 2560] },
      // mobile : 5:4 centré sur la voiture (pare-chocs compris)
      portrait: { crop: [0.0884, 0, 0.9217, 1], widths: [768, 1280] },
    },
  },
  {
    name: 'range-rover-sport',
    src: 'rrs/rrs-noir-3q-avant-showroom_pexels-14471686.jpg',
    grade: { brightness: 0.82, saturation: 0.8, contrast: 1.06, vignette: 0.55, top: 0.5, bottom: 0.35 },
    variants: { paysage: { crop: [0, 0, 1, 1], widths: [768, 1280, 1920, 2560] } },
  },
  {
    name: 'mercedes-classe-e',
    src: 'classe-e/classe-e-W214-gris-3q-avant-parking_pexels-26690693.jpg',
    // photo un peu molle à 100 % : pas d'export au-delà de 1920 px
    grade: { brightness: 0.56, saturation: 0.8, contrast: 1.12, vignette: 0.65, top: 0.6, bottom: 0.4 },
    variants: { paysage: { crop: [0, 0, 1, 1], widths: [768, 1280, 1920] } },
  },
  {
    name: 'volkswagen-touareg',
    src: 'touareg/touareg-noir-3q-avant_unsplash-Ml7SI5BjduQ.jpg',
    grade: { brightness: 0.72, saturation: 0.78, contrast: 1.08, vignette: 0.55, top: 0.55, bottom: 0.3 },
    // cartes de la galerie : 344 px au plus à l'écran
    variants: { paysage: { crop: [0.04, 0.06, 0.98, 0.9], widths: [768, 1280] } },
  },
  {
    name: 'range-rover-evoque',
    src: 'evoque/evoque-noir-blanc-3q-avant_pexels-18231632.jpg',
    grade: { brightness: 0.74, saturation: 1, contrast: 1.06, vignette: 0.5, top: 0.45, bottom: 0.3 },
    variants: { paysage: { crop: [0, 0, 1, 1], widths: [768, 1280] } },
  },
  {
    name: 'audi-q3',
    src: 'q3/q3-sportback-gris-3q-avant_unsplash-44rAoX5TzQ.jpg',
    grade: { brightness: 0.72, saturation: 0.8, contrast: 1.08, vignette: 0.55, top: 0.5, bottom: 0.3 },
    variants: { paysage: { crop: [0.03, 0.03, 0.99, 0.97], widths: [768, 1280] } },
  },
  {
    name: 'casablanca-crepuscule',
    src: 'ambiance/casablanca-hassan-ii-crepuscule_pexels-2404046.jpg',
    grade: { brightness: 0.66, saturation: 0.85, contrast: 1.06, vignette: 0.5, top: 0.35, bottom: 0.4 },
    variants: { paysage: { crop: [0, 0.2, 1, 1], widths: [768, 1280, 1920, 2560] } },
  },
  {
    name: 'casablanca-nuit',
    src: 'ambiance/casablanca-hassan-ii-nuit-or_pexels-30463526.jpg',
    grade: { brightness: 0.82, saturation: 0.95, contrast: 1.04, vignette: 0.45, top: 0, bottom: 0.3 },
    variants: { portrait: { crop: [0, 0.08, 1, 1], widths: [768, 1280] } },
  },
];

const QUALITY = { webp: 72, avif: 50 };

const [rawDir, ...only] = process.argv.slice(2);
if (!rawDir) {
  console.error('usage: node scripts/export-photos.mjs <dossier des originaux> [nom…]');
  process.exit(1);
}
const OUT = path.resolve('public/photos');

/** Calque noir : vignette radiale et dégradés haut / bas, à la taille de l'image. */
function shade(width, height, { vignette = 0, top = 0, bottom = 0 }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <radialGradient id="v" cx="50%" cy="52%" r="75%">
      <stop offset="0.45" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="${vignette}"/>
    </radialGradient>
    <linearGradient id="t" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000" stop-opacity="${top}"/>
      <stop offset="0.42" stop-color="#000" stop-opacity="0"/>
      <stop offset="0.7" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="${bottom}"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#v)"/>
  <rect width="100%" height="100%" fill="url(#t)"/>
</svg>`;
  return Buffer.from(svg);
}

let total = 0;
for (const photo of PHOTOS) {
  if (only.length && !only.includes(photo.name)) continue;
  const file = path.join(rawDir, photo.src);
  const meta = await sharp(file).rotate().metadata();
  const W = meta.autoOrient?.width ?? meta.width;
  const H = meta.autoOrient?.height ?? meta.height;
  fs.mkdirSync(path.join(OUT, photo.name), { recursive: true });
  for (const [variant, { crop, widths }] of Object.entries(photo.variants)) {
    const left = Math.round(crop[0] * W);
    const topPx = Math.round(crop[1] * H);
    const width = Math.round((crop[2] - crop[0]) * W);
    const height = Math.round((crop[3] - crop[1]) * H);
    const { brightness, saturation, contrast = 1 } = photo.grade;
    // Étalonnage une fois, à la plus grande taille utile, puis réductions.
    const maxW = Math.min(Math.max(...widths), width);
    const maxH = Math.round((maxW * height) / width);
    const graded = await sharp(file)
      .rotate()
      .extract({ left, top: topPx, width, height })
      .resize(maxW)
      .modulate({ brightness, saturation })
      .linear(contrast, -(contrast - 1) * 128)
      .composite([{ input: shade(maxW, maxH, photo.grade) }])
      .toColourspace('srgb')
      .png()
      .toBuffer();
    for (const w of widths) {
      const base = sharp(graded).resize(Math.min(w, maxW));
      for (const format of ['webp', 'avif']) {
        const target = path.join(OUT, photo.name, `${variant}-${w}.${format}`);
        const pipeline = format === 'webp'
          ? base.clone().webp({ quality: QUALITY.webp, effort: 6, smartSubsample: true })
          : base.clone().avif({ quality: QUALITY.avif, effort: 5 });
        const info = await pipeline.toFile(target);
        total += info.size;
        console.log(`${photo.name}/${variant}-${w}.${format}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} Ko`);
      }
    }
    console.log(`  ${photo.name} ${variant} : ratio ${(width / height).toFixed(4)}`);
  }
}
console.log(`total ${(total / 1024 / 1024).toFixed(2)} Mo`);
