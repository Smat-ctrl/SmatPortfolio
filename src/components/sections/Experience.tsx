"use client";

import Section from "@/components/layout/Section";
import ExperienceCard from "@/components/ui/ExperienceCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Experience } from "@/types";

interface ExperienceProps {
  items: Experience[];
}

export default function Experience({ items }: ExperienceProps) {
  return (
    <Section id="experience" alternate>
      <SectionHeading
        eyebrow="Experience"
        title="Where I've learned by doing"
        subtitle="Internships, Riipen projects, and hands-on work that pushed me to ship real features and solve real problems."
      />

      <div className="relative space-y-6 border-l border-beige pl-6 md:pl-8">
        {items.map((entry) => (
          <ExperienceCard key={entry.id} experience={entry} />
        ))}
      </div>
    </Section>
  );
}
