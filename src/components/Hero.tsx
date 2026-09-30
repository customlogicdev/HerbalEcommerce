"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { px } from "@/lib/images";

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "100%", label: "Natural Ingredients" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-light/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-beige blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
            <Sparkles className="h-4 w-4" /> Healthy Hair · Happier You
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] text-charcoal sm:text-5xl lg:text-6xl">
            Natural Care for <span className="text-primary">Stronger</span>, Shinier
            Hair
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            Discover premium botanical products made with natural ingredients.
            Because your hair deserves the best — every day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-base font-medium text-cream transition hover:bg-primary-dark"
            >
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-primary/40 px-8 text-base font-medium text-primary transition hover:bg-primary hover:text-cream"
            >
              Explore Collection
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-2xl text-primary">{s.value}</p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-beige/40 sm:aspect-[5/5]">
            <Image
              src={px(38020025, 900, 1100)}
              alt="Woman with healthy, shiny hair using Naturaa botanical products"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-1 top-8 rotate-6 rounded-2xl bg-white px-4 py-3 shadow-lg sm:-right-4"
          >
            <p className="font-serif text-sm italic text-primary">Good hair</p>
            <p className="font-serif text-sm italic text-primary">good mood ✦</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -left-1 bottom-10 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg sm:-left-4"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-beige text-primary">
              <Leaf className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-semibold text-charcoal">100% Organic</p>
              <p className="text-[10px] text-muted">Plant-based formulas</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
