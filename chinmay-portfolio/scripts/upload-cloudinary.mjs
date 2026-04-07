import { createHash } from "node:crypto";
import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const cwd = process.cwd();
const publicDir = path.join(cwd, "public");
const manifestPath = path.join(cwd, "src", "data", "cloudinary-media.json");

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const uploadPrefix = (process.env.CLOUDINARY_UPLOAD_PREFIX ?? "chinmay-portfolio").trim();
const forceUpload = process.argv.includes("--force");

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);
const videoExtensions = new Set([".mp4", ".mov", ".webm", ".m4v"]);

function ensureEnv() {
  const missing = [
    ["CLOUDINARY_CLOUD_NAME", cloudName],
    ["CLOUDINARY_API_KEY", apiKey],
    ["CLOUDINARY_API_SECRET", apiSecret],
  ].filter(([, value]) => !value);

  if (missing.length > 0) {
    const vars = missing.map(([key]) => key).join(", ");
    throw new Error(`Missing Cloudinary environment variables: ${vars}`);
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }

      return [fullPath];
    })
  );

  return files.flat();
}

function getResourceType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (imageExtensions.has(extension)) return "image";
  if (videoExtensions.has(extension)) return "video";
  return null;
}

function toAssetPath(filePath) {
  return `/${path.relative(publicDir, filePath).split(path.sep).join("/")}`;
}

function sanitizeSegment(segment) {
  return segment
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildPublicId(assetPath) {
  const withoutExtension = assetPath.replace(/^\//, "").replace(/\.[^.]+$/, "");
  const normalized = withoutExtension
    .split("/")
    .map(sanitizeSegment)
    .filter(Boolean)
    .join("/");

  return [sanitizeSegment(uploadPrefix), normalized].filter(Boolean).join("/");
}

function signUpload(params) {
  const payload = Object.entries(params)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
}

async function uploadAsset(filePath) {
  const resourceType = getResourceType(filePath);
  if (!resourceType) return null;

  const assetPath = toAssetPath(filePath);
  const publicId = buildPublicId(assetPath);
  const timestamp = Math.floor(Date.now() / 1000);
  const params = {
    overwrite: "true",
    public_id: publicId,
    timestamp: String(timestamp),
  };

  const signature = signUpload(params);
  const fileBuffer = await readFile(filePath);
  const form = new FormData();

  form.set("file", new Blob([fileBuffer]), path.basename(filePath));
  form.set("api_key", apiKey);
  form.set("timestamp", String(timestamp));
  form.set("public_id", publicId);
  form.set("overwrite", "true");
  form.set("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Upload failed for ${assetPath}: ${details}`);
  }

  const payload = await response.json();
  return {
    assetPath,
    secureUrl: payload.secure_url,
  };
}

async function loadManifest() {
  try {
    const raw = await readFile(manifestPath, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function main() {
  ensureEnv();

  const files = (await walk(publicDir))
    .filter((filePath) => getResourceType(filePath))
    .sort((left, right) => left.localeCompare(right));

  const manifest = await loadManifest();
  let uploaded = 0;
  let skipped = 0;

  for (const filePath of files) {
    const assetPath = toAssetPath(filePath);

    if (manifest[assetPath] && !forceUpload) {
      skipped += 1;
      console.log(`skip ${assetPath}`);
      continue;
    }

    const fileInfo = await stat(filePath);
    console.log(`upload ${assetPath} (${(fileInfo.size / 1024 / 1024).toFixed(2)} MB)`);

    const result = await uploadAsset(filePath);
    if (!result) continue;

    manifest[result.assetPath] = result.secureUrl;
    uploaded += 1;
  }

  const sortedManifest = Object.fromEntries(
    Object.entries(manifest).sort(([left], [right]) => left.localeCompare(right))
  );

  await writeFile(manifestPath, `${JSON.stringify(sortedManifest, null, 2)}\n`, "utf8");

  console.log(`done: uploaded ${uploaded}, skipped ${skipped}`);
  console.log(`manifest updated at ${manifestPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
