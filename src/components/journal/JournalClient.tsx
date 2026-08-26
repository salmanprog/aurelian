"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Story = {
  slug: string;
  kicker: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  chapter: string;
};

export function JournalHero({ ...story }: Story) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
        })
        .fromTo("[data-story-media]", { scale: 1.15, yPercent: -4 }, { scale: 1, yPercent: 6, ease: "none" }, 0)
        .to("[data-story-copy]", { yPercent: -18, opacity: 0.2, ease: "none" }, 0);

      gsap.fromTo(
        "[data-story-line]",
        { yPercent: 130 },
        {
          yPercent: 0,
          stagger: 0.12,
          duration: 1.3,
          ease: "power4.out",
          delay: 0.15,
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-obsidian">
      <div data-story-media className="absolute inset-0 will-clip">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={story.image}
          alt={story.title}
          className="media-cover img-cinema absolute inset-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/55 to-obsidian/70" />
      </div>

      <div
        data-story-copy
        className="relative mx-auto flex min-h-[100svh] max-w-[1680px] flex-col justify-end px-5 pb-16 pt-32 md:px-10 md:pb-24"
      >
        <p className="label text-gold/85">
          {story.kicker} / {story.readTime}
        </p>
        <h1 className="display mt-8 max-w-[1200px] text-[clamp(2.5rem,8.4vw,7.6rem)] leading-[0.88] text-ivory">
          {story.title.split(" ").map((word, index) => (
            <span key={`${word}-${index}`} className="inline-block overflow-hidden pr-[0.22em]">
              <span data-story-line className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </h1>
        <p className="mt-8 max-w-[520px] text-[14px] leading-relaxed text-ivory/60">
          {story.excerpt}
        </p>
        <Link
          href={`/journal/${story.slug}`}
          data-cursor="read"
          className="label uline uline-active mt-10 inline-flex w-fit items-center gap-3 text-ivory"
        >
          Read the chapter <span className="text-gold">→</span>
        </Link>
      </div>
    </section>
  );
}

export function StoryRow({ ...story }: Story) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 90%" },
        },
      );
    }, element);
    return () => ctx.revert();
  }, []);

  return (
    <Link
      ref={ref}
      href={`/journal/${story.slug}`}
      data-cursor="read"
      className="group grid grid-cols-1 gap-6 border-b border-ivory/10 py-9 md:grid-cols-12 md:items-center"
    >
      <div className="md:col-span-1">
        <span className="display text-[26px] leading-none text-gold/70">{story.chapter}</span>
      </div>
      <div className="md:col-span-6">
        <p className="label-sm text-ivory/35">{story.kicker}</p>
        <h2 className="display mt-4 text-[clamp(1.7rem,3.6vw,2.9rem)] leading-[0.95] text-ivory transition-colors duration-500 group-hover:text-gold">
          {story.title}
        </h2>
        <p className="mt-4 max-w-[520px] text-[13px] leading-relaxed text-ivory/45">
          {story.excerpt}
        </p>
      </div>
      <div className="md:col-span-4">
        <div className="relative aspect-[16/9] overflow-hidden md:aspect-[4/3]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={story.image}
            alt={story.title}
            loading="lazy"
            className="media-cover img-cinema absolute inset-0 transition-transform duration-[1600ms] group-hover:scale-105"
          />
        </div>
      </div>
      <div className="md:col-span-1 md:text-right">
        <span className="label-sm text-ivory/35">{story.readTime}</span>
      </div>
    </Link>
  );
}
