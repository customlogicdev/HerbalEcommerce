import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, Sprout } from "lucide-react";
import { px } from "@/lib/images";
import { Reveal } from "./Reveal";

const highlights = [
  { icon: Leaf, label: "Clean Ingredients" },
  { icon: Sprout, label: "Ethically Sourced" },
  { icon: Heart, label: "Made with Love" },
];

export function StorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem]">
          <div className="relative h-[440px] w-full sm:h-[480px]">
            <Image
              src={px(6694152, 1400, 900)}
              alt="Assorted natural botanical herbs and ingredients"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/45 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-14 lg:w-2/3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-beige">
              Nature. Science. You.
            </p>
            <h2 className="mt-3 font-serif text-3xl text-cream sm:text-4xl lg:text-5xl">
              Thoughtful Skincare for a Healthier You
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/85">
              At Naturaa, we blend the best of nature with advanced skincare science
              to nourish your skin naturally.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex h-12 w-fit items-center rounded-full bg-cream px-8 text-base font-medium text-primary transition hover:bg-white"
            >
              Our Story
            </Link>
            <div className="mt-8 flex flex-wrap gap-6">
              {highlights.map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-2 text-sm text-cream/90">
                  <Icon className="h-4 w-4" /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
