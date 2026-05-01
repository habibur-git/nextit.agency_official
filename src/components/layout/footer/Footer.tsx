"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  FaBehance,
  FaDribbble,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiCheck, FiCopy } from "react-icons/fi";

export type FooterColumnLink = {
  text: string;
  href: string;
  className?: string;
  icon?: IconType;
  copyValue?: string;
};

const NAV_LINKS = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Services", href: "/services" },
  { text: "Works", href: "/work" },
  { text: "Contact", href: "/contact" },
] as const;

const SOCIAL_LINKS: readonly FooterColumnLink[] = [
  {
    text: "LinkedIn",
    href: "https://www.linkedin.com/company/NextIT",
    icon: FaLinkedinIn,
  },
  { text: "Behance", href: "https://www.youtube.com", icon: FaBehance },
  { text: "Dribbble", href: "https://www.instagram.com", icon: FaDribbble },
  { text: "Instagram", href: "https://www.instagram.com", icon: FaInstagram },
  { text: "Facebook", href: "https://www.instagram.com", icon: FaFacebook },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Refund Policy", href: "/refund-policy" },
] as const;

const LOCATION_DATA = [
  {
    id: 1,
    displayTitle: "Dhaka",
    address:
      "H/1, Road-6, Duaripara Bazar, <br /> Rupnagar, Mirpur, Dhaka-1216",
    phone: "+8801630-253650",
  },
  {
    id: 2,
    displayTitle: "Malaysia",
    address: "Seri Kembangan, Selangor, <br /> Malaysia 43300",
    phone: "+8801690-274952",
  },
  {
    id: 3,
    displayTitle: "Kuwait",
    address:
      "Al-Mubarakah: Fahad Al-Basman Heritage Complex, <br /> Ground Floor, Shop No. 16",
    phone: "+8801690-274952",
  },
] as const;

function addressLines(html: string) {
  return html
    .split(/<br\s*\/?>/i)
    .map((s) =>
      s
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean);
}

const CONTACT_LINKS: FooterColumnLink[] = [
  {
    text: "Book a Meeting",
    href: "https://cal.com/devionex/15min",
  },
  {
    text: "WhatsApp Us",
    href: "https://wa.me/message/ZAW5DMQBOXWVL1",
  },
  {
    text: "info@devionex.com",
    href: "mailto:info@devionex.com",
    className: "text-white font-medium",
    copyValue: "info@devionex.com",
  },
];

const FOOTER_COLUMNS = [
  { title: "Navigation", links: NAV_LINKS },
  { title: "Socials", links: SOCIAL_LINKS },
  { title: "Let's Talk", links: CONTACT_LINKS },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly FooterColumnLink[];
}) {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedLink(value);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch {}
  };

  return (
    <div className="flex flex-col min-w-0">
      <h6 className="text-sm font-semibold uppercase tracking-widest text-zinc-100 mb-6">
        {title}
      </h6>
      <ul className="flex flex-col gap-4 p-0 m-0">
        {links.map((link) => {
          const Icon = link.icon;
          const isCopied = copiedLink === link.copyValue;

          return (
            <li key={link.href + link.text} className="flex items-center group">
              <Link
                href={link.href}
                className={cn(
                  "inline-flex items-center gap-3 text-base text-zinc-400 transition-all duration-300 hover:text-white hover:translate-x-1",
                  link.className,
                )}
                {...(link.href.startsWith("http") && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                {Icon && (
                  <Icon className="size-[18px] text-zinc-500 group-hover:text-white transition-colors" />
                )}
                {link.text}
              </Link>

              {link.copyValue && (
                <button
                  type="button"
                  onClick={() => handleCopy(link.copyValue!)}
                  aria-label={`Copy ${link.text}`}
                  className="ml-3 flex items-center justify-center rounded-md p-1.5 text-zinc-500 transition-all hover:bg-zinc-800 hover:text-white"
                >
                  {isCopied ? (
                    <FiCheck className="size-4 text-green-400" />
                  ) : (
                    <FiCopy className="size-4" />
                  )}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-zinc-950 text-zinc-300 pt-24 overflow-hidden border-t border-zinc-800/50">
      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        {/* Top Section: CTA & Columns Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20"
        >
          {/* Brand Intro / CTA */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 lg:col-span-4 lg:pr-8"
          >
            <Image
              width={1200}
              height={200}
              src="/assets/img/logo.svg"
              alt="DevioNex"
              priority={false}
              className="h-12 w-min mb-6"
            />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              Ready to build <br className="hidden lg:block" /> something
              amazing?
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-md">
              {"Let's"} create digital experiences that elevate your brand and
              drive results.
            </p>
          </motion.div>

          {/* Navigation Columns */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 lg:col-span-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {FOOTER_COLUMNS.map((col) => (
                <FooterColumn
                  key={col.title}
                  title={col.title}
                  links={col.links}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="bg-bg pt-16">
        <div className="mb-24">
          <div className="container">
            <h6 className="mb-8 border-b border-zinc-800/80 pb-4 text-sm font-semibold uppercase tracking-widest text-zinc-100">
              Our Locations
            </h6>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {LOCATION_DATA.map((item) => (
                <article
                  key={item.id}
                  className={cn(
                    "relative rounded-2xl border border-transparent bg-[#FDFBF7] p-2 pr-14 shadow-lg transition-shadow hover:shadow-xl",
                    "dark:border-zinc-800/90 dark:bg-zinc-900/95 dark:shadow-black/30",
                  )}
                >
                  <div className="flex flex-col gap-4 sm:flex-row h-full">
                    <div className="flex size-29 shrink-0 items-center justify-center rounded-xl bg-[#FFF9F0] dark:bg-zinc-950 dark:ring-1 dark:ring-zinc-700/60 h-full">
                      <Building2
                        className="size-14 text-[#F4C458] dark:text-amber-300"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="min-w-0 flex-1 py-3">
                      <h5 className="font-title font-semi-bold">
                        {item.displayTitle}
                      </h5>
                      <div className="mt-2 h-px w-12 rounded-full bg-[#F4C458] dark:bg-amber-300" />
                      <div className="mt-3 space-y-1 text-sm text-[#333] dark:text-zinc-400">
                        {addressLines(item.address).map((line, i) => (
                          <p key={`${item.id}-${i}`}>{line}</p>
                        ))}
                      </div>
                      <Link
                        href={`tel:${item.phone.replace(/\s/g, "")}`}
                        className="mt-4 block text-sm font-bold text-black hover:underline dark:text-zinc-100"
                      >
                        {item.phone}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Large Background Logo Overlay */}
        <div className="relative mb-16 flex justify-center pointer-events-none select-none">
          <Image
            width={1200}
            height={200}
            src="/assets/img/foo.svg"
            alt="DevioNex"
            priority={false}
            className="w-full h-auto max-w-5xl"
          />
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="py-8 border-t border-zinc-800/80">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-6 ">
            <p className="text-sm text-zinc-500 text-center md:text-left">
              © 2024 - {new Date().getFullYear()}{" "}
              <Link
                href="https://devionex.com"
                className="font-medium text-zinc-300 hover:text-white transition-colors"
              >
                DevioNex
              </Link>
              . All Rights Reserved.
            </p>

            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
