"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "@/types";

const CART_KEY = "naturaa_cart";

interface CartState {
  items: CartItem[];
  hydrated: boolean;
}

type CartAction =
  | { type: "HYDRATE"; payload: CartItem[] }
  | { type: "ADD"; product: Product; quantity: number }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; quantity: number }
  | { type: "CLEAR" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.payload, hydrated: true };
    case "ADD": {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: action.quantity }],
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.product.id !== action.id) };
    case "SET_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.id ? { ...i, quantity: Math.max(1, action.quantity) } : i
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], hydrated: false });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed = raw ? (JSON.parse(raw) as CartItem[]) : [];
      dispatch({ type: "HYDRATE", payload: Array.isArray(parsed) ? parsed : [] });
    } catch {
      dispatch({ type: "HYDRATE", payload: [] });
    }
  }, []);

  useEffect(() => {
    if (state.hydrated) {
      localStorage.setItem(CART_KEY, JSON.stringify(state.items));
    }
  }, [state.items, state.hydrated]);

  const count = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const value: CartContextValue = {
    items: state.items,
    count,
    subtotal,
    hydrated: state.hydrated,
    addItem: (product, quantity = 1) => dispatch({ type: "ADD", product, quantity }),
    removeItem: (id) => dispatch({ type: "REMOVE", id }),
    setQuantity: (id, quantity) => dispatch({ type: "SET_QTY", id, quantity }),
    clearCart: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
