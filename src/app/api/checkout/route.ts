import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductBySlug } from "@/lib/products";

// Prevent build-time prerender attempts from failing; Netlify probes with GET.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ status: "ok" });
}

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json(
      {
        message:
          "Stripe keys missing. Add STRIPE_SECRET_KEY + NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to .env",
      },
      { status: 503 }
    );
  }

  const body = await request.json();
  const productSlug = body?.productSlug as string | undefined;
  const quantity = Number(body?.quantity ?? 1);

  if (!productSlug) {
    return NextResponse.json({ message: "productSlug required" }, { status: 400 });
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    return NextResponse.json({ message: "Quantity must be at least 1" }, { status: 400 });
  }

  const product = await getProductBySlug(productSlug);
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  try {
    const origin = request.nextUrl.origin;
    const stripe = new Stripe(stripeKey, { apiVersion: "2026-03-25.dahlia" });
    const imageUrls = (product.gallery.length ? product.gallery : [product.heroImage]).map(
      (image) => (image.startsWith("http") ? image : `${origin}${image}`)
    );

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${origin}/checkout/success?ref=${product.slug}`,
      cancel_url: `${origin}/checkout/cancel`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.tagline ?? product.description.slice(0, 120),
              images: imageUrls,
            },
            unit_amount: product.priceCents,
          },
          quantity,
        },
      ],
    });

    if (!session.url) {
      return NextResponse.json(
        { message: "Stripe did not return a checkout URL" },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error", error);

    if (
      error &&
      typeof error === "object" &&
      "type" in error &&
      error.type === "StripeAuthenticationError"
    ) {
      return NextResponse.json(
        {
          message:
            "Stripe is not configured with a valid secret key yet. Update STRIPE_SECRET_KEY to enable payments.",
        },
        { status: 503 }
      );
    }

    const message =
      error instanceof Error
        ? error.message
        : "Unable to start checkout right now. Please try again shortly.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
