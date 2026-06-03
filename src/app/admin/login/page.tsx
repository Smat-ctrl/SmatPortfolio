"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword, username, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Login failed.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6 py-24">
      <div className="w-full max-w-md rounded-2xl border border-beige bg-steamed p-8 shadow-warm-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
          Admin
        </p>
        <h1 className="mt-2 font-serif text-2xl text-espresso">Sign in</h1>
        <p className="mt-2 text-sm text-mocha">
          Use <span className="font-mono text-espresso">.env.local</span> (not
          .env.example). If <span className="font-mono">SESSION_SECRET</span>{" "}
          contains <span className="font-mono">#</span>, wrap it in double
          quotes. Restart <span className="font-mono">npm run dev</span> after
          changes.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="keyword"
              className="mb-1 block text-xs font-medium text-mocha"
            >
              Keyword
            </label>
            <input
              id="keyword"
              type="password"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
              className="w-full rounded-xl border border-beige bg-foam px-4 py-2.5 text-sm text-espresso outline-none focus:border-caramel"
              placeholder="Secret keyword"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-xs font-medium text-mocha"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-xl border border-beige bg-foam px-4 py-2.5 text-sm text-espresso outline-none focus:border-caramel"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-medium text-mocha"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-beige bg-foam px-4 py-2.5 text-sm text-espresso outline-none focus:border-caramel"
            />
          </div>

          {error && (
            <p className="text-sm text-red-700" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-mocha">
          <Link href="/" className="text-caramel hover:text-caramel-deep">
            ← Back to portfolio
          </Link>
        </p>
      </div>
    </div>
  );
}
