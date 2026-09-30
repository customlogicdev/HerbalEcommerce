"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, List, ShoppingBag, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductCard } from "./ProductCard";
import { Button } from "./ui/Button";
import { Rating } from "./ui/Rating";
import { Sheet } from "./ui/Sheet";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

const PAGE_SIZE = 8;
const PRICE_MIN = 12;
const PRICE_MAX = 50;

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

const ratingOptions = [
  { label: "All", value: 0 },
  { label: "4.0 & up", value: 4 },
  { label: "4.5 & up", value: 4.5 },
];

function ProductRow({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toast } = useUI();

  return (
    <article className="flex gap-4 rounded-2xl border border-primary/10 bg-white p-3">
      <Link
        href={`/product/${product.slug}`}
        className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-beige/40"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="112px"
          className="object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              href={`/product/${product.slug}`}
              className="font-medium text-charcoal hover:text-primary"
            >
              {product.name}
            </Link>
            <p className="text-xs capitalize text-muted">
              {product.category.replace("-", " ")}
            </p>
          </div>
          <div className="text-right">
            <p className="font-serif text-lg text-primary">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice ? (
              <p className="text-xs text-muted line-through">
                {formatPrice(product.originalPrice)}
              </p>
            ) : null}
          </div>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <Rating value={product.rating} showValue count={product.reviews} />
          <button
            type="button"
            onClick={() => {
              addItem(product);
              toast({ title: "Added to cart", description: product.name, variant: "success" });
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-cream transition hover:bg-primary-dark"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export interface ShopClientProps {
  initialCategory?: string;
}

export function ShopClient({ initialCategory }: ShopClientProps) {
  const [category, setCategory] = useState<string>(
    initialCategory && initialCategory !== "all" ? initialCategory : "all"
  );
  const [maxPrice, setMaxPrice] = useState<number>(PRICE_MAX);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [category, maxPrice, minRating, inStockOnly, sort, view]);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        p.price <= maxPrice &&
        p.rating >= minRating &&
        (!inStockOnly || p.inStock)
    );
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list = [...list].sort(
          (a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew))
        );
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
        );
    }
    return list;
  }, [category, maxPrice, minRating, inStockOnly, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const clearFilters = () => {
    setCategory("all");
    setMaxPrice(PRICE_MAX);
    setMinRating(0);
    setInStockOnly(false);
  };

  const activeFilters =
    (category !== "all" ? 1 : 0) +
    (maxPrice < PRICE_MAX ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const filterControls: ReactNode = (
    <div className="space-y-7">
      <div>
        <h3 className="font-serif text-base text-charcoal">Category</h3>
        <div className="mt-3 space-y-1.5">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={cn(
              "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition",
              category === "all"
                ? "bg-beige font-medium text-primary"
                : "text-muted hover:bg-cream"
            )}
          >
            All Products
            <span className="text-xs">{products.length}</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition",
                category === c.id
                  ? "bg-beige font-medium text-primary"
                  : "text-muted hover:bg-cream"
              )}
            >
              {c.name}
              <span className="text-xs">
                {products.filter((p) => p.category === c.id).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-serif text-base text-charcoal">Price</h3>
        <p className="mt-3 text-sm text-muted">Up to {formatPrice(maxPrice)}</p>
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={1}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          aria-label="Maximum price"
          className="mt-2 w-full accent-[#3A5A40]"
        />
        <div className="flex justify-between text-xs text-muted">
          <span>{formatPrice(PRICE_MIN)}</span>
          <span>{formatPrice(PRICE_MAX)}</span>
        </div>
      </div>

      <div>
        <h3 className="font-serif text-base text-charcoal">Rating</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {ratingOptions.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => setMinRating(opt.value)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition",
                minRating === opt.value
                  ? "border-primary bg-primary text-cream"
                  : "border-primary/20 text-muted hover:border-primary/40"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-charcoal">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 rounded border-primary/30 accent-[#3A5A40]"
          />
          In stock only
        </label>
      </div>

      {activeFilters > 0 ? (
        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
          Clear all filters
        </Button>
      ) : null}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
          Shop
        </p>
        <h1 className="mt-2 font-serif text-4xl text-charcoal">All Products</h1>
        <p className="mt-2 text-sm text-muted">{filtered.length} products found</p>
      </div>

      <div className="mt-8 flex gap-8">
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-primary/10 bg-white p-5">
            {filterControls}
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-white p-3">
            <button
              type="button"
              onClick={() => setMobileFilters(true)}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-charcoal transition hover:bg-cream lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
              {activeFilters > 0 ? (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-peach text-[10px] text-white">
                  {activeFilters}
                </span>
              ) : null}
            </button>

            <div className="ml-auto flex items-center gap-3">
              <label className="hidden text-sm text-muted sm:block">Sort by</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort products"
                className="rounded-full border border-primary/15 bg-white px-3 py-2 text-sm text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
              </select>
              <div className="hidden items-center gap-1 rounded-full border border-primary/15 p-1 sm:flex">
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-full transition",
                    view === "grid" ? "bg-primary text-cream" : "text-muted hover:text-charcoal"
                  )}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  aria-label="List view"
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-full transition",
                    view === "list" ? "bg-primary text-cream" : "text-muted hover:text-charcoal"
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {pageItems.length === 0 ? (
            <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-primary/10 bg-white p-12 text-center">
              <p className="text-muted">No products match your filters.</p>
              <Button onClick={clearFilters}>Clear filters</Button>
            </div>
          ) : view === "grid" ? (
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
              {pageItems.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {pageItems.map((p) => (
                <ProductRow key={p.id} product={p} />
              ))}
            </div>
          )}

          {totalPages > 1 ? (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="rounded-full border border-primary/20 px-4 py-2 text-sm text-charcoal transition hover:bg-cream disabled:opacity-40"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i + 1)}
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-full text-sm transition",
                    safePage === i + 1
                      ? "bg-primary text-cream"
                      : "text-charcoal hover:bg-cream"
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="rounded-full border border-primary/20 px-4 py-2 text-sm text-charcoal transition hover:bg-cream disabled:opacity-40"
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <Sheet
        open={mobileFilters}
        onClose={() => setMobileFilters(false)}
        side="left"
        labelledBy="mobile-filters-title"
      >
        <div className="flex items-center justify-between border-b border-primary/10 p-5">
          <h2 id="mobile-filters-title" className="font-serif text-xl text-charcoal">
            Filters
          </h2>
          <button
            type="button"
            onClick={() => setMobileFilters(false)}
            aria-label="Close filters"
            className="rounded-full p-2 text-muted transition hover:bg-cream"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{filterControls}</div>
        <div className="border-t border-primary/10 p-5">
          <Button className="w-full" onClick={() => setMobileFilters(false)}>
            Show {filtered.length} Results
          </Button>
        </div>
      </Sheet>
    </div>
  );
}
