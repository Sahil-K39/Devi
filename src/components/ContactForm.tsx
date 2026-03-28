"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
        }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body?.message || "Unable to send");
      }
      setStatus("sent");
      event.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          Name
          <input
            name="name"
            required
            className="rounded-xl border border-black/10 bg-white px-3 py-3 text-sm outline-none transition focus:border-ink"
            placeholder="Your name"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Email
          <input
            name="email"
            type="email"
            required
            className="rounded-xl border border-black/10 bg-white px-3 py-3 text-sm outline-none transition focus:border-ink"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm">
        Phone (optional)
        <input
          name="phone"
          className="rounded-xl border border-black/10 bg-white px-3 py-3 text-sm outline-none transition focus:border-ink"
          placeholder="+1 (555) 123-4567"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        Message
        <textarea
          name="message"
          rows={4}
          required
          className="rounded-xl border border-black/10 bg-white px-3 py-3 text-sm outline-none transition focus:border-ink"
          placeholder="Tell us what you need…"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary w-full disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "sent" && (
        <p className="text-sm text-green-600">
          Message received. We will reply shortly.
        </p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
