/**
 * <title> helpers. The root layout appends " · Onker Home" (13 chars), so the
 * page part is capped at 47 to keep the full title within ~60 characters —
 * Google's display limit and Semrush's "too long" threshold.
 */
const MAX_PAGE_TITLE = 47;

/** True when a string is mostly upper-case letters (an ALL-CAPS headline). */
function isShouting(s: string): boolean {
  const letters = s.replace(/[^\p{L}]/gu, "");
  if (letters.length < 8) return false;
  const upper = letters.replace(/[^\p{Lu}]/gu, "").length;
  return upper / letters.length > 0.7;
}

/** "FONDOS DE INVERSIÓN SUPERAN" → "Fondos de inversión superan". */
function sentenceCase(s: string): string {
  const lower = s.toLocaleLowerCase("es");
  return lower.charAt(0).toLocaleUpperCase("es") + lower.slice(1);
}

/** Cuts at a word boundary and appends an ellipsis when over the limit. */
export function clampTitle(s: string, max = MAX_PAGE_TITLE): string {
  const clean = s.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const at = cut.lastIndexOf(" ");
  return `${(at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[\s,;:·|-]+$/, "")}…`;
}

/**
 * Listing names sometimes carry a " | price / size" suffix
 * ("Solar en Venta en Las Palmas, Cap Cana | US$998,000"). The suffix and the
 * location chain stay in the description; the title keeps the name only.
 */
export function listingTitle(name: string): string {
  return clampTitle(name.split(" | ")[0]);
}

export function articleTitle(title: string): string {
  return clampTitle(isShouting(title) ? sentenceCase(title) : title);
}
