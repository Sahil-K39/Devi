"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLogin() {
  return (
    <Suspense fallback={<main className="admin-page min-h-screen" />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
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
      setError("The sanctuary denied that credential. Check the email and password.");
      return;
    }

    router.push(callbackUrl);
  };

  return (
    <main className="admin-page flex min-h-screen items-center justify-center px-6 py-16">
      <div className="admin-panel w-full max-w-2xl rounded-[2.6rem] px-8 py-10 md:px-12">
        <p className="font-accent text-2xl text-[var(--admin-accent)]">Divine entry</p>
        <h1 className="mt-3 font-admin text-5xl text-[var(--admin-text)]">
          Enter the curator sanctuary
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-8 text-[var(--admin-muted)]">
          This space is for product stewardship, ritual notes, and the quiet mechanics
          behind the storefront.
        </p>

        <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
          <label className="label-stack">
            <span className="!text-[var(--admin-muted)]">Email</span>
            <input
              name="email"
              type="email"
              required
              className="admin-input"
              placeholder="admin@devidivine.com"
            />
          </label>
          <label className="label-stack">
            <span className="!text-[var(--admin-muted)]">Password</span>
            <input
              name="password"
              type="password"
              required
              className="admin-input"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-[linear-gradient(135deg,#ffb4ab,#c9685d)] text-[#2d1412] disabled:opacity-60"
          >
            {loading ? "Opening sanctuary" : "Enter sanctuary"}
          </button>

          {error && <p className="text-sm text-[#ffb4ab]">{error}</p>}
        </form>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-ghost">
            Back to storefront
          </Link>
        </div>
      </div>
    </main>
  );
}
