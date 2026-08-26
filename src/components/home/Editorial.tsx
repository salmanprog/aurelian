"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Magnetic } from "@/components/system/Reveal";
import { FILM, LIFESTYLE } from "@/lib/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** 19 — The man behind the object. Fashion editorial, not stock. */
export function ManBehindObject() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-life-figure]").forEach((figure, index) => {
        gsap.fromTo(
          figure.querySelector("[data-life-media]"),
          { yPercent: index % 2 === 0 ? -10 : -4 },
          {
            yPercent: index % 2 === 0 ? 6 : 12,
            ease: "none",
            scrollTrigger: {
              trigger: figure,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        gsap.fromTo(
          figure,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: figure, start: "top 88%" },
          },
        );
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-ivory/10 bg-charcoal px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1680px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="label text-gold/80">09 — In the world</p>
            <h2 className="display mt-6 text-[clamp(2.2rem,6.4vw,5.6rem)] leading-[0.9] text-ivory">
              The man behind
              <br />
              <span className="display-italic text-ivory/55">the object.</span>
            </h2>
          </div>
          <p className="max-w-[340px] text-[13px] leading-relaxed text-ivory/45">
            No campaign poses. No one looking at a camera. Only the moments where an
            object becomes part of a life — a wrist on a table, a jacket leaving a car,
            a decision being made.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {LIFESTYLE.map((shot, index) => (
            <figure
              key={shot.src}
              data-life-figure
              className={`group relative overflow-hidden bg-obsidian ${
                index === 0
                  ? "col-span-2 aspect-[4/5] md:aspect-[4/5]"
                  : index === 3
                    ? "aspect-[3/4] md:mt-16"
                    : "aspect-[3/4]"
              }`}
              data-cursor="view"
            >
              <div className="absolute inset-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  data-life-media
                  src={shot.src}
                  alt={shot.caption}
                  loading="lazy"
                  decoding="async"
                  className="media-cover img-cinema scale-[1.18] transition-[filter] duration-700 will-change-transform group-hover:brightness-110"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/85 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                <span className="label-sm text-ivory/80">{shot.caption}</span>
                <span className="label-sm text-gold/70">{shot.place}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 20 — Not for everyone. Deliberately provocative. */
export function NotForEveryone() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 72%", end: "center 40%", scrub: 1 },
      });
      tl.fromTo("[data-prov-1]", { y: 90, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, 0)
        .fromTo("[data-prov-2]", { y: 150, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, 0.08)
        .fromTo("[data-prov-3]", { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, 0.3)
        .fromTo("[data-prov='4']", { y: 130, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, 0.45)
        .fromTo("[data-prov='5']", { y: 95, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, 0.6)
        .fromTo("[data-prov='6']", { y: 170, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, 0.75);
    }, section);
    return () => ctx.revert();
  }, []);

  const lines = [
    "For men who notice details.",
    "For men who choose different.",
    "For men who don't need approval.",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-ivory/10 bg-obsidian px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1680px]">
        <h2 className="display text-[clamp(3.2rem,15vw,14rem)] leading-[0.82] text-ivory">
          <span data-prov-1 className="block">Not for</span>
          <span data-prov-2 className="block display-italic text-gold">everyone.</span>
        </h2>

        <div className="mt-14 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p data-prov-3 className="label text-ivory/45">
            And that&rsquo;s exactly the point.
          </p>
          <ul className="max-w-[560px] space-y-7">
            {lines.map((line, index) => (
              <li key={line} className="overflow-hidden">
                <p
                  data-prov={index + 4}
                  className="serif-body border-t border-ivory/10 pt-5 text-[clamp(1.15rem,2.4vw,1.9rem)] text-ivory/80"
                >
                  {line.toUpperCase()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** 26 — Stay inside the house. */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const fillRef = useRef<HTMLSpanElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ratio = Math.min(1, email.length / 34);
    gsap.to(fillRef.current, {
      scaleX: ratio,
      duration: 0.6,
      ease: "power3.out",
      transformOrigin: "left center",
    });
  }, [email]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-news-line]",
        { yPercent: 120 },
        {
          yPercent: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 72%" },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) return;
    setStatus("sending");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "house" }),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      className="relative border-t border-ivory/10 bg-charcoal px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1680px]">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <h2 className="display text-[clamp(2.4rem,8vw,7rem)] leading-[0.88] text-ivory">
              <span className="block overflow-hidden">
                <span data-news-line className="block">Stay inside</span>
              </span>
              <span className="block overflow-hidden">
                <span data-news-line className="block display-italic text-gold">
                  the house.
                </span>
              </span>
            </h2>
            <p className="mt-8 max-w-[340px] text-[13px] leading-relaxed text-ivory/50">
              First access. Limited drops. New chapters.
            </p>
          </div>

          <div>
            {status === "sent" ? (
              <div className="border border-gold/30 p-8">
                <p className="label text-gold">You are inside</p>
                <p className="serif-body mt-4 text-[18px] text-ivory/70">
                  Drop 002 will reach you fourteen days before it reaches the public house.
                </p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <label className="label-sm block text-ivory/35" htmlFor="newsletter-email">
                  Your email
                </label>
                <div className="mt-5 flex items-center gap-5">
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="YOUR EMAIL"
                    className="w-full bg-transparent pb-4 font-ui text-[clamp(1rem,2.2vw,1.6rem)] uppercase tracking-[0.14em] text-ivory placeholder:text-ivory/20"
                  />
                  <Magnetic>
                    <button
                      type="submit"
                      data-cursor="enter"
                      className="label shrink-0 whitespace-nowrap text-gold transition-opacity hover:opacity-70"
                    >
                      {status === "sending" ? "Entering" : "Enter →"}
                    </button>
                  </Magnetic>
                </div>
                <div className="relative h-px w-full bg-ivory/15">
                  <span
                    ref={fillRef}
                    className="absolute inset-0 origin-left scale-x-0 bg-gold"
                  />
                </div>
                <p className="mt-5 text-[11px] text-ivory/30">
                  {status === "error"
                    ? "The house could not reach that address. Try again."
                    : "One email per chapter. Nothing else, ever."}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** 27 — Final cinematic section. */
export function FinalCinematic() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: { trigger: section, start: "top 65%", end: "center 45%", scrub: 1 },
        })
        .fromTo(
          "[data-final-media]",
          { scale: 1.28, filter: "brightness(0.3)" },
          { scale: 1, filter: "brightness(0.85)", ease: "none" },
          0,
        )
        .fromTo(
          "[data-final-line]",
          { yPercent: 130 },
          { yPercent: 0, stagger: 0.12, ease: "power2.out" },
          0.15,
        );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-obsidian"
    >
      <div data-final-media className="absolute inset-0 will-clip">
        <video
          src={FILM.surface}
          poster="/images/object-bracelet.jpg"
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          data-cursor="play"
          className="media-cover img-cinema absolute inset-0 opacity-80"
          ref={(node) => {
            if (!node) return;
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    if (!node.src) node.src = FILM.surface;
                    void node.play().catch(() => undefined);
                  } else {
                    node.pause();
                  }
                });
              },
              { rootMargin: "300px 0px" },
            );
            observer.observe(node);
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-obsidian/70" />
      </div>

      <div className="relative mx-auto w-full max-w-[1680px] px-5 py-28 md:px-10">
        <h2 className="display text-[clamp(2.6rem,10vw,9rem)] leading-[0.86] text-ivory">
          {["Your story.", "Your objects.", "Your rules."].map((line, index) => (
            <span key={line} className="block overflow-hidden">
              <span data-final-line className="block">
                {index === 2 ? (
                  <span className="display-italic text-gold">{line}</span>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-ui text-[15px] uppercase tracking-[0.5em] text-ivory">
              Aurelian
            </p>
            <p className="label-sm mt-3 text-ivory/40">The house continues.</p>
          </div>
          <Magnetic>
            <Link
              href="/shop"
              className="btn-line btn-gold label text-ivory"
              data-cursor="enter"
            >
              Explore the current drop
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
