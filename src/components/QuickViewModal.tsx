"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Rating } from "./ui/Rating";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";
import { cn, formatPrice } from "@/lib/utils";

export interface QuickViewModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

export function QuickViewModal({ open, onClose, product }: QuickViewModalProps) {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { toast } = useUI();
  const [qty, setQty] = useState(1);
  const wished = isWishlisted(product.id);
  const onSale = typeof product.originalPrice === "number";

  useEffect(() => {
    if (open) setQty(1);
  }, [open]);

  const handleAdd = () => {
    addItem(product, qty);
    toast({
      title: "Added to cart",
      description: `${qty} × ${product.name}`,
      variant: "success",
    });
    onClose();
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
    <Modal open={open} onClose={onClose} className="max-w-3xl" title={product.name}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-beige/40">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 90vw, 40vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-light">
            {product.category.replace("-", " ")}
          </p>
          <h3 className="mt-1 font-serif text-2xl text-charcoal">{product.name}</h3>
          <div className="mt-2">
            <Rating value={product.rating} showValue count={product.reviews} />
          </div>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="font-serif text-2xl text-primary">
              {formatPrice(product.price)}
            </span>
            {onSale ? (
              <span className="text-sm text-muted line-through">
                {formatPrice(product.originalPrice as number)}
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {product.description}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <span className="text-sm text-muted">Quantity</span>
            <div className="inline-flex items-center rounded-full border border-primary/20">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-1.5 text-primary"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-1.5 text-primary"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <Button onClick={handleAdd} className="flex-1">
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </Button>
            <Button
              variant="outline"
              onClick={handleWishlist}
              aria-label="Toggle wishlist"
              className="px-4"
            >
              <Heart className={cn("h-4 w-4", wished && "fill-current")} />
            </Button>
          </div>
          <Link
            href={`/product/${product.slug}`}
            onClick={onClose}
            className="mt-4 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            View full details →
          </Link>
        </div>
      </div>
    </Modal>
  );
}
