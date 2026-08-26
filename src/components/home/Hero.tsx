"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CinematicVideo } from "@/components/system/CinematicVideo";
import { Magnetic } from "@/components/system/Reveal";
import { scrollToTarget } from "@/components/system/Nav";
import { FILM } from "@/lib/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoShellRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=140%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        })
        .to(videoShellRef.current, { scale: 1.16, ease: "none" }, 0)
        .to(copyRef.current, { xPercent: -5, yPercent: -22, opacity: 0, ease: "none" }, 0)
        .to(scrollHintRef.current, { opacity: 0, ease: "none" }, 0)
        .fromTo(
          ghostRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, ease: "none" },
          0.25,
        )
        .to(ghostRef.current, { opacity: 0, filter: "blur(14px)", ease: "none" }, 0.75);
    }, section);

    const intro = gsap.timeline({ delay: 0.15 });
    intro.fromTo(
      "[data-hero-rise]",
      { y: 46, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.12, ease: "power4.out" },
    );

    return () => {
      ctx.revert();
      intro.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="house" className="relative h-[100svh] overflow-hidden bg-obsidian">
      <div
        ref={videoShellRef}
        className="absolute inset-0 will-clip"
        style={{ transform: "scale(1)" }}
      >
        <CinematicVideo
          src={FILM.hero}
          poster={FILM.heroPoster}
          className="h-full w-full"
          focus="50% 42%"
          cursorLabel="play"
          posterBelow={640}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian/85 via-obsidian/45 to-obsidian" />
        <div className="pointer-events-none absolute inset-0 scan-lines opacity-40" />
      </div>

      {/* Oversized word that materialises behind the film on scroll */}
      <div
        ref={ghostRef}
        className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center opacity-0"
        aria-hidden="true"
      >
        <span className="display text-[26vw] leading-none text-ivory/12">Chaos</span>
      </div>

      <div
        ref={copyRef}
        className="relative z-[3] flex h-full flex-col justify-end pb-14 md:justify-center md:pb-0"
      >
        <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10">
          <p data-hero-rise className="label text-gold/90">
            Aurelian / House 001
          </p>

          <h1 className="mt-6 md:mt-8">
            <span className="block overflow-hidden">
              <span
                data-hero-rise
                className="display block text-[clamp(2.9rem,10.2vw,10.5rem)] text-ivory"
              >
                Every man
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-hero-rise
                className="display block text-[clamp(2.9rem,10.2vw,10.5rem)] text-ivory/95"
              >
                has his own
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-hero-rise
                className="display block text-[clamp(2.9rem,10.2vw,10.5rem)] text-ivory"
              >
                version of <span className="display-italic text-gold">chaos.</span>
              </span>
            </span>
          </h1>

          <div data-hero-rise className="mt-9 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[380px] text-[13px] leading-relaxed text-ivory/60 md:text-[14px]">
              Objects for men who refuse to live a cookie-cutter life.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link href="#drop" onClick={(e) => { e.preventDefault(); scrollToTarget("#drop"); }} className="btn-line btn-gold label text-ivory" data-cursor="enter">
                  Explore the drop
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="#objects" onClick={(e) => { e.preventDefault(); scrollToTarget("#objects"); }} className="btn-line label text-ivory/80" data-cursor="enter">
                  Enter the house
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-7 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="label-sm text-ivory/40">Scroll to discover</span>
        <div className="relative h-14 w-px overflow-hidden bg-ivory/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollhint_2.4s_ease-in-out_infinite] bg-gold" />
        </div>
      </div>

      <style>{`@keyframes scrollhint{0%{transform:translateY(-100%)}55%{transform:translateY(100%)}100%{transform:translateY(100%)}}`}</style>
    </section>
  );
}

/** 08 — The CHAOS transition: philosophy dissolves into product. */
export function ChaosTransition() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const chaosRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const resolveRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const letters = chaosRef.current?.querySelectorAll<HTMLElement>("[data-chaos-letter]");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=260%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(imageRef.current, { clipPath: "inset(46% 30% 46% 30%)", scale: 1.3, opacity: 0 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1, ease: "power2.inOut", duration: 1 }, 0.18)
        .to(chaosRef.current, { letterSpacing: "0.3em", ease: "power2.in", duration: 1 }, 0)
        .to(letters ?? [], { xPercent: (i) => (i - 2) * 34, opacity: 0, filter: "blur(9px)", stagger: 0.06, ease: "power2.inOut", duration: 1 }, 0.35)
        .fromTo(
          resolveRef.current,
          { opacity: 0 },
          { opacity: 1, ease: "power2.out", duration: 0.6 },
          1.1,
        )
        .fromTo(
          "[data-resolve-line]",
          { yPercent: 130 },
          { yPercent: 0, stagger: 0.1, ease: "power2.out", duration: 0.7 },
          1.15,
        )
        .to({}, { duration: 0.45 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100svh] overflow-hidden bg-obsidian">
      <div ref={imageRef} className="absolute inset-0 opacity-0 will-clip">
        <CinematicVideo
          src={FILM.droplet}
          poster="/images/object-bracelet.jpg"
          className="h-full w-full"
          focus="50% 50%"
        />
        <div className="pointer-events-none absolute inset-0 bg-obsidian/55" />
      </div>

      <div className="relative z-[2] flex h-full items-center justify-center">
        <div
          ref={chaosRef}
          className="display flex text-[34vw] leading-none text-ivory md:text-[26vw]"
          style={{ letterSpacing: "-0.02em" }}
        >
          {"CHAOS".split("").map((letter, index) => (
            <span key={`${letter}-${index}`} className="inline-block overflow-hidden">
              <span data-chaos-letter className="inline-block">
                {letter}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div
        ref={resolveRef}
        className="pointer-events-none absolute inset-0 z-[3] flex flex-col items-center justify-center opacity-0 px-5 text-center"
      >
        <span className="overflow-hidden">
          <span data-resolve-line className="display block text-[clamp(2.4rem,8vw,7.5rem)] text-ivory">
            Made into
          </span>
        </span>
        <span className="overflow-hidden">
          <span
            data-resolve-line
            className="display-italic block text-[clamp(2.4rem,8vw,7.5rem)] text-gold"
          >
            character.
          </span>
        </span>
        <span className="overflow-hidden">
          <span data-resolve-line className="label mt-10 block text-ivory/50">
            The philosophy behind every object
          </span>
        </span>
      </div>
    </section>
  );
}


