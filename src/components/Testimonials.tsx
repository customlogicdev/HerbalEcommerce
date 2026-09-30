import Image from "next/image";
import { Quote } from "lucide-react";
import { reviews } from "@/data/reviews";
import { Rating } from "./ui/Rating";
import { Reveal } from "./Reveal";

export function Testimonials() {
  const featured = reviews.slice(0, 3);

  return (
    <section className="bg-white/60 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
            Testimonials
          </p>
          <h2 className="mt-2 font-serif text-3xl text-charcoal sm:text-4xl">
            Loved by 50,000+ Customers
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((review, i) => (
            <Reveal key={review.id} delay={i * 0.08} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                <Quote className="h-8 w-8 text-primary-light/60" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-charcoal">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full bg-beige/40">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">
                      {review.name}
                    </p>
                    <p className="text-xs text-muted">{review.location}</p>
                  </div>
                  <Rating value={review.rating} size={13} className="ml-auto" />
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
