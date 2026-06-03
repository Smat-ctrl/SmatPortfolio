import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import { getExperience, getProjects } from "@/lib/store";
import { sortByOrder } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, experience] = await Promise.all([
    getProjects(),
    getExperience(),
  ]);

  return (
    <>
      <Hero />
      <About />
      <Experience items={experience} />
      <Projects items={sortByOrder(projects)} />
      <Skills />
      <Contact />
    </>
  );
}
