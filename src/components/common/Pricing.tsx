"use client";

import Button from "@/components/button/Button";
import {
  PRICING_BY_CATEGORY,
  PRICING_CATEGORIES,
  PRICING_FEATURES_BY_CATEGORY,
  type PricingCategoryId,
  type PricingPlan,
} from "@/data/pricing";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

function priceBlock(plan: PricingPlan) {
  if (plan.priceLabel) {
    return {
      primary: `৳ ${plan.priceLabel}`,
      secondary: "Estimated project range (BDT)",
    };
  }
  if (plan.monthlyPrice != null) {
    const formatted = `৳${plan.monthlyPrice.toLocaleString("en-BD")}`;
    const cycle = plan.plan ? ` / ${plan.plan.toLowerCase()}` : " / month";
    return { primary: formatted, secondary: `BDT${cycle}` };
  }
  return { primary: "Custom", secondary: "We’ll scope with you" };
}

export default function Pricing() {
  const [category, setCategory] = useState<PricingCategoryId>("socialMedia");
  const plans = PRICING_BY_CATEGORY[category];
  const features = PRICING_FEATURES_BY_CATEGORY[category];

  return (
    <section className="space overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-2 mb-6"
          >
            <h2 className="text-center md:text-left capitalize font-normal">
              Plans & <strong>pricing</strong> <br /> that match how you ship
            </h2>
          </motion.div>

          <div
            className="flex gap-1 overflow-x-auto rounded-2xl border border-border/20 bg-bg p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Pricing categories"
          >
            {PRICING_CATEGORIES.map((cat) => {
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(cat.id)}
                  className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-title font-medium transition-colors cursor-pointer ${
                    active
                      ? "bg-theme text-body shadow-sm"
                      : "text-title/70 hover:bg-white/5 hover:text-title"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch"
          >
            {plans.map((plan, index) => {
              const { primary, secondary } = priceBlock(plan);
              return (
                <motion.article
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.06,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative flex min-h-0 flex-col rounded-3xl border p-8 ${
                    plan.emphasized
                      ? "border-theme bg-theme/10  md:-translate-y-1 md:scale-[1.02]"
                      : "border-border/10 bg-bg"
                  }`}
                >
                  {plan.badge ? (
                    <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-theme px-3 py-1 text-xs font-title font-semibold text-body shadow-md">
                      {plan.badge}
                    </span>
                  ) : null}

                  <div className="mb-6">
                    <h3 className="font-title text-xl font-semibold text-title md:text-2xl">
                      {plan.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-desc md:text-base">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-8 border-b border-border/25 pb-8">
                    <p className="font-title text-3xl font-semibold tracking-tight text-theme md:text-4xl">
                      {primary}
                    </p>
                    <p className="mt-1 text-sm text-desc">{secondary}</p>
                  </div>

                  <ul className="mb-10 flex flex-1 flex-col gap-3">
                    {features.map((label, i) =>
                      plan.included.includes(i) ? (
                        <li
                          key={`${plan.id}-${i}`}
                          className="flex gap-3 text-sm text-title/90 md:text-[15px]"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-theme/20 text-theme">
                            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </span>
                          <span className="leading-snug">{label}</span>
                        </li>
                      ) : null,
                    )}
                  </ul>

                  <div className="mt-auto">
                    <Button
                      href="/contact"
                      label={plan.cta}
                      variant={plan.emphasized ? "primary" : "primary"}
                      size="sm"
                    />
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <p className="mt-8 text-center text-sm text-desc">
          <span className="font-medium text-title/80">Note:</span> Prices may
          change; final quotes depend on scope after discovery.
        </p>
      </div>
    </section>
  );
}
