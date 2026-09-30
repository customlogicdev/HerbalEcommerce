import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review the botanical essentials in your Naturaa cart.",
};

export default function CartPage() {
  return <CartView />;
}
