"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Leaf, Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { navLinks } from "@/data/site";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";
import { CartDrawer } from "./CartDrawer";
import { SearchModal } from "./SearchModal";
import { AuthModal } from "./AuthModal";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Naturaa home">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-cream">
        <Leaf className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl text-primary">Naturaa</span>
        <span className="text-[9px] uppercase tracking-[0.25em] text-muted">
          Organic Living
        </span>
      </span>
    </Link>
  );
}

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-peach px-1 text-[10px] font-bold text-white">
      {count}
    </span>
  );
}

const iconButton =
  "relative grid h-10 w-10 place-items-center rounded-full text-charcoal transition hover:bg-beige hover:text-primary";

export function Header() {
  const pathname = usePathname();
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { openSearch, openAuth, openCart, openMobile, mobileOpen, closeMobile } = useUI();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-cream/90 shadow-sm backdrop-blur" : "bg-cream"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openMobile}
            aria-label="Open menu"
            className={cn(iconButton, "lg:hidden")}
          >
            <Menu className="h-5 w-5" />
          </button>
          <Logo />
        </div>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  active ? "text-primary" : "text-charcoal hover:text-primary"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-primary transition-all duration-300",
                    active ? "w-full" : "w-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search"
            className={iconButton}
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={openAuth}
            aria-label="Account"
            className={cn(iconButton, "hidden sm:grid")}
          >
            <User className="h-5 w-5" />
          </button>
          <Link href="/wishlist" aria-label="Wishlist" className={iconButton}>
            <Heart className="h-5 w-5" />
            <CountBadge count={wishCount} />
          </Link>
          <button
            type="button"
            onClick={openCart}
            aria-label="Cart"
            className={iconButton}
          >
            <ShoppingBag className="h-5 w-5" />
            <CountBadge count={cartCount} />
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-[90] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
              onClick={closeMobile}
              aria-hidden
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute left-0 top-0 flex h-full w-4/5 max-w-sm flex-col bg-cream p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={closeMobile}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full text-charcoal transition hover:bg-beige"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-8 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobile}
                    className={cn(
                      "rounded-xl px-4 py-3 font-serif text-lg transition",
                      pathname === link.href
                        ? "bg-beige text-primary"
                        : "text-charcoal hover:bg-beige/60"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto space-y-2 border-t border-primary/10 pt-4">
                <Link
                  href="/account"
                  onClick={closeMobile}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-charcoal transition hover:bg-beige"
                >
                  <User className="h-4 w-4 text-primary" /> My Account
                </Link>
                <Link
                  href="/wishlist"
                  onClick={closeMobile}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-charcoal transition hover:bg-beige"
                >
                  <Heart className="h-4 w-4 text-primary" /> Wishlist
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <CartDrawer />
      <SearchModal />
      <AuthModal />
    </header>
  );
}
