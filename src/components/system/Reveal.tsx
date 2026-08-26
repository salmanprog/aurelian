"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

const useSafeLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Fade + rise on scroll. The house default for blocks of copy. */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 34,
  start = "top 88%",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useSafeLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (prefersReducedMotion()) {
      gsap.set(element, { opacity: 1, y: 0 });
      return;
    }
    const tween = gsap.fromTo(
      element,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        delay,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y, start]);

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}

type SplitProps = {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  scrub?: boolean;
};

/**
 * SplitText-style reveal. Splits on words (chars when `chars` set),
 * masks each unit inside an overflow-hidden line and rises it into place.
 */
export function SplitText({
  text,
  as: Tag = "span",
  className,
  wordClassName = "inline-block will-change-transform",
  delay = 0,
  stagger = 0.055,
  start = "top 86%",
  scrub = false,
}: SplitProps) {
  const ref = useRef<HTMLElement | null>(null);

  useSafeLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const units = element.querySelectorAll<HTMLElement>("[data-unit]");

    if (prefersReducedMotion()) {
      gsap.set(units, { yPercent: 0, opacity: 1 });
      return;
    }

    const tween = gsap.fromTo(
      units,
      { yPercent: 118, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        delay,
        duration: 1.25,
        ease: "power4.out",
        stagger: { each: stagger },
        scrollTrigger: scrub
          ? { trigger: element, start: "top 92%", end: "top 45%", scrub: 1 }
          : { trigger: element, start },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text, delay, stagger, start, scrub]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden pb-[0.06em] align-bottom"
        >
          <span data-unit className={wordClassName}>
            {word}
          </span>
          {index < text.split(" ").length - 1 ? (
            <span className="inline-block">&nbsp;</span>
          ) : null}
        </span>
      ))}
    </Tag>
  );
}

/** Per-character stagger for oversized single words (CHAOS / CHARACTER). */
export function SplitChars({
  text,
  className,
  charClassName = "",
  delay = 0,
  stagger = 0.08,
  from = { yPercent: 120, opacity: 0 },
  triggerStart = "top 85%",
}: {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  from?: gsap.TweenVars;
  triggerStart?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useSafeLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const units = element.querySelectorAll<HTMLElement>("[data-char]");
    if (prefersReducedMotion()) {
      gsap.set(units, { yPercent: 0, opacity: 1, rotate: 0 });
      return;
    }
    const tween = gsap.fromTo(
      units,
      { ...from },
      {
        yPercent: 0,
        opacity: 1,
        rotate: 0,
        delay,
        duration: 1.35,
        ease: "expo.out",
        stagger,
        scrollTrigger: { trigger: element, start: triggerStart },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text, delay, stagger, triggerStart, from]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <span data-char className={`inline-block ${charClassName}`}>
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}

/** Magnetic hover for CTAs — subtle, never springy. */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const xTo = gsap.quickTo(element, "x", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(element, "y", { duration: 0.7, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}

/** Fires once when the element first enters the viewport. */
export function useInView<T extends HTMLElement>(
  callback: (element: T) => void,
  options?: { rootMargin?: string },
) {
  const ref = useRef<T | null>(null);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callbackRef.current(element);
            observer.disconnect();
          }
        });
      },
      { rootMargin: options?.rootMargin ?? "0px 0px -10% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [options?.rootMargin]);

  return ref;
}

export { ScrollTrigger };
