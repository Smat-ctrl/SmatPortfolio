import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    name: "Languages",
    skills: [
      "Python",
      "Java",
      "C++",
      "C#",
      "C",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Kotlin",
      "Bash",
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Bootstrap", "GSAP"],
  },
  {
    id: "backend",
    name: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "JWT"],
  },
  {
    id: "data",
    name: "Data",
    skills: ["PostgreSQL", "SQLite", "Supabase", "Pandas"],
  },
  {
    id: "tools",
    name: "Tools",
    skills: [
      "Git",
      "GitLab",
      "Azure",
      "VS Code",
      "IntelliJ IDEA",
      "PyCharm",
      "Eclipse",
      "Jira",
      "Figma",
      "Selenium",
    ],
  },
];
