import type { Metadata } from "next";
import Link from "next/link";
import { getJournalPosts } from "@/lib/data";
import { Footer } from "@/components/site/Footer";
import { JournalHero, StoryRow } from "@/components/journal/JournalClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Journal — AURELIAN",
  description:
    "Chapters on identity, restraint and the objects men keep. Written from inside the house.",
};

export default async function JournalPage() {
  const posts = await getJournalPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="relative">
        <JournalHero
          slug={featured.slug}
          kicker={featured.kicker}
          title={featured.title}
          excerpt={featured.excerpt}
          image={featured.image}
          readTime={featured.readTime}
          chapter={featured.chapter}
        />
      </section>

      <section className="mx-auto max-w-[1680px] px-5 pb-28 pt-24 md:px-10">
        <div className="flex items-end justify-between border-b border-ivory/10 pb-6">
          <p className="label text-gold/80">Chapters</p>
          <p className="label-sm text-ivory/35">
            {String(rest.length).padStart(2, "0")} stories
          </p>
        </div>
        <div className="mt-4">
          {rest.map((post) => (
            <StoryRow
              key={post.slug}
              slug={post.slug}
              kicker={post.kicker}
              title={post.title}
              excerpt={post.excerpt}
              image={post.image}
              readTime={post.readTime}
              chapter={post.chapter}
            />
          ))}
        </div>

        <div className="mt-24 flex flex-col gap-8 border-t border-ivory/10 pt-12 md:flex-row md:items-center md:justify-between">
          <p className="serif-body max-w-[420px] text-[20px] text-ivory/70">
            The house writes one chapter per drop. Nothing more, nothing sponsored.
          </p>
          <Link href="/shop" className="btn-line label text-ivory" data-cursor="enter">
            Shop the house
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
