import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-base text-ink">
      <Navbar />
      <section className="section-shell pt-36 pb-20">
        <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr]">
          <div className="paper-luxe rounded-[2.5rem] px-8 py-10 md:px-10">
            <span className="kicker">The studio is listening</span>
            <h1 className="mt-4 font-display text-5xl italic text-accent md:text-6xl">
              Tell us what you want to launch next
            </h1>
            <p className="mt-6 max-w-xl text-lg font-light leading-8 text-muted">
              Whether you need help choosing a piece, placing a custom order, or
              preparing a private styling request, this is the right place to begin.
            </p>

            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-6">
            <div className="paper-luxe rounded-[2.2rem] px-7 py-8">
              <p className="text-xs uppercase tracking-[0.24em] text-accent-soft">
                What to expect
              </p>
              <div className="mt-5 space-y-5 text-base font-light leading-8 text-muted">
                <p>Share the occasion, mood, or product you are drawn to.</p>
                <p>We reply with guidance, sizing help, or next steps.</p>
                <p>Custom requests are reviewed directly by the studio.</p>
              </div>
            </div>

            <div className="paper-luxe rounded-[2.2rem] px-7 py-8">
              <p className="text-xs uppercase tracking-[0.24em] text-accent-soft">
                Prefer direct
              </p>
              <div className="mt-5 space-y-4">
                <p className="font-display text-3xl italic text-ink">
                  hello@devidivine.com
                </p>
                <p className="text-sm uppercase tracking-[0.24em] text-muted">
                  @devi__divine on Instagram
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
