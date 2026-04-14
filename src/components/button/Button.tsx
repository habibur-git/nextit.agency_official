"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

interface ButtonProps {
  href?: string;
  /** Passed through when rendering as a link (e.g. `target="_blank"` for external URLs). */
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  label?: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "white" | "dark" | "link";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: React.ReactNode;
  /** Extra rotation (deg) on the icon glyph only (inside the slide strip). */
  iconRotate?: number;
  /**
   * Rotation (deg) of the whole sliding icon strip inside the white circle.
   * Matches `-rotate-45` by default; set e.g. `0` for no tilt.
   */
  slideIconRotate?: number;
  /** Pill / slide-row: show the white circle + arrow strip. Default `true`. When `false`, height is fixed at 48px (`h-12`). */
  showIconArea?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const PILL_BY_SIZE = {
  sm: { pad: "py-1.5 pl-6 pr-1.5 text-sm", circle: "size-9", arrow: "text-lg" },
  md: { pad: "py-2 pl-7 pr-2", circle: "size-10", arrow: "text-xl" },
  lg: {
    pad: "py-2.5 pl-8 pr-2.5 text-lg",
    circle: "size-11",
    arrow: "text-xl",
  },
  xl: { pad: "py-3 pl-9 pr-3 text-xl", circle: "size-12", arrow: "text-2xl" },
} as const;

/** Horizontal-only padding for pill at fixed h-12 (no icon circle). */
const PILL_PAD_LABEL_ONLY = {
  sm: "px-6 text-sm",
  md: "px-7",
  lg: "px-8 text-lg",
  xl: "px-9 text-xl",
} as const;

type PillVariant = "primary" | "secondary";

const PILL_BAR: Record<PillVariant, string> = {
  primary: "bg-theme text-body ",
  secondary: "bg-secondary text-title ",
};

const PILL_LABEL: Record<PillVariant, string> = {
  primary: "text-body",
  secondary: "text-title",
};

const PILL_ARROW: Record<PillVariant, string> = {
  primary: "text-black",
  secondary: "text-title",
};

function isPillVariant(v: ButtonProps["variant"]): v is PillVariant {
  return v === "primary" || v === "secondary";
}

const DEFAULT_SLIDE_ICON_ROTATE = -45;

function wrapIconRotate(
  degrees: number | undefined,
  node: React.ReactNode,
): React.ReactNode {
  if (node == null || node === false) return null;
  if (degrees === undefined) return node;
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center"
      style={{ transform: `rotate(${degrees}deg)` }}
    >
      {node}
    </span>
  );
}

