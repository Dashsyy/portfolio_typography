/** Keep leading +, drop everything else that isn't a digit */
export function normalizeForTelHref(raw: string) {
  const trimmed = raw.trim();
  // Remove any non-digits, except allow a single leading +
  const keptPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/[^\d]/g, ""); // only digits
  return keptPlus ? `+${digits}` : digits;
}
