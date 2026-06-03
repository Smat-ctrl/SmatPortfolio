import { getResumeFile } from "@/lib/store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const resume = await getResumeFile();
  const data = Buffer.from(resume.data, "base64");

  return new Response(data, {
    headers: {
      "Content-Type": resume.contentType,
      "Content-Disposition": `inline; filename="${resume.filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
