import Link from "next/link";
import { Leaf, Camera, MessageCircle, AtSign, Globe } from "lucide-react";
import { footerColumns, contactInfo } from "@/data/site";
import { Newsletter } from "./Newsletter";

const socials = [
  { icon: Camera, label: "Instagram", href: "https://instagram.com" },
  { icon: MessageCircle, label: "Facebook", href: "https://facebook.com" },
  { icon: AtSign, label: "Twitter", href: "https://twitter.com" },
  { icon: Globe, label: "YouTube", href: "https://youtube.com" },
];

const payments = ["VISA", "Mastercard", "PayPal", "Apple Pay"];

export function Footer() {
  return (
    <footer className="mt-auto bg-primary text-cream">
      <Newsletter />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-cream text-primary">
                <Leaf className="h-5 w-5" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-xl">Naturaa</span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-cream/70">
                  Organic Living
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/80">
              We believe in pure, natural & sustainable living for a healthier you
              and a better planet.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-cream hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-serif text-base">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/75 transition hover:text-cream hover:underline underline-offset-4"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 border-t border-cream/15 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-cream/70">
            <p>{contactInfo.address}</p>
            <p className="mt-1">
              {contactInfo.phone} &middot; {contactInfo.email}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {payments.map((p) => (
              <span
                key={p}
                className="rounded-md bg-cream/10 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-cream/85"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-cream/15 py-6 text-center text-xs text-cream/60">
          &copy; 2026 Naturaa Organic Living. All rights reserved. Crafted as a
          static demo experience.
        </div>
      </div>
    </footer>
  );
}
