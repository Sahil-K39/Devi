import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const ritualCards = [
  {
    title: "Dance on stone",
    body: "Loose silhouettes that stay generous through movement and grounded through prayer.",
    image: "/devi/devi-1.jpg",
  },
  {
    title: "Offerings at dawn",
    body: "Water-friendly fabrics, rope belts, and shapes that dry beautifully after ritual.",
    image: "/devi/devi-5.jpg",
  },
  {
    title: "Power stance",
    body: "Wrap silhouettes and anchoring ties that hold you in the body without restriction.",
    image: "/devi/devi-2.jpg",
  },
  {
    title: "Layered fire",
    body: "The duster, the dress, the scarf: a dialogue of contrast, warmth, and confidence.",
    image: "/devi/devi-4.jpg",
  },
];

export default function RitualsPage() {
  return (
    <main className="min-h-screen bg-base text-ink">
      <Navbar />
      <section className="section-shell pt-36 pb-20">
        <span className="kicker">The living ritual</span>
        <h1 className="mt-4 font-display text-5xl italic text-accent md:text-7xl">
          Movement, devotion, daily wear
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-light leading-8 text-muted">
          These looks are built to move from ceremony to street, to hold grace in
          action, and to stay present in the body.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {ritualCards.map((card, index) => (
            <article
              key={card.title}
              className={index % 2 === 1 ? "md:translate-y-10" : ""}
            >
              <div className="paper-luxe overflow-hidden rounded-[2rem] p-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                  <Image src={card.image} alt={card.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.26em] text-accent-soft">
                  Ritual
                </p>
                <h2 className="mt-2 font-display text-3xl italic text-ink">
                  {card.title}
                </h2>
                <p className="mt-3 max-w-md text-base font-light leading-7 text-muted">
                  {card.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link href="/products" className="btn btn-primary">
            Shop the collection
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Book a custom ritual look
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
