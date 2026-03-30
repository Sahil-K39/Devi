"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import {
  ArchiveBoxIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import type { MessageRecord } from "@/lib/content-store";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));

const statusTone: Record<MessageRecord["status"], string> = {
  NEW: "bg-[rgba(255,180,171,0.12)] text-[var(--admin-accent)]",
  READ: "bg-[rgba(255,255,255,0.06)] text-[var(--admin-text)]",
  ARCHIVED: "bg-[rgba(255,255,255,0.04)] text-[var(--admin-muted)]",
};

export function MessageList({ initial }: { initial: MessageRecord[] }) {
  const [messages, setMessages] = useState<MessageRecord[]>(initial);
  const [status, setStatus] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      total: messages.length,
      fresh: messages.filter((message) => message.status === "NEW").length,
      archived: messages.filter((message) => message.status === "ARCHIVED").length,
    }),
    [messages]
  );

  const updateStatus = async (id: string, newStatus: MessageRecord["status"]) => {
    setStatus("Updating correspondence...");

    const res = await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setStatus(body?.message ?? "Failed to update message status.");
      return;
    }

    const updated = (await res.json()) as MessageRecord;
    setMessages((current) => current.map((entry) => (entry.id === id ? updated : entry)));
    setStatus("Inbox updated.");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <InboxMetric label="All notes" value={counts.total.toString()} icon={EnvelopeIcon} />
        <InboxMetric label="Awaiting reply" value={counts.fresh.toString()} icon={SparklesIcon} />
        <InboxMetric
          label="Archived"
          value={counts.archived.toString()}
          icon={ArchiveBoxIcon}
        />
      </div>

      <div className="admin-panel rounded-[2.5rem] p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-accent text-xl text-[var(--admin-accent)]">Studio inbox</p>
            <h2 className="mt-2 font-admin text-4xl text-[var(--admin-text)] md:text-5xl">
              Correspondence
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-[var(--admin-muted)]">
              Keep the inbox quiet and readable. Handle timing-sensitive ritual requests
              first, then archive resolved conversations.
            </p>
          </div>

          <span className="rounded-full bg-[rgba(255,180,171,0.12)] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[var(--admin-accent)]">
            {messages.length} messages
          </span>
        </div>

        <div className="mt-8 space-y-4">
          {messages.length ? (
            messages.map((message) => (
              <article
                key={message.id}
                className="rounded-[1.8rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.14)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-admin text-3xl text-[var(--admin-text)]">
                        {message.name}
                      </h3>
                      <span
                        className={clsx(
                          "rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                          statusTone[message.status]
                        )}
                      >
                        {message.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px] uppercase tracking-[0.24em] text-[var(--admin-muted)]">
                      <span>{message.email}</span>
                      {message.phone && <span>{message.phone}</span>}
                      <span>{formatDate(message.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {message.status !== "READ" && (
                      <button
                        type="button"
                        onClick={() => updateStatus(message.id, "READ")}
                        className="btn bg-[rgba(255,255,255,0.06)] text-[var(--admin-text)]"
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                        Mark read
                      </button>
                    )}
                    {message.status !== "ARCHIVED" && (
                      <button
                        type="button"
                        onClick={() => updateStatus(message.id, "ARCHIVED")}
                        className="btn bg-[rgba(255,180,171,0.12)] text-[var(--admin-text)]"
                      >
                        <ArchiveBoxIcon className="h-4 w-4" />
                        Archive
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-5 rounded-[1.4rem] bg-[rgba(17,10,10,0.16)] px-5 py-4">
                  <p className="text-sm leading-8 text-[var(--admin-muted)]">{message.message}</p>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-[1.8rem] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-6 py-10 text-center">
              <p className="font-admin text-3xl text-[var(--admin-text)]">
                No messages yet
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--admin-muted)]">
                When visitors write in from the contact page, their notes will appear
                here for the studio team.
              </p>
            </div>
          )}
        </div>

        {status && <p className="mt-5 text-sm text-[var(--admin-muted)]">{status}</p>}
      </div>
    </div>
  );
}

function InboxMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof EnvelopeIcon;
}) {
  return (
    <div className="rounded-[1.8rem] bg-[rgba(255,255,255,0.05)] px-5 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
      <Icon className="h-5 w-5 text-[var(--admin-accent)]" />
      <p className="mt-5 font-admin text-4xl text-[var(--admin-text)]">{value}</p>
      <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-[var(--admin-muted)]">
        {label}
      </p>
    </div>
  );
}
