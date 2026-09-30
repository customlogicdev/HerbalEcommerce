import { trustBadges } from "@/data/site";
import { Reveal } from "./Reveal";

export function TrustBadges() {
  return (
    <section className="border-y border-primary/10 bg-white/60">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {trustBadges.map((badge, i) => (
            <Reveal key={badge.title} delay={i * 0.06}>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-beige text-primary">
                  <badge.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-charcoal">{badge.title}</p>
                  <p className="text-xs text-muted">{badge.subtitle}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
