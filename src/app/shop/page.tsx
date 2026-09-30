import type { Metadata } from "next";
import { ShopClient } from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse Naturaa's full range of organic haircare, skincare, and wellness products. Filter by category, price, and rating.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return <ShopClient initialCategory={category} />;
}
