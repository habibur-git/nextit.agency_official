"use client";

import { faqData } from "@/data/faq";
import { motion } from "framer-motion";

import Accordion from "../common/Accordion";
import { ModuleTitle } from "../common/ModuleTitle";

interface FaqSectionProps {
  faqKey: keyof typeof faqData;
  defaultOpenIndex?: number;
}

export default function Faq({ faqKey, defaultOpenIndex = 0 }: FaqSectionProps) {
  const items = faqData[faqKey];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-24">
        <div className="col-span-1 lg:col-span-5">
          <ModuleTitle
            suppertitle="FAQ"
            title="Got Questions? **We’ve Got Answers**"
            subtitle="However, we recommend reaching out to us if you have any questions."
            variant="v3"
          />
        </div>
        {/* Right FAQ */}
        <motion.div
          className="min-w-0 col-span-1 lg:col-span-7"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <Accordion
            variant="faq"
            items={items.map((item) => ({
              id: Number(item.id),
              title: item.question,
              content: item.answer,
            }))}
            type="single"
            defaultOpenIndex={defaultOpenIndex}
          />
        </motion.div>
      </div>
    </section>
  );
}
