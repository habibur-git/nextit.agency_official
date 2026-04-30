"use client";

import { ModuleTitle } from "@/components/common/ModuleTitle";
import Process from "@/data/process";
import { motion } from "framer-motion";
import { Handshake, Lightbulb, Search, Settings2 } from "lucide-react";

type WhyProps = {
  data: "home";
};

type ProcessItem = {
  id: number;
  title: string;
  description: string;
};

const STEP_ICONS = [Search, Lightbulb, Settings2, Handshake] as const;

export default function ProcessSection({ data }: WhyProps) {
  const pageData = Process[data];
  if (!pageData) return null;

  const items = pageData.items as ProcessItem[];

  return (
    <section className="py-16 md:py-24">
      <div className="container px-6">
        <ModuleTitle
          suppertitle={pageData.suppertitle}
          title={pageData.title}
          subtitle={pageData.subtitle}
          variant="v2"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = STEP_ICONS[index] ?? Search;
            const iconTop = index % 2 === 0;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="flex min-h-[280px] flex-col items-center justify-center gap-6 rounded-3xl border border-white/10 px-6 py-10 text-center md:min-h-[300px] md:px-7 md:py-12 bg-bg"
              >
                {iconTop ? (
                  <>
                    <span className="flex h-14 w-14 items-center justify-center text-white">
                      <Icon
                        className="h-9 w-9"
                        strokeWidth={1.15}
                        aria-hidden
                      />
                    </span>
                    <h4 className="font-semibold text-theme">{item.title}</h4>
                    <p className="max-w-[260px] text-sm leading-relaxed text-white/55 md:text-[15px]">
                      {item.description}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="max-w-[260px] text-sm leading-relaxed text-white/55 md:text-[15px]">
                      {item.description}
                    </p>
                    <h4 className="font-semibold text-theme">{item.title}</h4>
                    <span className="flex h-14 w-14 items-center justify-center text-white">
                      <Icon
                        className="h-9 w-9"
                        strokeWidth={1.15}
                        aria-hidden
                      />
                    </span>
                  </>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