export default function Button({
  href,
  target,
  rel,
  label,
  className = "",
  variant = "primary",
  size = "md",
  icon,
  iconRotate,
  slideIconRotate,
  showIconArea = true,
  loading = false,
  disabled = false,
  children,
  onClick,
  type = "button",
}: ButtonProps) {
  const pill = isPillVariant(variant);
  const [pillHover, setPillHover] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 280, damping: 24, mass: 0.55 });
  const sy = useSpring(my, { stiffness: 280, damping: 24, mass: 0.55 });

  const onPillMove = (
    e: React.PointerEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    if (disabled || loading) return;
    const r = e.currentTarget.getBoundingClientRect();
    const hx = r.width / 2;
    const hy = r.height / 2;
    mx.set(((e.clientX - r.left - hx) / hx) * 6);
    my.set(((e.clientY - r.top - hy) / hy) * 6);
  };

  const onPillLeave = () => {
    mx.set(0);
    my.set(0);
    setPillHover(false);
  };

  const baseClasses =
    "relative inline-flex items-center justify-center px-7 py-3.5 text-base font-medium font-title rounded-full border-none transition-all duration-300 ease-in-out overflow-hidden cursor-pointer";

  const variantClasses: Record<"outline" | "white" | "dark" | "link", string> =
    {
      outline: "btn-outline text-black",
      white: "btn-white text-black",
      dark: "btn-dark text-black",
      link: "bg-bg text-title transition-colors hover:bg-theme hover:text-white",
    };

  /** Slide row label: inherit button `text-*` so global `span { text-desc }` does not win. */
  const slideLayoutLabelClass =
    "min-w-0 flex-1 whitespace-normal text-left leading-snug text-inherit transition-colors";

  const sizeClasses = { sm: "btn-sm", md: "", lg: "btn-lg", xl: "btn-xl" };

  const p = PILL_BY_SIZE[size];
  const pillVariant = pill ? variant : "primary";

  const linkDefaultArrow = (
    <BsArrowRight className="inline-block" aria-hidden />
  );
  const legacyTrailingIcon =
    variant === "link" ? (icon ?? linkDefaultArrow) : (icon ?? null);

  /** Link (with icon area) or outline/white/dark with `icon` + icon area. */
  const slideLayout = !pill && showIconArea && legacyTrailingIcon != null;

  /** Fixed 48px when the trailing icon circle is hidden. */
  const heightWithoutIconArea = !showIconArea ? "h-12 min-h-12 box-border" : "";

  const buttonClasses = pill
    ? [
        "relative inline-flex w-max max-w-full min-w-0 cursor-pointer rounded-full border-none font-title font-medium",
        showIconArea
          ? "items-center justify-between gap-3"
          : "items-center justify-center",
        PILL_BAR[pillVariant],
        showIconArea ? p.pad : PILL_PAD_LABEL_ONLY[size],
        heightWithoutIconArea,
        disabled || loading ? "pointer-events-none opacity-60" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")
    : slideLayout
      ? [
          "relative inline-flex w-max max-w-full min-w-0 cursor-pointer items-center justify-between gap-3 rounded-full border-none font-title font-medium transition-all duration-300 ease-in-out overflow-hidden",
          p.pad,
          variantClasses[variant],
          "btn-icon",
          disabled || loading ? "pointer-events-none opacity-60" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")
      : [
          baseClasses,
          !showIconArea ? "!py-0" : "",
          variantClasses[variant],
          sizeClasses[size],
          heightWithoutIconArea,
          disabled || loading ? "opacity-60 pointer-events-none" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ");

  const loader = (
    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
  );
  const pillLoader =
    pillVariant === "secondary" ? (
      <span className="size-4 animate-spin rounded-full border-2 border-title border-t-transparent" />
    ) : (
      <span className="size-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
    );

  const pillArrow = icon ?? (
    <BsArrowRight className={`${p.arrow} ${PILL_ARROW[pillVariant]}`} />
  );
  const pillArrowNode = wrapIconRotate(iconRotate, pillArrow);

  const legacySlideIcon = icon ?? (
    <BsArrowRight className={`${p.arrow} text-title`} />
  );
  const legacySlideIconNode = wrapIconRotate(iconRotate, legacySlideIcon);

  const slideStripRotationDeg =
    slideIconRotate !== undefined ? slideIconRotate : DEFAULT_SLIDE_ICON_ROTATE;

  const circleSlide = (arrowNode: React.ReactNode) => (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ${p.circle}`}
      aria-hidden
    >
      {loading ? (
        pillLoader
      ) : (
        <span
          className="relative block size-full overflow-hidden"
          style={{ transform: `rotate(${slideStripRotationDeg}deg)` }}
        >
          <motion.span
            className="flex h-full will-change-transform"
            style={{ width: "200%" }}
            animate={{ x: pillHover ? "0%" : "-50%" }}
            transition={{ duration: 0.36, ease: [0.45, 0, 0.55, 1] }}
            aria-hidden
          >
            {[0, 1].map((i) => (
              <span
                key={i}
                className="flex h-full w-1/2 shrink-0 items-center justify-center"
              >
                {arrowNode}
              </span>
            ))}
          </motion.span>
        </span>
      )}
    </span>
  );

  const content = pill ? (
    <>
      <span
        className={`min-w-0 whitespace-normal leading-snug ${PILL_LABEL[pillVariant]} ${showIconArea ? "flex-1 text-left" : "text-center"}`}
      >
        {loading ? "Sending..." : children || label}
      </span>
      {showIconArea ? circleSlide(pillArrowNode) : null}
    </>
  ) : slideLayout ? (
    <>
      <span className={slideLayoutLabelClass}>
        {loading ? "Sending..." : children || label}
      </span>
      {circleSlide(legacySlideIconNode)}
    </>
  ) : (
    <div className="flex items-center justify-center gap-2">
      {loading && loader}
      {loading ? "Sending..." : children || label}
      {icon}
    </div>
  );

  const motionIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  };

  const pillMotion = {
    ...motionIn,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.97 },
    style: { x: sx, y: sy },
  };

  const defaultMotion = {
    ...motionIn,
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.95 },
  };

  const slideInteraction =
    (slideLayout || (pill && showIconArea)) && !disabled && !loading;
  const pillEvents = slideInteraction
    ? {
        onPointerEnter: () => setPillHover(true),
        onPointerMove: onPillMove,
        onPointerLeave: onPillLeave,
      }
    : {};

  if (href && !disabled) {
    return (
      <motion.div
        {...(pill || slideLayout ? pillMotion : defaultMotion)}
        className={`w-max ${className}`}
      >
        <Link
          href={href}
          scroll={false}
          className={buttonClasses}
          {...(target != null ? { target } : {})}
          {...(rel != null
            ? { rel }
            : target === "_blank"
              ? { rel: "noopener noreferrer" }
              : {})}
          {...pillEvents}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      {...pillEvents}
      {...(pill || slideLayout ? pillMotion : defaultMotion)}
    >
      {content}
    </motion.button>
  );
}
