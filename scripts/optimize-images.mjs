import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const IMG_DIR = "public/assets/img";
const MANIFEST_PATH = join(IMG_DIR, ".image-manifest.json");
const SUPPORTED_EXTS = new Set([".jpg", ".jpeg", ".png"]);

const JPG_QUALITY = 80;
const PNG_QUALITY = 80;
const PNG_EFFORT = 4;
const WEBP_QUALITY = 80;

async function loadManifest() {
  try {
    const data = await readFile(MANIFEST_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function saveManifest(manifest) {
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
}

async function walkDir(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkDir(fullPath)));
    } else if (SUPPORTED_EXTS.has(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function processImage(filePath, manifest) {
  const info = await stat(filePath);
  const key = filePath;
  const originalSize = info.size;

  // After in-place compression, the file on disk has compressedSize.
  // Skip if current file size matches the compressed size from a previous run.
  if (manifest[key] && manifest[key].compressedSize === originalSize) {
    return { skipped: true };
  }

  const ext = extname(filePath).toLowerCase();
  const buffer = await readFile(filePath);
  let compressed;

  if (ext === ".jpg" || ext === ".jpeg") {
    compressed = await sharp(buffer)
      .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
      .toBuffer();
  } else if (ext === ".png") {
    compressed = await sharp(buffer)
      .png({ quality: PNG_QUALITY, effort: PNG_EFFORT })
      .toBuffer();
  }

  await writeFile(filePath, compressed);
  const compressedSize = compressed.length;

  // Generate WebP sibling if it doesn't already exist
  const name = basename(filePath, extname(filePath));
  const dir = filePath.substring(0, filePath.lastIndexOf("/"));
  const webpPath = join(dir, `${name}.webp`);
  let webpSize = null;
  let webpGenerated = false;

  try {
    await stat(webpPath);
    // WebP already exists, don't overwrite
  } catch {
    const webpBuffer = await sharp(buffer)
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();
    await writeFile(webpPath, webpBuffer);
    webpSize = webpBuffer.length;
    webpGenerated = true;
  }

  manifest[key] = { originalSize, compressedSize, webpSize };

  return {
    skipped: false,
    originalSize,
    compressedSize,
    webpGenerated,
    savings: originalSize - compressedSize,
  };
}

async function main() {
  console.log("Image optimization starting...\n");

  const files = await walkDir(IMG_DIR);
  const manifest = await loadManifest();

  let processed = 0;
  let skipped = 0;
  let webpCount = 0;
  let totalSavings = 0;

  for (const file of files) {
    const result = await processImage(file, manifest);
    if (result.skipped) {
      skipped++;
    } else {
      processed++;
      totalSavings += result.savings;
      if (result.webpGenerated) webpCount++;
      const pct = ((result.savings / result.originalSize) * 100).toFixed(1);
      console.log(
        `  Compressed: ${file} (${formatBytes(result.originalSize)} -> ${formatBytes(result.compressedSize)}, -${pct}%)`,
      );
    }
  }

  await saveManifest(manifest);

  console.log(`\nDone!`);
  console.log(`  Processed: ${processed}`);
  console.log(`  Skipped (unchanged): ${skipped}`);
  console.log(`  WebP generated: ${webpCount}`);
  console.log(`  Total savings: ${formatBytes(totalSavings)}`);
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

main().catch((err) => {
  console.error("Image optimization failed:", err);
  process.exit(1);
});
