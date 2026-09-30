"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { Product } from "@/types";

const WISHLIST_KEY = "naturaa_wishlist";

interface WishlistState {
  items: Product[];
  hydrated: boolean;
}

type WishlistAction =
  | { type: "HYDRATE"; payload: Product[] }
  | { type: "TOGGLE"; product: Product }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" };

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.payload, hydrated: true };
    case "TOGGLE": {
      const exists = state.items.some((p) => p.id === action.product.id);
      return {
        ...state,
        items: exists
          ? state.items.filter((p) => p.id !== action.product.id)
          : [...state.items, action.product],
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((p) => p.id !== action.id) };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

interface WishlistContextValue {
  items: Product[];
  count: number;
  hydrated: boolean;
  isWishlisted: (id: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [], hydrated: false });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      const parsed = raw ? (JSON.parse(raw) as Product[]) : [];
      dispatch({ type: "HYDRATE", payload: Array.isArray(parsed) ? parsed : [] });
    } catch {
      dispatch({ type: "HYDRATE", payload: [] });
    }
  }, []);

  useEffect(() => {
    if (state.hydrated) {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.items));
    }
  }, [state.items, state.hydrated]);

  const value: WishlistContextValue = {
    items: state.items,
    count: state.items.length,
    hydrated: state.hydrated,
    isWishlisted: (id) => state.items.some((p) => p.id === id),
    toggleWishlist: (product) => dispatch({ type: "TOGGLE", product }),
    removeFromWishlist: (id) => dispatch({ type: "REMOVE", id }),
    clearWishlist: () => dispatch({ type: "CLEAR" }),
  };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
