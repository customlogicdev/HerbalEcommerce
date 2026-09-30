"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  ChevronRight,
  Truck,
  ShieldCheck,
  Recycle,
} from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";
import { Button } from "./ui/Button";
import { Rating } from "./ui/Rating";
import { Tabs } from "./ui/Tabs";
import { ProductGrid } from "./ProductGrid";
import { cn, formatPrice } from "@/lib/utils";

const guarantees = [
  { icon: Truck, label: "Free shipping over $49" },
  { icon: ShieldCheck, label: "Dermatologist tested" },
  { icon: Recycle, label: "Recyclable packaging" },
];

export interface ProductDetailProps {
  product: Product;
  related: Product[];
  categoryName: string;
}

export function ProductDetail({ product, related, categoryName }: ProductDetailProps) {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { toast } = useUI();
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);

  const wished = isWishlisted(product.id);
  const onSale = typeof product.originalPrice === "number";
  const images = product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAdd = () => {
    addItem(product, qty);
    toast({
      title: "Added to cart",
      description: `${qty} × ${product.name}`,
      variant: "success",
    });
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    toast({
      title: wished ? "Removed from wishlist" : "Saved to wishlist",
      description: product.name,
      variant: wished ? "warning" : "success",
    });
  };

  const tabs = [
    {
      id: "description",
      label: "Description",
      content: (
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          {product.description}
        </p>
      ),
    },
    {
      id: "ingredients",
      label: "Ingredients",
      content: (
        <ul className="grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-3">
          {product.ingredients.map((ingredient) => (
            <li
              key={ingredient}
              className="flex items-center gap-2 rounded-xl bg-beige/50 px-3 py-2 text-sm text-charcoal"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {ingredient}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "how-to-use",
      label: "How to Use",
      content: (
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          {product.howToUse}
        </p>
      ),
    },
    {
      id: "reviews",
      label: `Reviews (${product.reviews})`,
      content: (
        <div className="max-w-2xl space-y-4">
          <div className="flex items-center gap-5 rounded-2xl bg-beige/40 p-5">
            <div className="text-center">
              <p className="font-serif text-4xl text-primary">
                {product.rating.toFixed(1)}
              </p>
              <Rating value={product.rating} size={14} />
              <p className="mt-1 text-xs text-muted">{product.reviews} reviews</p>
            </div>
            <p className="text-sm text-muted">
              94% of customers would recommend this product.
            </p>
          </div>
          {[
            { text: "Absolutely love this — visible results within just a few weeks.", when: "2 weeks ago" },
            { text: "Great quality, divine scent, and it feels so gentle on my skin.", when: "1 month ago" },
          ].map((review, i) => (
            <div key={i} className="rounded-2xl border border-primary/10 p-4">
              <Rating value={5} size={13} />
              <p className="mt-2 text-sm text-charcoal">{review.text}</p>
              <p className="mt-1 text-xs text-muted">Verified buyer · {review.when}</p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-muted">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/shop" className="hover:text-primary">
          Shop
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href={`/shop?category=${product.category}`}
          className="capitalize hover:text-primary"
        >
          {categoryName}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-beige/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[activeImage]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            {onSale ? (
              <span className="absolute left-4 top-4 rounded-full bg-peach px-3 py-1 text-xs font-semibold text-charcoal">
                Sale
              </span>
            ) : null}
          </div>
          <div className="mt-4 flex gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "relative h-20 w-20 overflow-hidden rounded-xl ring-2 transition",
                  activeImage === i ? "ring-primary" : "ring-transparent hover:ring-primary/30"
                )}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary-light">
            {categoryName}
          </p>
          <h1 className="mt-2 font-serif text-3xl text-charcoal sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Rating value={product.rating} showValue count={product.reviews} size={16} />
            <span
              className={cn(
                "text-xs font-medium",
                product.inStock ? "text-primary" : "text-peach"
              )}
            >
              {product.inStock ? "● In Stock" : "● Out of Stock"}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="font-serif text-3xl text-primary">
              {formatPrice(product.price)}
            </span>
            {onSale ? (
              <>
                <span className="text-lg text-muted line-through">
                  {formatPrice(product.originalPrice as number)}
                </span>
                <span className="rounded-full bg-peach/20 px-2 py-0.5 text-xs font-semibold text-peach">
                  Save {formatPrice((product.originalPrice as number) - product.price)}
                </span>
              </>
            ) : null}
          </div>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-primary/20">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-3 text-primary"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="px-4 py-3 text-primary"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <Button onClick={handleAdd} size="lg" className="flex-1 sm:flex-none">
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </Button>
            <Button
              onClick={handleWishlist}
              variant="outline"
              size="lg"
              aria-label="Toggle wishlist"
              className="px-4"
            >
              <Heart className={cn("h-4 w-4", wished && "fill-current")} />
            </Button>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {guarantees.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-xl bg-beige/40 px-3 py-2.5 text-xs text-charcoal"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14">
        <Tabs items={tabs} />
      </div>

      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">
            You May Also Like
          </h2>
          <div className="mt-6">
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
