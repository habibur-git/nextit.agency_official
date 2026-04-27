import type { MetadataRoute } from "next";

const siteUrl = "https://NextIT.com";

const fetchCache = { next: { revalidate: 3600 } } as const;

function cmsBase(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_CMS_URL;
  if (!raw) return undefined;
  return raw.replace(/\/+$/, "");
}

type BlogSlugEntry = {
  slug: string;
  publishedAt?: string;
  lastUpdatedAt?: string;
};

async function fetchBlogEntriesForSitemap(): Promise<BlogSlugEntry[]> {
  const base = cmsBase();
  if (!base) return [];
  try {
    const res = await fetch(
      `${base}/api/blogs?limit=500&sort=-publishedAt&depth=0`,
      fetchCache,
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { docs?: BlogSlugEntry[] };
    const docs = Array.isArray(data.docs) ? data.docs : [];
    return docs
      .filter((d) => d.slug && typeof d.slug === "string")
      .map((d: BlogSlugEntry) => ({
        slug: d.slug,
        publishedAt: d.publishedAt,
        lastUpdatedAt: d.lastUpdatedAt,
      }));
  } catch {
    return [];
  }
}

async function fetchWorkSlugsForSitemap(): Promise<string[]> {
  const base = cmsBase();
  if (!base) return [];
  try {
    const res = await fetch(`${base}/api/work?limit=500&depth=0`, fetchCache);
    if (!res.ok) return [];
    const data = (await res.json()) as { docs?: { slug?: string }[] };
    const docs = Array.isArray(data.docs) ? data.docs : [];
    return docs
      .map((d) => d.slug)
      .filter((s): s is string => typeof s === "string" && s.length > 0);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const [blogEntries, workSlugs] = await Promise.all([
    fetchBlogEntriesForSitemap(),
    fetchWorkSlugsForSitemap(),
  ]);

  const blogPages: MetadataRoute.Sitemap = blogEntries.map((b) => ({
    url: `${siteUrl}/blog/${b.slug}`,
    lastModified: b.lastUpdatedAt
      ? new Date(b.lastUpdatedAt)
      : b.publishedAt
        ? new Date(b.publishedAt)
        : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const workPages: MetadataRoute.Sitemap = workSlugs.map((slug) => ({
    url: `${siteUrl}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages, ...workPages];
}
