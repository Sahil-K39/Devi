"use client";

import { useState } from "react";

export function CheckoutButton({
  productSlug,
  quantity = 1,
  label = "Buy now",
}: {
  productSlug: string;
  quantity?: number;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, quantity }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body?.message || "Unable to start checkout");
      }
      if (typeof body?.url !== "string" || !/^https?:\/\//.test(body.url)) {
        throw new Error(body?.message || "Checkout link is unavailable right now");
      }
      window.location.assign(body.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Redirecting..." : label}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
