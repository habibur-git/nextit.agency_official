"use client";

import { ModuleTitle } from "@/components/common/ModuleTitle";
import { motion } from "framer-motion";
import Image from "next/image";

const marketThesis = [
  {
    icon: "/assets/img/gif/growth.gif",
    title: "Conversion-led growth",
    description:
      "We don't just build pretty UIs. We engineer user flows designed to turn visitors into customers — every screen built with conversion in mind.",
  },
  {
    icon: "/assets/img/gif/team.gif",
    title: "Fractional product team",
    description:
      "Think of us as your in-house partners. Senior-level design and full-stack engineering, without the full-time overhead or agency markup.",
  },
  {
    icon: "/assets/img/gif/product.gif",
    title: "Rapid product iteration",
    description:
      "We ship production-ready work in days, not months. Your product moves fast without breaking the user experience.",
  },
  {
    icon: "/assets/img/gif/architecture.gif",
    title: "Scalable architecture",
    description:
      "Future-proof your SaaS with a clean Next.js and MongoDB stack — built to handle growth from day one and eliminate technical debt.",
  },
];

function isPublicImagePath(icon: string | undefined): icon is string {
  return (
    typeof icon === "string" &&
    (icon.startsWith("/") ||
      icon.startsWith("http://") ||
      icon.startsWith("https://"))
  );
}

export default function OurApproach() {
  return (
    <section className="space bg-white">
      <div className="container mx-auto px-6">
        <ModuleTitle
          suppertitle="Our approach"
          title="Stability while you transform."
          subtitle="We replaced outdated agency processes with high-velocity sprints — modern engineering, senior-led design, and zero technical debt."
          variant="v2"
        />

        <div className="relative grid grid-cols-1 sm:grid-cols-2">
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-black/10 sm:block" />
          <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-black/10 sm:block" />
          {marketThesis.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex min-h-44 flex-col items-center justify-center bg-white px-5 py-9 text-center sm:min-h-48 sm:px-7 sm:py-10 md:px-8 md:py-12"
            >
              {isPublicImagePath(item.icon) && (
                <div className="mb-3 flex min-h-16 items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={65}
                    height={65}
                    className="object-contain"
                    unoptimized
                  />
                </div>
              )}

              <h4 className="font-title capitalize text-h5 md:text-h4">
                {item.title}
              </h4>

              <p className="mt-2 w-full">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}