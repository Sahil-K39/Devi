"use client";

import { useState } from "react";
import type { ContactMessage } from "@prisma/client";

export function MessageList({ initial }: { initial: ContactMessage[] }) {
  const [messages, setMessages] = useState<ContactMessage[]>(initial);
  const [status, setStatus] = useState<string | null>(null);

  const updateStatus = async (id: string, newStatus: ContactMessage["status"]) => {
    setStatus("Updating…");
    const res = await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (!res.ok) {
      setStatus("Failed to update");
      return;
    }
    const updated = await res.json();
    setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
    setStatus(null);
  };

  return (
    <div className="rounded-3xl border border-black/5 bg-white/70 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between px-2">
        <p className="text-sm font-semibold text-ink">Inbox</p>
        <span className="text-xs text-muted">{messages.length} entries</span>
      </div>
      <div className="divide-y divide-black/5 rounded-2xl border border-black/5 bg-white/60">
        {messages.map((msg) => (
          <div key={msg.id} className="grid gap-2 px-4 py-3 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-semibold">{msg.name}</p>
              <p className="text-xs text-muted">{msg.email}</p>
              <p className="mt-1 text-sm text-ink">{msg.message}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="rounded-full bg-black/5 px-3 py-1">
                {new Date(msg.createdAt).toLocaleDateString()}
              </span>
              <span className="rounded-full bg-black/5 px-3 py-1">{msg.status}</span>
              <button
                className="rounded-full border border-black/10 px-3 py-1 transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
                onClick={() => updateStatus(msg.id, "READ")}
              >
                Mark read
              </button>
              <button
                className="rounded-full border border-black/10 px-3 py-1 transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
                onClick={() => updateStatus(msg.id, "ARCHIVED")}
              >
                Archive
              </button>
            </div>
          </div>
        ))}
      </div>
      {status && <p className="mt-2 text-sm text-muted">{status}</p>}
    </div>
  );
}
