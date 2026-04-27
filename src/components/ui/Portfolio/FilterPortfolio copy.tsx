"use client";

import { ModuleTitle } from "@/components/common/ModuleTitle";
import { slugify } from "@/lib/slugify";
import type { WorkListItem } from "@/lib/work-api";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type ProjectItem = WorkListItem;

interface OptionWithCount {
  label: string;
  count: number;
}

const EMPTY_MESSAGE = "No projects match the current filters.";

function PortfolioModuleHeader() {
  return (
    <ModuleTitle
      suppertitle="Our Portfolio"
      title="Our Work"
      subtitle="A collection of UI/UX design, SaaS dashboards, landing pages, mobile apps, and full-stack web applications built by NextIT for startups and founders."
      variant="v2"
    />
  );
}
const STAGGER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function getProjectSlug(project: ProjectItem): string {
  return "slug" in project && typeof project.slug === "string"
    ? project.slug
    : slugify(project.title);
}

function isWorkListItem(project: ProjectItem): project is WorkListItem {
  return "company" in project && "timelines" in project;
}

function isAbsoluteExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url) || url.startsWith("//");
}

function getProjectHref(
  project: ProjectItem,
  basePath: string,
): { href: string; isExternal: boolean } {
  if (
    isWorkListItem(project) &&
    project.useLiveViewURL === true &&
    typeof project.liveview === "string" &&
    project.liveview.trim() !== ""
  ) {
    const liveHref = project.liveview.trim();
    return {
      href: liveHref,
      isExternal: isAbsoluteExternalUrl(liveHref),
    };
  }
  return {
    href: `${basePath}/${getProjectSlug(project)}`,
    isExternal: false,
  };
}

function getUniqueCategories(data: ProjectItem[]): string[] {
  const unique = Array.from(new Set(data.map((item) => item.category)));
  return ["All", ...unique.sort()];
}

function getServicesWithCounts(data: ProjectItem[]): OptionWithCount[] {
  const counts = new Map<string, number>();
  data.forEach((item) => {
    (item.service ?? []).forEach((s) => {
      counts.set(s, (counts.get(s) ?? 0) + 1);
    });
  });
  const total = data.length;
  return [
    { label: "All Services", count: total },
    ...Array.from(counts.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count),
  ];
}

function formatDateLine(timelines: string | undefined): string {
  if (!timelines) return "";
  const first = timelines.split("–")[0]?.trim();
  return first ? first.toUpperCase().replace(/\s+/g, " ") : "";
}

function isExternalCover(src: string): boolean {
  return typeof src === "string" && src.startsWith("http");
}

// -----------------------------------------------------------------------------
// Shared: cover image (external URL vs next/image)
// -----------------------------------------------------------------------------

function CoverImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  if (isExternalCover(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={className} />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={680}
      className={className}
    />
  );
}

// -----------------------------------------------------------------------------
// Shared: project grid (sidebar + default variants)
// -----------------------------------------------------------------------------

