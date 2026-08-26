"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  kicker: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
  readTime: string;
  chapter: string;
};

export function ArticleBody({ kicker, title, excerpt, body, image, readTime, chapter }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const shell = ref.current;
    if (!shell || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-article-line]",
        { yPercent: 130 },
        {
          yPercent: 0,
          stagger: 0.1,
          duration: 1.3,
          ease: "power4.out",
          delay: 0.1,
        },
      );
      gsap.fromTo(
        "[data-article-drop]",
        { clipPath: "inset(12% 8% 12% 8%)", scale: 1.14 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: "[data-article-drop]", start: "top 85%", end: "center 55%", scrub: 1 },
        },
      );
      gsap.fromTo(
        "[data-article-para]",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-article-body]", start: "top 78%" },
        },
      );
    }, shell);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="bg-obsidian pt-28 md:pt-36">
      <header className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/journal" className="label text-ivory/40 transition-colors hover:text-gold">
            ← The Journal
          </Link>
          <span className="label text-gold/80">{kicker}</span>
          <span className="label-sm text-ivory/30">{readTime}</span>
          <span className="label-sm text-ivory/30">Chapter {chapter}</span>
        </div>

        <h1 className="display mt-10 max-w-[1300px] text-[clamp(2.4rem,8vw,7.4rem)] leading-[0.88] text-ivory">
          {title.split(" ").map((word, index) => (
            <span key={`${word}-${index}`} className="inline-block overflow-hidden pr-[0.22em]">
              <span data-article-line className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p className="serif-body mt-10 max-w-[560px] text-[clamp(1.1rem,2.2vw,1.6rem)] text-ivory/60">
          {excerpt}
        </p>
      </header>

      <div data-article-drop className="mx-auto mt-16 max-w-[1680px] px-5 md:px-10">
        <div className="relative aspect-[16/9] overflow-hidden md:aspect-[21/9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className="media-cover img-cinema absolute inset-0"
            loading="eager"
          />
          <div className="pointer-events-none absolute inset-0 bg-obsidian/25" />
        </div>
      </div>

      <div
        data-article-body
        className="mx-auto grid max-w-[1680px] grid-cols-1 gap-12 px-5 py-24 md:grid-cols-[180px_1fr] md:px-10"
      >
        <div className="md:sticky md:top-28 md:self-start">
          <p className="label-sm leading-[2.4] text-ivory/30">
            Aurelian
            <br />
            The Journal
            <br />
            Chapter {chapter}
          </p>
        </div>
        <div className="max-w-[760px] space-y-10">
          {body.map((paragraph, index) => (
            <p
              key={index}
              data-article-para
              className={`leading-[1.75] ${
                index === 0
                  ? "serif-body text-[clamp(1.3rem,2.6vw,1.9rem)] text-ivory/85"
                  : "text-[16px] text-ivory/60"
              }`}
            >
              {paragraph}
            </p>
          ))}

          <div className="border-t border-ivory/10 pt-10">
            <p className="label-sm text-gold/70">Objects in this chapter</p>
            <Link
              href="/shop"
              data-cursor="enter"
              className="btn-line label mt-6 inline-flex text-ivory"
            >
              Shop the house
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
