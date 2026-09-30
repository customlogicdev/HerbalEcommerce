"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { buttonStyles } from "./ui/Button";
import { formatPrice } from "@/lib/utils";

const SHIPPING_FLAT = 6.9;
const TAX_RATE = 0.08;
const FREE_THRESHOLD = 49;

export function CartView() {
  const { items, subtotal, count, setQuantity, removeItem, clearCart } = useCart();

  const shipping = subtotal === 0 || subtotal >= FREE_THRESHOLD ? 0 : SHIPPING_FLAT;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-beige text-primary">
          <ShoppingBag className="h-9 w-9" />
        </div>
        <h1 className="mt-6 font-serif text-3xl text-charcoal">Your cart is empty</h1>
        <p className="mt-2 text-muted">
          Looks like you haven&apos;t added any botanical goodness yet.
        </p>
        <Link href="/shop" className={`${buttonStyles("primary", "lg")} mt-8`}>
          Start Shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-charcoal">Shopping Cart</h1>
      <p className="mt-2 text-sm text-muted">
        {count} item{count !== 1 ? "s" : ""} in your cart
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 rounded-2xl border border-primary/10 bg-white p-4"
            >
              <Link
                href={`/product/${item.product.slug}`}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-beige/40 sm:h-28 sm:w-28"
              >
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-2">
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="font-medium text-charcoal hover:text-primary"
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
                <p className="text-xs capitalize text-muted">
                  {item.product.category.replace("-", " ")}
                </p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center rounded-full border border-primary/20">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-primary"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-primary"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-semibold text-primary">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={clearCart}
            className="text-sm text-muted underline-offset-4 transition hover:text-peach hover:underline"
          >
            Clear cart
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-primary/10 bg-white p-6">
            <h2 className="font-serif text-xl text-charcoal">Order Summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="text-charcoal">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="text-charcoal">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Estimated tax</dt>
                <dd className="text-charcoal">{formatPrice(tax)}</dd>
              </div>
              <div className="flex justify-between border-t border-primary/10 pt-3">
                <dt className="font-semibold text-charcoal">Total</dt>
                <dd className="font-serif text-xl text-primary">{formatPrice(total)}</dd>
              </div>
            </dl>
            {subtotal < FREE_THRESHOLD ? (
              <p className="mt-3 text-xs text-muted">
                Add {formatPrice(FREE_THRESHOLD - subtotal)} more for free shipping.
              </p>
            ) : null}
            <Link
              href="/checkout"
              className={`${buttonStyles("primary", "md")} mt-5 w-full`}
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/shop"
              className="mt-3 block text-center text-sm text-primary underline-offset-4 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
