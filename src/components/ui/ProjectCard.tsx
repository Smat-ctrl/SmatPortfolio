import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured }: ProjectCardProps) {
  const isFeatured = featured ?? project.featured;

  return (
    <Card
      className={cn(
        "flex h-full flex-col",
        isFeatured && "border-t-2 border-t-caramel",
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-serif text-xl font-medium text-espresso">
          {project.name}
        </h3>
        {isFeatured && (
          <span className="shrink-0 rounded-full bg-foam px-2.5 py-0.5 text-xs font-medium text-caramel">
            Featured
          </span>
        )}
      </div>

      <p className="mb-4 flex-grow text-sm leading-relaxed text-mocha">
        {project.description}
      </p>

      <ul className="mb-4 space-y-1.5">
        {project.highlights.map((highlight) => (
          <li
            key={highlight}
            className="flex gap-2 text-sm text-mocha"
          >
            <span className="text-caramel">·</span>
            {highlight}
          </li>
        ))}
      </ul>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.tech.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>

      {(project.githubUrl || project.liveUrl) && (
        <div className="mt-auto flex gap-4 border-t border-beige pt-4 text-sm">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-caramel transition-colors hover:text-caramel-deep"
            >
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-caramel transition-colors hover:text-caramel-deep"
            >
              Live demo
            </a>
          )}
        </div>
      )}
    </Card>
  );
}
