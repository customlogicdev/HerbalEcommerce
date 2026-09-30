import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogPosts, getBlogBySlug } from "@/data/blog";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-primary underline-offset-4 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      <span className="mt-6 inline-block rounded-full bg-beige px-3 py-1 text-xs font-medium text-primary">
        {post.category}
      </span>
      <h1 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl">
        {post.title}
      </h1>

      <div className="mt-5 flex items-center gap-3">
        <div className="relative h-11 w-11 overflow-hidden rounded-full bg-beige/40">
          <Image
            src={post.authorImage}
            alt={post.author}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
        <div className="text-sm">
          <p className="font-medium text-charcoal">{post.author}</p>
          <p className="flex items-center gap-1.5 text-xs text-muted">
            <Calendar className="h-3.5 w-3.5" /> {post.date}
            <Clock className="ml-2 h-3.5 w-3.5" /> {post.readTime}
          </p>
        </div>
      </div>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-beige/40">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 90vw, 720px"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-8 space-y-5">
        {post.content.map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed text-charcoal/85">
            {paragraph}
          </p>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="font-serif text-2xl text-charcoal">Related Articles</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {related.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06} className="h-full">
              <Link
                href={`/blog/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-beige/40">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 90vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-serif text-base text-charcoal transition group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{item.readTime}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </article>
  );
}
