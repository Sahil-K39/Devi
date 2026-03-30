"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
  PhotoIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import type { ProductRecord } from "@/lib/content-store";
import { money } from "@/lib/money";

const emptyForm = {
  name: "",
  slug: "",
  tagline: "",
  description: "",
  priceCents: 0,
  badge: "",
  heroImage: "",
  gallery: "",
  tags: "",
  featured: false,
  active: true,
};

type FormState = typeof emptyForm;

const formatTagList = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const sortProducts = (items: ProductRecord[]) =>
  [...items].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }

    if (left.active !== right.active) {
      return left.active ? -1 : 1;
    }

    return right.createdAt.localeCompare(left.createdAt);
  });

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function ProductManager({ initial }: { initial: ProductRecord[] }) {
  const [products, setProducts] = useState<ProductRecord[]>(sortProducts(initial));
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const stats = useMemo(
    () => ({
      total: products.length,
      featured: products.filter((product) => product.featured).length,
      hidden: products.filter((product) => !product.active).length,
    }),
    [products]
  );

  const previewTags = formatTagList(form.tags);
  const previewGallery = formatTagList(form.gallery);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setUploadStatus(null);
  };

  const handleEdit = (product: ProductRecord) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      tagline: product.tagline ?? "",
      description: product.description,
      priceCents: product.priceCents,
      badge: product.badge ?? "",
      heroImage: product.heroImage,
      gallery: product.gallery.join(", "),
      tags: product.tags.join(", "),
      featured: product.featured,
      active: product.active,
    });
    setStatus(null);
    setUploadStatus(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(editingId ? "Updating artifact..." : "Curating artifact...");

    const payload = {
      ...form,
      slug: form.slug || slugify(form.name),
      priceCents: Number(form.priceCents),
      gallery: formatTagList(form.gallery),
      tags: formatTagList(form.tags),
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/products/${editingId}` : "/api/products";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setStatus(`Error: ${body?.message ?? "Unable to preserve artifact"}`);
      return;
    }

    const updated = (await res.json()) as ProductRecord;
    if (editingId) {
      setProducts((current) =>
        sortProducts(
          current.map((product) => (product.id === editingId ? updated : product))
        )
      );
      setStatus("Artifact updated in the vault.");
    } else {
      setProducts((current) => sortProducts([updated, ...current]));
      setStatus("Artifact enshrined in the vault.");
    }

    resetForm();
  };

  const handleDelete = async () => {
    if (!editingId) return;
    setStatus("Removing artifact...");

    const res = await fetch(`/api/products/${editingId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setStatus(`Error: ${body?.message ?? "Unable to remove artifact"}`);
      return;
    }

    setProducts((current) => current.filter((product) => product.id !== editingId));
    setStatus("Artifact removed from the vault.");
    resetForm();
  };

  const handleHeroUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadStatus("Uploading image...");
    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setUploadStatus(`Upload failed: ${body?.message ?? "Unknown error"}`);
      return;
    }

    const body = (await res.json()) as { url: string };
    setForm((current) => ({ ...current, heroImage: body.url }));
    setUploadStatus("Image enshrined.");
  };

  const heroPreview = form.heroImage || products[0]?.heroImage || "";
  const heroTitle = form.name || "Untitled artifact";
  const heroBody =
    form.tagline ||
    "Document the spiritual lineage, tactile details, and ceremonial intent of the piece.";

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <form className="admin-panel rounded-[2.6rem] p-6 md:p-8" onSubmit={handleSubmit}>
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="font-accent text-xl text-[var(--admin-accent)]">
              {editingId ? "Refine the artifact" : "Enshrine new artifact"}
            </p>
            <h2 className="mt-2 font-admin text-4xl text-[var(--admin-text)] md:text-5xl">
              {editingId ? "Curator edit" : "New vault entry"}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-[var(--admin-muted)]">
              Keep every entry devotional, tactile, and precise so the public
              storefront stays calm and believable.
            </p>
          </div>

          <div className="grid min-w-[13rem] grid-cols-3 gap-3">
            <MetricCard label="Artifacts" value={stats.total.toString()} />
            <MetricCard label="Featured" value={stats.featured.toString()} />
            <MetricCard label="Hidden" value={stats.hidden.toString()} />
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.06fr)_minmax(16rem,0.74fr)]">
          <div className="space-y-6">
            <label
              htmlFor="hero-upload"
              className="group flex min-h-[17rem] cursor-pointer flex-col items-center justify-center rounded-[2rem] border border-dashed border-[rgba(255,180,171,0.22)] bg-[rgba(255,255,255,0.03)] px-6 py-8 text-center shadow-[inset_0_0_0_1px_rgba(255,180,171,0.05)] transition hover:bg-[rgba(255,255,255,0.05)]"
            >
              <CloudArrowUpIcon className="h-12 w-12 text-[var(--admin-accent)]/60 transition group-hover:scale-105 group-hover:text-[var(--admin-accent)]" />
              <p className="mt-5 font-accent text-lg text-[var(--admin-text)]">
                Sacrifice image here
              </p>
              <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--admin-muted)]">
                Upload the hero frame first. This image powers the storefront card,
                detail page, and checkout summary.
              </p>
              <span className="mt-5 rounded-full bg-[rgba(255,180,171,0.12)] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[var(--admin-accent)]">
                Choose image
              </span>
              <input
                id="hero-upload"
                type="file"
                accept="image/*"
                onChange={handleHeroUpload}
                className="sr-only"
              />
            </label>

            {uploadStatus && (
              <p className="text-sm text-[var(--admin-muted)]">{uploadStatus}</p>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Artifact title"
                value={form.name}
                onChange={(value) =>
                  setForm((current) => {
                    const nextName = value;
                    const shouldSyncSlug =
                      !current.slug || current.slug === slugify(current.name);
                    return {
                      ...current,
                      name: nextName,
                      slug: shouldSyncSlug ? slugify(nextName) : current.slug,
                    };
                  })
                }
              />
              <Field
                label="Sacred slug"
                value={form.slug}
                onChange={(value) =>
                  setForm((current) => ({ ...current, slug: slugify(value) }))
                }
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Tagline"
                value={form.tagline}
                onChange={(value) => setForm((current) => ({ ...current, tagline: value }))}
              />
              <Field
                label="Badge"
                value={form.badge}
                onChange={(value) => setForm((current) => ({ ...current, badge: value }))}
              />
            </div>

            <Field
              label="Provenance and spiritual echo"
              value={form.description}
              textarea
              onChange={(value) =>
                setForm((current) => ({ ...current, description: value }))
              }
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Sacred value (cents)"
                type="number"
                value={String(form.priceCents)}
                onChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    priceCents: Number(value || 0),
                  }))
                }
              />
              <Field
                label="Hero image URL"
                value={form.heroImage}
                onChange={(value) =>
                  setForm((current) => ({ ...current, heroImage: value }))
                }
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Gallery URLs"
                value={form.gallery}
                onChange={(value) => setForm((current) => ({ ...current, gallery: value }))}
              />
              <Field
                label="Tags"
                value={form.tags}
                onChange={(value) => setForm((current) => ({ ...current, tags: value }))}
              />
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-[var(--admin-muted)]">
              <TogglePill
                label="Featured"
                checked={form.featured}
                onChange={(checked) =>
                  setForm((current) => ({ ...current, featured: checked }))
                }
              />
              <TogglePill
                label="Visible on site"
                checked={form.active}
                onChange={(checked) =>
                  setForm((current) => ({ ...current, active: checked }))
                }
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="btn bg-[linear-gradient(135deg,#ffb4ab,#c9685d)] text-[#2d1412]"
              >
                {editingId ? "Curate update" : "Curate piece"}
              </button>
              <button type="button" onClick={resetForm} className="btn bg-white/6 text-[var(--admin-text)]">
                <ArrowPathIcon className="h-4 w-4" />
                Reset
              </button>
              {editingId && (
                <button type="button" onClick={handleDelete} className="btn bg-[#52292c] text-[var(--admin-text)]">
                  <TrashIcon className="h-4 w-4" />
                  Remove
                </button>
              )}
            </div>

            {status && <p className="text-sm text-[var(--admin-muted)]">{status}</p>}
          </div>

          <div className="space-y-5">
            <div className="rounded-[2rem] border border-[rgba(255,180,171,0.1)] bg-[rgba(255,255,255,0.04)] p-4 shadow-[0_28px_60px_rgba(0,0,0,0.22)]">
              <div className="relative overflow-hidden rounded-[1.6rem] bg-[rgba(255,255,255,0.04)]">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,11,11,0)_0%,rgba(19,11,11,0.66)_100%)]" />
                <div className="relative aspect-[0.92]">
                  {heroPreview ? (
                    <Image
                      src={heroPreview}
                      alt={heroTitle}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 24vw, 100vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[var(--admin-muted)]">
                      <PhotoIcon className="h-14 w-14" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--admin-accent)]">
                    Preview
                  </p>
                  <h3 className="mt-3 font-admin text-3xl text-[var(--admin-text)]">
                    {heroTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--admin-muted)]">
                    {heroBody}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 text-[11px] uppercase tracking-[0.24em] text-[var(--admin-muted)]">
                <MetaRow label="Price" value={money(Number(form.priceCents || 0))} />
                <MetaRow
                  label="Tags"
                  value={previewTags.length ? previewTags.join(" / ") : "Awaiting tags"}
                />
                <MetaRow
                  label="Gallery"
                  value={
                    previewGallery.length
                      ? `${previewGallery.length} linked images`
                      : "Hero image only"
                  }
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-[rgba(255,180,171,0.1)] bg-[rgba(255,255,255,0.03)] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--admin-muted)]">
                    Vault archive
                  </p>
                  <h3 className="mt-2 font-admin text-3xl text-[var(--admin-text)]">
                    Stored pieces
                  </h3>
                </div>
                <span className="rounded-full bg-[rgba(255,180,171,0.12)] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[var(--admin-accent)]">
                  {products.length} total
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {products.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleEdit(product)}
                    className={clsx(
                      "w-full rounded-[1.5rem] border px-4 py-4 text-left transition",
                      editingId === product.id
                        ? "border-[rgba(255,180,171,0.28)] bg-[rgba(255,180,171,0.12)]"
                        : "border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)]"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-admin text-2xl text-[var(--admin-text)]">
                            {product.name}
                          </p>
                          {product.featured && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(255,180,171,0.12)] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[var(--admin-accent)]">
                              <StarIcon className="h-3.5 w-3.5" />
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-[var(--admin-muted)]">
                          {product.slug}
                        </p>
                        <p className="mt-3 line-clamp-2 text-sm leading-7 text-[var(--admin-muted)]">
                          {product.tagline ?? product.description}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-admin text-xl text-[var(--admin-accent)]">
                          {money(product.priceCents)}
                        </p>
                        <div className="mt-4 flex justify-end gap-2">
                          <StatusChip
                            icon={product.active ? EyeIcon : EyeSlashIcon}
                            label={product.active ? "Visible" : "Hidden"}
                          />
                          <StatusChip icon={PencilSquareIcon} label="Edit" />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.6rem] bg-[rgba(255,255,255,0.05)] px-4 py-4 text-center">
      <p className="font-admin text-3xl text-[var(--admin-accent)]">{value}</p>
      <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-[var(--admin-muted)]">
        {label}
      </p>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[1.1rem] bg-[rgba(255,255,255,0.03)] px-4 py-3">
      <span>{label}</span>
      <span className="text-right text-[var(--admin-text)]">{value}</span>
    </div>
  );
}

function StatusChip({
  icon: Icon,
  label,
}: {
  icon: typeof EyeIcon;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(255,255,255,0.06)] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[var(--admin-muted)]">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

function TogglePill({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 rounded-full bg-[rgba(255,255,255,0.06)] px-4 py-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-[#ffb4ab]"
      />
      <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--admin-muted)]">
        {label}
      </span>
    </label>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  type?: string;
}) {
  return (
    <label className="label-stack">
      <span className="!text-[var(--admin-muted)]">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="admin-textarea"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="admin-input"
        />
      )}
    </label>
  );
}
