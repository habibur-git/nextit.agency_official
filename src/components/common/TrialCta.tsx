"use client";

import { ModuleTitle } from "@/components/common/ModuleTitle";
import { testimonialData } from "@/data/testimonials";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { CgQuote } from "react-icons/cg";
import Contact from "../ui/contact/ContactForm";

export default function TrialCta() {
  const [index, setIndex] = useState(0);

  if (!testimonialData || testimonialData.length === 0) return null;

  const total = testimonialData.length;
  const testimonial = testimonialData[index];

  const testimonialEase = [0.22, 1, 0.36, 1] as const;
  const testimonialTransition = {
    duration: 0.55,
    ease: testimonialEase,
  };

  return (
    <section className="space bg-bg">
      <div className="container">
        <ModuleTitle
          title="Start your project — **get in touch.**"
          subtitle="No fluff, just execution. We’ll take one real friction point in your product and solve it in three days to show you how our system works."
          variant="v3"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1">
          {/* Testimonial */}
          <div className="flex h-full flex-col justify-between rounded-3xl bg-white p-12 lg:col-span-4">
            <div className="relative min-h-[280px] flex-1 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={testimonialTransition}
                  className="flex h-full flex-col"
                >
                  <CgQuote className="-ml-8 -mt-8 text-8xl text-desc/12" />

                  <p className="mb-10 line-clamp-3 text-h5 font-medium text-title">
                    {testimonial.text}
                  </p>

                  <div className="mt-auto flex items-center gap-4 pt-2">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                      {testimonial.image && (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="mb-1 font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-desc">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-16 flex gap-4">
              {testimonialData.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show testimonial ${i + 1} of ${total}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className="relative h-[3px] flex-1 cursor-pointer overflow-hidden rounded-full bg-bg"
                >
                  {i === index && (
                    <motion.div
                      key={`progress-${index}`}
                      layout={false}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "linear" }}
                      onAnimationComplete={() => {
                        setIndex((prev) =>
                          prev === i ? (prev + 1) % total : prev,
                        );
                      }}
                      className="absolute left-0 top-0 h-full bg-theme"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <Contact formColumnClassName="lg:col-span-8" />
        </div>
      </div>
    </section>
  );
}
