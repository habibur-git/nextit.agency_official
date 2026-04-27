"use client";

import Button from "@/components/button/Button";
import { motion } from "framer-motion";
import { IoLogoWhatsapp } from "react-icons/io";

export default function Hero() {
  return (
    <>
      <section className="space w-full overflow-hidden py-16">
        <div className="container">
          {/* Headline */}
          <motion.div
            className="mt-12 max-w-6xl m-auto"
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="leading-[150%] font-light text-title text-[36px] sm:text-[40px] md:text-h2 lg:text-[56px] max-w-[1120px] text-center m-auto capitalize"
            >
              We are NextIT -{" "}
              <strong className="font-semi-bold">
                a design & engineering team
              </strong>{" "}
              built for founders who move fast.
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[18px] text-title/60 font-body mt-4 hero-desc tracking-normal text-center"
            >
              Based in Bangladesh, serving startups and SaaS teams across the US
              and Europe. We combine senior-level UI/UX design with
              production-ready engineering — so you get one team that thinks,
              designs, and ships together.
            </motion.h2>
            <div className="mt-12 flex flex-warp items-center justify-center gap-5">
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
          </motion.div>
        </div>
      </section>
    </>
  );
}
