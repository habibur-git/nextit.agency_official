"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaBehance,
  FaDribbble,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { GoDownload } from "react-icons/go";

export type FooterColumnLink = {
  text: string;
  href: string;
  className?: string;
  icon?: IconType;
};

const NAV_LINKS = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Services", href: "/services" },
  { text: "Works", href: "/work" },
  { text: "Contact", href: "/contact" },
] as const;

const Industries = [
  { text: "Finance & Fintech", href: "#" },
  { text: "SaaS & B2B Platforms", href: "#" },
  { text: "E-Commerce", href: "#" },
  { text: "Hospitality & Food Industry", href: "#" },
  { text: "EdTech & HealthTech", href: "#" },
  { text: "Web3 & AI", href: "#" },
] as const;

const SOCIAL_LINKS: readonly FooterColumnLink[] = [
  {
    text: "LinkedIn",
    href: "https://www.linkedin.com/company/devionex",
    icon: FaLinkedinIn,
  },
  { text: "Behance", href: "https://www.youtube.com", icon: FaBehance },
  { text: "Dribbble", href: "https://www.instagram.com", icon: FaDribbble },
  { text: "Instagram", href: "https://www.instagram.com", icon: FaInstagram },
  { text: "Facebook", href: "https://www.instagram.com", icon: FaFacebook },
];

const Contact: FooterColumnLink[] = [
  {
    text: "info@nextit.agency",
    href: "mailto:info@nextit.agency",
  },
  // {
  //   text: "+880 1956-463736",
  //   href: "tel:+8801956463736",
  // },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Refund Policy", href: "/refund-policy" },
] as const;

const FOOTER_COLUMNS = [
  { title: "Navigation", links: NAV_LINKS },
  { title: "Industries", links: Industries },
  { title: "Follow Us", links: SOCIAL_LINKS },
  { title: "Drop us a line", links: Contact },
] as const;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly FooterColumnLink[];
}) {
  return (
    <div className="min-w-0">
      <h6 className="text-[15px] font-semi-bold uppercase tracking-[0.08em] text-title">
        {title}
      </h6>
      <div className="mt-3 border-t border-title/20" />
      <ul className="mt-5 flex flex-col gap-3 p-0">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.href + link.text}>
              <Link
                href={link.href}
                className={cn(
                  "group inline-flex items-center gap-2.5 font-body text-base text-title/70 transition-colors hover:text-title",
                  link.className,
                )}
                {...(link.href.startsWith("http") && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                {Icon ? (
                  <span
                    className="inline-flex shrink-0 text-title/55 transition-colors group-hover:text-title"
                    aria-hidden
                  >
                    <Icon className="size-[17px]" />
                  </span>
                ) : null}
                {link.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-bg pt-16 pb-8">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8"
        >
          {FOOTER_COLUMNS.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}
        </motion.div>

        <Image
          width={625}
          height={92}
          src="/assets/img/logo.svg"
          alt="DevioNex"
          priority={false}
          className="mt-12 h-auto w-full"
        />

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="pt-8 bg-theme/10 -mt-10 z-1 relative backdrop-blur-sm flex flex-wrap sm:items-center justify-between gap-6"
        >
          <div>
            <Link
              href="#"
              download
              aria-label="Download Company Deck (PDF, 3 MB)"
              className="group flex max-w-md items-center gap-4 rounded-xl py-1 text-left transition-opacity hover:opacity-90"
            >
              <span
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-title"
                aria-hidden
              >
                <GoDownload className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-title text-[17px] font-semibold text-white">
                  Company Deck
                </span>
                <span className="mt-0.5 block font-body text-sm text-white/55">
                  Deck PDF
                </span>
              </span>
            </Link>
          </div>
          <p className="font-body text-[15px] text-white/80">
            © 2024 - {new Date().getFullYear()}{" "}
            <Link
              href="https://devionex.com"
              className="font-semibold text-secondary underline-offset-2 hover:text-title hover:underline"
            >
              DevioNex{" "}
            </Link>
            | All Rights Reserved.
          </p>
          <ul className="flex flex-wrap sm:items-center sm:justify-center gap-4">
            {LEGAL_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-body text-[15px] text-white/80 transition-colors hover:text-white "
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </footer>
  );
}
