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
    <section className="pb-8 pt-24 bg-bg">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto min-h-[600px]">
          {/* THE FOUNDER CARD */}
          <motion.div
            className="col-span-1 md:col-span-5 relative rounded-[2.5rem] overflow-hidden bg-[#111] border border-white/5 group shadow-2xl"
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

          {/* THE "WHY" CARD */}
          <motion.div
            className="col-span-1 md:col-span-7 p-10 md:p-16 bg-white/5 rounded-[2.5rem] border border-white/5 flex flex-col justify-center relative overflow-hidden backdrop-blur-3xl"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className="text-h3 text-white mb-8">About Us</h3>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mb-16">
              Next IT is a{" "}
              <strong className="text-theme font-medium">
                global branding and digital solutions agency
              </strong>{" "}
              helping businesses build powerful brands and grow in the digital
              world. Through{" "}
              <strong className="text-theme font-medium">
                creativity, strategy, and technology
              </strong>
              , we deliver impactful branding, web development, and digital
              marketing solutions that create{" "}
              <strong className="text-theme font-medium">
                meaningful brand experiences
              </strong>{" "}
              and drive{" "}
              <strong className="text-theme font-medium">
                long-term growth
              </strong>
              .
            </p>
            <div>
              <Button label="About Us" href="/about-us" variant="primary" />
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 rounded-full border border-white/10 text-xs font-medium text-white/70 hover:bg-white/10 transition-colors">
                <RiShieldCheckLine className="w-4 h-4 text-theme shrink-0" />
                Branding & Identity
              </div>

              <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 rounded-full border border-white/10 text-xs font-medium text-white/70 hover:bg-white/10 transition-colors">
                <RiGlobalLine className="w-4 h-4 text-theme shrink-0" />
                Web Development
              </div>

              <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 rounded-full border border-white/10 text-xs font-medium text-white/70 hover:bg-white/10 transition-colors">
                <RiSparkling2Line className="w-4 h-4 text-theme shrink-0" />
                Digital Marketing
              </div>
            </div>
            <Image
              src="/assets/img/favi-logo.png"
              alt="About Us"
              width={200}
              height={200}
              className="absolute bottom-0 -right-8 -z-10 w-[320px] h-[320px] object-contain opacity-10"
            />
          </motion.div>
        </div>
      </div>
      <div className="mt-30 mb-12">
        <BrandMarquee images={brandLogos} />
      </div>
    </section>
  );
}
