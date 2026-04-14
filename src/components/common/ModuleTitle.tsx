"use client";

import { motion } from "framer-motion";
import React from "react";
import Button from "../button/Button";

type HTMLContent = string | { __html: string };

/** Wrap phrases in **double asterisks** to render them bold (e.g. Let **People** say it). */
function renderStringWithBold(text: string): React.ReactNode {
  const re = /\*\*(.+?)\*\*/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      out.push(text.slice(last, m.index));
    }
    out.push(<strong key={k++}>{m[1]}</strong>);
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    out.push(text.slice(last));
  }
  return out.length === 0 ? text : out;
}

function renderTitleInner(content: HTMLContent): React.ReactNode {
  if (typeof content === "object" && "__html" in content) {
    return <span dangerouslySetInnerHTML={content} />;
  }
  return renderStringWithBold(content);
}

interface ModuleTitleProps {
  suppertitle?: HTMLContent;
  title?: HTMLContent;
  subtitle?: HTMLContent;
  ctaText?: string;
  ctaHref?: string;
  btnVariant?: "dark" | "primary" | "link" | "outline" | "secondary" | "white";
  className?: string;
  variant?: "v1" | "v2" | "v3";
  colorVariant?: "light" | "dark" | "primary";
}

// ✅ Safe content renderer (strings support **bold**)
const RenderContent = ({ content }: { content?: HTMLContent }) => {
  if (!content) return null;
  return <>{renderTitleInner(content)}</>;
};

// Motion wrapper
const MotionWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
);

export const ModuleTitle: React.FC<ModuleTitleProps> = ({
  suppertitle,
  title,
  subtitle,
  ctaText,
  ctaHref,
  btnVariant,
  className = "",
  variant = "v1",
  colorVariant = "dark",
}) => {
  if (!suppertitle && !title && !subtitle && !ctaText) return null;

  const getTitleColor = () => {
    switch (colorVariant) {
      case "light":
        return "text-white";
      case "primary":
        return "text-title";
      case "dark":
      default:
        return "text-title";
    }
  };

  const getParagraphColor = () => {
    switch (colorVariant) {
      case "light":
        return "text-white text-md";
      case "primary":
        return "text-desc text-md";
      case "dark":
      default:
        return "text-desc text-md";
    }
  };

  // ✅ Variant 1 – Centered
  if (variant === "v1") {
    return (
      <MotionWrapper
        className={`text-center space-y-3 mb-16 max-w-[1080px] m-auto flex flex-col items-center ${className}`}
      >
        {suppertitle && (
          <div className="flex items-center gap-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-theme"></span>
            </span>
            <h6
              className={`text-title text-base capitalize ${getParagraphColor()}`}
            >
              {renderTitleInner(suppertitle)}
            </h6>
          </div>
        )}

        {title && (
          <h2 className={`capitalize font-normal ${getTitleColor()}`}>
            {renderTitleInner(title)}
          </h2>
        )}

        {subtitle && (
          <p className={getParagraphColor()}>
            <RenderContent content={subtitle} />
          </p>
        )}

        {ctaText && (
          <Button
            label={ctaText}
            href={ctaHref || "#"}
            {...(btnVariant ? { variant: btnVariant } : {})}
          />
        )}
      </MotionWrapper>
    );
  }

  // ✅ Variant 2 – Left-Aligned
  if (variant === "v2") {
    return (
      <MotionWrapper
        className={`flex flex-wrap justify-between gap-6 mb-16 ${className}`}
      >
        <div className="max-w-[850px] space-y-2">
          {suppertitle && (
            <div className="flex items-center gap-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-theme"></span>
              </span>
              <h6
                className={`text-title text-base capitalize ${getParagraphColor()}`}
              >
                {renderTitleInner(suppertitle)}
              </h6>
            </div>
          )}

          {title && (
            <h2 className={`capitalize font-normal ${getTitleColor()}`}>
              {renderTitleInner(title)}
            </h2>
          )}
        </div>

        <div className="max-w-md flex flex-col justify-end gap-8">
          {subtitle && (
            <p className={getParagraphColor()}>
              <RenderContent content={subtitle} />
            </p>
          )}

          {ctaText && (
            <Button
              label={ctaText}
              href={ctaHref || "#"}
              {...(btnVariant ? { variant: btnVariant } : {})}
            />
          )}
        </div>
      </MotionWrapper>
    );
  }

  // ✅ Variant 3 – Alternative layout
  if (variant === "v3") {
    return (
      <MotionWrapper className={`grid grid-cols-12 gap-6 mb-16 ${className}`}>
        <div className="col-span-12">
          {suppertitle && (
            <div className="flex gap-2">
              <span className="relative flex h-2 w-2 top-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-theme"></span>
              </span>
              <h6
                className={`text-title text-base capitalize ${getParagraphColor()}`}
              >
                {renderTitleInner(suppertitle)}
              </h6>
            </div>
          )}
        </div>

        <div className="col-span-12 space-y-2">
          {title && (
            <h2 className={`capitalize font-normal ${getTitleColor()}`}>
              {renderTitleInner(title)}
            </h2>
          )}

          {subtitle && (
            <p className={getParagraphColor()}>
              <RenderContent content={subtitle} />
            </p>
          )}

          {ctaText && (
            <Button
              label={ctaText}
              href={ctaHref || "#"}
              {...(btnVariant ? { variant: btnVariant } : {})}
            />
          )}
        </div>
      </MotionWrapper>
    );
  }

  return null;
};
