"use client";

import { useState } from "react";
import type { ProductRecord } from "@/lib/content-store";

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

const sortProducts = (items: ProductRecord[]) =>
  [...items].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }
    return right.createdAt.localeCompare(left.createdAt);
  });

export function ProductManager({ initial }: { initial: ProductRecord[] }) {
  const [products, setProducts] = useState<ProductRecord[]>(initial);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Saving…");
    const payload = {
      ...form,
      priceCents: Number(form.priceCents),
      gallery: form.gallery
        ? form.gallery.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      tags: form.tags ? form.tags.split(",").map((s) => s.trim()).filter(Boolean) : [],
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/products/${editingId}` : "/api/products";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.json();
      setStatus(`Error: ${body?.message ?? "Unable to save"}`);
      return;
    }
    const updated = await res.json();
    if (editingId) {
      setProducts((prev) =>
        sortProducts(prev.map((p) => (p.id === editingId ? updated : p)))
      );
    } else {
      setProducts((prev) => sortProducts([updated, ...prev]));
    }
    setStatus("Saved");
    resetForm();
  };

  const handleDelete = async () => {
    if (!editingId) return;
    setStatus("Removing product…");
    const res = await fetch(`/api/products/${editingId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setStatus(`Error: ${body?.message ?? "Unable to delete"}`);
      return;
    }

    setProducts((prev) => prev.filter((product) => product.id !== editingId));
    setStatus("Removed");
    resetForm();
  };

  const handleHeroUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadStatus("Uploading image…");
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
    const body = await res.json();
    setForm((f) => ({ ...f, heroImage: body.url }));
    setUploadStatus("Uploaded. Saved hero image URL.");
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
      <form
        className="space-y-4 rounded-3xl border border-black/5 bg-white/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted">
              {editingId ? "Edit" : "Create"} product
            </p>
            <h2 className="text-xl font-semibold">{form.name || "Untitled"}</h2>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="text-sm text-muted underline"
          >
            Reset
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Field
            label="Name"
            value={form.name}
            onChange={(value) => setForm((f) => ({ ...f, name: value }))}
          />
          <Field
            label="Slug"
            value={form.slug}
            onChange={(value) => setForm((f) => ({ ...f, slug: value }))}
          />
        </div>
        <Field
          label="Tagline"
          value={form.tagline}
          onChange={(value) => setForm((f) => ({ ...f, tagline: value }))}
        />
        <Field
          label="Description"
          textarea
          value={form.description}
          onChange={(value) => setForm((f) => ({ ...f, description: value }))}
        />
        <div className="grid gap-3 md:grid-cols-2">
          <Field
            label="Price (cents)"
            type="number"
            value={form.priceCents.toString()}
            onChange={(value) =>
              setForm((f) => ({ ...f, priceCents: Number(value) }))
            }
          />
          <Field
            label="Badge"
            value={form.badge}
            onChange={(value) => setForm((f) => ({ ...f, badge: value }))}
          />
        </div>
        <Field
          label="Hero image URL"
          value={form.heroImage}
          onChange={(value) => setForm((f) => ({ ...f, heroImage: value }))}
        />
        <label className="flex flex-col gap-2 text-sm text-muted">
          Upload hero image
          <input
            type="file"
            accept="image/*"
            onChange={handleHeroUpload}
            className="rounded-xl border border-black/10 bg-white px-3 py-3 text-sm outline-none transition focus:border-ink"
          />
          {uploadStatus && <span className="text-xs text-ink">{uploadStatus}</span>}
        </label>
        <Field
          label="Gallery URLs (comma separated)"
          value={form.gallery}
          onChange={(value) => setForm((f) => ({ ...f, gallery: value }))}
        />
        <Field
          label="Tags (comma separated)"
          value={form.tags}
          onChange={(value) => setForm((f) => ({ ...f, tags: value }))}
        />
        <div className="flex gap-4 text-sm text-muted">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setForm((f) => ({ ...f, featured: e.target.checked }))
              }
            />
            Featured
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) =>
                setForm((f) => ({ ...f, active: e.target.checked }))
              }
            />
            Active
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.2)]"
        >
          {editingId ? "Update product" : "Create product"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={handleDelete}
            className="w-full rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
          >
            Delete product
          </button>
        )}
        {status && <p className="text-sm text-muted">{status}</p>}
      </form>

      <div className="space-y-3 rounded-3xl border border-black/5 bg-white/70 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between px-2">
          <p className="text-sm font-semibold text-ink">Catalog</p>
          <span className="text-xs text-muted">{products.length} items</span>
        </div>
        <div className="divide-y divide-black/5 rounded-2xl border border-black/5 bg-white/60">
          {products.map((product) => (
            <button
              key={product.id}
              className="w-full text-left transition hover:bg-black/3"
              onClick={() => handleEdit(product)}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">{product.name}</p>
                  <p className="text-xs text-muted">{product.slug}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted">
                  {product.featured && (
                    <span className="rounded-full bg-ink px-3 py-1 text-white">
                      Featured
                    </span>
                  )}
                  {!product.active && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-red-700">
                      Hidden
                    </span>
                  )}
                  <span className="rounded-full bg-black/5 px-3 py-1">
                    ${product.priceCents / 100}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
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
    <label className="flex flex-col gap-2 text-sm text-muted">
      {label}
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="rounded-xl border border-black/10 bg-white px-3 py-3 text-sm text-ink outline-none transition focus:border-ink"
        />
      ) : (
        <input
          value={value}
          type={type}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-xl border border-black/10 bg-white px-3 py-3 text-sm text-ink outline-none transition focus:border-ink"
        />
      )}
    </label>
  );
}
