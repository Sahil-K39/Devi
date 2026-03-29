import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-base text-ink">
      <Navbar />
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pb-16 pt-28 md:px-10">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.25em] text-muted">
            Contact
          </p>
          <h1 className="text-4xl font-semibold">
            Tell us what you want to launch next.
          </h1>
          <p className="max-w-2xl text-muted">
            Whether you need help choosing a piece, placing a custom order, or
            preparing a private styling request, this is the right place to
            begin.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-black/5 bg-white/80 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
            <ContactForm />
          </div>
          <div className="rounded-3xl border border-black/5 bg-white/60 p-8 text-sm text-muted shadow-[0_25px_80px_rgba(0,0,0,0.05)]">
            <h3 className="text-xl font-semibold text-ink">What to expect</h3>
            <ul className="mt-3 space-y-2 leading-relaxed">
              <li>• Share the occasion, mood, or product you are drawn to.</li>
              <li>• We reply with guidance, sizing help, or next steps.</li>
              <li>• Custom requests are reviewed directly by the studio.</li>
            </ul>
            <div className="mt-4 rounded-2xl bg-[#f3ede3] p-4 text-ink">
              <p className="font-semibold">Prefer direct?</p>
              <p>hello@devidivine.com</p>
              <p>@devi__divine on Instagram</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
