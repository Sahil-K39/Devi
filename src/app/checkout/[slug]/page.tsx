import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckoutButton } from "@/components/CheckoutButton";
import { getProductBySlug, money } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function CheckoutPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-[color:var(--paper)] text-ink">
      <Navbar />

      <section className="section-shell pt-36 pb-20">
        <div className="mb-16 max-w-3xl">
          <p className="font-accent text-2xl text-accent-soft">Namaste</p>
          <h1 className="mt-3 font-display text-5xl text-accent md:text-6xl">
            Your Sacred Path
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-light leading-8 text-muted">
            Each offering is consecrated with intention. Complete the form, then
            continue to Stripe for the final secure exchange.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="hero-chip">Protected Stripe handoff</span>
            <span className="hero-chip">Blessing note included</span>
            <span className="hero-chip">Studio-packed with care</span>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-12">
            <section className="paper-luxe rounded-[2.3rem] px-6 py-8 md:px-10">
              <div className="mb-10 flex items-center gap-5">
                <span className="font-accent text-3xl text-accent-soft">01</span>
                <h2 className="font-display text-3xl uppercase tracking-[0.12em] text-accent">
                  Destination
                </h2>
              </div>
              <form className="grid gap-6 md:grid-cols-2">
                <label className="label-stack md:col-span-2">
                  <span>Soul&apos;s Name</span>
                  <input className="soft-field" placeholder="Devi Prasad" />
                </label>
                <label className="label-stack md:col-span-2">
                  <span>Dwelling Address</span>
                  <input
                    className="soft-field"
                    placeholder="Ancient Gate, Temple Road"
                  />
                </label>
                <label className="label-stack">
                  <span>Province</span>
                  <input className="soft-field" placeholder="Varanasi" />
                </label>
                <label className="label-stack">
                  <span>Pin Code</span>
                  <input className="soft-field" placeholder="221001" />
                </label>
              </form>
            </section>

            <section className="paper-luxe rounded-[2.3rem] px-6 py-8 md:px-10">
              <div className="mb-10 flex items-center gap-5">
                <span className="font-accent text-3xl text-accent-soft">02</span>
                <h2 className="font-display text-3xl uppercase tracking-[0.12em] text-accent">
                  Exchange
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="label-stack md:col-span-2">
                  <span>Email for receipt</span>
                  <input className="soft-field" placeholder="you@example.com" />
                </label>
                <label className="label-stack">
                  <span>Phone</span>
                  <input className="soft-field" placeholder="+91 00000 00000" />
                </label>
                <label className="label-stack">
                  <span>Notes for the studio</span>
                  <input className="soft-field" placeholder="Color, timing, ritual" />
                </label>
                <div className="paper-inset rounded-[1.8rem] px-5 py-5 md:col-span-2">
                  <p className="text-xs uppercase tracking-[0.26em] text-muted">
                    Secure payment
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    Payment details are entered on Stripe&apos;s secure page after
                    you continue. This keeps the checkout protected and fully live.
                  </p>
                </div>
                <div className="md:col-span-2">
                  <CheckoutButton
                    productSlug={product.slug}
                    label="Conclude Ritual"
                  />
                  <p className="mt-4 text-center text-[10px] uppercase tracking-[0.26em] text-muted">
                    Secure encryption enabled / Divine protection guaranteed
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="paper-luxe h-fit rounded-[2.5rem] px-7 py-8 md:px-10 lg:sticky lg:top-32">
            <h3 className="font-display text-3xl uppercase tracking-[0.12em] text-accent">
              Sacred Manifest
            </h3>

            <div className="mt-10 flex gap-5 border-b border-accent/8 pb-8">
              <div className="relative h-36 w-28 overflow-hidden rounded-[1.4rem] bg-white/40">
                <Image
                  src={product.heroImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <p className="font-display text-xl text-ink">{product.name}</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                  {product.tagline ?? "Devi signature edition"}
                </p>
                <p className="pt-2 font-display text-2xl text-accent-soft">
                  {money(product.priceCents)}
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-8 text-sm uppercase tracking-[0.24em] text-muted">
              <div className="flex items-center justify-between">
                <span>Offering subtotal</span>
                <span>{money(product.priceCents)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Divine passage</span>
                <span>Grace of Devi</span>
              </div>
              <div className="flex items-center justify-between border-t border-accent/10 pt-4 font-display text-3xl normal-case tracking-normal text-accent">
                <span>Total sum</span>
                <span>{money(product.priceCents)}</span>
              </div>
            </div>

            <div className="paper-inset mt-8 rounded-[1.8rem] px-5 py-5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-muted">
                Each parcel is accompanied by a blessing from the Devi Divine
                sanctuary.
              </p>
            </div>

            <div className="mt-6 rounded-[1.8rem] bg-[rgba(122,0,9,0.9)] px-5 py-5 text-[#fff4eb]">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#f1d9ca]">
                Passage note
              </p>
              <p className="mt-3 text-sm leading-7 text-[#f7e7dd]">
                You are not charged on this page. The button below opens Stripe so
                payment stays secure and fully live.
              </p>
            </div>

            <div className="mt-8">
              <Link href={`/products/${product.slug}`} className="btn btn-ghost w-full">
                Return to artifact
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
