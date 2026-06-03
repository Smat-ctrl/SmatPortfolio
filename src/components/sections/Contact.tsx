"use client";

import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import { siteConfig } from "@/data/site";

const contactLinks = [
  {
    label: "LinkedIn",
    href: siteConfig.contact.linkedin,
    description: "Connect professionally",
  },
  {
    label: "GitHub",
    href: siteConfig.contact.github,
    description: "See my code and projects",
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.contact.email}`,
    description: siteConfig.contact.email,
  },
];

export default function Contact() {
  return (
    <Section id="contact">
      <div className="mb-12 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
          Contact
        </p>
        <h2 className="mx-auto max-w-2xl font-serif text-3xl font-medium tracking-tight text-espresso md:text-4xl">
          {siteConfig.contact.headline}
        </h2>
        <p className="mx-auto mt-5 max-w-xl font-serif text-xl text-caramel md:text-2xl">
          {siteConfig.contact.subtext}
        </p>
      </div>

      <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.label !== "Email" ? "_blank" : undefined}
            rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
            className="group block"
          >
            <Card className="h-full text-center transition-colors group-hover:border-caramel/40">
              <p className="font-serif text-lg font-medium text-espresso transition-colors group-hover:text-caramel-deep">
                {link.label}
              </p>
              <p className="mt-2 text-sm text-mocha">{link.description}</p>
            </Card>
          </a>
        ))}
      </div>
    </Section>
  );
}
