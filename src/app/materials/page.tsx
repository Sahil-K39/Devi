import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const bullets = [
  {
    title: "Natural fibers first",
    body: "Breathable cottons and silks, chosen to move with you and dry quickly after water rituals.",
  },
  {
    title: "Skin-safe dyes",
    body: "Low-impact pigments—no harsh chemicals on fabric or skin.",
  },
  {
    title: "Stitching for motion",
    body: "Reinforced seams at stress points so squats, spins, and dances don’t tear threads.",
  },
  {
    title: "Care that’s simple",
    body: "Cold wash, hang dry. Every item ships with a 3-step care card inside the package.",
  },
];

export default function MaterialsPage() {
  return (
    <main className="min-h-screen bg-base text-ink">
      <Navbar />
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-16 pt-28 md:px-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.25em] text-muted">Materials</p>
          <h1 className="text-4xl font-semibold">What you feel on skin.</h1>
          <p className="max-w-2xl text-muted">
            Honest fibers, visible texture, and finishing that holds up in
            movement. We keep the page quiet so the materials can speak for
            themselves.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 rounded-3xl border border-black/5 bg-white p-6 shadow-[0_22px_60px_rgba(0,0,0,0.06)]">
            {bullets.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-black/5 bg-[#f4ede3] p-4"
              >
                <h3 className="text-lg font-semibold text-ink">{b.title}</h3>
                <p className="text-sm text-muted">{b.body}</p>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_22px_60px_rgba(0,0,0,0.06)]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/devi/devi-3.jpg"
                alt="Fabric detail"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-ink">
                Hand-finished hems
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
