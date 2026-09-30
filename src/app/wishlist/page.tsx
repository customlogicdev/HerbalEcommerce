import type { Metadata } from "next";
import { WishlistView } from "@/components/WishlistView";

export const metadata: Metadata = {
  title: "My Wishlist",
  description: "The Naturaa products you've saved for later.",
};

export default function WishlistPage() {
  return <WishlistView />;
}
