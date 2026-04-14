"use client";

import { getMinRead } from "@/lib/blog-utils";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const SMOOTH_SCROLL_OPTIONS: ScrollIntoViewOptions = {
  behavior: "smooth",
  block: "start",
};

export type TocEntry = { id: string; label: string };

type BlogTocProps = {
  entries: TocEntry[];
  wordCount: number;
};

export default function BlogToc({ entries, wordCount }: BlogTocProps) {
  const [activeId, setActiveId] = useState<string | null>(
    entries[0]?.id ?? null,
  );
  const [progress, setProgress] = useState(0);

  const minRead = useMemo(() => getMinRead(wordCount), [wordCount]);

  useEffect(() => {
    if (entries.length === 0) return;

    const sectionIds = entries.map((e) => e.id);

    const observer = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          if (sectionIds.includes(id)) setActiveId(id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      },
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null);

    elements.forEach((el) => observer.observe(el));

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;

      const readingArea = document.getElementById("blog-reading-area");
      if (!readingArea) {
        // Fallback: whole-page progress
        const scrollHeight = document.documentElement.scrollHeight;
        const maxScroll = scrollHeight - viewportHeight;
        if (maxScroll <= 0) {
          setProgress(100);
          return;
        }
        const rawPct = (scrollTop / maxScroll) * 100;
        const pct = rawPct >= 99 ? 100 : Math.min(100, rawPct);
        setProgress(pct);
        return;
      }

      const rect = readingArea.getBoundingClientRect();
      const areaTop = scrollTop + rect.top;
      const areaHeight = readingArea.offsetHeight;
      const areaBottom = areaTop + areaHeight;

      // If the article is shorter than the viewport, treat it as fully visible
      if (areaHeight <= viewportHeight * 0.6) {
        setProgress(100);
        return;
      }

      const start = Math.max(0, areaTop - viewportHeight * 0.2);
      const end = areaBottom - viewportHeight * 0.25;

      if (scrollTop <= start) {
        setProgress(0);
        return;
      }
      if (scrollTop >= end) {
        setProgress(100);
        return;
      }

      const rawPct = ((scrollTop - start) / (end - start)) * 100;
      const pct = Math.min(100, Math.max(0, rawPct));
      setProgress(pct);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      window.removeEventListener("scroll", onScroll);
    };
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <div className="rounded-3xl bg-bg p-5">
      <h5 className="mb-4">Table of contents</h5>
      <ol className="space-y-2 list-decimal list-inside text-sm max-h-[280px] overflow-y-auto pr-1">
        {entries.map((entry, idx) => {
          const isActive = activeId === entry.id;
          return (
            <li
              key={entry.id}
              className={`leading-snug pl-2 border-l-2 -ml-1 list-none ${
                isActive ? "border-blue-600" : "border-transparent"
              }`}
            >
              <a
                href={`#${entry.id}`}
                className={`block transition-colors hover:text-theme ${
                  isActive ? "text-blue-600 font-medium" : "text-desc"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(entry.id)
                    ?.scrollIntoView(SMOOTH_SCROLL_OPTIONS);
                }}
              >
                {idx + 1}. {entry.label}
              </a>
            </li>
          );
        })}
      </ol>
      <div className="mt-4 pt-4 border-t border-border space-y-2">
        <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-blue-600"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs font-semibold text-title">{minRead} MIN READ</p>
      </div>
    </div>
  );
}
