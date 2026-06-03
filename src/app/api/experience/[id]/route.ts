import { getExperience, saveExperience } from "@/lib/store";
import type { Experience } from "@/types";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const entry = (await request.json()) as Experience;
    const experience = await getExperience();
    const index = experience.findIndex((e) => e.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    experience[index] = { ...entry, id };
    await saveExperience(experience);
    return NextResponse.json(experience[index]);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Update failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const experience = await getExperience();
    const filtered = experience.filter((e) => e.id !== id);

    if (filtered.length === experience.length) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    await saveExperience(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delete failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
