"use client";

import { useState, type FormEvent } from "react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useUI } from "@/context/UIContext";
import { cn } from "@/lib/utils";

type Mode = "login" | "register";

export function AuthModal() {
  const { authOpen, closeAuth, toast } = useUI();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || (mode === "register" && !name.trim())) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "warning",
      });
      return;
    }
    toast({
      title: mode === "login" ? "Signed in (demo)" : "Account created (demo)",
      description: email,
      variant: "success",
    });
    setName("");
    setEmail("");
    setPassword("");
    closeAuth();
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setName("");
    setPassword("");
  };

  return (
    <Modal open={authOpen} onClose={closeAuth} className="max-w-md" title="Account">
      <h2 className="font-serif text-2xl text-charcoal">Welcome to Naturaa</h2>
      <p className="mt-1 text-sm text-muted">
        {mode === "login"
          ? "Sign in to track orders and save your favorites."
          : "Create an account to join Naturaa Rewards."}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-beige/60 p-1">
        {(["login", "register"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            className={cn(
              "rounded-full py-2 text-sm font-medium capitalize transition",
              mode === m ? "bg-white text-primary shadow-sm" : "text-muted hover:text-charcoal"
            )}
          >
            {m === "login" ? "Login" : "Register"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3" noValidate>
        {mode === "register" ? (
          <div>
            <label htmlFor="auth-name" className="mb-1 block text-xs font-medium text-charcoal">
              Full Name
            </label>
            <Input
              id="auth-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              autoComplete="name"
            />
          </div>
        ) : null}
        <div>
          <label htmlFor="auth-email" className="mb-1 block text-xs font-medium text-charcoal">
            Email
          </label>
          <Input
            id="auth-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="auth-password" className="mb-1 block text-xs font-medium text-charcoal">
            Password
          </label>
          <Input
            id="auth-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
        </div>
        <Button type="submit" className="w-full">
          {mode === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-muted">
        This is a static demo — no real authentication is performed.
      </p>
    </Modal>
  );
}
