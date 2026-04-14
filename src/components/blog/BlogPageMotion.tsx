"use client";

import { motion } from "framer-motion";

type BlogPageMotionProps = {
  children: React.ReactNode;
};

export default function BlogPageMotion({ children }: BlogPageMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
