"use client";

import { ModuleTitle } from "@/components/common/ModuleTitle";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const STEP_INDICATOR_COUNT = 3;

const processSteps = [
  {
    id: 1,
    title: "Discover",
    subtitle: "Clarity From the Start",
    description:
      "We begin with a focused call to understand your goals, users, and product direction. This gives us shared direction before design or development begins.",
    image: "/assets/img/bg/Discover.webp",
  },
  {
    id: 2,
    title: "Design & Build",
    subtitle: "One Team. One Execution Flow.",
    description:
      "Design and development move forward within one team, working in parallel from the start. This reduces handoffs, shortens feedback cycles, and keeps delivery consistent.",
    image: "/assets/img/bg/Design & Build.webp",
  },
  {
    id: 3,
    title: "Launch & Scale",
    subtitle: "Built to Grow Beyond Day One",
    description:
      "Following launch, the product is refined through structured updates and ongoing improvements to support long-term progress.",
    image: "/assets/img/bg/Launch & Scale.webp",
  },
  {
    id: 1,
    title: "Discover",
    subtitle: "Clarity From the Start",
    description:
      "We begin with a focused call to understand your goals, users, and product direction. This gives us shared direction before design or development begins.",
    image: "/assets/img/bg/Discover.webp",
  },
  {
    id: 2,
    title: "Design & Build",
    subtitle: "One Team. One Execution Flow.",
    description:
      "Design and development move forward within one team, working in parallel from the start. This reduces handoffs, shortens feedback cycles, and keeps delivery consistent.",
    image: "/assets/img/bg/Design & Build.webp",
  },
  {
    id: 3,
    title: "Launch & Scale",
    subtitle: "Built to Grow Beyond Day One",
    description:
      "Following launch, the product is refined through structured updates and ongoing improvements to support long-term progress.",
    image: "/assets/img/bg/Launch & Scale.webp",
  },
];

/** Scroll progress [start, end] per card: bottom → row, left → right order. Windows overlap slightly for a cascade. */
const CARD_ENTER: readonly [number, number][] = [
  [0.05, 0.26],
  [0.14, 0.36],
  [0.24, 0.46],
];

/**
 * Match reference: vertical gradient, strong hue at bottom, almost white at top.
 * CSS `to top` → first stops = bottom, last = top.
 */
const CARD_BG_GRADIENT: readonly string[] = [
  "linear-gradient(to top, #ff4d29 0%, #ff4d29 12%, #ffffff08 50%, #ffffff08 80%, #ffffff08 100%)",
  "linear-gradient(to top, #5020AC 0%, #5020AC 12%, #ffffff08 50%, #ffffff08 78%, #ffffff08 100%)",
  "linear-gradient(to top, #fbc02d 0%, #fbc02d 12%, #ffffff08 50%, #ffffff08 78%, #ffffff08 100%)",
];

function ProcessStepCard({
  step,
  idx,
  scrollYProgress,
}: {
  step: (typeof processSteps)[number];
  idx: number;
  scrollYProgress: MotionValue<number>;
}) {
  const [tStart, tEnd] = CARD_ENTER[idx] ?? [0, 0.3];
  const fadeEnd = Math.min(tStart + 0.1, tEnd);

  const opacity = useTransform(
    scrollYProgress,
    [tStart, fadeEnd, 1],
    [0, 1, 1],
  );

  /** Bottom → final row: large positive y, then clamp at 0 (three keyframes). */
  const y = useTransform(scrollYProgress, [tStart, tEnd, 1], [120, 0, 0]);

  const cardBg = CARD_BG_GRADIENT[idx] ?? CARD_BG_GRADIENT[0];

  return (
    <motion.div
      style={{
        opacity,
        y,
        willChange: "transform, opacity",
        background: cardBg,
      }}
      className="flex min-h-full min-w-0 flex-col rounded-3xl p-6 pb-0 md:h-[530px] md:p-8 md:pb-0 overflow-hidden"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-h4 font-bold uppercase opacity-40">
          0{idx + 1}
        </span>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: STEP_INDICATOR_COUNT }).map((_, i) => (
            <span
              key={i}
              className={`text-lg ${i <= idx ? "text-title" : "text-title/30"}`}
              aria-hidden
            >
              +
            </span>
          ))}
        </div>
      </div>

      <h4 className="mb-4 mt-3 text-theme">{step.title}</h4>

      <p className="flex-1 text-base leading-relaxed text-desc">
        {step.description}
      </p>
      <Image
        src={step.image}
        alt={step.title}
        width={420}
        height={300}
        className="mt-8 w-full  object-cover"
      />
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    /** Tuned so cards settle into the row while the block is near the viewport center. */
    offset: ["start 0.80", "end 0.10"],
  });

  return (
    <section ref={sectionRef} className="relative space ">
      <div className="container">
        <ModuleTitle
          suppertitle="Workflow Process"
          title="Our 3-step sprint  **gets you to launch — fast.**"
          variant="v1"
        />
        {/* md+: 3 equal columns in one row; sm: stack with same scroll animation */}
        <div className="grid w-full grid-cols-1 items-stretch gap-6 sm:gap-5 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
          {processSteps.map((step, idx) => (
            <ProcessStepCard
              key={step.id}
              step={step}
              idx={idx}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
