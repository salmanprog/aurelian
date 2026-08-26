"use client";

import { useEffect, useRef, useState } from "react";
import { CODE_PANELS, MATERIALS } from "@/lib/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** 17 — Material explorer. The whole background becomes the material. */
export function MaterialExplorer() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-material-title]",
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const material = MATERIALS[active];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden border-t border-ivory/10 bg-obsidian"
    >
      {MATERIALS.map((entry, index) => (
        <div
          key={entry.key}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
          style={{ opacity: index === active ? 1 : 0 }}
          aria-hidden={index !== active}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={entry.image}
            alt={entry.name}
            loading="lazy"
            decoding="async"
            className="media-cover absolute inset-0 scale-[1.65] img-cinema"
            style={{ objectPosition: entry.focus }}
          />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-obsidian/35" />
      <div className="pointer-events-none absolute inset-0 scan-lines opacity-30" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1680px] flex-col justify-between px-5 py-20 md:px-10 md:py-24">
        <div className="flex items-center justify-between">
          <p className="label text-gold/80">07 — Materials</p>
          <p className="label-sm text-ivory/40">
            {String(active + 1).padStart(2, "0")} / {String(MATERIALS.length).padStart(2, "0")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <h2 className="display overflow-hidden text-[clamp(2.4rem,7.5vw,6.4rem)] leading-[0.9] text-ivory">
              <span data-material-title className="block">
                Touch the details.
              </span>
            </h2>

            <ul className="mt-12 divide-y divide-ivory/10 border-y border-ivory/10">
              {MATERIALS.map((entry, index) => (
                <li key={entry.key}>
                  <button
                    type="button"
                    data-cursor="view"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    className="group flex w-full items-center justify-between py-5 text-left"
                    aria-pressed={index === active}
                  >
                    <span
                      className={`display text-[clamp(1.6rem,3.6vw,2.8rem)] transition-colors duration-500 ${
                        index === active ? "text-ivory" : "text-ivory/30"
                      }`}
                    >
                      {entry.label}
                    </span>
                    <span className="flex items-center gap-4">
                      <span className="label-sm hidden text-ivory/35 md:block">
                        {entry.origin}
                      </span>
                      <span
                        className="h-px bg-gold transition-all duration-700"
                        style={{ width: index === active ? 72 : 18 }}
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pb-4">
            <p className="label-sm text-gold/80">{material.spec}</p>
            <h3 className="display mt-5 text-[clamp(1.8rem,4vw,3.2rem)] leading-none text-ivory">
              {material.name}
            </h3>
            <p className="display-italic mt-5 text-[clamp(1.2rem,2.4vw,1.9rem)] leading-snug text-ivory/70">
              &ldquo;{material.line}&rdquo;
            </p>
            <p className="mt-8 max-w-[320px] text-[12px] leading-relaxed text-ivory/40">
              Every material in the house is chosen for how it ages, not how it photographs.
              Nothing is coated to look new forever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 18 — The Aurelian Code. Four full-height panels travelling sideways. */
export function CodePanels() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (prefersReducedMotion() || window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth;
      const scrollTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance() * 1.1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-code-panel]").forEach((panel) => {
        const film = panel.querySelector("[data-code-film]");
        gsap.fromTo(
          film,
          { opacity: 0.18, scale: 1.18 },
          {
            opacity: 0.75,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 85%",
              end: "center 55%",
              scrub: true,
            },
          },
        );
        gsap.fromTo(
          panel.querySelector("[data-code-word]"),
          { letterSpacing: "0.16em", opacity: 0.35 },
          {
            letterSpacing: "-0.01em",
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 95%",
              end: "center 60%",
              scrub: true,
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-ivory/10 bg-obsidian"
    >
      <div className="flex min-h-[100svh] flex-col justify-center py-16 md:py-0">
        <div className="flex items-end justify-between px-5 pb-10 md:px-10">
          <div>
            <p className="label text-gold/80">08 — The code</p>
            <h2 className="display mt-5 text-[clamp(2rem,5.4vw,4.4rem)] leading-none text-ivory">
              Four rules.<br />
              <span className="display-italic text-ivory/50">No exceptions.</span>
            </h2>
          </div>
          <p className="label-sm hidden text-ivory/30 md:block">Scroll →</p>
        </div>

        <div className="no-scrollbar overflow-x-auto overscroll-x-contain snap-x snap-mandatory lg:overflow-hidden lg:snap-none">
          <div ref={trackRef} className="flex w-max items-stretch gap-4 px-5 will-change-transform md:gap-6 md:px-10">
            {CODE_PANELS.map((panel) => (
              <article
                key={panel.index}
                data-code-panel
                className="relative flex h-[62vh] w-[82vw] flex-col justify-between overflow-hidden border border-ivory/10 p-7 md:h-[70vh] md:w-[58vw] md:p-10"
              >
                <div
                  data-code-film
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("${panel.film}")`,
                    backgroundSize: "cover",
                    backgroundPosition: panel.focus,
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/45 to-transparent" />
                <div className="relative flex items-start justify-between">
                  <span className="display text-[clamp(3rem,8vw,7rem)] leading-none text-gold/70">
                    {panel.index}
                  </span>
                  <span className="label-sm text-ivory/40">The code</span>
                </div>
                <div className="relative">
                  <h3
                    data-code-word
                    className="display text-[clamp(2.4rem,7vw,6rem)] leading-[0.9] text-ivory"
                  >
                    {panel.title}
                  </h3>
                  <p className="mt-6 max-w-[380px] text-[13px] leading-relaxed text-ivory/55">
                    {panel.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
