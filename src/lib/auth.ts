import { getEnvConfigStatus } from "@/lib/env";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "portfolio-session";

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    return null;
  }
  return new TextEncoder().encode(secret);
}

export function isAuthConfigured(): boolean {
  return getEnvConfigStatus().ok;
}

export function getAuthConfigError(): string | undefined {
  return getEnvConfigStatus().message;
}

export function validateCredentials(
  keyword: string,
  username: string,
  password: string,
): boolean {
  const expectedKeyword = process.env.ADMIN_KEYWORD;
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedKeyword || !expectedUser || !expectedPass) {
    return false;
  }

  return (
    keyword.trim() === expectedKeyword.trim() &&
    username.trim() === expectedUser.trim() &&
    password === expectedPass
  );
}

export async function createSession(): Promise<string> {
  const secret = getSecret();
  if (!secret) throw new Error("SESSION_SECRET is not configured.");
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);
}

export async function verifySession(token: string): Promise<boolean> {
  const secret = getSecret();
  if (!secret) return false;
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getSessionToken();
  if (!token) return false;
  return verifySession(token);
}

export { COOKIE_NAME };
