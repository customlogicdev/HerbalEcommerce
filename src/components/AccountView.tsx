"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Package, MapPin, Heart, User } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { cn } from "@/lib/utils";

type TabId = "login" | "orders" | "wishlist" | "addresses";

const tabs: { id: TabId; label: string; icon: typeof User }[] = [
  { id: "login", label: "Login / Register", icon: User },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "wishlist", label: "My Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
];

const demoOrders = [
  { id: "NB-10293", date: "May 2, 2026", status: "Delivered", total: "$64.00", items: 3 },
  { id: "NB-10188", date: "Apr 18, 2026", status: "In Transit", total: "$38.00", items: 1 },
];

export function AccountView() {
  const { count: wishCount } = useWishlist();
  const { toast } = useUI();
  const [active, setActive] = useState<TabId>("login");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast({ title: "Missing information", description: "Please fill in all fields.", variant: "warning" });
      return;
    }
    toast({
      title: mode === "login" ? "Signed in (demo)" : "Account created (demo)",
      description: email,
      variant: "success",
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-charcoal">My Account</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-[220px_1fr]">
        <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium transition",
                active === tab.id
                  ? "bg-primary text-cream"
                  : "text-charcoal hover:bg-beige"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.id === "wishlist" && wishCount > 0 ? (
                <span className="ml-auto rounded-full bg-peach px-1.5 text-[10px] text-white">
                  {wishCount}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="rounded-2xl border border-primary/10 bg-white p-6">
          {active === "login" ? (
            <div>
              <h2 className="font-serif text-2xl text-charcoal">
                {mode === "login" ? "Welcome Back" : "Create Your Account"}
              </h2>
              <p className="mt-1 text-sm text-muted">
                Static demo — sign in to explore the account experience.
              </p>
              <div className="mt-5 grid w-full max-w-xs grid-cols-2 gap-2 rounded-full bg-beige/60 p-1">
                {(["login", "register"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={cn(
                      "rounded-full py-2 text-sm font-medium capitalize transition",
                      mode === m ? "bg-white text-primary shadow-sm" : "text-muted hover:text-charcoal"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="mt-5 max-w-sm space-y-3" noValidate>
                <div>
                  <label htmlFor="acc-email" className="mb-1 block text-xs font-medium text-charcoal">
                    Email
                  </label>
                  <Input
                    id="acc-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="acc-pass" className="mb-1 block text-xs font-medium text-charcoal">
                    Password
                  </label>
                  <Input
                    id="acc-pass"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <Button type="submit">
                  {mode === "login" ? "Sign In" : "Create Account"}
                </Button>
              </form>
            </div>
          ) : null}

          {active === "orders" ? (
            <div>
              <h2 className="font-serif text-2xl text-charcoal">My Orders</h2>
              <div className="mt-5 space-y-3">
                {demoOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/10 p-4"
                  >
                    <div>
                      <p className="font-medium text-charcoal">#{order.id}</p>
                      <p className="text-xs text-muted">
                        {order.date} · {order.items} item{order.items !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium",
                        order.status === "Delivered"
                          ? "bg-primary-light/20 text-primary"
                          : "bg-peach/20 text-peach"
                      )}
                    >
                      {order.status}
                    </span>
                    <span className="font-semibold text-charcoal">{order.total}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {active === "wishlist" ? (
            <div>
              <h2 className="font-serif text-2xl text-charcoal">My Wishlist</h2>
              {wishCount === 0 ? (
                <p className="mt-4 text-sm text-muted">
                  You haven&apos;t saved any products yet.{" "}
                  <Link href="/shop" className="text-primary underline-offset-4 hover:underline">
                    Browse products
                  </Link>
                  .
                </p>
              ) : (
                <p className="mt-4 text-sm text-muted">
                  You have {wishCount} saved item{wishCount !== 1 ? "s" : ""}.{" "}
                  <Link href="/wishlist" className="text-primary underline-offset-4 hover:underline">
                    View wishlist
                  </Link>
                  .
                </p>
              )}
            </div>
          ) : null}

          {active === "addresses" ? (
            <div>
              <h2 className="font-serif text-2xl text-charcoal">Addresses</h2>
              <div className="mt-5 max-w-sm rounded-xl border border-primary/10 p-5">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-charcoal">Home</p>
                  <span className="rounded-full bg-beige px-2.5 py-0.5 text-xs text-primary">
                    Default
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">
                  Jane Doe
                  <br />
                  123 Greenway Ave
                  <br />
                  San Francisco, CA 94107
                  <br />
                  United States
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
