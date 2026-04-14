/** Digits only, with country code (no +). Override with NEXT_PUBLIC_WHATSAPP_NUMBER. */
const DEFAULT_NUMBER = "8801956463736";

export function getWhatsappBusinessDigits(): string {
  const fromEnv =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "")
      : undefined;
  return fromEnv || DEFAULT_NUMBER;
}

/**
 * Opens WhatsApp (app or web) for this number. Uses wa.me — official and works on mobile + desktop.
 * Optional pre-filled message after the chat opens.
 */
export function whatsappChatUrl(prefill?: string): string {
  const n = getWhatsappBusinessDigits();
  if (!n) {
    return "https://wa.me/";
  }
  const base = `https://wa.me/${n}`;
  if (prefill?.trim()) {
    return `${base}?text=${encodeURIComponent(prefill.trim())}`;
  }
  return base;
}
