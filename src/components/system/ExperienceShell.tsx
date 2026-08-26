"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { Monogram } from "./Monogram";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const CURSOR_LABELS: Record<string, string> = {
  view: "View",
  explore: "Explore",
  enter: "Enter",
  play: "Play film",
  read: "Read",
  close: "Close",
  bag: "Open bag",
};

export function ExperienceShell() {
  const [loaded, setLoaded] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const markRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  /* ---------------- LENIS + SCROLLTRIGGER ---------------- */
  useEffect(() => {
    if (prefersReducedMotion()) {
      setLoaded(true);
      return;
    }

    const lenis = new Lenis({
      duration: 1.25,
      lerp: 0.085,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
      smoothWheel: true,
    });
    window.__lenis = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const timer = window.setTimeout(refresh, 1200);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  /* ---------------- CINEMATIC ENTRANCE ---------------- */
  useEffect(() => {
    const reduce = prefersReducedMotion();
    if (reduce) {
      setLoaded(true);
      return;
    }

    const seen = window.sessionStorage.getItem("aurelian.entered") === "1";
    if (seen) {
      gsap.set(rootRef.current, { display: "none" });
      setLoaded(true);
      return;
    }
    window.sessionStorage.setItem("aurelian.entered", "1");

    const lenis = window.__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setLoaded(true),
      });

      tl.set(rootRef.current, { autoAlpha: 1 })
        .fromTo(
          markRef.current,
          { opacity: 0, scale: 0.86, filter: "blur(6px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "expo.out" },
        )
        .fromTo(
          wordRef.current,
          { opacity: 0, letterSpacing: "1.1em", y: 12 },
          { opacity: 1, letterSpacing: "0.52em", y: 0, duration: 1.1, ease: "expo.out" },
          "-=0.55",
        )
        .fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.15, ease: "power2.inOut" },
          "-=0.9",
        )
        .to(markRef.current, { opacity: 0, y: -8, duration: 0.6 }, "+=0.15")
        .to(
          wordRef.current,
          { opacity: 0, y: -14, letterSpacing: "0.9em", duration: 0.7 },
          "<",
        )
        .to(barRef.current, { opacity: 0, duration: 0.4 }, "<")
        .to(
          rootRef.current,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.25,
            ease: "expo.inOut",
          },
          "-=0.2",
        )
        .set(rootRef.current, { display: "none" });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    document.body.style.overflow = "";
    window.__lenis?.start();
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 260);
    return () => window.clearTimeout(id);
  }, [loaded]);

  /* ---------------- CURSOR ---------------- */
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.documentElement.classList.add("has-cursor");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.16, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.16, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.62, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.62, ease: "power3.out" });

    let visible = false;

    const onMove = (event: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.4 });
      }
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest?.("[data-cursor]");
      const key = target?.getAttribute("data-cursor") ?? "";
      const text = key ? CURSOR_LABELS[key] : "";
      const interactive = (event.target as HTMLElement | null)?.closest?.(
        "a, button, input, [role='button']",
      );

      if (text) {
        label.textContent = text;
        gsap.to(ring, {
          scale: 6.4,
          backgroundColor: "rgba(232,228,218,0.92)",
          duration: 0.55,
          ease: "expo.out",
        });
        gsap.to(label, { opacity: 1, duration: 0.4 });
        gsap.to(dot, { scale: 0.2, duration: 0.4 });
      } else if (interactive) {
        label.textContent = "";
        gsap.to(ring, {
          scale: 2.6,
          backgroundColor: "rgba(232,228,218,0)",
          duration: 0.5,
          ease: "expo.out",
        });
        gsap.to(label, { opacity: 0, duration: 0.25 });
        gsap.to(dot, { scale: 0.55, duration: 0.4 });
      } else {
        label.textContent = "";
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "rgba(232,228,218,0)",
          duration: 0.45,
          ease: "expo.out",
        });
        gsap.to(label, { opacity: 0, duration: 0.25 });
        gsap.to(dot, { scale: 1, duration: 0.4 });
      }
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.35 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={rootRef}
        className="pointer-events-none fixed inset-0 z-[120] flex flex-col items-center justify-center bg-obsidian opacity-0"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        aria-hidden="true"
      >
        <div ref={markRef} className="text-ivory">
          <Monogram className="h-9 w-9" />
        </div>
        <div
          ref={wordRef}
          className="mt-6 font-ui text-[11px] uppercase tracking-[0.52em] text-ivory/85"
        >
          Aurelian
        </div>
        <div className="mt-3 font-ui text-[8px] uppercase tracking-[0.42em] text-ivory/40">
          Men&rsquo;s Objects / 001
        </div>
        <div className="mt-10 h-px w-[42vw] max-w-[280px] overflow-hidden bg-ivory/12">
          <div ref={barRef} className="h-px w-full origin-left scale-x-0 bg-gold" />
        </div>
      </div>

      <div ref={dotRef} className="cursor-shell" aria-hidden="true">
        <div className="h-[6px] w-[6px] rounded-full bg-ivory" />
      </div>
      <div ref={ringRef} className="cursor-shell" aria-hidden="true">
        <div className="flex h-[11px] w-[11px] items-center justify-center rounded-full border border-ivory/70">
          <span
            ref={labelRef}
            className="whitespace-nowrap font-ui text-[3px] uppercase tracking-[0.28em] text-obsidian opacity-0"
          />
        </div>
      </div>

      <div className="grain pointer-events-none fixed inset-0 z-[95]" aria-hidden="true" />
    </>
  );
}
