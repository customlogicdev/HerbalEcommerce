"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useUI } from "@/context/UIContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const { toast } = useUI();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "warning",
      });
      return;
    }
    toast({
      title: "Subscribed successfully!",
      description: "You're on the list for offers & new arrivals.",
      variant: "success",
    });
    setEmail("");
  };

  return (
    <div className="bg-beige/70">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl text-primary sm:text-4xl"
        >
          Be the First to Know
        </motion.h2>
        <p className="mt-3 text-sm text-muted">
          Subscribe for exclusive offers, new arrivals & herbal living tips.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          noValidate
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            aria-label="Email address"
            className="flex-1"
          />
          <Button type="submit">
            <Send className="h-4 w-4" /> Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
}
