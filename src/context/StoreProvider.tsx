"use client";

import type { ReactNode } from "react";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { UIProvider } from "./UIContext";

/** Composes all client-side store providers (cart, wishlist, UI, toasts). */
export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <UIProvider>{children}</UIProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
