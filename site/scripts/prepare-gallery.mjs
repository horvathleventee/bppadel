import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = path.resolve("..", "galeria kepek");
const outputDir = path.resolve("public", "images", "gallery");
const photos = (await readdir(sourceDir))
  .filter((name) => /\.jpe?g$/i.test(name))
  .sort((a, b) => a.localeCompare(b, "en"));

await mkdir(outputDir, { recursive: true });

for (const [index, photo] of photos.entries()) {
  const output = `gallery-${String(index + 1).padStart(2, "0")}.webp`;
  await sharp(path.join(sourceDir, photo))
    .resize(1920, 1080, { fit: "cover", position: "attention" })
    .webp({ quality: 82, effort: 5 })
    .toFile(path.join(outputDir, output));
  console.log(`${photo} -> ${output}`);
}

console.log(`Prepared ${photos.length} 1920×1080 WebP gallery photos.`);
