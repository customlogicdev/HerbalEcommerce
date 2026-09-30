"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";
import { Rating } from "./ui/Rating";
import { QuickViewModal } from "./QuickViewModal";
import { cn, formatPrice } from "@/lib/utils";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { toast } = useUI();
  const [qvOpen, setQvOpen] = useState(false);

  const wished = isWishlisted(product.id);
  const onSale = typeof product.originalPrice === "number";

  const handleAdd = () => {
    addItem(product);
    toast({ title: "Added to cart", description: product.name, variant: "success" });
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    toast({
      title: wished ? "Removed from wishlist" : "Saved to wishlist",
      description: product.name,
      variant: wished ? "warning" : "success",
    });
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(58,90,64,0.16)]"
    >
      <div className="relative aspect-square overflow-hidden bg-beige/40">
        <Link href={`/product/${product.slug}`} aria-label={product.name}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {product.badge ? (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold",
              onSale ? "bg-peach text-charcoal" : "bg-primary text-cream"
            )}
          >
            {product.badge}
          </span>
        ) : null}

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition",
            wished
              ? "bg-peach text-white"
              : "bg-white/85 text-primary hover:bg-white"
          )}
        >
          <Heart className={cn("h-4 w-4", wished && "fill-current")} />
        </button>

        <button
          type="button"
          onClick={() => setQvOpen(true)}
          className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 translate-y-3 items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-charcoal opacity-0 shadow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white"
        >
          <Eye className="h-3.5 w-3.5" /> Quick View
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link
          href={`/product/${product.slug}`}
          className="font-medium leading-snug text-charcoal transition hover:text-primary"
        >
          {product.name}
        </Link>
        <Rating value={product.rating} showValue count={product.reviews} />
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg text-primary">
              {formatPrice(product.price)}
            </span>
            {onSale ? (
              <span className="text-xs text-muted line-through">
                {formatPrice(product.originalPrice as number)}
              </span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-cream transition hover:bg-primary-dark"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>

      <QuickViewModal open={qvOpen} onClose={() => setQvOpen(false)} product={product} />
    </motion.article>
  );
}
