import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import { px } from "@/lib/images";
import { Reveal } from "./Reveal";

const instagramImages = [4841178, 9643445, 5480035, 6694156];

export function InstagramFeed() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
          @naturaa
        </p>
        <h2 className="mt-2 font-serif text-3xl text-charcoal sm:text-4xl">
          Follow Us on Instagram
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {instagramImages.map((id, i) => (
          <Reveal key={id} delay={i * 0.06}>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-2xl bg-beige/40"
            >
              <Image
                src={px(id, 500)}
                alt="Naturaa community post on Instagram"
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-primary/50 opacity-0 transition group-hover:opacity-100">
                <Camera className="h-7 w-7 text-cream" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
