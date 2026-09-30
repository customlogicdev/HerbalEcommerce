import Link from "next/link";
import { ArrowRight, Gift, Leaf, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

export function PromoBanners() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-[1.5rem] bg-primary p-8 text-cream sm:p-10">
            <div
              aria-hidden
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cream/10 blur-2xl"
            />
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-peach px-3 py-1 text-[11px] font-semibold text-charcoal">
              <Gift className="h-3.5 w-3.5" /> Limited Time Offer
            </span>
            <h3 className="mt-4 font-serif text-3xl sm:text-4xl">20% OFF Sitewide</h3>
            <p className="mt-2 max-w-sm text-sm text-cream/85">
              Use the code below at checkout to save on your entire order.
            </p>
            <div className="mt-5 inline-flex w-fit items-center gap-3 rounded-xl border border-dashed border-cream/50 bg-cream/10 px-5 py-3">
              <span className="font-mono text-lg font-bold tracking-[0.2em]">
                ORGANIC20
              </span>
            </div>
            <Link
              href="/shop"
              className="mt-6 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-cream px-6 text-sm font-medium text-primary transition hover:bg-white"
            >
              Shop the Offer <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-[1.5rem] bg-beige/70 p-8 sm:p-10">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-cream">
              <Sparkles className="h-3.5 w-3.5" /> Naturaa Rewards
            </span>
            <h3 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl">
              Earn Points. Get Rewarded.
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Join our loyalty program and earn points on every order for exclusive
              perks and early access.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <div className="relative h-28 w-44 -rotate-3 rounded-2xl bg-primary p-4 text-cream shadow-xl">
                <div className="flex items-center justify-between">
                  <Leaf className="h-5 w-5" />
                  <span className="text-[9px] uppercase tracking-widest text-cream/70">
                    Rewards
                  </span>
                </div>
                <p className="mt-5 font-mono text-sm tracking-[0.2em]">**** 2026</p>
                <p className="mt-1 text-[10px] text-cream/70">Naturaa Member</p>
              </div>
              <Link
                href="/account"
                className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-cream transition hover:bg-primary-dark"
              >
                Join Now
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
