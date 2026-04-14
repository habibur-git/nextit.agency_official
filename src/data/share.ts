/**
 * Share options for blog posts. Add, remove, or reorder to change the share bar.
 * Each platform needs an id (for the icon map in the component) and a URL builder.
 */
export type SharePlatformId = "facebook" | "twitter" | "linkedin" | "whatsapp";

export interface ShareOption {
  id: SharePlatformId;
  label: string;
  getHref: (title: string, url: string) => string;
}

export const shareOptions: ShareOption[] = [
  {
    id: "facebook",
    label: "Share on Facebook",
    getHref: (_, url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "twitter",
    label: "Share on Twitter",
    getHref: (title, url) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    id: "linkedin",
    label: "Share on LinkedIn",
    getHref: (_, url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: "whatsapp",
    label: "Share on WhatsApp",
    getHref: (title, url) =>
      `https://wa.me/?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`,
  },
];
