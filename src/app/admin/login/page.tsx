"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid credentials");
      return;
    }
    router.push(callbackUrl);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-base text-ink">
      <div className="w-full max-w-md rounded-3xl border border-black/5 bg-white/80 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
        <p className="text-sm uppercase tracking-[0.25em] text-muted">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold">Sign in</h1>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm outline-none transition focus:border-ink"
            placeholder="admin@devidivine.com"
          />
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm outline-none transition focus:border-ink"
            placeholder="••••••••"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.2)] disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Enter"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
        <div className="mt-6 text-sm text-muted">
          <Link href="/" className="underline">
            Back to site
          </Link>
        </div>
      </div>
    </main>
  );
}
