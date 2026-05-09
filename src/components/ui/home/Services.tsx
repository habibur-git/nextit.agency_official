"use client";

import { ModuleTitle } from "@/components/common/ModuleTitle";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RxArrowTopRight } from "react-icons/rx";

const services = [
  {
    name: "Brand Strategy & Identity",
    preview:
      "Build memorable brands with strategic positioning, visual identity systems, and brand guidelines.",
    imageSrc: "/assets/img/service/uyq -7.webp",
  },

  {
    name: "Social Media Management",
    preview:
      "Platform-specific content, audience growth, and daily management for modern brands.",
    imageSrc: "/assets/img/service/Facebook Cover.webp",
  },

  {
    name: "Web Design & Development",
    preview:
      "Fast, responsive, SEO-friendly websites built to convert visitors into customers.",
    imageSrc: "/assets/img/service/S 2.webp",
  },

  {
    name: "E-Commerce Solutions",
    preview:
      "Scalable online stores with seamless checkout, optimized product pages, and secure payment integration.",
    imageSrc: "/assets/img/service/E-Commer-Website.webp",
  },

  {
    name: "Packaging Design",
    preview:
      "Print-ready packaging that elevates product perception and strengthens shelf presence.",
    imageSrc: "/assets/img/service/S 4.webp",
  },

  {
    name: "Video Ads & Motion Graphics",
    preview:
      "Scroll-stopping video content, reels, explainers, and motion graphics for digital campaigns.",
    imageSrc: "/assets/img/service/S 3.webp",
  },

  {
    name: "Digital Marketing",
    preview:
      "Data-driven SEO, paid ads, and lead generation strategies focused on measurable growth.",
    imageSrc: "/assets/img/service/S 1-01.webp",
  },

  {
    name: "Commercial Printing",
    preview:
      "High-quality business printing solutions for consistent and professional brand presence.",
    imageSrc: "/assets/img/service/printing.webp",
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

  useEffect(() => {
    // Preload images for smoother hover transitions
    services.forEach((service) => {
      const img = new window.Image();
      img.src = service.imageSrc;
    });
  }, []);

  const setActiveService = (idx: number) => {
    if (idx !== activeServiceIdx) setActiveServiceIdx(idx);
  };

  return (
    <section className="space bg-[#000]">
      <div className="container">
        <ModuleTitle
          suppertitle="Services"
          title="**End-to-End Digital Services That Drive Real Business Results**"
          subtitle="From brand strategy to website launch, social media management to e-commerce development, we offer a complete suite of creative and digital services that help businesses internationally attract customers, build credibility, and scale sustainably."
          variant="v2"
          className="mb-32"
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-24">
          {/* LEFT PREVIEW IMAGES */}
          <div className="lg:col-span-5">
            <div className="mx-auto w-full h-[600px] rotate-8 lg:sticky lg:top-28 overflow-hidden rounded-4xl">
              {services.map((service, idx) => {
                const isActiveImage = idx === activeServiceIdx;

                return (
                  <motion.div
                    key={service.imageSrc}
                    initial={false}
                    animate={{
                      ...(isActiveImage
                        ? { opacity: 1, x: 0, rotate: 0, scale: 1 }
                        : {
                            opacity: 0,
                            x: -64,
                            rotate: -5,
                            scale: 0.97,
                          }),
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 78,
                      damping: 22,
                      mass: 0.82,
                      restDelta: 0.0005,
                      restSpeed: 0.0005,
                    }}
                    className="absolute inset-0"
                    style={{
                      transformOrigin: isActiveImage ? "auto" : "none",
                    }}
                  >
                    <Image
                      src={service.imageSrc}
                      alt={service.name}
                      fill
                      className="object-cover"
                      priority={idx === 0}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />

                    <div className="absolute inset-0 bg-black/20" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SERVICES LIST */}
          <div className="lg:col-span-7 w-full">
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
                    onMouseEnter={() => setActiveService(idx)}
                    onFocus={() => setActiveService(idx)}
                    onClick={() => setActiveService(idx)}
                    variants={listItem}
                    whileHover={{ x: 6 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 24,
                    }}
                    className={`group relative flex w-full items-start justify-between overflow-hidden border-b border-border/10 p-8 text-left cursor-pointer ${
                      isActive ? "text-black" : ""
                    }`}
                  >
                    {/* ACTIVE BACKGROUND */}
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

                    {/* LEFT CONTENT */}
                    <div className="relative z-10 flex items-start gap-10 md:gap-20">
                      {/* NUMBER */}
                      <motion.span
                        animate={{ opacity: isActive ? 1 : 0.7 }}
                        transition={{ duration: 0.22 }}
                        className={`text-h5 font-medium leading-none mt-1 shrink-0 ${
                          isActive ? "text-black" : "text-white"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </motion.span>

                      {/* TEXT CONTENT */}
                      <div className="relative z-10">
                        <motion.h3
                          animate={{ x: isActive ? 2 : 0 }}
                          transition={{
                            duration: 0.24,
                            ease: "easeOut",
                          }}
                          className={`text-h5 font-medium leading-none mb-3 ${
                            isActive ? "text-black" : "text-white"
                          }`}
                        >
                          {service.name}
                        </motion.h3>

                        <motion.p
                          initial={false}
                          animate={{
                            opacity: isActive ? 1 : 0.7,
                            y: isActive ? 0 : 2,
                          }}
                          transition={{ duration: 0.25 }}
                          className={`max-w-2xl text-sm md:text-base leading-relaxed ${
                            isActive ? "text-black/80" : "text-white/50"
                          }`}
                        >
                          {service.preview}
                        </motion.p>
                      </div>
                    </div>

                    {/* ICON */}
                    <motion.span
                      whileHover={{ x: 2, y: -2 }}
                      className={`relative z-10 text-h3 leading-none transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0 ${
                        isActive ? "text-black" : "text-white"
                      }`}
                      aria-hidden
                    >
                      <RxArrowTopRight />
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