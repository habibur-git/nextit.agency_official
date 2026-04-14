"use client";

import { testimonialData, type TestimonialItem } from "@/data/testimonials";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { motion } from "framer-motion";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";
import "swiper/css";

const NAV_BTN =
  "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-white/10 text-h5 font-bold text-title transition hover:border-title hover:bg-theme hover:text-body disabled:pointer-events-none disabled:opacity-35 cursor-pointer";

function highlighted(text: string, keys?: string[]) {
  if (!keys?.length) return text;
  const sorted = [...keys].sort((a, b) => b.length - a.length);
  const re = new RegExp(
    `(${sorted.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi",
  );
  return text.split(re).map((part, i) =>
    sorted.some((k) => k.toLowerCase() === part.toLowerCase()) ? (
      <strong key={i} className="font-semibold text-title text-[22px]">
        {part}
      </strong>
    ) : (
      <span key={i} className="text-[22px] text-white/80">
        {part}
      </span>
    ),
  );
}

function roleLine(d: string) {
  const t = d.trim();
  return t ? (t.split(",")[0]?.trim() ?? t) : "CEO";
}

function QuoteColumn({
  item,
  showLeftBorder,
}: {
  item: TestimonialItem;
  showLeftBorder: boolean;
}) {
  return (
    <div className="flex min-h-[500px] flex-col justify-between gap-8 px-10 py-10 rounded-3xl bg-body">
      <div>
        <p className="mt-6 text-h6 text-desc">
          {highlighted(item.text, item.highlights)}
        </p>
      </div>
      <div className="flex items-center justify-between gap-4 mt-auto">
        <div className="flex items-center gap-3">
          <Image
            src={item.image}
            alt={item.name}
            width={48}
            height={48}
            className="h-16 w-16 shrink-0 rounded-full object-cover"
          />
          <div>
            <p className="text-h6 font-title font-semibold text-title">
              {item.name}
            </p>
            <p className="mt-0.5 text-sm text-white/50">
              {roleLine(item.designation)} {item.company}
            </p>
          </div>
        </div>
        <div className="text-h4" role="img" aria-label="country flag">
          {item.countryFlag}
        </div>
      </div>
    </div>
  );
}

const items = testimonialData;

export default function Testimonials() {
  const swiper = useRef<SwiperType | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const sync = (s: SwiperType) => {
    swiper.current = s;
    setActiveIndex(s.activeIndex);
    setAtStart(s.isBeginning);
    setAtEnd(s.isEnd);
  };

  return (
    <section
      id="reviews"
      className="overflow-x-hidden bg-bg space main-testimonials"
    >
      <div className="container min-w-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-2 mb-6"
          >
            <h2 className="text-center md:text-left capitalize font-normal">
              What others say about us <strong>instead of us.</strong>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center md:justify-end gap-3"
          >
            <button
              type="button"
              className={NAV_BTN}
              aria-label="Previous testimonials"
              disabled={atStart}
              onClick={() => swiper.current?.slidePrev()}
            >
              <LuMoveLeft />
            </button>
            <button
              type="button"
              className={NAV_BTN}
              aria-label="Next testimonials"
              disabled={atEnd}
              onClick={() => swiper.current?.slideNext()}
            >
              <LuMoveRight />
            </button>
          </motion.div>
        </div>

        {/* Testimonials Swiper */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="min-h-0 min-w-0 lg:min-h-[520px]"
        >
          <Swiper
            onSwiper={sync}
            onSlideChange={sync}
            slidesPerView={1}
            spaceBetween={20}
            speed={450}
            breakpoints={{
              1140: {
                slidesPerView: 3,
              },
              991: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2,
              },
            }}
            className="h-full! w-full min-w-0"
          >
            {items.map((item, index) => {
              const slideIndex = index + 1;
              return (
                <SwiperSlide key={item.id} className="h-full flex gap-5">
                  <QuoteColumn
                    item={item}
                    showLeftBorder={slideIndex > activeIndex}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
