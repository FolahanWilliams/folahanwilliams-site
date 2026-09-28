import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Whether an optional asset has actually been dropped into `public/`.
 * Checked on the server (at build time for these static pages), so a missing
 * headshot / recording never ships a request that 404s or a control that
 * can't work. Add the file, rebuild, and it lights up.
 */
export function hasPublicFile(path: string): boolean {
  return existsSync(join(process.cwd(), "public", path.replace(/^\//, "")));
}

const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

/**
 * The first image in a `public/` drop folder (alphabetical), as a URL path,
 * or undefined if there isn't one. Lets a photo be uploaded straight from a
 * phone via GitHub with whatever filename it already has.
 */
export function findPublicImage(dir: string): string | undefined {
  const clean = dir.replace(/^\/|\/$/g, "");
  const abs = join(process.cwd(), "public", clean);
  if (!existsSync(abs)) return undefined;
  const file = readdirSync(abs).filter((f) => IMAGE.test(f)).sort()[0];
  return file ? `/${clean}/${encodeURIComponent(file)}` : undefined;
}
