export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  supportingLine: string;
  resumeUrl: string;
  navLinks: { label: string; href: string }[];
  contact: {
    headline: string;
    subtext: string;
    linkedin: string;
    github: string;
    email: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  date: string;
  location: string;
  tech: string[];
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}
