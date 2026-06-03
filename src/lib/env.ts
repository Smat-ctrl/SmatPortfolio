export function getEnvConfigStatus(): {
  ok: boolean;
  message?: string;
  secretLength: number;
} {
  const secret = process.env.SESSION_SECRET ?? "";
  const hasCreds =
    process.env.ADMIN_KEYWORD &&
    process.env.ADMIN_USERNAME &&
    process.env.ADMIN_PASSWORD;

  if (!hasCreds) {
    return {
      ok: false,
      message:
        "Missing ADMIN_KEYWORD, ADMIN_USERNAME, or ADMIN_PASSWORD in .env.local",
      secretLength: secret.length,
    };
  }

  if (secret.length < 16) {
    return {
      ok: false,
      message:
        "SESSION_SECRET is too short. If it contains # or $, wrap the whole value in double quotes in .env.local.",
      secretLength: secret.length,
    };
  }

  return { ok: true, secretLength: secret.length };
}
