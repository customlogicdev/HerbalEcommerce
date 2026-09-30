import type { Metadata } from "next";
import Image from "next/image";
import { FlaskConical, Heart, Leaf, Recycle, Sprout } from "lucide-react";
import { px } from "@/lib/images";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the Naturaa story — our mission, values, and the natural ingredients that power every product.",
};

const values = [
  { icon: Leaf, title: "100% Natural", text: "Plant-derived formulas free from sulfates, parabens, and silicones." },
  { icon: FlaskConical, title: "Science-Backed", text: "Every ingredient is chosen for proven, visible results." },
  { icon: Recycle, title: "Sustainable", text: "Recyclable packaging and ethically sourced ingredients." },
  { icon: Heart, title: "Cruelty-Free", text: "Never tested on animals — certified and always vegan." },
];

const ingredients = [
  { name: "Rosemary", use: "Stimulates the scalp and supports healthy hair growth." },
  { name: "Aloe Vera", use: "Deeply hydrates and soothes both hair and skin." },
  { name: "Turmeric", use: "Brightens complexion and calms inflammation." },
  { name: "Neem", use: "Naturally antibacterial for clear, balanced skin." },
  { name: "Green Tea", use: "Rich in antioxidants to protect against daily stress." },
];

const team = [
  { name: "Elena Marsh", role: "Founder & Formulator", img: px(10658352, 600) },
  { name: "Nadia Petrova", role: "Head of Skincare", img: px(2878431, 600) },
  { name: "Marcus Bell", role: "Sustainability Lead", img: px(6497112, 600) },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative">
        <div className="relative h-[360px] w-full sm:h-[440px]">
          <Image
            src={px(4871226, 1600, 900)}
            alt="Assorted Naturaa botanical herbs and flowers"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/55" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-beige">Our Story</p>
            <h1 className="mt-3 font-serif text-4xl text-cream sm:text-5xl">
              Good for You, Good for Nature
            </h1>
            <p className="mt-4 max-w-xl text-sm text-cream/85">
              Born from a belief that pure, plant-based care is the kindest choice
              for your body and the planet.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary-light">
            Our Mission
          </p>
          <h2 className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl">
            Clean beauty without compromise
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Naturaa began in a small apothecary with a simple idea: personal care
            should be as pure as the botanicals it&apos;s made from. We craft every
            formula in small batches, blending time-honored herbal wisdom with
            modern skincare science.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Today, we&apos;re proud to serve over 50,000 customers who trust us for
            products that are effective, transparent, and gentle on the earth.
          </p>
        </Reveal>
      </section>

      <section className="bg-white/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-3xl text-charcoal">Our Values</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.06} className="h-full">
                <div className="h-full rounded-2xl border border-primary/10 bg-white p-6 text-center">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-beige text-primary">
                    <value.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-serif text-lg text-charcoal">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-beige/40">
              <Image
                src={px(5480035, 900, 700)}
                alt="Dried herbs in a mortar and pestle"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary-light">
                Our Ingredients
              </p>
              <h2 className="mt-2 font-serif text-3xl text-charcoal">Powered by nature</h2>
              <ul className="mt-6 space-y-4">
                {ingredients.map((ingredient) => (
                  <li key={ingredient.name} className="flex gap-3">
                    <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-beige text-primary">
                      <Sprout className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-medium text-charcoal">{ingredient.name}</p>
                      <p className="text-sm text-muted">{ingredient.use}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary-light">
              Our Team
            </p>
            <h2 className="mt-2 font-serif text-3xl text-charcoal">
              The people behind Naturaa
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.08} className="h-full">
                <div className="h-full overflow-hidden rounded-2xl border border-primary/10 bg-white">
                  <div className="relative aspect-square">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 90vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-serif text-lg text-charcoal">{member.name}</h3>
                    <p className="text-sm text-muted">{member.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
