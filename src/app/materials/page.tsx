import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const materialNotes = [
  {
    title: "Natural fibers first",
    body: "Breathable cottons and silks chosen to move with you and soften over time.",
  },
  {
    title: "Skin-safe dyes",
    body: "Earth-led tones and warm pigments that feel rich without becoming harsh.",
  },
  {
    title: "Stitching for motion",
    body: "Stress points are reinforced so the garments hold through practice and wear.",
  },
  {
    title: "Care that stays simple",
    body: "Cold wash, hang dry, and let the cloth gather its own memory.",
  },
];

export default function MaterialsPage() {
  return (
    <main className="min-h-screen bg-base text-ink">
      <Navbar />
      <section className="section-shell pt-36 pb-20">
        <span className="kicker">Material prayer</span>
        <h1 className="mt-4 font-display text-5xl italic text-accent md:text-7xl">
          What you feel on skin
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-light leading-8 text-muted">
          Honest fibers, visible texture, and finishing that holds up in motion.
          We keep the page quiet so the materials can speak for themselves.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-[1fr_0.9fr]">
          <div className="paper-luxe rounded-[2.3rem] p-6 md:p-8">
            <div className="grid gap-4">
              {materialNotes.map((note) => (
                <div key={note.title} className="paper-inset rounded-[1.6rem] px-5 py-5">
                  <h2 className="font-display text-3xl italic text-ink">{note.title}</h2>
                  <p className="mt-3 text-base font-light leading-7 text-muted">
                    {note.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="paper-luxe overflow-hidden rounded-[2.5rem] p-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem]">
              <Image
                src="/devi/devi-3.jpg"
                alt="Material detail"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              <div className="absolute bottom-6 left-6 rounded-full bg-[rgba(255,253,247,0.92)] px-5 py-3 text-xs uppercase tracking-[0.24em] text-accent">
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
