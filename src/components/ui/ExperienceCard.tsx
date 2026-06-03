import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import type { Experience } from "@/types";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card className="relative pl-8 md:pl-10">
      <div
        className="absolute left-0 top-8 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-caramel bg-steamed"
        aria-hidden="true"
      />

      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h3 className="font-serif text-xl font-medium text-espresso">
            {experience.role}
          </h3>
          <p className="text-base font-medium text-caramel">
            {experience.company}
          </p>
        </div>
        <p className="text-sm text-mocha">{experience.date}</p>
      </div>

      <p className="mb-4 text-sm text-mocha">{experience.location}</p>

      <ul className="mb-5 space-y-2">
        {experience.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex gap-2 text-sm leading-relaxed text-mocha"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-caramel" />
            {bullet}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5">
        {experience.tech.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
    </Card>
  );
}
