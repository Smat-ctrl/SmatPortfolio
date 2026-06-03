import { isAuthenticated } from "@/lib/auth";
import { getProjects, saveProjects } from "@/lib/store";
import type { Project } from "@/types";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const project = (await request.json()) as Project;
    const projects = await getProjects();
    const index = projects.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    projects[index] = { ...project, id };
    await saveProjects(projects);
    return NextResponse.json(projects[index]);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Update failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const projects = await getProjects();
    const filtered = projects.filter((p) => p.id !== id);

    if (filtered.length === projects.length) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    await saveProjects(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delete failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
