"use client";

import clsx from "clsx";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import Slider from "react-slick";

function subscribeSlides(onChange: () => void) {
  const q480 = window.matchMedia("(max-width: 480px)");
  const q768 = window.matchMedia("(max-width: 768px)");
  q480.addEventListener("change", onChange);
  q768.addEventListener("change", onChange);
  return () => {
    q480.removeEventListener("change", onChange);
    q768.removeEventListener("change", onChange);
  };
}

function getSlidesToShow() {
  if (window.matchMedia("(max-width: 480px)").matches) return 2;
  if (window.matchMedia("(max-width: 768px)").matches) return 3;
  return 6;
}

interface Props {
  images: string[];
  variant?: "normal" | "invert";
  className?: string;
}

export default function BrandMarquee({
  images,
  variant = "normal",
  className,
}: Props) {
  const slidesToShow = useSyncExternalStore(
    subscribeSlides,
    getSlidesToShow,
    () => 6,
  );

  const imageClass =
    variant === "invert" ? "invert brightness-0 saturate-0 contrast-200" : "";
  const headingClass = variant === "invert" ? "text-white" : "text-white";
  const edgeFadeL =
    variant === "invert"
      ? "bg-gradient-to-r from-black to-transparent"
      : "bg-gradient-to-r from-[var(--body-color)] to-transparent";
  const edgeFadeR =
    variant === "invert"
      ? "bg-gradient-to-l from-black to-transparent"
      : "bg-gradient-to-l from-[var(--body-color)] to-transparent";

  if (images.length === 0) return null;

  return (
    <div className={clsx("w-full max-w-full min-w-0", className)}>
      <div className="mx-auto mb-12 max-w-[700px] text-center">
        <p className={`text-h6 leading-normal capitalize ${headingClass}`}>
          Trusted by 100+ Founders & Teams Worldwide
        </p>
      </div>

      <div className="relative isolate min-w-0 w-full">
        <div
          className={clsx(
            "pointer-events-none absolute inset-y-0 left-0 z-10 w-14 sm:w-20 md:w-28",
            edgeFadeL,
          )}
          aria-hidden
        />
        <div
          className={clsx(
            "pointer-events-none absolute inset-y-0 right-0 z-10 w-14 sm:w-20 md:w-28",
            edgeFadeR,
          )}
          aria-hidden
        />
        <Slider
          key={slidesToShow}
          infinite
          slidesToShow={slidesToShow}
          slidesToScroll={1}
          autoplay
          speed={5000}
          autoplaySpeed={0}
          cssEase="linear"
          arrows={false}
          draggable={false}
          pauseOnHover={false}
        >
          {images.map((src, i) => (
            <div key={i} className="flex items-center justify-center">
              <Image
                src={src}
                alt={`Brand logo ${i + 1}`}
                width={120}
                height={50}
                className={clsx("h-[40px] object-cover", imageClass)}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
