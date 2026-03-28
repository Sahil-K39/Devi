import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProduct, getProducts, money } from "@/lib/products";

export default async function Home() {
  const [featured, products] = await Promise.all([
    getFeaturedProduct(),
    getProducts(),
  ]);

  const supporting = products.slice(0, 6);

  return (
    <main className="relative flex min-h-screen flex-col bg-base text-ink">
      <Navbar />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#0b0c10] via-[#13151c] to-[#1f2129] text-white">
        <Image
          src="/devi/devi-4.jpg"
          alt="Devi Divine collection"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-transparent" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-24 pt-28 md:px-10 md:pb-28 md:pt-32">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">
              Devi Divine · New drop · Living rituals
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Wearable devotion. Textures that feel like home.
            </h1>
            <p className="text-lg text-white/80">
              Shot on sacred steps in México, crafted for movement and ceremony.
              Every look is ready to purchase with one smooth scroll and a
              single click checkout.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="btn btn-light">
                Shop the collection
              </Link>
              <Link href="/rituals" className="btn btn-ghost">
                See the looks
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-white/80">
            <span className="rounded-full bg-white/10 px-3 py-2">
              Hand-finished seams
            </span>
            <span className="rounded-full bg-white/10 px-3 py-2">
              Small-batch dye lots
            </span>
            <span className="rounded-full bg-white/10 px-3 py-2">
              Ships with care card
            </span>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-16 md:px-10">
        <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr]">
          <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/30 to-[#e9dfd0]/60" />
            <div className="relative space-y-4 p-8 md:p-10">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">
                Made to feel
              </p>
              <h2 className="text-3xl font-semibold leading-tight text-ink">
                Ritual wear that moves with you.
              </h2>
              <p className="text-base text-muted">
                Breathable layers, hand-drawn prints, and silhouettes that let you
                dance, pray, and play. No harsh shadows—just soft light and softer
                fabric.
              </p>
              <ul className="space-y-2 text-sm text-muted">
                <li>• Editorial photography straight from the shoot.</li>
                <li>• Copy that stays legible on every background.</li>
                <li>• Scroll physics tuned to feel cinematic.</li>
              </ul>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
            <div className="relative h-full min-h-[320px]">
              <Image
                src="/devi/devi-1.jpg"
                alt="Devi on the ghats"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm uppercase tracking-[0.25em] text-white/70">
                  Shot on location
                </p>
                <h3 className="text-2xl font-semibold text-white">
                  Devotion in motion—sun, stone, and water.
                </h3>
                <p className="mt-2 text-sm text-white/80">
                  Real light, no studio tricks. Text stays readable with layered
                  gradients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featured && (
        <section
          id="rituals"
          className="relative z-10 mx-auto mt-6 w-full max-w-6xl px-6 md:px-10"
        >
          <div className="grid gap-6 overflow-hidden rounded-3xl border border-black/5 bg-white/80 shadow-[0_30px_90px_rgba(0,0,0,0.08)] md:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[440px]">
              <Image
                src={featured.heroImage}
                alt={featured.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                    Featured ritual
                  </p>
                  <h3 className="text-3xl font-semibold text-white">
                    {featured.name}
                  </h3>
                  {featured.tagline && (
                    <p className="text-white/80">{featured.tagline}</p>
                  )}
                </div>
                <Link href={`/products/${featured.slug}`} className="btn btn-light">
                  View ritual
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 p-8 md:p-10">
              <div className="flex items-center gap-2 text-sm text-muted">
                <span className="h-1 w-6 rounded-full bg-ink" />
                A focus on material and light
              </div>
              <p className="text-lg text-ink">{featured.description}</p>
              <div className="flex flex-wrap gap-2">
                {featured.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/10 px-3 py-1 text-xs uppercase tracking-wide text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between rounded-2xl border border-black/5 bg-[#f3ede3] px-4 py-3">
                <div>
                  <p className="text-sm text-muted">Starting at</p>
                  <p className="text-2xl font-semibold text-ink">
                    {money(featured.priceCents)}
                  </p>
                </div>
                <Link href={`/products/${featured.slug}`} className="btn btn-primary">
                  Buy now
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section
        id="collection"
        className="relative z-10 mx-auto mt-16 w-full max-w-6xl px-6 md:px-10"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-muted">
              The collection
            </p>
            <h2 className="text-3xl font-semibold">Essentials that do more.</h2>
          </div>
          <Link href="/products" className="btn btn-outline">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {supporting.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section
        id="materials"
        className="relative z-10 mx-auto mt-20 w-full max-w-6xl px-6 md:px-10"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Skin-safe & clean",
              text: "Formulated without parabens, sulfates, or microplastics. Always cruelty-free.",
            },
            {
              title: "Natural fibers",
              text: "Breathable cottons and silks chosen to move, not cling.",
            },
            {
              title: "Care made simple",
              text: "Cold wash, hang dry. Each package includes a 3-step care card.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-black/5 bg-white/70 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)]"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="relative z-10 mx-auto mt-20 w-full max-w-6xl px-6 pb-24 md:px-10"
      >
        <div className="overflow-hidden rounded-3xl border border-black/5 bg-gradient-to-br from-[#0f1118] via-[#1a1d25] to-[#2e3038] text-white shadow-[0_30px_90px_rgba(0,0,0,0.16)]">
          <div className="grid gap-6 p-10 md:grid-cols-[1.1fr_0.9fr] md:p-14">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.25em] text-white/70">
                Contact & consultations
              </p>
              <h3 className="text-3xl font-semibold">
                Need a bespoke scent story, lookbook, or wholesale link?
              </h3>
              <p className="text-white/80">
                There’s a dedicated contact page wired into the admin inbox.
                Once you send a message, it shows up instantly for the team.
              </p>
              <div className="flex gap-3">
                <Link href="/contact" className="btn btn-light">
                  Open contact page
                </Link>
                <Link href="/admin" className="btn btn-ghost">
                  Go to admin
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-white/5 p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
              <div className="relative space-y-3 text-sm text-white/80">
                <p className="text-base text-white">
                  Send a note and it reaches us directly. Responses usually go
                  out within 24 hours.
                </p>
                <p className="text-base text-white">
                  For custom rituals, include your measurements and preferred
                  colors—we&apos;ll tailor a look sheet for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
