import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { TrustBadges } from "@/components/TrustBadges";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductGrid } from "@/components/ProductGrid";
import { PromoBanners } from "@/components/PromoBanners";
import { StorySection } from "@/components/StorySection";
import { Testimonials } from "@/components/Testimonials";
import { InstagramFeed } from "@/components/InstagramFeed";
import { getFeaturedProducts } from "@/data/products";

export const metadata = {
  title: "Organic Botanical Hair & Skincare",
  description:
    "Shop Naturaa's clean, plant-based haircare and skincare. Natural ingredients, cruelty-free, and loved by 50,000+ customers.",
};

export default function HomePage() {
  const featured = getFeaturedProducts(8);

  return (
    <>
      <Hero />
      <TrustBadges />
      <CategoryGrid />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
              Best Sellers
            </p>
            <h2 className="mt-2 font-serif text-3xl text-charcoal sm:text-4xl">
              Customer Favorites
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted">
              The botanical heroes our community can&apos;t stop raving about.
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-all hover:gap-2.5 sm:inline-flex"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10">
          <ProductGrid products={featured} />
        </div>
      </section>

      <PromoBanners />
      <StorySection />
      <Testimonials />
      <InstagramFeed />
    </>
  );
}
