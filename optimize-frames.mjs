/**
 * Optimize frame images:
 * 1. Convert PNG → WebP (60-80% size reduction)
 * 2. Resize to max 1280px width (more than enough for most screens)
 * 3. Take every other frame (240 → 120 frames) for faster loading
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";

const INPUT_DIR = "./public/frames";
const OUTPUT_DIR = "./public/frames-webp";
const MAX_WIDTH = 1280;
const WEBP_QUALITY = 75;
const SKIP_FRAMES = 2; // Take every 2nd frame (240 → 120)

async function optimize() {
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all PNG frames sorted
  const files = fs
    .readdirSync(INPUT_DIR)
    .filter((f) => f.endsWith(".png"))
    .sort();

  console.log(`Found ${files.length} PNG frames`);
  console.log(`Taking every ${SKIP_FRAMES}th frame → ${Math.ceil(files.length / SKIP_FRAMES)} frames`);
  console.log(`Converting to WebP (quality: ${WEBP_QUALITY}, max width: ${MAX_WIDTH}px)\n`);

  let outputIndex = 1;
  let totalInputSize = 0;
  let totalOutputSize = 0;

  for (let i = 0; i < files.length; i += SKIP_FRAMES) {
    const inputPath = path.join(INPUT_DIR, files[i]);
    const outputName = `frame-${String(outputIndex).padStart(3, "0")}.webp`;
    const outputPath = path.join(OUTPUT_DIR, outputName);

    const inputSize = fs.statSync(inputPath).size;
    totalInputSize += inputSize;

    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);

    const outputSize = fs.statSync(outputPath).size;
    totalOutputSize += outputSize;

    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(0);
    process.stdout.write(
      `\r  [${outputIndex}/${Math.ceil(files.length / SKIP_FRAMES)}] ${files[i]} → ${outputName} (${(inputSize / 1024).toFixed(0)}KB → ${(outputSize / 1024).toFixed(0)}KB, -${reduction}%)`
    );

    outputIndex++;
  }

  console.log("\n");
  console.log("═══════════════════════════════════════");
  console.log(`  Input:  ${(totalInputSize / 1024 / 1024).toFixed(1)} MB (${Math.ceil(files.length / SKIP_FRAMES)} frames)`);
  console.log(`  Output: ${(totalOutputSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  Saved:  ${((1 - totalOutputSize / totalInputSize) * 100).toFixed(0)}%`);
  console.log("═══════════════════════════════════════");
}

optimize().catch(console.error);
