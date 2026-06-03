import {
  COOKIE_NAME,
  createSession,
  getAuthConfigError,
  isAuthConfigured,
  validateCredentials,
} from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      keyword?: string;
      username?: string;
      password?: string;
    };

    const { keyword = "", username = "", password = "" } = body;

    if (!isAuthConfigured()) {
      return NextResponse.json(
        {
          error:
            getAuthConfigError() ??
            "Admin is not configured. Use .env.local (not .env.example) and restart npm run dev.",
        },
        { status: 503 },
      );
    }

    if (!validateCredentials(keyword, username, password)) {
      return NextResponse.json(
        { error: "Invalid keyword, username, or password." },
        { status: 401 },
      );
    }

    const token = await createSession();
    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });
    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Login failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
