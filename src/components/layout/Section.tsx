"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "@/lib/animations";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  alternate?: boolean;
}

export default function Section({
  id,
  children,
  className,
  alternate = false,
}: SectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={shouldReduceMotion ? false : { y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "scroll-mt-24 px-6 py-20 md:py-28",
        alternate ? "bg-cream-dark/50" : "bg-cream",
        className,
      )}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </motion.section>
  );
}
