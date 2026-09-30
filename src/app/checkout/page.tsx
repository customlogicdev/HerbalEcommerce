import type { Metadata } from "next";
import { CheckoutView } from "@/components/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Naturaa order with our secure demo checkout.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
