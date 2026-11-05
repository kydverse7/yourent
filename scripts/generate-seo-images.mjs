/**
 * Génère les icônes de l'application et la version WebP de la photo de Casablanca.
 * Usage : node scripts/generate-seo-images.mjs
 * Ne supprime ni ne renomme aucun fichier source.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const publicDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const file = (name) => path.join(publicDir, name);

const logo = file('logo-yourent.png');
const { width, height } = await sharp(logo).metadata();
console.log(`logo-yourent.png : ${width}x${height}`);

// Icônes carrées : le logo est centré sur fond noir de la marque, sans déformation.
for (const size of [192, 512]) {
  const inner = Math.round(size * 0.84);
  const resized = await sharp(logo).resize(inner, inner, { fit: 'inside' }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 3, background: { r: 10, g: 10, b: 10 } } })
    .composite([{ input: resized, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(file(`icon-${size}.png`));
  console.log(`icon-${size}.png écrit`);
}

const info = await sharp(file('image-casablanca.jpg'))
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 72 })
  .toFile(file('image-casablanca.webp'));
console.log(`image-casablanca.webp : ${info.width}x${info.height}, ${Math.round(info.size / 1024)} Ko`);
