import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalPost, getJournalPosts } from "@/lib/data";
import { ArticleBody } from "@/components/journal/ArticleBody";
import { Footer } from "@/components/site/Footer";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) return { title: "Chapter not found — AURELIAN" };
  return {
    title: `${post.title} — The Journal — AURELIAN`,
    description: post.excerpt,
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) notFound();
  const all = await getJournalPosts();
  const next = all.find((entry) => entry.sortOrder > post.sortOrder) ?? all[0];

  return (
    <>
      <ArticleBody
        kicker={post.kicker}
        title={post.title}
        excerpt={post.excerpt}
        body={post.body}
        image={post.image}
        readTime={post.readTime}
        chapter={post.chapter}
      />

      <section className="mx-auto max-w-[1680px] px-5 pb-28 md:px-10">
        <div className="flex flex-col gap-8 border-t border-ivory/10 pt-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label text-gold/80">Next chapter</p>
            <Link
              href={`/journal/${next.slug}`}
              data-cursor="read"
              className="display mt-6 block max-w-[760px] text-[clamp(1.8rem,4.6vw,3.6rem)] leading-[0.95] text-ivory transition-colors hover:text-gold"
            >
              {next.title}
            </Link>
          </div>
          <Link href="/journal" className="label uline shrink-0 text-ivory/55">
            All chapters
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
