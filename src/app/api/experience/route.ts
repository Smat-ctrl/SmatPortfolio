import { getExperience, saveExperience } from "@/lib/store";
import type { Experience } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  const experience = await getExperience();
  return NextResponse.json(experience);
}

export async function POST(request: Request) {
  try {
    const entry = (await request.json()) as Experience;
    if (!entry.id || !entry.company) {
      return NextResponse.json(
        { error: "id and company are required." },
        { status: 400 },
      );
    }

    const experience = await getExperience();
    if (experience.some((e) => e.id === entry.id)) {
      return NextResponse.json(
        { error: "Experience id already exists." },
        { status: 409 },
      );
    }

    const updated = [entry, ...experience];
    await saveExperience(updated);
    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Save failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
