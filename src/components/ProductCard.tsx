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
  arch: "rounded-t-[6.2rem] rounded-b-[1rem] border border-[rgba(122,0,9,0.08)] bg-[rgba(255,255,255,0.72)]",
  framed:
    "rounded-[1rem] bg-[rgba(255,255,255,0.72)] p-3 after:pointer-events-none after:absolute after:inset-3 after:rounded-[0.72rem] after:border after:border-[rgba(122,0,9,0.14)] after:content-['']",
  classic: "rounded-[1rem] bg-[rgba(255,255,255,0.72)] shadow-[0_20px_40px_rgba(89,65,62,0.06)]",
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
      className={clsx("block", offset && "lg:translate-y-12")}
    >
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="group relative"
      >
        <div className={clsx("relative mb-6 overflow-hidden", imageFrameClass[variant])}>
          <div className={clsx("relative", variant === "arch" ? "aspect-[3/4]" : "aspect-[3/4]")}>
            <Image
              src={product.heroImage}
              alt={product.name}
              fill
              className={clsx(
                "object-cover transition duration-700 group-hover:scale-[1.05]",
                variant === "framed" && "rounded-[0.7rem]",
                variant !== "framed" && "rounded-[inherit]"
              )}
              sizes="(min-width: 1024px) 30vw, 92vw"
            />
          </div>

          {product.badge && (
            <div className="absolute right-6 top-6 rounded-full border border-[rgba(212,175,55,0.2)] bg-white/92 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent opacity-0 shadow-[0_10px_28px_rgba(72,48,38,0.08)] transition group-hover:opacity-100">
              {product.badge}
            </div>
          )}
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-[1.65rem] leading-none text-ink">
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

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-[11px] italic tracking-wide text-muted">
            {product.tags.length
              ? product.tags.slice(0, 2).join(" / ")
              : "Devi ritual wear"}
          </p>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(122,0,9,0.08)] bg-white/75 text-accent shadow-[0_12px_24px_rgba(72,48,38,0.05)] transition group-hover:border-[rgba(212,175,55,0.28)] group-hover:text-[#735c00]">
            <ArrowUpRightIcon className="h-5 w-5" />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
