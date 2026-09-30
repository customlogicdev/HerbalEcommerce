"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, X, Truck } from "lucide-react";
import { Sheet } from "./ui/Sheet";
import { buttonStyles } from "./ui/Button";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 49;

export function CartDrawer() {
  const { cartOpen, closeCart } = useUI();
  const { items, subtotal, count, setQuantity, removeItem } = useCart();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <Sheet open={cartOpen} onClose={closeCart} side="right" labelledBy="cart-drawer-title">
      <div className="flex items-center justify-between border-b border-primary/10 p-5">
        <h2 id="cart-drawer-title" className="font-serif text-xl text-charcoal">
          Your Cart ({count})
        </h2>
        <button
          type="button"
          onClick={closeCart}
          aria-label="Close cart"
          className="rounded-full p-2 text-muted transition hover:bg-cream hover:text-charcoal"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-beige text-primary">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <p className="text-muted">Your cart is feeling a little light.</p>
          <Link href="/shop" onClick={closeCart} className={buttonStyles("primary", "md")}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          {remaining > 0 ? (
            <div className="flex items-center gap-2 bg-beige/60 px-5 py-3 text-xs text-primary">
              <Truck className="h-4 w-4" />
              Add {formatPrice(remaining)} more to unlock free shipping.
            </div>
          ) : (
            <div className="bg-primary/10 px-5 py-3 text-xs font-medium text-primary">
              🎉 You&apos;ve unlocked free shipping!
            </div>
          )}

          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-beige/40">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <Link
                      href={`/product/${item.product.slug}`}
                      onClick={closeCart}
                      className="text-sm font-medium leading-snug text-charcoal hover:text-primary"
                    >
                      {item.product.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id)}
                      aria-label={`Remove ${item.product.name}`}
                      className="text-muted transition hover:text-peach"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-primary">
                    {formatPrice(item.product.price)}
                  </span>
                  <div className="mt-auto inline-flex w-fit items-center rounded-full border border-primary/20">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.product.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-primary"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.product.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-primary"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t border-primary/10 p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-semibold text-charcoal">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-muted">Taxes and shipping calculated at checkout.</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className={buttonStyles("primary", "md", "w-full")}
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block text-center text-sm text-primary underline-offset-4 hover:underline"
            >
              View full cart
            </Link>
          </div>
        </>
      )}
    </Sheet>
  );
}
