/* eslint-disable @next/next/no-img-element */
// src/app/blog/[slug]/page.tsx

import BlogPageMotion from "@/components/blog/BlogPageMotion";
import BlogToc from "@/components/blog/BlogToc";
import ShareButtons from "@/components/blog/ShareButtons";
import { ModuleTitle } from "@/components/common/ModuleTitle";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { getMinRead } from "@/lib/blog-utils";
import { lexicalToHtml, lexicalToPlainText } from "@/lib/lexical-to-html";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoTwitter, IoMailOutline } from "react-icons/io5";

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

export const dynamic = "force-dynamic";

type BlogSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  coverImage?: { url?: string } | number | null;
};

type LayoutBlock = {
  blockType: "hero" | "richText" | "image" | "quote";
  heading?: string;
  subheading?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any;
  image?: { url: string };
  caption?: string;
  text?: string;
  author?: string;
};

type BlogDoc = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  lastUpdatedAt?: string;
  coverImage?: { url?: string } | number | null;
  hero?: {
    backgroundType?: "image" | "color";
    backgroundImage?: { url: string };
    colorMode?: "solid" | "gradient";
    solidColor?: string;
    gradientDirectionType?: "preset" | "angle";
    gradientDirection?: "top" | "right" | "bottom" | "left";
    gradientAngle?: number;
    gradientFrom?: string;
    gradientVia?: string;
    gradientTo?: string;
  };
  author?: {
    name: string;
    title?: string;
    image?: { url: string };
    linkedinUrl?: string;
    email?: string;
    isFactChecked?: boolean;
  };
  layout: LayoutBlock[];
  seo?: { metaTitle?: string; metaDescription?: string };
};

