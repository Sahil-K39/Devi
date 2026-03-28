import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function RitualsPage() {
  return (
    <main className="min-h-screen bg-base text-ink">
      <Navbar />
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-16 pt-28 md:px-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.25em] text-muted">
            Rituals
          </p>
          <h1 className="text-4xl font-semibold">Movement, devotion, daily wear.</h1>
          <p className="max-w-2xl text-muted">
            Inspired by geleshop’s clean product flow but grounded in Devi’s sacred
            steps—each look is built to move from ceremony to street without losing
            grace.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <RitualCard
            title="Dance on stone"
            body="Loose silhouettes that won’t fight your flow. Stitching reinforced for real movement."
            image="/devi/devi-1.jpg"
          />
          <RitualCard
            title="Offerings at dawn"
            body="Water-friendly fabrics and rope belts that dry fast without clinging."
            image="/devi/devi-5.jpg"
          />
          <RitualCard
            title="Power stance"
            body="Wrap skirts and braids that stay centered through yoga, prayer, and performance."
            image="/devi/devi-2.jpg"
          />
          <RitualCard
            title="Layered fire"
            body="Pair the Jungle Fire duster with river-white underlayers for contrast and confidence."
            image="/devi/devi-4.jpg"
          />
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/products" className="btn btn-primary">
            Shop the collection
          </Link>
          <Link href="/contact" className="btn btn-light">
            Book a custom ritual look
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function RitualCard({
  title,
  body,
  image,
}: {
  title: string;
  body: string;
  image: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_22px_60px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-[4/3]">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-ink">
          Ritual
        </div>
      </div>
      <div className="space-y-2 p-5">
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <p className="text-sm text-muted">{body}</p>
      </div>
    </div>
  );
}
