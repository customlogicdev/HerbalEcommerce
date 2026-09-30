"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { Rating } from "./ui/Rating";
import { buttonStyles } from "./ui/Button";
import { formatPrice } from "@/lib/utils";

export function WishlistView() {
  const { items, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useUI();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-beige text-primary">
          <Heart className="h-9 w-9" />
        </div>
        <h1 className="mt-6 font-serif text-3xl text-charcoal">Your wishlist is empty</h1>
        <p className="mt-2 text-muted">
          Tap the heart on any product to save it here for later.
        </p>
        <Link href="/shop" className={`${buttonStyles("primary", "lg")} mt-8`}>
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-charcoal">My Wishlist</h1>
      <p className="mt-2 text-sm text-muted">
        {items.length} saved item{items.length !== 1 ? "s" : ""}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white"
          >
            <Link
              href={`/product/${product.slug}`}
              className="relative aspect-square overflow-hidden bg-beige/40"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <div className="flex flex-1 flex-col p-4">
              <Link
                href={`/product/${product.slug}`}
                className="font-medium text-charcoal hover:text-primary"
              >
                {product.name}
              </Link>
              <Rating value={product.rating} showValue count={product.reviews} className="mt-1" />
              <span className="mt-2 font-serif text-lg text-primary">
                {formatPrice(product.price)}
              </span>
              <div className="mt-auto flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    addItem(product);
                    toast({ title: "Added to cart", description: product.name, variant: "success" });
                  }}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-medium text-cream transition hover:bg-primary-dark"
                >
                  <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    removeFromWishlist(product.id);
                    toast({ title: "Removed from wishlist", description: product.name, variant: "warning" });
                  }}
                  aria-label={`Remove ${product.name} from wishlist`}
                  className="grid h-9 w-9 place-items-center rounded-full border border-primary/20 text-muted transition hover:text-peach"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
