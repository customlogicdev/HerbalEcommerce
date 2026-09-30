"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { products } from "@/data/products";
import { useUI } from "@/context/UIContext";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

export function SearchModal() {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.replace("-", " ").includes(q) ||
          p.description.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  return (
    <Modal open={searchOpen} onClose={closeSearch} className="max-w-xl" title="Search products">
      <h2 className="font-serif text-2xl text-charcoal">Search</h2>
      <p className="mt-1 text-sm text-muted">Find your next botanical favorite.</p>
      <div className="relative mt-4">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <Input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products or categories..."
          className="pl-11"
          aria-label="Search products"
        />
      </div>
      <div className="mt-4 max-h-[50vh] overflow-y-auto">
        {query.trim() === "" ? (
          <p className="py-8 text-center text-sm text-muted">
            Start typing to see results.
          </p>
        ) : results.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">
            No products found for &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <ul className="space-y-1">
            {results.map((p: Product) => (
              <li key={p.id}>
                <Link
                  href={`/product/${p.slug}`}
                  onClick={closeSearch}
                  className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-cream"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-beige/40">
                    <Image src={p.image} alt={p.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-charcoal">{p.name}</p>
                    <p className="text-xs capitalize text-muted">
                      {p.category.replace("-", " ")}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {formatPrice(p.price)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
}
