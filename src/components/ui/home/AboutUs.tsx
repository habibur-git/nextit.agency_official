"use client";

import Button from "@/components/button/Button";
import { brandLogos } from "@/data/brandsData";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  RiGlobalLine,
  RiShieldCheckLine,
  RiSparkling2Line,
} from "react-icons/ri";
import BrandMarquee from "../BrandMarquee";

export default function AboutUs() {
  return (
    <section className="space">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto min-h-[600px]">
          {/* VIDEO CARD */}
          <motion.div
            className="col-span-1 md:col-span-5 rounded-4xl overflow-hidden bg-[#111] border border-white/5 group h-150 sticky top-24"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <video
              src="/assets/video/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-1 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
          </motion.div>

          {/* CONTENT CARD */}
          <motion.div
            className="col-span-1 md:col-span-7 p-10 md:p-16 bg-white/5 rounded-4xl border border-white/5 flex flex-col justify-center relative overflow-hidden backdrop-blur-3xl"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* EYEBROW */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-theme font-medium tracking-wide">
                About NextIT
              </span>
            </div>

            {/* HEADING */}
            <h3 className="text-h3 text-white mb-8">
              A Creative Digital Agency That Puts Your Business Growth First
            </h3>

            {/* PARAGRAPH 1 */}
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mb-8">
              Next IT is a full-service{" "}
              <strong className="text-theme font-medium">
                branding and digital solutions agency
              </strong>{" "}
              serving clients worldwide. We partner with startups, SMEs, and
              established businesses to build powerful brand identities, launch
              high-performance websites, and run marketing campaigns that
              actually convert.
            </p>

            {/* PARAGRAPH 2 */}
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl mb-16">
              Since our founding, we’ve helped over{" "}
              <strong className="text-theme font-medium">
                100+ businesses
              </strong>{" "}
              across industries including retail, food & beverage, fashion,
              manufacturing, and professional services strengthen their online
              presence and increase revenue. Our team combines strategy,
              creativity, and technology to deliver measurable business growth —
              not generic solutions.
            </p>

            {/* BUTTON */}
            <div>
              <Button label="About Us" href="/about-us" variant="primary" />
            </div>

            {/* PILLARS */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* CARD 1 */}
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/[0.07] transition-colors">
                <RiShieldCheckLine className="w-5 h-5 text-theme mb-4" />

                <h4 className="text-white text-lg font-medium mb-3">
                  Branding & Identity
                </h4>

                <p className="text-sm leading-relaxed text-white/60">
                  We craft visual identities that build trust, recognition, and
                  lasting brand impact.
                </p>
              </div>

              {/* CARD 2 */}
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/[0.07] transition-colors">
                <RiGlobalLine className="w-5 h-5 text-theme mb-4" />

                <h4 className="text-white text-lg font-medium mb-3">
                  Web Development
                </h4>

                <p className="text-sm leading-relaxed text-white/60">
                  Fast, SEO-friendly websites and e-commerce experiences
                  designed to convert visitors into customers.
                </p>
              </div>

              {/* CARD 3 */}
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/[0.07] transition-colors">
                <RiSparkling2Line className="w-5 h-5 text-theme mb-4" />

                <h4 className="text-white text-lg font-medium mb-3">
                  Digital Marketing
                </h4>

                <p className="text-sm leading-relaxed text-white/60">
                  Data-driven campaigns across social, search, and paid channels
                  that generate real growth.
                </p>
              </div>
            </div>

            {/* BACKGROUND LOGO */}
            <Image
              src="/assets/img/favi-logo.png"
              alt="Next IT"
              width={200}
              height={200}
              className="absolute bottom-0 -right-8 -z-10 w-[320px] h-80 object-contain opacity-10"
            />
          </motion.div>
        </div>
      </div>

      {/* BRAND MARQUEE */}
      <div className="mt-30 -mb-6">
        <BrandMarquee images={brandLogos} className="[&_img]:opacity-50" />
      </div>
    </section>
  );
}
