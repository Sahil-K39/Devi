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
        const body = await res.json().catch(() => ({}));
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
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="label-stack">
          <span>Name</span>
          <input name="name" required className="soft-field" placeholder="Your name" />
        </label>
        <label className="label-stack">
          <span>Email</span>
          <input
            name="email"
            type="email"
            required
            className="soft-field"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="label-stack">
        <span>Phone</span>
        <input
          name="phone"
          className="soft-field"
          placeholder="+1 (555) 123-4567"
        />
      </label>

      <label className="label-stack">
        <span>Message</span>
        <textarea
          name="message"
          rows={5}
          required
          className="soft-textarea"
          placeholder="Tell us what you need, what drew you in, or what you are preparing for."
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending note" : "Send to the studio"}
      </button>

      {status === "sent" && (
        <p className="text-sm text-[#5f6f3a]">
          Your note has reached the studio. We&apos;ll reply shortly.
        </p>
      )}
      {error && <p className="text-sm text-[#a32727]">{error}</p>}
    </form>
  );
}
