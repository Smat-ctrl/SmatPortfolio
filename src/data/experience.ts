import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "sheridan",
    company: "Sheridan College",
    role: "Software Developer Intern",
    date: "Jan 2024 – Apr 2024",
    location: "Oakville, ON",
    tech: [
      "JavaScript",
      "GSAP",
      "Figma",
      "Articulate Rise",
      "Zoho Desk",
    ],
    bullets: [
      "Built dynamic service pages and interactive UI components used by 500+ users.",
      "Developed UML diagrams in Figma to support a Zoho Desk ticketing system migration.",
      "Created onboarding modules and contributed to platform accessibility improvements.",
      "Supported SPARK website digital assets and visual consistency.",
    ],
  },
  {
    id: "souvenote",
    company: "Souvenote",
    role: "Full Stack Engineer / Riipen Project Experience",
    date: "2026",
    location: "Remote",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "REST APIs"],
    bullets: [
      "Worked on a personalized card creation platform.",
      "Helped organize frontend structure and reusable UI components.",
      "Built responsive UI flows for pricing, referrals, token balance, account/auth screens, and checkout.",
      "Worked from product requirements and helped align frontend behavior with expected backend API contracts.",
    ],
  },
  {
    id: "fourien",
    company: "Fourien Inc.",
    role: "Growth & Outreach Intern / Riipen Project Experience",
    date: "2026",
    location: "Remote",
    tech: [
      "Python",
      "Pandas",
      "SQLite",
      "Gemini API",
      "Microsoft Graph",
      "VBA",
    ],
    bullets: [
      "Built a mini CRM-style outreach tool to clean and organize lead exports.",
      "Used Pandas and SQLite for lead processing and local storage.",
      "Explored Microsoft Graph/email automation workflows.",
      "Designed lead segmentation and follow-up workflows for targeted outreach.",
    ],
  },
];
