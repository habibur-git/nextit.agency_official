"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ModuleTitle } from "./ModuleTitle";

const industryCards = [
  {
    title: "Finance & Fintech",
    image: "/assets/img/industry/Finance-&-Fintech.webp",
    alt: "Secure and modern Fintech interface design",
    description:
      "Engineered for trust and precision. We design secure, high-stakes interfaces for digital banking and asset management.",
    className: "bg-[#5D00FA]",
  },
  {
    title: "SaaS & B2B Platforms",
    image: "/assets/img/industry/SaaS-&-B2B-Platforms.webp",
    alt: "Complex B2B SaaS dashboard design",
    description:
      "We turn complex workflows into intuitive experiences, reducing churn and increasing user LTV for enterprise platforms.",
    className: "bg-[#FF5000]",
  },
  {
    title: "E-Commerce",
    image: "/assets/img/industry/E-Commerce.webp",
    alt: "High-converting E-commerce storefront",
    description:
      "Conversion-first shopping experiences. We build fast, fluid storefronts designed to maximize average order value.",
    className: "bg-black",
  },
  {
    title: "Hospitality & Food Industry",
    image: "/assets/img/industry/Hospitality-&-Legal-Services.webp",
    alt: "Professional services and hospitality web design",
    description:
      "Sophisticated digital presence for high-touch industries. We bridge the gap between luxury service and digital efficiency.",
    className: "bg-[#0D6A99]",
  },
  {
    title: "EdTech & HealthTech",
    image: "/assets/img/industry/EdTech-&-HealthTech.webp",
    alt: "Modern EdTech and HealthTech interface",
    description:
      "Data-heavy platforms made simple. We design for patient outcomes and student engagement with accessible, clean UI.",
    className: "bg-[#EAB308]",
  },
  {
    title: "Web3 & AI",
    image: "/assets/img/industry/Web3-AI.webp",
    alt: "Cutting-edge Web3 and AI product design",
    description:
      "Building the future of the decentralized web. We simplify blockchain complexity and AI logic into human-readable products.",
    className: "bg-[#EF4444]",
  },
];

export default function Industry() {
  return (
    <section className="space">
      <div className="container">
        <ModuleTitle
          suppertitle="Industry"
          title="Industries we specialise in"
          ctaText="Consult an expert"
          variant="v2"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industryCards.map((card) => (
            <motion.div
              key={card.title}
              className={`group relative h-[550px] overflow-hidden ${card.className}`}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image
                src={card.image}
                alt={card.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 mt-6"
              />

              <div className="absolute bottom-0 px-8 py-8 pt-24 bg-linear-to-t from-black via-black/70 to-transparent">
                <h4 className="text-white">{card.title}</h4>
                <p className="text-white/80">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
