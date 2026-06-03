"use client";

import { siteConfig } from "@/data/site";
import { motion, useReducedMotion } from "@/lib/animations";
import { heroCardBody, heroCardHeader, heroCardShell } from "@/lib/card-styles";
import { cn } from "@/lib/utils";

export default function ResumePreview() {
  const shouldReduceMotion = useReducedMotion();
  const pdfPath = siteConfig.resumeUrl;
  const previewUrl = `${pdfPath}#toolbar=0&navpanes=0&view=FitH`;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { y: 12 }}
      animate={shouldReduceMotion ? undefined : { y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={heroCardShell}
    >
      <div className={heroCardHeader}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-caramel">
            Resume
          </p>
          <p className="font-mono text-[10px] text-mocha">resume.pdf</p>
        </div>
        <a
          href={pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-beige px-3 py-1 text-xs font-medium text-caramel transition-colors hover:border-caramel hover:bg-foam"
        >
          Open full -&gt;
        </a>
      </div>

      <div className={cn(heroCardBody, "overflow-hidden p-0")}>
        <iframe
          src={previewUrl}
          title="Resume preview"
          className="min-h-[320px] w-full flex-1 rounded-b-2xl border-0 bg-steamed lg:min-h-[360px]"
        />
      </div>
    </motion.div>
  );
}