function ProjectGrid({
  rows,
  filterKey,
  basePath,
  layoutVariant = "grid-2",
}: {
  rows: ProjectItem[][];
  filterKey: string;
  basePath: string;
  layoutVariant?: "grid-1" | "grid-2";
}) {
  return (
    <div className="flex flex-col gap-12">
      {rows.map((row, rowIndex) => {
        const gridClass =
          layoutVariant === "grid-1"
            ? "grid-cols-1 md:grid-cols-2"
            : row.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-3";
        return (
          <motion.div
            key={`${filterKey}-${rowIndex}-${row.map((r) => r.id).join("-")}`}
            className={`grid gap-10 ${gridClass}`}
            initial="hidden"
            animate="visible"
            variants={STAGGER_VARIANTS}
          >
            {row.map((elm) => (
              <ProjectCard
                key={`${filterKey}-${elm.id}`}
                project={elm}
                twoColumns={layoutVariant === "grid-1" || row.length === 2}
                basePath={basePath}
              />
            ))}
          </motion.div>
        );
      })}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Props & main component
// -----------------------------------------------------------------------------

interface FilterPortfolioProps {
  basePath?: string;
  filterVariant?: "default" | "sidebar" | "reference";
  /** grid-2 = current layout (2-col where applicable, reference zigzag). grid-1 = two-column grid, reference cards full-width per cell */
  layoutVariant?: "grid-1" | "grid-2";
  /** when layoutVariant is grid-1, show only the first N items (e.g. 6 for .slice(0, 6)) */
  grid1Slice?: number;
  /**
   * Reference layout only: when true, show the service filter pills; when false, hide them.
   * When true, the alternate “Can they actually build…” heading is not shown.
   * When false and layoutVariant is grid-1, that heading is shown instead (independent of layoutVariant for the pills).
   */
  filter?: boolean;
  items?: WorkListItem[];
  /** When true, shows the portfolio `ModuleTitle` block above the grid/filters. */
  showModuleTitle?: boolean;
}

const FilterPortfolio = ({
  basePath = "/case-studies",
  filterVariant = "default",
  layoutVariant = "grid-2",
  grid1Slice,
  filter = true,
  items,
  showModuleTitle = false,
}: FilterPortfolioProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedService, setSelectedService] = useState("All Services");

  const data = useMemo(() => items ?? [], [items]);
  const categories = useMemo(() => getUniqueCategories(data), [data]);
  const servicesWithCounts = useMemo(() => getServicesWithCounts(data), [data]);

  const filteredData = useMemo(() => {
    if (layoutVariant === "grid-1" && filterVariant === "reference") {
      return data;
    }
    if (filterVariant === "sidebar" || filterVariant === "reference") {
      return data.filter(
        (item) =>
          selectedService === "All Services" ||
          (item.service ?? []).includes(selectedService),
      );
    }
    return selectedCategory === "All"
      ? data
      : data.filter((item) => item.category === selectedCategory);
  }, [data, filterVariant, layoutVariant, selectedCategory, selectedService]);

  const displayData = useMemo(() => {
    if (
      layoutVariant === "grid-1" &&
      grid1Slice != null &&
      Number.isFinite(grid1Slice) &&
      grid1Slice > 0
    ) {
      return filteredData.slice(0, grid1Slice);
    }
    return filteredData;
  }, [filteredData, layoutVariant, grid1Slice]);

  const rows = useMemo(() => {
    const out: ProjectItem[][] = [];
    let i = 0;
    while (i < displayData.length) {
      const take = out.length % 2 === 0 ? 2 : 1;
      if (i + take <= displayData.length) {
        out.push(displayData.slice(i, i + take));
        i += take;
      } else {
        out.push(displayData.slice(i));
        break;
      }
    }
    return out;
  }, [displayData]);

  const filterKey =
    filterVariant === "sidebar" || filterVariant === "reference"
      ? selectedService
      : selectedCategory;

  const emptyEl = (
    <p className="py-20 text-center text-desc" role="status">
      {EMPTY_MESSAGE}
    </p>
  );

  // Reference: left panel (service pills + WorkCta), right = list; `filter` toggles pills vs alternate heading (not layoutVariant)
  if (filterVariant === "reference") {
    const isGrid1 = layoutVariant === "grid-1";
    const showServicePills = filter;
    return (
      <section className="min-h-screen py-12 md:py-24">
        <div className="container">
          {showModuleTitle && (
            <div className="mb-10 md:mb-14">
              <PortfolioModuleHeader />
            </div>
          )}
          <div className="flex flex-col gap-10">
            <aside className="lg:sticky lg:top-20 flex z-10 relative">
              {showServicePills && (
                <div className="mb-3 flex flex-wrap gap-2 rounded-3xl bg-bg p-5">
                  {servicesWithCounts.map(({ label }) => {
                    const isSelected = selectedService === label;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setSelectedService(label)}
                        aria-pressed={isSelected}
                        className={`rounded-full px-4 py-2 text-sm font-medium text-title transition-all font-title cursor-pointer ${
                          isSelected
                            ? "bg-theme text-white"
                            : "bg-white/10 text-title"
                        }`}
                      >
                        {label === "All Services" ? "All" : label}
                      </button>
                    );
                  })}
                </div>
              )}
            </aside>
            <div className="min-w-0 flex-1">
              {displayData.length > 0 ? (
                <div
                  className={
                    isGrid1
                      ? "grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10"
                      : "flex flex-col gap-8 md:gap-14"
                  }
                >
                  {displayData.map((project, index) => (
                    <ProjectCardReference
                      key={`${filterKey}-${project.id}`}
                      project={project}
                      basePath={basePath}
                      index={index}
                      layoutVariant={layoutVariant}
                    />
                  ))}
                </div>
              ) : (
                emptyEl
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Sidebar: dark panel + project grid
  if (filterVariant === "sidebar") {
    return (
      <section className="project-area space">
        <div className="container">
          {showModuleTitle && (
            <div className="mb-10 md:mb-14">
              <PortfolioModuleHeader />
            </div>
          )}
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <aside className="sticky top-20 w-full shrink-0 self-start lg:w-72">
              <div className="rounded-2xl bg-[#1A1A1A] p-5 text-white">
                <div className="border-b border-white/10 pb-4">
                  <p className="py-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                    Services
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {servicesWithCounts.map(({ label }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setSelectedService(label)}
                        aria-pressed={selectedService === label}
                        className={`rounded-full px-3 py-1.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 ${
                          selectedService === label
                            ? "bg-[#C1FF2D] text-black"
                            : "bg-[#2E2E2E] text-gray-200 hover:bg-[#3a3a3a]"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-4">
                  <Link
                    href="/contact"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#C1FF2D] px-4 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                  >
                    Book a Call
                  </Link>
                  <Link
                    href="/contact"
                    aria-label="Book a call"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C1FF2D] text-black transition-opacity hover:opacity-90"
                  >
                    <ArrowDownRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </aside>
            <div className="min-w-0 flex-1">
              {rows.length > 0 ? (
                <ProjectGrid
                  rows={rows}
                  filterKey={filterKey}
                  basePath={basePath}
                  layoutVariant={layoutVariant}
                />
              ) : (
                <p className="py-20 text-center text-gray-500" role="status">
                  {EMPTY_MESSAGE}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default: category pills + grid
  return (
    <section className="project-area space overflow-hidden">
      <div className="container">
        {showModuleTitle && (
          <div className="mb-10 md:mb-12">
            <PortfolioModuleHeader />
          </div>
        )}
        <div className="mb-12 flex flex-wrap items-center gap-6">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className={`cursor-pointer rounded-full px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme focus:ring-offset-2 ${
                selectedCategory === category
                  ? "bg-theme text-white"
                  : "bg-bg text-title hover:bg-theme/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {rows.length > 0 ? (
          <ProjectGrid
            rows={rows}
            filterKey={filterKey}
            basePath={basePath}
            layoutVariant={layoutVariant}
          />
        ) : (
          emptyEl
        )}
      </div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// ProjectCard (grid)
// -----------------------------------------------------------------------------

function ProjectCard({
  project,
  twoColumns,
  basePath,
}: {
  project: ProjectItem;
  twoColumns: boolean;
  basePath: string;
}) {
  const { href, isExternal } = getProjectHref(project, basePath);
  const cover = project.coverImage as string;
  const imgClass = `w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] ${
    twoColumns
      ? "h-full md:h-[320px] lg:h-[370px]"
      : "md:h-[600px] lg:h-[700px]"
  }`;

  return (
    <motion.article
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      transition={{ duration: 0.3 }}
      className="relative w-full shrink-0 overflow-hidden group"
    >
      {isExternal ? (
        <a
          href={href}
          className="block"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CoverImage src={cover} alt={project.title} className={imgClass} />
        </a>
      ) : (
        <Link scroll={false} href={href} className="block">
          <CoverImage src={cover} alt={project.title} className={imgClass} />
        </Link>
      )}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {isExternal ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            <h2 className="text-[25px] font-semibold">{project.title}</h2>
          </a>
        ) : (
          <Link scroll={false} href={href}>
            <h2 className="text-[25px] font-semibold">{project.title}</h2>
          </Link>
        )}
      </motion.div>
    </motion.article>
  );
}

// -----------------------------------------------------------------------------
// ProjectCardReference (zigzag list)
// -----------------------------------------------------------------------------

function ProjectCardReference({
  project,
  basePath,
  index,
  layoutVariant = "grid-2",
}: {
  project: ProjectItem;
  basePath: string;
  index: number;
  layoutVariant?: "grid-1" | "grid-2";
}) {
  const { href, isExternal } = getProjectHref(project, basePath);
  const dateLine = formatDateLine(
    isWorkListItem(project) ? project.timelines : undefined,
  );
  const isGrid1 = layoutVariant === "grid-1";
  const imageRight = !isGrid1 && index % 2 === 1;
  const alignClass = imageRight
    ? "md:items-end md:text-right"
    : "md:items-start md:text-left";
  const wrapperClass = isGrid1
    ? "flex h-auto w-full flex-col justify-center md:items-start md:text-left"
    : `flex h-auto w-[70%] flex-col justify-center ${alignClass} ${
        imageRight ? "ml-auto" : ""
      }`;

  return (
    <motion.article
      className="block w-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={wrapperClass}>
        {isExternal ? (
          <a
            href={href}
            className="relative w-full shrink-0 overflow-hidden group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CoverImage
              src={project.coverImage as string}
              alt={project.title}
              className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </a>
        ) : (
          <Link
            scroll={false}
            href={href}
            className="relative w-full shrink-0 overflow-hidden group"
          >
            <CoverImage
              src={project.coverImage as string}
              alt={project.title}
              className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>
        )}
        <div
          className={`mt-8 flex min-h-0 flex-col justify-center ${alignClass}`}
        >
          {dateLine && (
            <p className="text-xs font-medium uppercase tracking-wide text-desc">
              {dateLine}
            </p>
          )}
          {isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-base text-black md:text-lg"
            >
              <h5 className="font-bold">{project.title}</h5>
            </a>
          ) : (
            <Link
              scroll={false}
              href={href}
              className="mt-1 text-base text-black md:text-lg"
            >
              <h5 className="font-bold">{project.title}</h5>
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default FilterPortfolio;
