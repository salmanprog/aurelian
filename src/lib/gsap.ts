"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 1 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };

export const EASE_OUT = "power3.out";
export const EASE_HARD = "power4.out";
export const EASE_EXPO = "expo.out";

/** Luxury motion default — slow, controlled, heavy. */
export const HOUSE_TIMING = {
  slow: 1.4,
  base: 1,
  quick: 0.6,
};

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
