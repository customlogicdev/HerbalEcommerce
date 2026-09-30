import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { Reveal } from "./Reveal";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
            Shop by Category
          </p>
          <h2 className="mt-2 font-serif text-3xl text-charcoal sm:text-4xl">
            Find What Your Hair Needs
          </h2>
          <p className="mt-2 max-w-lg text-sm text-muted">
            From cleansing to care, explore our complete range of natural essentials.
          </p>
        </div>
        <Link
          href="/shop"
          className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-all hover:gap-2.5 sm:inline-flex"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category, i) => (
          <Reveal key={category.id} delay={i * 0.05}>
            <Link
              href={`/shop?category=${category.id}`}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-full bg-beige/40 ring-1 ring-primary/10 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 45vw, 15vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 font-serif text-base text-charcoal transition group-hover:text-primary">
                {category.name}
              </h3>
              <p className="text-xs text-muted">{category.tagline}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition group-hover:opacity-100">
                Shop Now <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
