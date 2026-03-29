"use client";

import { money } from "@/lib/money";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

import type { ProductDTO } from "@/lib/products";

export function ProductCard({ product }: { product: ProductDTO }) {
  const linkHref = `/products/${product.slug}`;
  return (
    <Link href={linkHref} aria-label={`View ${product.name}`}>
      <motion.article
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white/70 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.04)] backdrop-blur-sm"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-[#f9f4ed] to-[#e7dfd2]">
          <Image
            src={product.heroImage}
            alt={product.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(min-width: 1024px) 320px, 60vw"
            priority={product.featured}
          />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-black/75 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white shadow-lg">
              {product.badge}
            </span>
          )}
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted">
              Devi Divine
            </p>
            <h3 className="mt-1 text-xl font-semibold leading-tight text-ink">
              {product.name}
            </h3>
            {product.tagline && (
              <p className="mt-1 text-sm text-muted">{product.tagline}</p>
            )}
            <p className="mt-2 text-base font-medium text-ink">
              {money(product.priceCents)}
            </p>
          </div>
          <span
            className={clsx(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-ink transition duration-200",
              "group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] group-hover:-translate-y-0.5"
            )}
          >
            <ArrowUpRightIcon className="h-5 w-5" />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
