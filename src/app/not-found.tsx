import Link from "next/link";
import { Leaf } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-cream">
        <Leaf className="h-8 w-8" />
      </span>
      <p className="mt-6 font-serif text-6xl text-primary">404</p>
      <h1 className="mt-2 font-serif text-3xl text-charcoal">This page has wilted</h1>
      <p className="mt-3 text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className={`${buttonStyles("primary", "lg")} mt-8`}>
        Back to Home
      </Link>
    </div>
  );
}
