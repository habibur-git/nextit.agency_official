/**
 * Canonical slugify for URLs. Use this everywhere (blog, case-studies, portfolio, services).
 * Handles unicode (NFKD normalization, diacritics stripped).
 */
export function slugify(value: string): string {
  const s = typeof value === "string" ? value : "";
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[—–]/g, "-")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/** Normalize slug for lookup (e.g. URL param). Same as slugify but accepts optional string. */
export function normalizeSlug(s?: string): string {
  return slugify(s ?? "");
}
