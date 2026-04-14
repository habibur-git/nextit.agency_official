"use client";

import Button from "@/components/button/Button";
import { brandLogos } from "@/data/brandsData";
import { motion } from "framer-motion";
import { LuCalendarDays } from "react-icons/lu";
import BrandMarquee from "../BrandMarquee";

export default function Hero() {
  return (
    <>
      <section className="w-full overflow-hidden pt-32">
        <div className="container">
          {/* Headline */}
          <motion.div
            className="mt-12 max-w-4xl m-auto"
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="leading-[150%] font-light text-title text-[36px] sm:text-[40px] md:text-h2 lg:text-[56px] max-w-[1120px] text-center m-auto"
            >
              {/* Digital Product Design & Full-Stack Development Expertise */}
              Digital Product{" "}
              <strong className="font-semi-bold">
                Design & Full-Stack
              </strong>{" "}
              Development <strong className="font-semi-bold">Expertise</strong>
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[18px] text-title/60 font-body mt-4 hero-desc tracking-normal text-center"
            >
              DevioNex transforms complex ideas into high-performance SaaS,
              MVPs, and web applications. We combine world-class UI/UX with
              robust engineering to help your business scale globally.
            </motion.h2>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
              <Button
                href="/contact"
                // label="Start Your Project"
                label="Get a Free Product Audit"
                variant="primary"
              />
              <Button
                href="https://cal.com/devionex/15min"
                target="_blank"
                label="Book a Consultation"
                variant="link"
                icon={<LuCalendarDays className="text-xl text-theme" />}
                slideIconRotate={0}
              />
            </div>
          </motion.div>
        </div>
        <div className="mt-20">
          <BrandMarquee images={brandLogos} />
        </div>
      </section>
    </>
  );
}
