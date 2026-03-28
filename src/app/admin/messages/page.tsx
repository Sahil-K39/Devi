import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MessageList } from "@/components/admin/MessageList";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/admin/login?callbackUrl=/admin/messages");
  }

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-base text-ink">
      <header className="border-b border-black/5 bg-white/70 px-6 py-4 shadow-sm backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.25em] text-muted">Admin</p>
        <h1 className="text-2xl font-semibold">Messages</h1>
      </header>
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <MessageList initial={messages} />
      </section>
    </main>
  );
}
