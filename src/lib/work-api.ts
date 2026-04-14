/**
 * Fetch Work (portfolio) items from Payload CMS and normalize for the website.
 */

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

/** Normalized work item for list/cards and filters (id can be string from CMS). */
export type WorkListItem = {
  id: string;
  title: string;
  slug: string;
  /** When true, portfolio links use `liveview` instead of /work/[slug]. */
  useLiveViewURL?: boolean;
  company: string;
  category: string;
  industry?: string;
  coverImage: string;
  liveview?: string;
  timelines?: string;
  service: string[];
};

/** Grid item: choose image, text, or both. */
export type WorkLayoutCardItem = {
  itemType: "image" | "text" | "both";
  image?: string;
  content?: unknown;
};

/** Layout block inside a section (no section-level options; those are on the section). */
export type WorkLayoutBlock = {
  blockType: "richText" | "image" | "quote" | "code" | "grid";
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any;
  image?: { url?: string };
  caption?: string;
  text?: string;
  author?: string;
  code?: string;
  columns?: string;
  items?: WorkLayoutCardItem[];
};

/** Section: container + background options, then multiple layout blocks. */
export type WorkSection = {
  container?: boolean;
  useBackgroundColor?: boolean;
  backgroundColor?: string;
  layout: WorkLayoutBlock[];
};

/** Hero config for work detail page (same shape as blog hero). */
export type WorkHero = {
  backgroundType: "image" | "color";
  backgroundImage?: string;
  colorMode?: "solid" | "gradient";
  solidColor?: string;
  gradientDirectionType?: "preset" | "angle";
  gradientDirection?: "top" | "right" | "bottom" | "left";
  gradientAngle?: number;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
};

/** Normalized work item for detail page (full content). */
export type WorkDetailItem = WorkListItem & {
  keywords: string[];
  sections: WorkSection[];
  seo?: { metaTitle?: string; metaDescription?: string };
  hero?: WorkHero;
};

/** Minimal item for prev/next navigation. */
export type WorkNavItem = { id: string; slug: string; title: string };

function getMediaUrl(url: string | undefined): string {
  if (!url || typeof url !== "string") return "";
  return url.startsWith("http") ? url : CMS_URL ? `${CMS_URL}${url}` : url;
}

/** Raw shape from Payload API (depth=1 populates uploads). */
type WorkDocRaw = {
  id: string;
  title: string;
  slug: string;
  company: string;
  category: string;
  industry?: string;
  coverImage?: { url?: string } | number | null;
  liveview?: string;
  timelineStart?: string;
  timelineEnd?: string;
  service?: (string | { name: string })[];
  useLiveViewURL?: boolean;
  keywords?: { keyword: string }[];
  /** New structure: sections with container/background and nested layout blocks */
  sections?: {
    container?: boolean;
    useBackgroundColor?: boolean;
    backgroundColor?: string;
    layout?: {
      blockType: string;
      id?: string;
      content?: unknown;
      image?: { url?: string };
      caption?: string;
      text?: string;
      author?: string;
      code?: string;
      columns?: string;
      items?: {
        itemType?: string;
        image?: { url?: string };
        content?: unknown;
      }[];
    }[];
  }[];
  /** Legacy flat layout (migrated to a single section when sections is empty) */
  layout?: {
    blockType: string;
    id?: string;
    content?: unknown;
    image?: { url?: string };
    caption?: string;
    text?: string;
    author?: string;
    code?: string;
    container?: boolean;
    useBackgroundColor?: boolean;
    backgroundColor?: string;
    columns?: string;
    items?: {
      itemType?: string;
      image?: { url?: string };
      content?: unknown;
    }[];
  }[];
  seo?: { metaTitle?: string; metaDescription?: string };
  hero?: {
    backgroundType?: "image" | "color";
    backgroundImage?: { url?: string } | number | null;
    colorMode?: "solid" | "gradient";
    solidColor?: string;
    gradientDirectionType?: "preset" | "angle";
    gradientDirection?: "top" | "right" | "bottom" | "left";
    gradientAngle?: number;
    gradientFrom?: string;
    gradientVia?: string;
    gradientTo?: string;
  };
};

function formatTimelineDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function normalizeServices(
  raw: WorkDocRaw["service"],
): string[] {
  if (!raw || !Array.isArray(raw)) return [];
  const out: string[] = [];
  for (const entry of raw) {
    if (typeof entry === "string") {
      const t = entry.trim();
      if (t) out.push(t);
    } else if (
      entry &&
      typeof entry === "object" &&
      "name" in entry &&
      typeof (entry as { name: string }).name === "string"
    ) {
      const t = (entry as { name: string }).name.trim();
      if (t) out.push(t);
    }
  }
  return out;
}

function buildTimelines(doc: WorkDocRaw): string | undefined {
  const start = doc.timelineStart;
  const end = doc.timelineEnd;
  if (start && end) {
    return `${formatTimelineDate(start)} – ${formatTimelineDate(end)}`;
  }
  if (start) return formatTimelineDate(start);
  if (end) return formatTimelineDate(end);
  return undefined;
}

function mapDocToList(doc: WorkDocRaw): WorkListItem {
  const cover = doc.coverImage;
  const coverUrl =
    cover && typeof cover === "object" && cover.url
      ? getMediaUrl(cover.url)
      : "";
  return {
    id: String(doc.id),
    title: doc.title,
    slug: doc.slug,
    useLiveViewURL: doc.useLiveViewURL === true,
    company: doc.company,
    category: doc.category,
    industry: doc.industry,
    coverImage: coverUrl,
    liveview: doc.liveview,
    timelines: buildTimelines(doc),
    service: normalizeServices(doc.service),
  };
}

