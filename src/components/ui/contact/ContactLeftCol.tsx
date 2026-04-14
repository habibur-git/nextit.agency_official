"use client";

import { ModuleTitle } from "@/components/common/ModuleTitle";
import { testimonialData } from "@/data/testimonials";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

export default function ContactLeftCol() {
  const [index, setIndex] = useState(0);

  const testimonialEase = [0.22, 1, 0.36, 1] as const;
  const testimonialTransition = {
    duration: 0.55,
    ease: testimonialEase,
  };

  const hasTestimonials = testimonialData && testimonialData.length > 0;
  const total = testimonialData?.length ?? 0;
  const testimonial = hasTestimonials ? testimonialData[index] : undefined;

  return (
    <>
      {hasTestimonials && testimonial && (
        <div className="flex h-full flex-col justify-between rounded-3xl bg-bg px-10 py-6 lg:col-span-4">
          <div>
            <ModuleTitle title="Have a Project? **Let's talk.**" variant="v3" />
            <ul className="mt-8 space-y-2">
              <li className="flex items-center gap-2 text-base font-medium text-title">
                <IoShieldCheckmarkSharp />
                NDA? Absolutely just ask.
              </li>
              <li className="flex items-center gap-2 text-base font-medium text-title">
                <IoShieldCheckmarkSharp />
                We’ll respond in 24 hours fast & focused.
              </li>
              <li className="flex items-center gap-2 text-base font-medium text-title">
                <IoShieldCheckmarkSharp />
                Work with senior UX experts, not juniors.
              </li>
              <li className="flex items-center gap-2 text-base font-medium text-title">
                <IoShieldCheckmarkSharp />
                No hidden fees or surprises.
              </li>
            </ul>
          </div>
          <div>
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={testimonialTransition}
                  className="flex h-full flex-col"
                >
                  <p className="mb-8 line-clamp-2 text-base font-medium text-title">
                    {testimonial.text}
                  </p>

                  <div className="mt-auto flex items-center gap-4">
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

            <div className="mt-8 flex gap-4">
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
        </div>
      )}
    </>
  );
}
