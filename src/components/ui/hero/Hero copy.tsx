"use client";

import Button from "@/components/button/Button";
import { brandLogos } from "@/data/brandsData";
import { motion } from "framer-motion";
import { IoLogoWhatsapp } from "react-icons/io";
import BrandMarquee from "../BrandMarquee";

/* ------------------ Component ------------------ */
export default function Hero() {
  return (
    <section className="relative h-full lg:h-screen w-full overflow-hidden bg-[#050505] py-16">
      {/* Background Effects */}

      <div className="absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(ellipse_at_bottom,rgba(255,207,1,0.6),rgba(255,207,1,0.25)_40%,transparent_75%)] blur-xl" />

      <div className="h-full flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center h-full overflow-hidden">
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
        </div>
        <div className="relative z-10 mt-12 w-full">
          <BrandMarquee
            images={brandLogos}
            variant="invert"
            className="[&_img]:opacity-95"
          />
        </div>
      </div>
    </section>
  );
}
