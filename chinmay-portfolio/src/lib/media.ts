import cloudinaryMedia from "@/data/cloudinary-media.json";

type MediaManifest = Record<string, string>;

const mediaManifest = cloudinaryMedia as MediaManifest;

export function resolveMediaUrl(assetPath: string) {
  const normalizedPath = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return mediaManifest[normalizedPath] ?? normalizedPath;
}
