"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CinematicVideo } from "@/components/system/CinematicVideo";
import { FILM } from "@/lib/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** 09 — The brand manifesto. Pinned typography + slow lifestyle film. */
export function Manifesto() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const linesRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=160%",
            scrub: 1,
            pin: ".manifesto-pin",
            anticipatePin: 1,
          },
        })
        .fromTo(
          "[data-manifesto-line]",
          { yPercent: 130, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.22,
            ease: "power2.out",
            duration: 1.4,
          },
          0,
        )
        .fromTo(
          "[data-manifesto-secondary]",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: "power2.out", duration: 1 },
          0.9,
        )
        .fromTo(
          "[data-manifesto-media]",
          { scale: 1.22, filter: "brightness(0.4)" },
          { scale: 1, filter: "brightness(1)", ease: "power1.out", duration: 2 },
          0,
        );

      gsap.to(counterRef.current, {
        innerText: 100,
        snap: { innerText: 1 },
        duration: 2,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=160%",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="manifesto" className="relative border-t border-ivory/10 bg-charcoal">
      <div className="manifesto-pin grid min-h-[100svh] grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-10 px-5 py-24 md:px-10 lg:py-0">
          <p className="label text-gold/80">02 — The philosophy</p>
          <div ref={linesRef} className="overflow-hidden">
            <h2 className="display text-[clamp(2.1rem,5.4vw,4.6rem)] leading-[0.95] text-ivory">
              {["THE DETAILS YOU CHOOSE", "BECOME PART OF", "WHO YOU ARE."].map(
                (line, index) => (
                  <span key={line} className="block overflow-hidden">
                    <span data-manifesto-line className="block">
                      {index === 2 ? (
                        <span className="display-italic text-gold">{line}</span>
                      ) : (
                        line
                      )}
                    </span>
                  </span>
                ),
              )}
            </h2>
          </div>

          <div data-manifesto-secondary className="max-w-[430px] space-y-6">
            <p className="serif-body text-[17px] text-ivory/70">
              AURELIAN IS NOT ABOUT FITTING IN. Every man walks through his own pressure —
              ambition, failure, appetite, restraint, the people who changed him. What
              survives that pressure is character. We make objects that are present for it.
            </p>
            <p className="label-sm leading-[2.2] text-ivory/40">
              Individually without noise / Made in small runs / Numbered, not restocked
            </p>
            <Link
              href="/journal/the-art-of-not-looking-like-everyone-else"
              className="label uline uline-active inline-flex items-center gap-3 text-ivory"
              data-cursor="read"
            >
              Discover the philosophy <span className="text-gold">→</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-ui text-[10px] tabular-nums tracking-[0.3em] text-ivory/35">
              <span ref={counterRef}>00</span>%
            </span>
            <div className="h-px flex-1 bg-ivory/12" />
            <span className="label-sm text-ivory/30">Chapter 02</span>
          </div>
        </div>

        <div className="relative min-h-[70svh] overflow-hidden lg:min-h-[100svh]">
          <div data-manifesto-media className="absolute inset-0 will-clip">
            <CinematicVideo
              src={FILM.manifesto}
              poster="/images/journal-featured.jpg"
              className="h-full w-full"
              focus="50% 35%"
              posterBelow={720}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-charcoal via-transparent to-obsidian/60" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <p className="label-sm text-ivory/60">Milan / 06:14 — getting ready</p>
            <p className="label-sm text-gold/70">Film 02</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const CRAFT_CHAPTERS = [
  { label: "Material", detail: "Full-grain hide, selected by hand" },
  { label: "Process", detail: "Cut, skived, saddle-stitched" },
  { label: "Precision", detail: "0.2mm tolerance on every edge" },
  { label: "Finish", detail: "Burnished, inspected, boxed" },
];

/** 16 — Craftsmanship film, synchronised to scroll position. */
export function CraftFilm() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return;

    let loaded = false;
    // The atelier film is the heaviest asset in the house — desktop only.
    const allowFilm =
      !prefersReducedMotion() && window.innerWidth >= 1024 && video !== null;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loaded && video && allowFilm) {
            loaded = true;
            video.src = FILM.craft;
            video.load();
          }
        });
      },
      { rootMargin: "500px 0px" },
    );
    observer.observe(section);

    const ctx = gsap.context(() => {
      const setChapter = (index: number) => {
        if (activeRef.current === index) return;
        activeRef.current = index;
        section.querySelectorAll("[data-craft-chapter]").forEach((node, i) => {
          gsap.to(node, {
            opacity: i === index ? 1 : 0.28,
            x: i === index ? 0 : -6,
            duration: 0.6,
            ease: "power3.out",
          });
        });
      };

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=240%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              CRAFT_CHAPTERS.length - 1,
              Math.floor(self.progress * CRAFT_CHAPTERS.length),
            );
            setChapter(index);
            if (video && video.readyState >= 2 && video.duration) {
              video.currentTime = Math.min(
                video.duration - 0.05,
                self.progress * video.duration,
              );
            }
          },
        },
      })
        .fromTo(
          "[data-craft-title]",
          { yPercent: 120 },
          { yPercent: 0, ease: "power2.out", duration: 1 },
          0,
        )
        .fromTo("[data-craft-meta]", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.4);
    }, section);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden border-t border-ivory/10 bg-obsidian"
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="none"
        loop={false}
        disablePictureInPicture
        poster="/images/craft.jpg"
        className="media-cover img-cinema absolute inset-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-obsidian/60" />
      <div className="pointer-events-none absolute inset-0 vignette" />

      <div className="relative z-[2] flex h-full flex-col justify-between px-5 py-16 md:px-10 md:py-20">
        <div className="flex items-start justify-between">
          <p className="label text-gold/80">04 — The atelier</p>
          <p className="label-sm text-ivory/40">Florence / IT</p>
        </div>

        <div className="overflow-hidden">
          <h2
            data-craft-title
            className="display text-[clamp(2.6rem,9vw,8.5rem)] text-ivory"
          >
            Made with intention.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4" data-craft-meta>
          {CRAFT_CHAPTERS.map((chapter, index) => (
            <div
              key={chapter.label}
              data-craft-chapter
              className="border-t border-ivory/20 pt-4"
              style={{ opacity: index === 0 ? 1 : 0.28 }}
            >
              <p className="label text-ivory">{chapter.label}</p>
              <p className="mt-2 text-[12px] leading-relaxed text-ivory/45">
                {chapter.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