function formatPostedDate(isoDate?: string): string {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

function formatHeroDate(isoDate?: string): string {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function getTocEntries(layout: LayoutBlock[]): { id: string; label: string }[] {
  return layout
    .map((block, i) => {
      if (block.blockType === "hero" && block.heading) {
        return { id: `section-${i}`, label: block.heading };
      }
      if (block.blockType === "quote" && block.text) {
        const short =
          block.text.slice(0, 40).trim() + (block.text.length > 40 ? "…" : "");
        return { id: `section-${i}`, label: short };
      }
      return null;
    })
    .filter((x): x is { id: string; label: string } => x !== null);
}

function getWordCount(blog: BlogDoc): number {
  const parts: string[] = [];
  if (blog.title) parts.push(blog.title);
  if (blog.excerpt) parts.push(blog.excerpt);
  for (const block of blog.layout ?? []) {
    if (block.blockType === "hero") {
      if (block.heading) parts.push(block.heading);
      if (block.subheading) parts.push(block.subheading);
    } else if (block.blockType === "richText" && block.content) {
      parts.push(lexicalToPlainText(block.content));
    } else if (block.blockType === "quote" && block.text) {
      parts.push(block.text);
    }
  }
  const text = parts.join(" ");
  return text.trim().split(/\s+/).filter(Boolean).length;
}

async function fetchBlog(slug: string): Promise<BlogDoc | null> {
  if (!CMS_URL) {
    console.error("NEXT_PUBLIC_CMS_URL is not set");
    return null;
  }

  try {
    const url = `${CMS_URL}/api/blogs?where[slug][equals]=${encodeURIComponent(
      slug,
    )}&limit=1&depth=1`;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      console.error(
        "Failed to fetch blog from CMS",
        res.status,
        res.statusText,
      );
      return null;
    }

    const data = await res.json();

    const docs = Array.isArray((data as { docs?: BlogDoc[] }).docs)
      ? (data as { docs: BlogDoc[] }).docs
      : [];

    return docs[0] ?? null;
  } catch (error) {
    console.error("Error fetching blog from CMS", error);
    return null;
  }
}

function getCoverImageFullUrl(blog: BlogDoc): string | undefined {
  const cover = blog.coverImage;
  if (!cover || typeof cover === "number") return undefined;
  const url = (cover as { url?: string }).url;
  if (!url || typeof url !== "string") return undefined;
  return url.startsWith("http")
    ? url
    : CMS_URL
      ? `${CMS_URL}${url}`
      : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlog(slug);
  if (!blog) return { title: "Blog not found" };

  const title = blog.seo?.metaTitle || blog.title;
  const description = blog.seo?.metaDescription || blog.excerpt || undefined;
  const canonical = `/blog/${slug}`;
  const ogImage = getCoverImageFullUrl(blog);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description: description ?? undefined,
      url: canonical,
      type: "article",
      publishedTime: blog.publishedAt ?? undefined,
      modifiedTime: blog.lastUpdatedAt ?? undefined,
      authors: blog.author?.name ? [blog.author.name] : undefined,
      images: ogImage ? [{ url: ogImage, alt: blog.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description ?? undefined,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

function getCoverImageUrl(blog: BlogSummary): string | null {
  const cover = blog.coverImage;
  if (!cover || typeof cover === "number") return null;
  const url = cover.url;
  if (!url || typeof url !== "string") return null;
  if (url.startsWith("http")) return url;
  return CMS_URL ? `${CMS_URL}${url}` : url;
}

async function fetchBlogs(): Promise<BlogSummary[]> {
  const base = process.env.NEXT_PUBLIC_CMS_URL;

  if (!base) {
    console.error("NEXT_PUBLIC_CMS_URL is not set");
    return [];
  }

  try {
    const res = await fetch(`${base}/api/blogs?sort=-publishedAt&depth=1`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(
        "Failed to fetch blogs from CMS",
        res.status,
        res.statusText,
      );
      return [];
    }

    const data = await res.json();
    const docs = Array.isArray((data as { docs?: BlogSummary[] }).docs)
      ? (data as { docs: BlogSummary[] }).docs
      : [];

    return docs;
  } catch (error) {
    console.error("Error fetching blogs from CMS", error);
    return [];
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await fetchBlog(slug);
  if (!blog) {
    // If you prefer a 404 instead of blank:
    // notFound();
    return (
      <>
        <Header variant="white" />
        <main className="space">
          <div className="container">
            <h1 className="text-h3">Blog not found</h1>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const tocEntries = getTocEntries(blog.layout);
  const postedFormatted = formatPostedDate(blog.publishedAt);
  const updatedFormatted = formatPostedDate(blog.lastUpdatedAt);
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const currentUrl = `${protocol}://${host}/blog/${slug}`;

  const breadcrumbTitle = blog.title.toUpperCase();

  const hero = blog.hero;
  const bgType = hero?.backgroundType ?? "color";
  const hasBgImage =
    bgType === "image" && Boolean(hero?.backgroundImage?.url && CMS_URL);

  const isGradient =
    bgType === "color" && (hero?.colorMode === "gradient" || !hero?.colorMode);
  const gradientDirection =
    hero?.gradientDirectionType === "angle"
      ? `${hero?.gradientAngle ?? 90}deg`
      : `to ${hero?.gradientDirection ?? "right"}`;
  const from = hero?.gradientFrom ?? "#0c1929";
  const via = hero?.gradientVia;
  const to = hero?.gradientTo ?? "#000000";
  const gradientStyle = isGradient
    ? via
      ? {
          background: `linear-gradient(${gradientDirection}, ${from}, ${via}, ${to})`,
        }
      : {
          background: `linear-gradient(${gradientDirection}, ${from}, ${to})`,
        }
    : { background: hero?.solidColor ?? "#0c1929" };

  const blogs = await fetchBlogs();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.seo?.metaDescription || blog.excerpt,
    image: getCoverImageFullUrl(blog),
    datePublished: blog.publishedAt,
    dateModified: blog.lastUpdatedAt || blog.publishedAt,
    author: blog.author?.name
      ? {
          "@type": "Person",
          name: blog.author.name,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "NextIT",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": currentUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <Header variant="white" />
      <main>
        {/* Hero */}
        <section className="relative w-full overflow-hidden py-16 pt-46 bg-linear-to-l from-[#000000] to-[#5659e1]">
          {hasBgImage && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${CMS_URL}${hero!.backgroundImage!.url})`,
              }}
            />
          )}
          {bgType === "color" && (
            <div className="absolute inset-0" style={gradientStyle} />
          )}
          <div className="container relative z-10">
            <nav
              className="text-xs font-medium tracking-wider text-white/80 uppercase mb-6"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white/90">{breadcrumbTitle}</span>
            </nav>
            <h1 className="text-white leading-tight max-w-6xl">{blog.title}</h1>

            {/* Meta strip: date • category • author | Read Time badge */}
            <div className="mt-6 pt-6 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-white/80">
                {blog.publishedAt && (
                  <time dateTime={blog.publishedAt}>
                    {formatHeroDate(blog.publishedAt)}
                  </time>
                )}
                {blog.category && (
                  <>
                    {blog.publishedAt && (
                      <span className="mx-2" aria-hidden>
                        •
                      </span>
                    )}
                    <span>{blog.category}</span>
                  </>
                )}
                {(blog.publishedAt || blog.category) && (
                  <span className="mx-2" aria-hidden>
                    •
                  </span>
                )}
                <span className="text-white/80">
                  By {blog.author?.name ?? "NextIT Team"}
                </span>
              </p>
              <span className="shrink-0 px-3 py-1.5 rounded-md bg-white/10 text-white text-sm font-medium">
                Read Time: {getMinRead(getWordCount(blog))} Min
              </span>
            </div>
          </div>
        </section>

        <section className="space">
          <div className="container">
            <BlogPageMotion>
              <div className="grid gap-12 lg:grid-cols-[auto_1fr_280px] lg:gap-16">
                <aside className="order-2 lg:order-1 lg:sticky lg:top-28 lg:self-start">
                  <ShareButtons title={blog.title} url={currentUrl} />
                </aside>
                <article
                  id="blog-article"
                  className="min-w-0 order-1 lg:order-2"
                >
                  {/* Author & dates */}
                  {(blog.author?.name || postedFormatted) && (
                    <div className="mb-8">
                      {blog.author?.name && (
                        <div className="flex flex-wrap items-center gap-3 gap-y-2 mb-4">
                          {blog.author.image?.url && (
                            <img
                              src={`${CMS_URL || ""}${blog.author.image.url}`}
                              alt={blog.author.name}
                              className="w-14 h-14 rounded-full object-cover border border-border shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mt-0.5">
                              <div>
                                <p className="text-sm text-desc mb-2">
                                  Written by: {blog.author.title || "Author"}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 mt-0.5">
                                  <span className="font-semibold text-title">
                                    {blog.author.name}
                                  </span>
                                  {blog.author.isFactChecked && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-black text-white">
                                      Fact checked
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 ml-auto">
                                {blog.author.linkedinUrl && (
                                  <a
                                    href={blog.author.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-theme hover:bg-secondary text-[20px] w-12 h-12 flex items-center justify-center rounded-full bg-bg transition-colors"
                                    aria-label="LinkedIn"
                                  >
                                    <FaLinkedinIn className="w-5 h-5" />
                                  </a>
                                )}
                                {blog.author.email && (
                                  <a
                                    href={`mailto:${blog.author.email}`}
                                    className="text-theme hover:bg-secondary text-[20px] w-12 h-12 flex items-center justify-center rounded-full bg-bg transition-colors"
                                    aria-label="Email"
                                  >
                                    <IoMailOutline className="w-5 h-5" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {(postedFormatted || updatedFormatted) && (
                        <>
                          <hr className="border-border my-4" />
                          <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 text-sm text-desc">
                            {postedFormatted && (
                              <span>Posted: {postedFormatted}</span>
                            )}
                            {updatedFormatted && (
                              <span>Updated: {updatedFormatted}</span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  <div
                    id="blog-reading-area"
                    className="prose prose-lg max-w-none"
                  >
                    {blog.layout.map((block, i) => {
                      const sectionId = `section-${i}`;
                      switch (block.blockType) {
                        case "hero":
                          return (
                            <section
                              key={i}
                              id={sectionId}
                              className="scroll-mt-24 mb-10"
                            >
                              {block.heading && (
                                <h2 className="text-h4 md:text-h3 text-title mb-2">
                                  {block.heading}
                                </h2>
                              )}
                              {block.subheading && (
                                <p className="text-desc text-base">
                                  {block.subheading}
                                </p>
                              )}
                            </section>
                          );
                        case "richText": {
                          const richHtml = lexicalToHtml(block.content);
                          return (
                            <section
                              key={i}
                              id={sectionId}
                              className="scroll-mt-24 prose prose-lg max-w-none mb-6 text-desc leading-relaxed"
                            >
                              {richHtml ? (
                                <div
                                  className="[&_a]:text-theme [&_a]:underline [&_h1]:text-h4 [&_h2]:text-h5 [&_h3]:text-h6 [&_p]:mb-4"
                                  dangerouslySetInnerHTML={{ __html: richHtml }}
                                />
                              ) : null}
                            </section>
                          );
                        }
                        case "image":
                          return (
                            <figure key={i} className="my-8">
                              <img
                                src={
                                  block.image?.url
                                    ? `${CMS_URL || ""}${block.image.url}`
                                    : ""
                                }
                                alt={block.caption || ""}
                                className="rounded-2xl w-full border border-border"
                              />
                              {block.caption && (
                                <figcaption className="text-xs text-desc mt-2">
                                  {block.caption}
                                </figcaption>
                              )}
                            </figure>
                          );
                        case "quote":
                          return (
                            <blockquote
                              key={i}
                              id={sectionId}
                              className="scroll-mt-24 border-l-4 border-theme pl-4 py-2 my-6 italic text-desc text-base"
                            >
                              {block.text}
                              {block.author && (
                                <div className="mt-2 text-sm font-semibold text-title">
                                  — {block.author}
                                </div>
                              )}
                            </blockquote>
                          );
                        default:
                          return null;
                      }
                    })}
                  </div>
                  {/* Author Section */}
                  <div className="mt-12 py-8 border-y border-border">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      {/* Avatar */}
                      <div className="col-span-12 sm:col-span-2">
                        <Image
                          src="/assets/img/team/Founder.webp"
                          width={100}
                          height={100}
                          alt="Author"
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="col-span-12 sm:col-span-10 w-full">
                        <div className="w-full">
                          <p className="text-sm mb-1">About The Author</p>
                          <h5 className="font-bold">Mahfuzur Rahman</h5>
                          <p className="text-sm mt-2">Founder & CEO</p>
                        </div>

                        <p className="mt-6">
                          I make sure our clients get the high-quality result
                          from the beginning stage of the idea discovery &
                          strategy to the final digital product.
                        </p>

                        <div className="flex items-center gap-4 mt-8">
                          <Link
                            href="https://www.linkedin.com/in/mahfuzuruiux/"
                            target="_blank"
                            className="text-theme hover:bg-secondary text-[20px] w-12 h-12 flex items-center justify-center rounded-full bg-bg"
                          >
                            <FaLinkedinIn />
                          </Link>
                          <Link
                            href=""
                            target="_blank"
                            className="text-theme hover:bg-secondary text-[20px] w-12 h-12 flex items-center justify-center rounded-full bg-bg"
                          >
                            <IoLogoTwitter />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Sidebar: TOC + CTA */}
                <aside className="order-3 lg:sticky lg:top-28 lg:self-start space-y-8">
                  <BlogToc
                    entries={tocEntries}
                    wordCount={getWordCount(blog)}
                  />
                  <div className="rounded-3xl bg-bg p-5">
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-secondary text-black font-medium hover:bg-secondary/90 transition-colors"
                    >
                      Book a Call
                    </Link>
                  </div>
                </aside>
              </div>
            </BlogPageMotion>
          </div>
        </section>

        <section className="space bg-bg">
          <div className="container">
            <ModuleTitle title="Related Blogs" />
            <div className="grid gap-8 md:grid-cols-3">
              {blogs.slice(0, 3).map((blog) => {
                const coverSrc = getCoverImageUrl(blog);
                return (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.slug}`}
                    className="block"
                  >
                    {coverSrc ? (
                      <div className="aspect-video w-full bg-border relative">
                        <img
                          src={coverSrc}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video w-full bg-border" />
                    )}
                    <div className="mt-6">
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                        <p className="text-sm text-desc">
                          {blog.publishedAt?.slice(0, 10)}
                        </p>
                        {blog.category && (
                          <p className="text-xs text-desc">{blog.category}</p>
                        )}
                      </div>
                      <h2 className="text-h4 mb-3">{blog.title}</h2>
                      <p className="text-desc text-sm line-clamp-2">
                        {blog.excerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
