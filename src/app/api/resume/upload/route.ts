import { isAuthenticated } from "@/lib/auth";
import { saveResumeFile } from "@/lib/store";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_RESUME_SIZE = 2 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("resume");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Choose a PDF resume to upload." },
        { status: 400 },
      );
    }

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      return NextResponse.json(
        { error: "Resume upload must be a PDF file." },
        { status: 400 },
      );
    }

    if (file.size > MAX_RESUME_SIZE) {
      return NextResponse.json(
        { error: "Resume PDF must be 2 MB or smaller." },
        { status: 400 },
      );
    }

    const data = Buffer.from(await file.arrayBuffer()).toString("base64");
    await saveResumeFile({
      data,
      contentType: "application/pdf",
      filename: "resume.pdf",
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Resume upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
