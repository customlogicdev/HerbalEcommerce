import type { Metadata } from "next";
import { AccountView } from "@/components/AccountView";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your Naturaa orders, wishlist, and addresses.",
};

export default function AccountPage() {
  return <AccountView />;
}
