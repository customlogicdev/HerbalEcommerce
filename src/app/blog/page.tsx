import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, rituals, and ingredient wisdom from the Naturaa journal for a more natural life.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
          Journal
        </p>
        <h1 className="mt-2 font-serif text-4xl text-charcoal sm:text-5xl">
          The Naturaa Journal
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
          Tips, rituals, and ingredient wisdom for a more natural life.
        </p>
      </div>

      <Reveal className="mt-12">
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-primary/10 bg-white lg:grid-cols-2"
        >
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px]">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(max-width: 1024px) 90vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <span className="w-fit rounded-full bg-beige px-3 py-1 text-xs font-medium text-primary">
              {featured.category}
            </span>
            <h2 className="mt-4 font-serif text-2xl text-charcoal transition group-hover:text-primary lg:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{featured.excerpt}</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-beige/40">
                <Image
                  src={featured.authorImage}
                  alt={featured.author}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="text-xs">
                <p className="font-medium text-charcoal">{featured.author}</p>
                <p className="text-muted">
                  {featured.date} · {featured.readTime}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((post, i) => (
          <Reveal key={post.id} delay={i * 0.06} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white">
              <Link
                href={`/blog/${post.slug}`}
                className="relative aspect-[16/10] overflow-hidden bg-beige/40"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <span className="w-fit rounded-full bg-beige px-2.5 py-1 text-[11px] font-medium text-primary">
                  {post.category}
                </span>
                <h3 className="mt-3 font-serif text-lg text-charcoal transition group-hover:text-primary">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted">
                  <span>{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 font-medium text-primary"
                  >
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
