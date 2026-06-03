"use client";

import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";
import { motion, useReducedMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const shouldReduceMotion = useReducedMotion();
  const active = skillCategories.find((c) => c.id === activeId) ?? skillCategories[0];

  return (
    <Section id="skills" alternate>
      <SectionHeading
        eyebrow="Skills"
        title="Tools and technologies I work with"
        subtitle="Pick a category to explore — organized the way I think about building software."
      />

      {/* Category tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {skillCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveId(category.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
              activeId === category.id
                ? "border-caramel bg-caramel text-steamed shadow-warm"
                : "border-beige bg-steamed text-mocha hover:border-caramel/40 hover:text-espresso",
            )}
          >
            {category.name}
            <span
              className={cn(
                "ml-2 rounded-full px-1.5 py-0.5 text-[10px]",
                activeId === category.id
                  ? "bg-steamed/20 text-steamed"
                  : "bg-foam text-mocha",
              )}
            >
              {category.skills.length}
            </span>
          </button>
        ))}
      </div>

      {/* Active category panel */}
      <motion.div
        key={active.id}
        initial={shouldReduceMotion ? false : { y: 8 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-beige bg-steamed p-6 shadow-warm md:p-8"
      >
        <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-beige pb-4">
          <h3 className="font-serif text-2xl font-medium text-espresso">
            {active.name}
          </h3>
          <span className="font-mono text-xs text-mocha">
            {active.skills.length} tools
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {active.skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={shouldReduceMotion ? false : { scale: 0.96 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.25, delay: index * 0.03 }}
              className="group inline-flex items-center gap-2 rounded-xl border border-beige bg-foam px-3.5 py-2 text-sm text-espresso transition-all duration-300 hover:-translate-y-0.5 hover:border-caramel/50 hover:bg-steamed hover:shadow-warm"
            >
              <span className="font-mono text-[10px] text-caramel opacity-70 group-hover:opacity-100">
                {String(index + 1).padStart(2, "0")}
              </span>
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Overview grid — all categories at a glance */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveId(category.id)}
            className={cn(
              "rounded-xl border p-4 text-left transition-all duration-300",
              activeId === category.id
                ? "border-caramel/50 bg-foam shadow-warm"
                : "border-beige bg-steamed/80 hover:border-caramel/30",
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-caramel">
              {category.name}
            </p>
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-mocha">
              {category.skills.slice(0, 4).join(" · ")}
              {category.skills.length > 4 && " …"}
            </p>
          </button>
        ))}
      </div>
    </Section>
  );
}
