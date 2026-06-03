"use client";

import Section from "@/components/layout/Section";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectsProps {
  items: Project[];
}

export default function Projects({ items }: ProjectsProps) {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've built and shipped"
        subtitle="A mix of full-stack apps, tools, and coursework projects — each one taught me something worth keeping."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((project) => (
          <div
            key={project.id}
            className={cn(project.featured && "md:col-span-2 md:max-w-none")}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </Section>
  );
}
