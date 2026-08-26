"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Product } from "@/db/schema";
import { formatPrice } from "@/lib/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * 10 / 12 — "Objects with a story"
 * A horizontally scrolling exhibition. No grid, no cards: oversized
 * photography, uneven spacing, objects cut by the viewport edge.
 */
export function ObjectsGallery({ products }: { products: Product[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (prefersReducedMotion()) return;
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth + 80;
      const travel = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.6}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-object-figure]").forEach((figure) => {
        const media = figure.querySelector("[data-object-media]");
        if (!media) return;
        gsap.fromTo(
          media,
          { yPercent: -8, scale: 1.12 },
          {
            yPercent: 8,
            scale: 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: figure,
              containerAnimation: travel,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, [products.length]);

  return (
    <section
      ref={sectionRef}
      id="objects"
      className="relative overflow-hidden border-t border-ivory/10 bg-obsidian"
    >
      <div className="flex min-h-[100svh] flex-col justify-center py-16 md:py-0">
        <div className="flex items-end justify-between px-5 pb-10 md:px-10">
          <div>
            <p className="label text-gold/80">03 — The exhibition</p>
            <h2 className="display mt-5 text-[clamp(2.2rem,6vw,5.4rem)] leading-[0.9] text-ivory">
              Objects with
              <br />
              <span className="display-italic text-ivory/60">a story.</span>
            </h2>
          </div>
          <p className="hidden max-w-[260px] text-[12px] leading-relaxed text-ivory/40 md:block">
            Eight objects. One house. Numbered, photographed and released in chapters.
            Drag your scroll — the gallery moves sideways.
          </p>
        </div>

        <div className="no-scrollbar overflow-x-auto overscroll-x-contain snap-x snap-mandatory lg:overflow-hidden lg:snap-none">
          <div
            ref={trackRef}
            className="flex w-max items-center gap-6 px-5 will-change-transform md:gap-10 md:px-10"
          >
            {products.map((product, index) => (
              <GalleryObject
                key={product.slug}
                product={product}
                index={index}
              />
            ))}

            <Link
              href="/shop"
              data-cursor="enter"
              className="group relative flex h-[64vh] w-[76vw] shrink-0 flex-col justify-between border border-ivory/12 p-8 md:h-[76vh] md:w-[38vw]"
            >
              <span className="label text-ivory/40">The full house</span>
              <div>
                <p className="display text-[clamp(2rem,4vw,3.4rem)] leading-none text-ivory">
                  See every
                  <br />
                  object →
                </p>
                <p className="label mt-6 text-gold">Shop the house</p>
              </div>
              <div className="absolute inset-0 -z-10 bg-charcoal transition-colors duration-700 group-hover:bg-graphite" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryObject({ product, index }: { product: Product; index: number }) {
  const figureRef = useRef<HTMLAnchorElement | null>(null);
  const image = product.images[0];
  const wide = index % 3 === 0;

  const onEnter = () => {
    const figure = figureRef.current;
    if (!figure || prefersReducedMotion()) return;
    const media = figure.querySelector("[data-object-media]");
    const frame = figure.querySelector("[data-object-frame]");
    const info = figure.querySelector("[data-object-info]");
    gsap.to(media, { scale: 1.06, xPercent: 2, duration: 1.4, ease: "power3.out" });
    gsap.to(frame, { opacity: 1, duration: 0.4, ease: "power2.out" });
    gsap.fromTo(
      frame,
      { clipPath: "inset(0% 100% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" },
    );
    gsap.to(info, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" });
    gsap.to(figure.querySelector("[data-object-scrim]"), {
      opacity: 1,
      duration: 0.9,
    });
  };

  const onLeave = () => {
    const figure = figureRef.current;
    if (!figure || prefersReducedMotion()) return;
    gsap.to(figure.querySelector("[data-object-media]"), {
      scale: 1,
      xPercent: 0,
      duration: 1.2,
      ease: "power3.out",
    });
    gsap.to(figure.querySelector("[data-object-frame]"), {
      opacity: 0,
      duration: 0.7,
    });
    gsap.to(figure.querySelector("[data-object-info]"), {
      opacity: 0,
      y: 12,
      duration: 0.7,
    });
    gsap.to(figure.querySelector("[data-object-scrim]"), {
      opacity: 0,
      duration: 0.7,
    });
  };

  return (
    <Link
      href={`/object/${product.slug}`}
      data-cursor="explore"
      ref={figureRef}
      data-object-figure
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`group relative block shrink-0 snap-center will-change-transform ${
        wide
          ? "h-[68vh] w-[86vw] md:h-[82vh] md:w-[46vw]"
          : "h-[58vh] w-[78vw] md:h-[68vh] md:w-[32vw]"
      } ${index % 2 === 1 ? "md:translate-y-10" : ""}`}
    >
      <div className="relative h-full w-full overflow-hidden bg-charcoal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-object-media
          src={image.src}
          alt={image.alt}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          className="media-cover img-cinema absolute inset-0 will-change-transform"
          style={{ objectPosition: image.focus ?? "50% 50%" }}
        />
        <div
          data-object-scrim
          className="pointer-events-none absolute inset-0 bg-obsidian/55 opacity-0 transition-opacity duration-700"
        />
        {/* thin gold frame that draws itself in */}
        <div
          data-object-frame
          className="pointer-events-none absolute inset-4 opacity-0"
          style={{
            borderTop: "1px solid rgba(182,154,98,0.75)",
            borderBottom: "1px solid rgba(182,154,98,0.75)",
            borderLeft: "1px solid rgba(182,154,98,0.75)",
            borderRight: "1px solid rgba(182,154,98,0.75)",
            clipPath: "inset(0% 100% 0% 0%)",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-8">
        <div className="flex items-start justify-between">
          <p className="label text-ivory/85">
            Object {product.objectNo}
          </p>
          <p className="label-sm text-gold/80">{product.collection}</p>
        </div>

        <div
          data-object-info
          className="translate-y-3 opacity-0 transition-none"
        >
          <p className="display text-[clamp(1.7rem,3.4vw,3rem)] leading-[0.95] text-ivory">
            {product.name}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-ui text-[13px] tabular-nums text-ivory">
              {formatPrice(product.price)}
            </span>
            <span className="label-sm text-gold/85">{product.edition}</span>
          </div>
          <p className="label mt-5 inline-flex items-center gap-2 text-ivory">
            View object <span className="text-gold">→</span>
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between md:hidden">
        <span className="label text-ivory/80">{product.name}</span>
        <span className="font-ui text-[12px] tabular-nums text-ivory/60">
          {formatPrice(product.price)}
        </span>
      </div>
    </Link>
  );
}
