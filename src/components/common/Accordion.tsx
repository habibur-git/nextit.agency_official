"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

interface AccordionItem {
  id: number;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultOpenIndex?: number;
  /** `faq`: divider lines, + icon (reference layout). `default`: rounded cards + chevron */
  variant?: "default" | "faq";
}

export default function Accordion({
  items,
  type = "single",
  defaultOpenIndex,
  variant = "default",
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex ?? null,
  );

  const toggle = (index: number) => {
    if (type === "single") {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  if (variant === "faq") {
    return (
      <div>
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.id}
              className="border-b border-border/80 first:border-t-0 last:border-b-0 "
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors md:py-6 cursor-pointer"
              >
                <span className="min-w-0 flex-1 font-title text-base leading-snug text-title md:text-[20px] font-medium">
                  {item.title}
                </span>
                <motion.span
                  className="mt-0.5 shrink-0 text-title"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  aria-hidden
                >
                  <Plus className="size-5" strokeWidth={1.75} />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-white/80 max-w-2xl pb-5 text-sm leading-relaxed whitespace-pre-line md:pb-6 md:text-base">
                  {item.content}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.id}
            onClick={() => toggle(index)}
            className="cursor-pointer rounded-2xl border border-title/10 p-5 py-4"
          >
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-between text-left"
            >
              <h6 className="text-[18px] text-white">{item.title}</h6>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <HiOutlineChevronDown />
              </motion.span>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-white/80 mt-6 whitespace-pre-line">
                {item.content}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
