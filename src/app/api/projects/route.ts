import { getProjects, saveProjects } from "@/lib/store";
import type { Project } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  try {
    const project = (await request.json()) as Project;
    if (!project.id || !project.name) {
      return NextResponse.json(
        { error: "id and name are required." },
        { status: 400 },
      );
    }

    const projects = await getProjects();
    if (projects.some((p) => p.id === project.id)) {
      return NextResponse.json(
        { error: "Project id already exists." },
        { status: 409 },
      );
    }

    const updated = [...projects, project];
    await saveProjects(updated);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Save failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
