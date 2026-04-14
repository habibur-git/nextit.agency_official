"use client";
import { lexicalToHtml } from "@/lib/lexical-to-html";
import type {
  WorkDetailItem,
  WorkHero,
  WorkLayoutBlock,
  WorkLayoutCardItem,
  WorkNavItem,
} from "@/lib/work-api";
import Link from "next/link";
import React from "react";

/** Renders a single grid item: image only, text only, or both (per itemType). */
function LayoutItem({ item }: { item: WorkLayoutCardItem }) {
  const type = item.itemType ?? "both";
  const html = item.content
    ? lexicalToHtml(item.content as Parameters<typeof lexicalToHtml>[0])
    : "";
  const hasImage = type !== "text" && Boolean(item.image);
  const hasContent = type !== "image" && Boolean(html?.trim());
  if (!hasImage && !hasContent) return null;
  return (
    <div className="min-w-0">
      {hasImage && (
        <div className="w-full aspect-video bg-gray-100 mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      {hasContent && (
        <div className="prose prose-sm max-w-none text-desc [&_a]:text-theme [&_a]:underline [&_p]:mb-2 last:[&_p]:mb-0">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}
    </div>
  );
}

function getHeroBackgroundStyle(hero: WorkHero): React.CSSProperties {
  const bgType = hero.backgroundType ?? "color";
  if (bgType === "image" && hero.backgroundImage) {
    return {};
  }
  const isGradient =
    bgType === "color" && (hero.colorMode === "gradient" || !hero.colorMode);
  const direction =
    hero.gradientDirectionType === "angle"
      ? `${hero.gradientAngle ?? 90}deg`
      : `to ${hero.gradientDirection ?? "right"}`;
  const from = hero.gradientFrom ?? "#0c1929";
  const via = hero.gradientVia;
  const to = hero.gradientTo ?? "#000000";
  if (isGradient) {
    return via
      ? { background: `linear-gradient(${direction}, ${from}, ${via}, ${to})` }
      : { background: `linear-gradient(${direction}, ${from}, ${to})` };
  }
  return { background: hero.solidColor ?? "#0c1929" };
}

interface ProjectDetailsProps {
  project: WorkDetailItem;
  allItems?: WorkNavItem[];
  basePath?: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project: portfolioItem,
  allItems = [],
  basePath = "/case-studies",
}) => {
  const currentIndex = allItems.findIndex((i) => i.slug === portfolioItem.slug);
  const idx = currentIndex >= 0 ? currentIndex : 0;
  const len = allItems.length;
  const prev =
    len > 0
      ? allItems[idx <= 0 ? len - 1 : idx - 1]
      : { slug: portfolioItem.slug, title: portfolioItem.title };
  const next =
    len > 0
      ? allItems[idx >= len - 1 ? 0 : idx + 1]
      : { slug: portfolioItem.slug, title: portfolioItem.title };
  const prevProject = { slug: prev.slug, title: prev.title };
  const nextProject = { slug: next.slug, title: next.title };

  const sectionLabel = basePath === "/work" ? "Work" : "Case Studies";
  const breadcrumbTitle =
    typeof portfolioItem.title === "string"
      ? portfolioItem.title.toUpperCase()
      : "";

  const hero = portfolioItem.hero;
  const heroBgStyle = hero ? getHeroBackgroundStyle(hero) : undefined;
  const useHeroImage =
    hero?.backgroundType === "image" && hero?.backgroundImage;
  // Detail page hero uses only Hero section config (image or color). Cover image is for the card only.
  const defaultHeroStyle = {
    background: "linear-gradient(to right, #0c1929, #000000)",
  };
  const backgroundLayerStyle = useHeroImage
    ? {
        backgroundImage: `linear-gradient(to top, #000, rgba(0,0,0,0.6), rgba(0,0,0,0)), url(${hero?.backgroundImage})`,
      }
    : heroBgStyle
      ? { ...heroBgStyle }
      : defaultHeroStyle;

  return (
    <>
      {/* Hero — background from CMS Hero section only (cover image is for the card only) */}
      <section className="relative w-full overflow-hidden py-16 pt-46 bg-[#0c1929]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={backgroundLayerStyle}
        />
        <div className="container relative z-10">
          <nav
            className="text-xs font-medium tracking-wider text-white/80 uppercase mb-6 flex flex-wrap items-center"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-white transition-colors text-sm text-white/60"
            >
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={basePath}
              className="hover:text-white transition-colors text-sm text-white/60"
            >
              {sectionLabel}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80 truncate inline-block text-sm">
              {breadcrumbTitle}
            </span>
          </nav>
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight max-w-6xl">
            {portfolioItem.title}
          </h1>

          {/* Meta strip: horizontal labeled sections (COMPANY | CATEGORY | LIVE VIEW | TIMELINE | SERVICE) */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="flex flex-wrap divide-x divide-white/20 -mx-4">
              {/* COMPANY */}
              <div className="px-4 min-w-0 flex-1 basis-32">
                <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                  Company
                </p>
                <p className="mt-1 text-white font-medium truncate">
                  {portfolioItem.company || "—"}
                </p>
              </div>
              {/* CATEGORY */}
              <div className="px-4 min-w-0 flex-1 basis-32">
                <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                  Category
                </p>
                <p className="mt-1 text-white font-medium truncate">
                  {portfolioItem.category || "—"}
                </p>
              </div>
              {/* LIVE VIEW */}
              <div className="px-4 min-w-0 flex-1 basis-32">
                <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                  Live view
                </p>
                <div className="mt-1">
                  {portfolioItem.liveview ? (
                    <a
                      href={portfolioItem.liveview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium underline underline-offset-2 hover:text-white/90"
                    >
                      Visit Website
                    </a>
                  ) : (
                    <span className="text-white/70">—</span>
                  )}
                </div>
              </div>
              {/* TIMELINE */}
              <div className="px-4 min-w-0 flex-1 basis-32">
                <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                  Timeline
                </p>
                <p className="mt-1 text-white font-medium truncate">
                  {portfolioItem.timelines || "—"}
                </p>
              </div>
              {/* SERVICE */}
              <div className="px-4 min-w-0 flex-1 basis-40">
                <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                  Service
                </p>
                <p className="mt-1 text-white font-medium">
                  {portfolioItem.service?.length
                    ? portfolioItem.service.join(" · ")
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full">
        {portfolioItem.sections.map((sec, secIdx) => {
              const sectionStyle =
                sec.useBackgroundColor && sec.backgroundColor
                  ? { backgroundColor: sec.backgroundColor }
                  : undefined;
              const renderBlock = (block: WorkLayoutBlock, i: number) => {
                switch (block.blockType) {
                  case "richText": {
                    const richHtml = lexicalToHtml(block.content);
                    return (
                      <div
                        key={block.id ?? i}
                        className="prose prose-lg max-w-none text-desc leading-relaxed"
                      >
                        {richHtml ? (
                          <div
                            className="[&_a]:text-theme [&_a]:underline [&_h1]:text-h1 [&_h2]:text-h2 [&_h3]:text-h3 [&_p]:mb-p"
                            dangerouslySetInnerHTML={{ __html: richHtml }}
                          />
                        ) : null}
                      </div>
                    );
                  }
                  case "image":
                    return (
                      <figure key={block.id ?? i} className="my-8">
                        {block.image?.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={block.image.url}
                            alt={block.caption || ""}
                            className="rounded-2xl w-full object-cover"
                          />
                        ) : null}
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
                        key={block.id ?? i}
                        className="border-l-4 border-theme pl-4 py-2 my-6 italic text-desc text-base"
                      >
                        {block.text}
                        {block.author && (
                          <div className="mt-2 text-sm font-semibold text-title">
                            — {block.author}
                          </div>
                        )}
                      </blockquote>
                    );
                  case "code":
                    return (
                      <div
                        key={block.id ?? i}
                        className="code-block min-w-0 [&_script]:hidden"
                        dangerouslySetInnerHTML={{
                          __html: block.code?.trim() ?? "",
                        }}
                      />
                    );
                  case "grid": {
                    const cols =
                      block.columns === "2"
                        ? "grid-cols-1 md:grid-cols-2"
                        : block.columns === "4"
                          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                          : "grid-cols-1 md:grid-cols-3";
                    return (
                      <div key={block.id ?? i} className={`grid ${cols} gap-6`}>
                        {(block.items ?? []).map(
                          (item: WorkLayoutCardItem, j: number) => (
                            <LayoutItem key={j} item={item} />
                          ),
                        )}
                      </div>
                    );
                  }
                  default:
                    return null;
                }
              };
              return (
                <section
                  key={secIdx}
                  className="w-full py-8 mb-16 last:mb-0"
                  style={sectionStyle}
                >
                  {sec.container !== false ? (
                    <div className="container mx-auto px-4 space-y-8">
                      {(sec.layout ?? []).map((block, i) =>
                        renderBlock(block, i),
                      )}
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {(sec.layout ?? []).map((block, i) =>
                        renderBlock(block, i),
                      )}
                    </div>
                  )}
                </section>
              );
            })}
      </div>

      <div className="container">
        {/* Keywords */}
        {portfolioItem.keywords && (
          <div className="mt-20 pt-10 border-t border-border">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
              Keywords
            </p>
            <ul className="flex flex-wrap gap-2">
              {portfolioItem.keywords.map((item, i) => (
                <li
                  key={i}
                  className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium"
                >
                  #{item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="container py-16">
        {/* Navigation */}
        <div className="w-full flex justify-between items-center border-t border-border pt-12">
          <Link
            href={`${basePath}/${prevProject.slug}`}
            className="group flex flex-col gap-2"
          >
            <span className="text-xs text-gray-400 uppercase font-bold">
              Previous
            </span>
            <span className="text-lg font-bold group-hover:text-blue-600 transition-colors">
              ← {prevProject.title}
            </span>
          </Link>

          <Link
            href={`${basePath}/${nextProject.slug}`}
            className="group flex flex-col items-end gap-2"
          >
            <span className="text-xs text-gray-400 uppercase font-bold">
              Next
            </span>
            <span className="text-lg font-bold group-hover:text-blue-600 transition-colors">
              {nextProject.title} →
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
