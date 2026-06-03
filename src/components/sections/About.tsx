"use client";

import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const carePoints = [
  "Clean, understandable code",
  "Useful, well-designed systems",
  "Turning messy ideas into working products",
];

export default function About() {
  return (
    <Section id="about" className="border-t border-beige">
      <SectionHeading
        eyebrow="About"
        title="Building software that feels thoughtful and useful"
        subtitle="I'm a developer who enjoys the full journey — from sketching an idea to shipping something people can actually use."
      />

      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-12">
        <div className="space-y-5 text-base leading-relaxed text-mocha">
          <p>
            I enjoy building practical software across frontend, backend, APIs,
            databases, and automation. Whether it&apos;s a responsive web app, a
            mobile tool, or a backend service, I like working across the stack
            to understand how everything connects.
          </p>
          <p>
            What keeps me going is turning messy ideas into working products.
            I care about clean design, understandable code, and systems that
            actually help people — not just demos that look good in a README.
          </p>
          <p>
            I&apos;m growing as a developer through school at Waterloo,
            internships, Riipen and client-style projects, and personal builds
            where I can experiment, break things, and learn from fixing them.
          </p>
        </div>

        <Card hover={false} className="h-fit bg-foam/50">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
            What I care about
          </p>
          <ul className="space-y-3">
            {carePoints.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-sm leading-relaxed text-mocha"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-caramel" />
                {point}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}
