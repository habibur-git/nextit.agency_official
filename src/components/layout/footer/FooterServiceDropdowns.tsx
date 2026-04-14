"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";

type Item = { title: string; slug: string };
type Section = { title: string; items: Item[] };

export default function FooterServiceDropdowns({
  sections,
}: {
  sections: Section[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-2 w-full rounded-3xl bg-white"
    >
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center justify-between rounded-lg p-6"
        whileTap={{ scale: 0.995 }}
        aria-expanded={open}
      >
        <span className="text-base font-title text-title">
          Show all services
        </span>
        <motion.span
          animate={{ rotate: open ? -135 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          <GoArrowDownRight className="text-[22px] text-title" aria-hidden />
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-2 px-6 pb-6 md:grid-cols-2">
              {sections.map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 + i * 0.06 }}
                  className="overflow-hidden rounded-2xl bg-bg/50 border border-border/70"
                >
                  <div className="border-b border-border px-6 py-4">
                    <h6 className="text-[15px] font-semi-bold uppercase tracking-[0.08em] text-title">
                      {section.title}
                    </h6>
                  </div>
                  {section.items.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/services/${item.slug}`}
                      scroll={false}
                      className="flex items-center justify-between border-b border-border/70 px-6 py-4 transition-colors hover:bg-black/5 last:border-b-0"
                    >
                      <span className="font-body text-base text-title/70 transition-colors hover:text-title">
                        {item.title}
                      </span>
                      <GoArrowUpRight className="text-[20px] text-desc/50" />
                    </Link>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
