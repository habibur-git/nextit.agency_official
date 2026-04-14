"use client";

import Button from "@/components/button/Button";
import { serviceCategories } from "@/data/serviceCategories";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { GrSend } from "react-icons/gr";

interface SubmenuProps {
  isOpen: boolean;
}

export default function Submenu({ isOpen }: SubmenuProps) {
  if (!isOpen) return null;

  const data = serviceCategories;

  // Service categories matching Services.tsx structure with proper links
  const email = "info@nextit.agency";

  return (
    <div className="fixed top-[75px] inset-x-0 mx-auto bg-bg/50 backdrop-blur-lg rounded-4xl shadow-2xl z-50 p-2 w-[70vw]">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }} // repeatable
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* SERVICE COLUMNS */}
        {data.map((section, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-3xl p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
              duration: 0.5,
              delay: i * 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <h6 className="mb-5 text-title text-[20px] px-2">
              {section.title}
            </h6>
            <div className="flex flex-col">
              {section.items.map((item, idx) => (
                <motion.div
                  className="border-t border-t-border hover:border-transparent"
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <Link
                    href={`/services/${item.slug}`}
                    className="flex items-center justify-between py-5 px-3 hover:bg-[#0000000D] rounded-2xl"
                  >
                    <p className="text-title font-title text-[17px]">
                      {item.title}
                    </p>
                    <FiArrowUpRight className="text-desc/50 text-[22px]" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* CALL CARD */}
        <motion.div
          className="rounded-3xl p-1 flex flex-col justify-between relative bg-[url(/assets/img/bg/herobg1.avif)] bg-no-repeat bg-center object-contain border-4 border-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <>
            <div className="flex items-center justify-between p-5">
              <Image
                src="/assets/img/team/Founder.webp"
                alt="Profile"
                width={300}
                height={300}
                className="w-14 h-14 rounded-full object-cover border border-secondary"
              />

              <p className="text-theme text-small font-medium flex items-center gap-2 mb-0">
                <GoDotFill />
                Available For Call Now
              </p>
            </div>
            <div className="p-5 py-2">
              <p className="text-desc text-base">
                <b className="text-h6 text-title">Schedule a call</b> & Let’s
                connect and see how we can bring your vision to life.
              </p>
              <Button
                label="Schedule a Meeting"
                href="#"
                variant="primary"
                className="w-full mt-6"
              />
            </div>
          </>

          <button className="flex items-center justify-between gap-3 bg-white p-4 rounded-2xl mt-4 cursor-pointer">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-left">Do you prefer email?</span>
              <Link href="mailto:info@nextit.agency">
                <h6 className="text-title mb-0">{email}</h6>
              </Link>
            </div>

            <Link
              href="mailto:info@nextit.agency"
              className="w-12 h-12 bg-bg rounded-full flex items-center justify-center text-xl text-theme"
            >
              <GrSend />
            </Link>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
