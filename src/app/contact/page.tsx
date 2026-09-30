import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { contactInfo } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Naturaa team for orders, product advice, and support.",
};

const cards = [
  { icon: Mail, label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: Phone, label: "Phone", value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/[^+\d]/g, "")}` },
  { icon: MapPin, label: "Address", value: contactInfo.address },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
          Get in Touch
        </p>
        <h1 className="mt-2 font-serif text-4xl text-charcoal sm:text-5xl">
          We&apos;d Love to Hear From You
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
          Questions about an order or which product is right for you? Reach out
          anytime — we&apos;re happy to help.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="rounded-3xl border border-primary/10 bg-white p-6 sm:p-8">
            <h2 className="font-serif text-2xl text-charcoal">Send us a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-6">
            <div className="grid gap-4">
              {cards.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl border border-primary/10 bg-white p-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-beige text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-muted">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium text-charcoal underline-offset-4 hover:text-primary hover:underline"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-charcoal">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-3xl border border-primary/10">
              <iframe
                title="Naturaa location map"
                src="https://www.google.com/maps?q=San%20Francisco&output=embed"
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block border-0"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
