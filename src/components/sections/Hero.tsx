"use client";

import Button from "@/components/ui/Button";
import CodeTerminal from "@/components/ui/CodeTerminal";
import ResumePreview from "@/components/ui/ResumePreview";
import { siteConfig } from "@/data/site";
import { motion, useReducedMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";
import HeroProfileCard from "@/components/ui/HeroProfileCard";

const highlights = [
  {
    label: "Education",
    value: "CS @ Waterloo",
    mono: "edu",
  },
  {
    label: "Focus",
    value: "Full-stack",
    mono: "stack",
  },
  {
    label: "Mode",
    value: "Build → Ship",
    mono: "mode",
  },
  {
    label: "Status",
    value: "Learning fast",
    mono: "status",
  },
];

function HeroStatCard({
  label,
  value,
  mono,
  className,
}: {
  label: string;
  value: string;
  mono: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group rounded-xl border border-beige bg-steamed/90 p-4 shadow-warm transition-all duration-300 hover:-translate-y-0.5 hover:border-caramel/30 hover:shadow-warm-hover",
        className,
      )}
    >
      <p className="font-mono text-[10px] uppercase tracking-wider text-caramel/80">
        {mono}()
      </p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-mocha">
        {label}
      </p>
      <p className="mt-0.5 font-serif text-base font-medium text-espresso transition-colors group-hover:text-caramel-deep">
        {value}
      </p>
    </div>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden bg-cream px-6 pb-20 pt-32 md:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-toasted/30 to-caramel/10 blur-3xl" />
        <div className="absolute -right-24 bottom-32 h-80 w-80 rounded-full bg-gradient-to-tl from-cream-dark to-toasted/20 blur-3xl" />
        <p className="absolute right-[10%] top-[18%] font-mono text-6xl text-beige/40 select-none">
          {"{ }"}
        </p>
        <p className="absolute bottom-[22%] left-[6%] font-mono text-4xl text-toasted/25 select-none">
          {"</>"}
        </p>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={shouldReduceMotion ? false : { y: 20 }}
            animate={shouldReduceMotion ? undefined : { y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex h-full flex-col space-y-5"
          >
            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-caramel">
                Portfolio
              </p>
              <span className="hidden h-px flex-1 bg-beige sm:block" />
              <span className="hidden font-mono text-[10px] text-mocha sm:inline">
                v1.0.0
              </span>
            </div>

            <div>
              <h1 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight text-espresso sm:text-5xl md:text-[3.25rem]">
                {siteConfig.name}
              </h1>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-1 w-14 rounded-full bg-caramel/70" />
                <span className="font-mono text-xs text-mocha">
                  computer_science.student
                </span>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-beige/80 bg-steamed/60 p-5 backdrop-blur-sm">
              <p className="text-base font-medium leading-snug text-espresso md:text-lg">
                {siteConfig.title}
              </p>
              <p className="text-sm leading-relaxed text-mocha md:text-base">
                {siteConfig.tagline}
              </p>
              <p className="border-t border-beige pt-3 text-sm leading-relaxed text-mocha/90">
                {siteConfig.supportingLine}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href="#projects" variant="primary">
                View Projects
              </Button>
              <Button href="#contact" variant="primary">
                Contact Me
              </Button>
              <Button href={siteConfig.resumeUrl} variant="primary" external>
                Resume
              </Button>
            </div>

            <div className="pt-2 lg:mt-auto">
              <HeroProfileCard />
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { y: 24 }}
            animate={shouldReduceMotion ? undefined : { y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
            className="flex h-full flex-col gap-4"
          >
            <CodeTerminal />

            <div className="grid grid-cols-2 gap-3">
              {highlights.map((item) => (
                <HeroStatCard key={item.mono} {...item} />
              ))}
            </div>

            <div className="pt-2 lg:mt-auto">
              <ResumePreview />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
