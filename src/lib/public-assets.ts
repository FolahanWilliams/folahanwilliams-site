import { existsSync } from "node:fs";
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
