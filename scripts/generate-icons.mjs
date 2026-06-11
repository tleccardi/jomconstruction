// Genera favicons (recorte del isotipo del logo) e imagen Open Graph.
// Uso: node scripts/generate-icons.mjs
import sharp from 'sharp';

const LOGO = 'src/assets/logo-jom.png';
const PHOTO = 'src/assets/obra-aerea-panoramica.jpg';

// Recorte cuadrado centrado en los edificios del logo (sin el wordmark)
const mark = sharp(LOGO).extract({ left: 380, top: 60, width: 660, height: 660 });

// palette: true reduce mucho el peso (el logo es de colores planos)
const png = { compressionLevel: 9, palette: true, quality: 90 };
await mark.clone().resize(512, 512).png(png).toFile('public/icon-512.png');
await mark.clone().resize(192, 192).png(png).toFile('public/icon-192.png');
await mark.clone().resize(180, 180).png(png).toFile('public/apple-touch-icon.png');
await mark.clone().resize(48, 48).png(png).toFile('public/favicon.png');

// Open Graph 1200x630 a partir de la foto aérea de obra
await sharp(PHOTO).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 82 }).toFile('public/og-cover.jpg');

console.log('OK: favicons + og-cover generados en /public');
