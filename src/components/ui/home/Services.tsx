"use client";

import { ModuleTitle } from "@/components/common/ModuleTitle";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const services = [
  {
    name: "Research And Strategy",
    preview: "Market insights and positioning blueprint",
    imageSrc: "/assets/img/service/services-reference.png",
  },
  {
    name: "Corporate Identity",
    preview: "Brand tone, visual language, and identity system",
    imageSrc: "/assets/img/service/uiux.webp",
  },
  {
    name: "UX/UI Design",
    preview: "Product UX flows and conversion-focused interfaces",
    imageSrc: "/assets/img/service/mobile-app.webp",
  },
  {
    name: "Design Support",
    preview: "Creative production support for growth teams",
    imageSrc: "/assets/img/service/web-app.webp",
  },
  {
    name: "PPC Marketing",
    preview: "Campaign structure, creatives, and optimization",
    imageSrc: "/assets/img/service/full-stack-development.webp",
  },
] as const;

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const listItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Services() {
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const activeService = services[activeServiceIdx] ?? services[0];

  return (
    <section className="space">
      <div className="container">
        <ModuleTitle
          suppertitle="What We Do"
          title="Creative services that **drive growth**"
          variant="v1"
        />

        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full h-[550px] -rotate-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.imageSrc}
                  initial={{ opacity: 0, scale: 1.08, x: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.03, x: -30 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeService.imageSrc}
                    alt={activeService.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black/20"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              className="w-full"
              variants={listContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              {services.map((service, idx) => {
                const isActive = idx === activeServiceIdx;
                return (
                  <motion.button
                    type="button"
                    key={service.name}
                    onMouseEnter={() => setActiveServiceIdx(idx)}
                    onFocus={() => setActiveServiceIdx(idx)}
                    onClick={() => setActiveServiceIdx(idx)}
                    variants={listItem}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className={`group relative flex w-full items-center justify-between overflow-hidden border-b border-border/10 px-5 py-5 text-left sm:px-6 sm:py-6 cursor-pointer ${
                      isActive ? "text-black" : ""
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeServiceRow"
                        className="absolute inset-0 bg-theme"
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 30,
                        }}
                      />
                    )}

                    <div className="flex items-center gap-5 sm:gap-7">
                      <motion.span
                        animate={{ opacity: isActive ? 1 : 0.7 }}
                        transition={{ duration: 0.22 }}
                        className={`relative z-10 text-xl font-medium leading-none sm:text-3xl ${
                          isActive ? "text-black" : "text-white"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </motion.span>
                      <motion.span
                        animate={{ x: isActive ? 2 : 0 }}
                        transition={{ duration: 0.24, ease: "easeOut" }}
                        className={`text-xl font-medium leading-none sm:text-3xl ${
                          isActive ? "text-black" : "text-white"
                        }`}
                      >
                        {service.name}
                      </motion.span>
                    </div>

                    <motion.span
                      whileHover={{ x: 2, y: -2 }}
                      className={`text-3xl leading-none transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                        isActive
                          ? "relative z-10 text-black"
                          : "relative z-10 text-white"
                      }`}
                      aria-hidden
                    >
                      ↗
                    </motion.span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
