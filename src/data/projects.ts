import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "spotly",
    name: "Spotly",
    description:
      "Full-stack location discovery app for finding, saving, and exploring places.",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "REST APIs",
    ],
    highlights: [
      "JWT authentication",
      "REST API collections system",
      "SerpAPI integration",
      "PostgreSQL geo-cache to reduce repeated API calls",
    ],
    featured: true,
    order: 1,
  },
  {
    id: "souvenote",
    name: "Souvenote",
    description:
      "Personalized card creation platform with AI-assisted card flow and reusable frontend structure.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
    highlights: [
      "Frontend architecture",
      "Responsive UI flows",
      "Product requirement translation",
      "Mock-first integration planning",
    ],
    featured: true,
    order: 2,
  },
  {
    id: "nutriguard",
    name: "NutriGuard",
    description:
      "Mobile food-tracking app with barcode scanning, realtime inventory, and nutrition API integration.",
    tech: [
      "Kotlin",
      "Supabase",
      "REST APIs",
      "Google ML Kit",
      "OpenFoodFacts",
    ],
    highlights: [
      "Backend services",
      "Realtime inventory updates",
      "Barcode scanning",
      "Nutrition API integration",
      "Unit/integration testing",
    ],
    featured: false,
    order: 3,
  },
  {
    id: "leadcrm-flow",
    name: "LeadCRM Flow",
    description:
      "Lightweight CRM/outreach tool for cleaning leads, organizing contacts, and preparing personalized email drafts.",
    tech: ["Python", "Streamlit", "Pandas", "SQLite"],
    highlights: [
      "CSV upload and cleaning",
      "Duplicate removal",
      "Local lead tracking",
      "Email draft workflow planning",
    ],
    featured: false,
    order: 4,
  },
  {
    id: "watopoly",
    name: "Watopoly",
    description:
      "Monopoly-style C++ game focused on OOP design, turn sequencing, and memory correctness.",
    tech: ["C++", "Makefile", "OOP", "STL", "Valgrind"],
    highlights: [
      "Player actions",
      "Turn sequencing",
      "Observer Pattern",
      "Memory debugging with Valgrind",
    ],
    featured: false,
    order: 5,
  },
  {
    id: "spark",
    name: "SPARK",
    description:
      "Responsive animated website project focused on reusable sections and GSAP-powered UI interactions.",
    tech: ["JavaScript", "HTML", "Tailwind CSS", "GSAP"],
    highlights: [
      "Reusable content sections",
      "Responsive layouts",
      "Animated UI interactions",
      "Consistent page structure",
    ],
    featured: false,
    order: 6,
  },
];
