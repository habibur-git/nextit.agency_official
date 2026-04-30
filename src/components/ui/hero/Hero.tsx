"use client";

import Button from "@/components/button/Button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";

/* ------------------ Stats Data ------------------ */
const STATS = [
  { value: 120, suffix: "+", label: "Project Complete" },
  { value: 60, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years of experience" },
  { value: 15, suffix: "+", label: "Team members" },
] as const;

/* ------------------ Count Hook ------------------ */
function useCountUp(end: number, duration = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
}

/* ------------------ Component ------------------ */
export default function Hero() {
  return (
    <section className="relative flex h-full lg:h-screen w-full overflow-hidden bg-[#050505] py-16">
      {/* Background Effects */}

      <div className="absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(ellipse_at_bottom,rgba(255,207,1,0.6),rgba(255,207,1,0.25)_40%,transparent_75%)] blur-xl" />

      <div className="container flex flex-col items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-full flex flex-col items-center justify-center"
        >
          {/* Floating Tags */}
          <motion.span
            initial={{ opacity: 0, x: -10, y: 10 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.35, delay: 0.2 },
              x: { duration: 0.35, delay: 0.2 },
              y: { duration: 3.4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute left-0 top-1/5 translate-x-1/2 rounded-full border border-[#f47f63]/35 bg-theme px-4 py-1 text-[11px] font-semibold text-body shadow-[0_10px_30px_rgba(244,127,99,0.3)] hidden md:block"
          >
            Agency
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 10, y: 10 }}
            animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.35, delay: 0.35 },
              x: { duration: 0.35, delay: 0.35 },
              y: { duration: 3.1, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute right-3 top-[35%] rounded-full border border-white/20 bg-white px-3 py-1 text-[11px] font-semibold text-black hidden md:block"
          >
            Expert
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 8, y: 10 }}
            animate={{ opacity: 1, x: 0, y: [0, -7, 0] }}
            transition={{
              opacity: { duration: 0.35, delay: 0.5 },
              x: { duration: 0.35, delay: 0.5 },
              y: { duration: 3.7, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute bottom-12 right-[20%] rounded-full border border-[#e9ef8f]/25 bg-[#e9ef8f] px-4 py-1 text-[11px] font-semibold text-black shadow-[0_10px_30px_rgba(233,239,143,0.3)] hidden md:block"
          >
            Innovative
          </motion.span>

          {/* Content */}
          <div className="flex w-full flex-col items-center justify-center text-center h-full mt-12">
            <h1 className="text-balance text-[44px] font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-[56px] md:text-[74px]">
              Grow Your Business <br /> with {""}
              <strong className="font-semi-bold">
                Powerful Branding <br />& Smart Marketing
              </strong>
            </h1>

            <h2 className="mx-auto mt-5 text-[17px] leading-relaxed text-white/65">
              We help businesses attract customers, build strong brands, and
              increase sales through high-converting strategies.
            </h2>

            {/* Buttons */}
            <div className="mt-12 flex flex-wrap items-center gap-5">
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
        </motion.div>

        {/* 🔥 Stats Section */}
        <div className="w-full max-w-full pt-10 relative z-10">
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
            {STATS.map((stat, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const count = useCountUp(stat.value);
              return (
                <div
                  key={i}
                  className="group flex flex-col items-center justify-center text-center transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* Number */}
                  <h3 className="text-2xl sm:text-3xl md:text-[40px] font-semibold text-white tracking-tight">
                    {count}
                    {stat.suffix}
                  </h3>

                  {/* Divider */}
                  <div className="mt-2 h-px w-10 bg-linear-to-r from-transparent via-white/30 to-transparent" />

                  {/* Label */}
                  <p className="mt-3 text-xs sm:text-sm text-white/80">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