type RawBlock = {
  blockType: string;
  id?: string;
  content?: unknown;
  image?: { url?: string };
  caption?: string;
  text?: string;
  author?: string;
  code?: string;
  columns?: string;
  items?: { itemType?: string; image?: { url?: string }; content?: unknown }[];
};

function mapBlockToLayoutBlock(block: RawBlock): WorkLayoutBlock | null {
  if (!["richText", "image", "quote", "code", "grid"].includes(block.blockType))
    return null;
  const base = {
    blockType: block.blockType as WorkLayoutBlock["blockType"],
    id: block.id,
  };
  if (block.blockType === "richText")
    return { ...base, content: block.content };
  if (block.blockType === "image") {
    const img = block.image;
    const url =
      img && typeof img === "object" && img.url
        ? getMediaUrl(img.url)
        : undefined;
    return {
      ...base,
      image: url ? { url } : undefined,
      caption: block.caption,
    };
  }
  if (block.blockType === "quote")
    return { ...base, text: block.text, author: block.author };
  if (block.blockType === "code") return { ...base, code: block.code };
  if (block.blockType === "grid") {
    const items: WorkLayoutCardItem[] = (block.items ?? []).map((item) => {
      const itemType = (
        item.itemType === "image" ||
        item.itemType === "text" ||
        item.itemType === "both"
          ? item.itemType
          : "both"
      ) as WorkLayoutCardItem["itemType"];
      const imageUrl =
        item.image && typeof item.image === "object" && item.image.url
          ? getMediaUrl(item.image.url)
          : undefined;
      return {
        itemType,
        image: itemType === "text" ? undefined : imageUrl,
        content: itemType === "image" ? undefined : item.content,
      };
    });
    return { ...base, columns: block.columns ?? "3", items };
  }
  return base as WorkLayoutBlock;
}

function buildSections(doc: WorkDocRaw): WorkSection[] {
  if (doc.sections && doc.sections.length > 0) {
    return doc.sections.map((sec) => {
      const layout: WorkLayoutBlock[] = (sec.layout ?? [])
        .map((b) => mapBlockToLayoutBlock(b as RawBlock))
        .filter((b): b is WorkLayoutBlock => b != null);
      return {
        container: sec.container !== false,
        useBackgroundColor: sec.useBackgroundColor === true,
        backgroundColor: sec.useBackgroundColor
          ? sec.backgroundColor
          : undefined,
        layout,
      };
    });
  }
  // Legacy: flat layout → single section
  const layout: WorkLayoutBlock[] = (doc.layout ?? [])
    .map((b) => mapBlockToLayoutBlock(b as RawBlock))
    .filter((b): b is WorkLayoutBlock => b != null);
  if (layout.length === 0) return [];
  return [
    {
      container: true,
      useBackgroundColor: false,
      layout,
    },
  ];
}

function mapDocToDetail(doc: WorkDocRaw): WorkDetailItem {
  const list = mapDocToList(doc);
  const sections = buildSections(doc);
  const hero: WorkHero | undefined = doc.hero
    ? {
        backgroundType: doc.hero.backgroundType ?? "color",
        backgroundImage:
          doc.hero.backgroundImage &&
          typeof doc.hero.backgroundImage === "object" &&
          doc.hero.backgroundImage.url
            ? getMediaUrl(doc.hero.backgroundImage.url)
            : undefined,
        colorMode: doc.hero.colorMode,
        solidColor: doc.hero.solidColor,
        gradientDirectionType: doc.hero.gradientDirectionType,
        gradientDirection: doc.hero.gradientDirection,
        gradientAngle: doc.hero.gradientAngle,
        gradientFrom: doc.hero.gradientFrom,
        gradientVia: doc.hero.gradientVia,
        gradientTo: doc.hero.gradientTo,
      }
    : undefined;

  return {
    ...list,
    keywords: (doc.keywords ?? []).map((k) => k.keyword),
    sections,
    seo: doc.seo,
    hero,
  };
}

export async function fetchWorkList(): Promise<WorkListItem[]> {
  const base = CMS_URL;
  if (!base) {
    console.error("NEXT_PUBLIC_CMS_URL is not set");
    return [];
  }
  try {
    const res = await fetch(
      `${base}/api/work?limit=100&depth=1&sort=-createdAt`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) {
      console.error(
        "Failed to fetch work from CMS",
        res.status,
        res.statusText,
      );
      return [];
    }
    const data = await res.json();
    const docs = Array.isArray(data.docs) ? data.docs : [];
    return docs.map((doc: WorkDocRaw) => mapDocToList(doc));
  } catch (error) {
    console.error("Error fetching work from CMS", error);
    return [];
  }
}

export async function fetchWorkBySlug(
  slug: string,
): Promise<WorkDetailItem | null> {
  const base = CMS_URL;
  if (!base) return null;
  try {
    const url = `${base}/api/work?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=1`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const docs = Array.isArray(data.docs) ? data.docs : [];
    const doc = docs[0] as WorkDocRaw | undefined;
    return doc ? mapDocToDetail(doc) : null;
  } catch (error) {
    console.error("Error fetching work by slug", error);
    return null;
  }
}

/** Fetch minimal list for prev/next navigation (id, slug, title). */
export async function fetchWorkSlugs(): Promise<WorkNavItem[]> {
  const base = CMS_URL;
  if (!base) return [];
  try {
    const res = await fetch(`${base}/api/work?limit=500&depth=0`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    const docs = Array.isArray(data.docs) ? data.docs : [];
    return docs.map((d: { id: string; slug: string; title: string }) => ({
      id: String(d.id),
      slug: d.slug,
      title: d.title,
    }));
  } catch (error) {
    console.error("Error fetching work slugs", error);
    return [];
  }
}
