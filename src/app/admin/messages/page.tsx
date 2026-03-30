import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getMessages } from "@/lib/content-store";
import { MessageList } from "@/components/admin/MessageList";
import { AdminShell } from "@/components/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/admin/login?callbackUrl=/admin/messages");
  }

  const messages = await getMessages();

  return (
    <AdminShell
      active="messages"
      title="Messages"
      subtitle="Studio correspondence and private requests"
      aside={
        <div className="admin-panel rounded-[2.2rem] p-6">
          <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--admin-muted)]">
            Inbox guidance
          </p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--admin-muted)]">
            <p>Respond first to custom ritual requests and timing-sensitive orders.</p>
            <p>Archive resolved notes so the active inbox stays calm and readable.</p>
          </div>
        </div>
      }
    >
      <MessageList initial={messages} />
    </AdminShell>
  );
}
