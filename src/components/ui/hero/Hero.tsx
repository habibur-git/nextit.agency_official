"use client";

import Button from "@/components/button/Button";
import { motion } from "framer-motion";
import { IoLogoWhatsapp } from "react-icons/io";

const STATS = [
  { value: 120, suffix: "+", label: "Project Complete" },
  { value: 60, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years of experience" },
  { value: 15, suffix: "+", label: "Team members" },
] as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full max-w-full min-w-0 flex-col overflow-hidden space bg-[url('/assets/img/bg/hero-1-bg.webp')] bg-cover bg-center">
      <div className="container relative z-10 flex min-h-0 flex-1 flex-col h-full justify-between">
        {/* HERO CONTENT */}
        <div className="mt-24 mb-12 flex h-full min-h-0 flex-col items-center justify-center text-center md:mb-0 lg:h-[80%]">
          {/* Badge */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm tracking-normal px-4 py-1.5 bg-green/20 rounded-full text-green w-full max-w-[420px] sm:w-max flex items-center gap-2 capitalize font-bold"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span>
            </span>
            Accepting New Projects
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="leading-[150%] font-light text-title text-[36px] sm:text-[40px] md:text-h2 lg:text-[56px] mt-4 max-w-[1120px] capitalize"
          >
            {/* Grow Your Business with Powerful Branding & Smart Marketing */}
            Grow Your Business with <br />
            <strong className="font-semi-bold">
              Powerful Branding & Smart Marketing
            </strong>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[18px] text-title/60 font-body mt-4 hero-desc tracking-normal"
          >
            We help businesses attract customers, build strong brands, and
            increase sales through high-converting strategies.
          </motion.h2>
          <div className="mt-12 flex items-center gap-5">
            <Button
              href="https://cal.com/NextIT/15min"
              target="_blank"
              label="Book a Call"
              variant="primary"
            />
            <Button
              href="https://wa.me/message/ZAW5DMQBOXWVL1"
              label="Let’s Talk"
              variant="link"
              icon={<IoLogoWhatsapp className="text-xl text-[#25D366]" />}
              slideIconRotate={-30}
              iconRotate={15}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 mt-32">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl w-max text-center flex items-center justify-center flex-col"
            >
              <p className="text-white text-h3 font-bold mb-1">
                {stat.value}
                {stat.suffix}
              </p>
              <p className="text-white/50 text-small mb-0">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
