"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X, AlertTriangle } from "lucide-react";
import type { Toast } from "@/types";

interface UIContextValue {
  searchOpen: boolean;
  authOpen: boolean;
  cartOpen: boolean;
  mobileOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  openAuth: () => void;
  closeAuth: () => void;
  openCart: () => void;
  closeCart: () => void;
  openMobile: () => void;
  closeMobile: () => void;
  toasts: Toast[];
  toast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
}

const UIContext = createContext<UIContextValue | undefined>(undefined);

let toastCounter = 0;

export function UIProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (input: Omit<Toast, "id">) => {
      const id = `toast-${Date.now()}-${toastCounter++}`;
      setToasts((prev) => [...prev, { ...input, id }]);
      window.setTimeout(() => dismissToast(id), 3200);
    },
    [dismissToast]
  );

  const value: UIContextValue = {
    searchOpen,
    authOpen,
    cartOpen,
    mobileOpen,
    openSearch: () => setSearchOpen(true),
    closeSearch: () => setSearchOpen(false),
    openAuth: () => setAuthOpen(true),
    closeAuth: () => setAuthOpen(false),
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    openMobile: () => setMobileOpen(true),
    closeMobile: () => setMobileOpen(false),
    toasts,
    toast,
    dismissToast,
  };

  return (
    <UIContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-6 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-primary/10 bg-white p-4 shadow-[0_18px_40px_rgba(26,26,26,0.14)]"
            >
              <span className="mt-0.5 shrink-0 text-primary">
                {t.variant === "success" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : t.variant === "warning" ? (
                  <AlertTriangle className="h-5 w-5 text-peach" />
                ) : (
                  <Info className="h-5 w-5" />
                )}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-charcoal">{t.title}</p>
                {t.description ? (
                  <p className="mt-0.5 text-xs text-muted">{t.description}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(t.id)}
                aria-label="Dismiss notification"
                className="rounded-full p-1 text-muted transition hover:bg-cream hover:text-charcoal"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </UIContext.Provider>
  );
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within a UIProvider");
  return ctx;
}
