"use client";

import { shareOptions, type SharePlatformId } from "@/data/share";
import Link from "next/link";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa6";
import { IoLogoTwitter, IoLogoWhatsapp } from "react-icons/io5";

const ICON_MAP: Record<
  SharePlatformId,
  React.ComponentType<{ className?: string }>
> = {
  facebook: FaFacebook,
  twitter: IoLogoTwitter,
  linkedin: FaLinkedinIn,
  whatsapp: IoLogoWhatsapp,
};

const FALLBACK_ICON = IoLogoTwitter;

type ShareButtonsProps = {
  title: string;
  url: string;
};

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  return (
    <div className="flex items-center flex-col gap-4 sticky top-28 mb-6">
      <h6 className="font-thin text-base">Share:</h6>
      <div className="flex sm:flex-col gap-3">
        {shareOptions.map((option) => {
          const Icon = ICON_MAP[option.id] ?? FALLBACK_ICON;
          return (
            <Link
              key={option.id}
              href={option.getHref(title, url)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={option.label}
              className="text-theme hover:bg-secondary text-[20px] w-12 h-12 flex items-center justify-center rounded-full bg-bg transition-colors"
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
