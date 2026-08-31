import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const images = [
  ["foto-portada.jpg", "foto-portada.webp", 1400],
  ["foto-donde-comenzo.jpg", "foto-donde-comenzo.webp", 1400],
  ["foto-versiculo.jpg", "foto-versiculo.webp", 1400],
  ["foto-cierre.jpg", "foto-cierre.webp", 1400],
  ["sello-medieval-ol.png", "sello-medieval-ol.webp", 700],
];

await mkdir("public/optimized", { recursive: true });
for (const [input, output, width] of images) {
  await sharp(`assets-originales/${input}`).rotate().resize({ width, withoutEnlargement: true })
    .sharpen({ sigma: 0.7 }).webp({ quality: 84, effort: 6 })
    .toFile(`public/optimized/${output}`);
  console.log(`Optimizada: ${output}`);
}
