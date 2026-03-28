import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductBySlug } from "@/lib/products";

export async function POST(request: Request) {
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

  const product = await getProductBySlug(productSlug);
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  const origin = request.headers.get("origin") ?? "http://localhost:3000";
  const stripe = new Stripe(stripeKey, { apiVersion: "2026-03-25.dahlia" });

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
            images: product.gallery.length ? product.gallery : [product.heroImage],
          },
          unit_amount: product.priceCents,
        },
        quantity,
      },
    ],
  });

  return NextResponse.json({ url: session.url });
}
