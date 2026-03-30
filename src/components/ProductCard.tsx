"use client";

import { money } from "@/lib/money";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

import type { ProductDTO } from "@/lib/products";

type CardVariant = "arch" | "framed" | "classic";

const imageFrameClass: Record<CardVariant, string> = {
  arch: "rounded-t-[7rem] rounded-b-[1.4rem] bg-[rgba(255,255,255,0.45)]",
  framed: "rounded-[1.8rem] bg-[rgba(255,255,255,0.55)] p-3",
  classic: "rounded-[1.8rem] bg-[rgba(255,255,255,0.4)]",
};

export function ProductCard({
  product,
  variant = "classic",
  offset = false,
}: {
  product: ProductDTO;
  variant?: CardVariant;
  offset?: boolean;
}) {
  const linkHref = `/products/${product.slug}`;

  return (
    <Link
      href={linkHref}
      aria-label={`View ${product.name}`}
      className={clsx("block", offset && "lg:translate-y-14")}
    >
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="paper-luxe group relative overflow-hidden rounded-[2.2rem] p-4 md:p-5"
      >
        <div className="pointer-events-none absolute inset-x-6 top-0 h-24 rounded-b-full bg-[radial-gradient(circle_at_top,rgba(255,228,194,0.48),transparent_72%)]" />

        <div className={clsx("relative overflow-hidden", imageFrameClass[variant])}>
          <div className={clsx("relative", variant === "arch" ? "aspect-[0.78]" : "aspect-[0.8]")}>
            <Image
              src={product.heroImage}
              alt={product.name}
              fill
              className={clsx(
                "object-cover transition duration-700 group-hover:scale-[1.06]",
                variant === "framed" && "rounded-[1.25rem]",
                variant !== "framed" && "rounded-[inherit]"
              )}
              sizes="(min-width: 1024px) 30vw, 92vw"
            />
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(36,29,23,0),rgba(36,29,23,0.14))]" />

          {product.badge && (
            <div className="absolute right-4 top-4 rounded-full bg-[rgba(255,253,247,0.9)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent shadow-[0_10px_28px_rgba(72,48,38,0.12)]">
              {product.badge}
            </div>
          )}
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
              Devi Divine
            </p>
            <h3 className="font-display text-[1.8rem] leading-none text-ink">
              {product.name}
            </h3>
            {product.tagline && (
              <p className="mt-2 text-sm font-light italic tracking-wide text-muted">
                {product.tagline}
              </p>
            )}
          </div>
          <span className="font-display text-xl text-accent-soft">
            {money(product.priceCents)}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-[rgba(122,0,9,0.08)] pt-5">
          <div className="flex flex-wrap gap-2">
            {(product.tags.length ? product.tags.slice(0, 2) : ["ritual wear"]).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[rgba(255,255,255,0.68)] px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,255,255,0.7)] text-accent shadow-[0_12px_24px_rgba(72,48,38,0.08)] transition group-hover:bg-white">
            <ArrowUpRightIcon className="h-5 w-5" />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
