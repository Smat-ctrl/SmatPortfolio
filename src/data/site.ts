import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Samuel Mathew",
  title: "Computer Science student at the University of Waterloo",
  tagline:
    "I build full-stack apps, useful tools, and software that solves real problems.",
  supportingLine:
    "Currently learning by building, debugging, and shipping projects that make me better.",
  resumeUrl: "/api/resume",
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  contact: {
    headline: "Have an idea, opportunity, or project worth building?",
    subtext: "I'd love to connect.",
    linkedin: "https://www.linkedin.com/in/smat-ctrl",
    github: "https://github.com/smat-ctrl",
    email: "samuel.mathewv@gmail.com",
  },
};
