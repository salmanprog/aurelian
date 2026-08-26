"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/db/schema";
import { useBag } from "@/components/system/BagProvider";
import { formatPrice } from "@/lib/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const FRAMES = ["01", "02", "03"];

export function ProductView({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { add, open } = useBag();
  const [frame, setFrame] = useState(0);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const busy = useRef(false);

  const go = (next: number) => {
    const gallery = galleryRef.current;
    if (!gallery || busy.current) return;
    const target = (next + product.images.length) % product.images.length;
    if (target === frame || prefersReducedMotion()) {
      setFrame(target);
      return;
    }
    busy.current = true;

    const layers = gallery.querySelectorAll<HTMLElement>("[data-frame]");
    const current = layers[frame];
    const upcoming = layers[target];
    const direction = target > frame ? 1 : -1;

    gsap.set(upcoming, { clipPath: "inset(0% 0% 0% 100%)", scale: 1.12, opacity: 1, zIndex: 2 });
    gsap.set(current, { zIndex: 1 });

    gsap
      .timeline({
        onComplete: () => {
          gsap.set(current, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, zIndex: 0 });
          gsap.set(upcoming, { zIndex: 1 });
          busy.current = false;
          setFrame(target);
        },
      })
      .to(upcoming, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.25, ease: "expo.inOut" }, 0)
      .to(current, { scale: 1.06, xPercent: -6 * direction, duration: 1.25, ease: "expo.inOut" }, 0)
      .to(gallery, { backgroundColor: target % 2 === 0 ? "#111111" : "#0b0b0b", duration: 1.2 }, 0);

    setFrame(target);
  };

  useEffect(() => {
    const section = galleryRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-product-head]",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.1, ease: "power4.out", delay: 0.2 },
      );
      gsap.utils.toArray<HTMLElement>("[data-product-block]").forEach((block) => {
        gsap.fromTo(
          block,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 88%" },
          },
        );
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const image = product.images[frame] ?? product.images[0];

  return (
    <div ref={galleryRef} className="bg-obsidian transition-colors duration-1000">
      {/* HERO / GALLERY */}
      <section className="relative grid min-h-[100svh] grid-cols-1 lg:grid-cols-[1.35fr_1fr]">
        <div className="relative h-[62svh] overflow-hidden lg:h-[100svh]">
          {product.images.map((entry, index) => (
            <div
              key={entry.src + index}
              data-frame
              className="absolute inset-0 overflow-hidden"
              style={{ zIndex: index === 0 ? 1 : 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={entry.src}
                alt={entry.alt}
                loading={index === 0 ? "eager" : "lazy"}
                className="media-cover img-cinema absolute inset-0"
                style={{ objectPosition: entry.focus ?? "50% 50%" }}
              />
            </div>
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-obsidian/40" />

          <div className="absolute bottom-6 left-5 right-5 z-[3] flex items-end justify-between md:left-10 md:right-10">
            <div className="flex items-center gap-4">
              {product.images.map((entry, index) => (
                <button
                  key={`marker-${index}`}
                  type="button"
                  onClick={() => go(index)}
                  aria-label={`Frame ${FRAMES[index] ?? index + 1}`}
                  className="group flex items-center gap-2"
                >
                  <span
                    className={`label-sm transition-colors ${
                      index === frame ? "text-gold" : "text-ivory/40 group-hover:text-ivory"
                    }`}
                  >
                    {FRAMES[index] ?? String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`h-px transition-all duration-700 ${
                      index === frame ? "w-10 bg-gold" : "w-4 bg-ivory/30"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(frame + 1)}
              data-cursor="view"
              className="label text-ivory/80 transition-colors hover:text-gold"
            >
              Next frame →
            </button>
          </div>
        </div>

        <div className="relative flex flex-col justify-center gap-8 px-5 py-14 md:px-10 lg:h-[100svh]">
          <div data-product-head>
            <p className="label text-gold/80">Aurelian / {product.objectNo}</p>
          </div>
          <h1
            data-product-head
            className="display text-[clamp(2.4rem,6.5vw,5.2rem)] leading-[0.88] text-ivory"
          >
            {product.name}
          </h1>
          <div data-product-head className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <span className="font-ui text-[clamp(1.3rem,2.4vw,1.9rem)] tabular-nums text-ivory">
              {formatPrice(product.price)}
            </span>
            <span className="label-sm text-gold/80">{product.edition}</span>
            <span className="label-sm text-ivory/40">{product.material}</span>
          </div>
          <p data-product-head className="serif-body max-w-[420px] text-[18px] text-ivory/65">
            {product.tagline} {product.story.split(".")[0]}.
          </p>

          <div data-product-head className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              data-cursor="enter"
              onClick={() => {
                add({
                  slug: product.slug,
                  name: product.name,
                  objectNo: product.objectNo,
                  price: product.price,
                  image: product.images[0].src,
                });
                open();
              }}
              className="btn-line btn-solid label text-obsidian"
            >
              Add to bag
            </button>
            <Link href="/shop" className="label uline text-ivory/55 hover:text-gold">
              Back to the house
            </Link>
          </div>

          <dl data-product-head className="mt-4 divide-y divide-ivory/10 border-y border-ivory/10">
            {product.specs.map((spec) => (
              <div key={spec.label} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="label-sm text-ivory/35">{spec.label}</dt>
                <dd className="text-right text-[12px] text-ivory/70">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* EDITORIAL BLOCKS */}
      <section className="mx-auto max-w-[1680px] px-5 pb-24 md:px-10">
        <Block index="01" title="The object">
          <p className="serif-body text-[clamp(1.25rem,2.6vw,2rem)] leading-[1.42] text-ivory/85">
            {product.story}
          </p>
        </Block>

        <Block index="02" title="Why it exists">
          <p className="text-[15px] leading-relaxed text-ivory/60">{product.whyItExists}</p>
        </Block>

        <Block index="03" title="Material">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
            <p className="text-[15px] leading-relaxed text-ivory/60">{product.materialNote}</p>
            <dl className="divide-y divide-ivory/10 border-t border-ivory/10">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="label-sm text-ivory/35">{spec.label}</dt>
                  <dd className="text-right text-[12px] text-ivory/70">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Block>

        <Block index="04" title="The details">
          <div className="grid gap-4 md:grid-cols-2">
            {product.images.slice(1).concat(product.images.slice(0, 1)).map((entry, index) => (
              <figure
                key={`${entry.src}-detail-${index}`}
                className={`group relative overflow-hidden ${
                  index === 0 ? "aspect-[4/5]" : "aspect-[4/3] md:mt-14"
                }`}
                data-cursor="view"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={entry.src}
                  alt={entry.alt}
                  loading="lazy"
                  className="media-cover img-cinema absolute inset-0 scale-[1.12] transition-transform duration-[1800ms] group-hover:scale-[1.2]"
                  style={{ objectPosition: entry.focus ?? "50% 50%" }}
                />
                <figcaption className="absolute bottom-4 left-4 label-sm text-ivory/70">
                  Macro / {String(index + 1).padStart(2, "0")}
                </figcaption>
              </figure>
            ))}
          </div>
        </Block>

        <Block index="05" title="The fit">
          <p className="text-[15px] leading-relaxed text-ivory/60">{product.fit}</p>
        </Block>

        <Block index="06" title="The drop">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[520px] text-[15px] leading-relaxed text-ivory/60">
              {product.dropNote}
            </p>
            <Link href="/#drop" className="label uline shrink-0 text-gold">
              Drop 001 →
            </Link>
          </div>
        </Block>

        {/* COMPLETE THE SET */}
        <div data-product-block className="mt-28 border-t border-ivory/10 pt-12">
          <p className="label text-gold/80">07 — Complete the set</p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-3">
            {related.map((entry) => (
              <Link
                key={entry.slug}
                href={`/object/${entry.slug}`}
                data-cursor="explore"
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={entry.images[0].src}
                    alt={entry.images[0].alt}
                    loading="lazy"
                    className="media-cover img-cinema absolute inset-0 transition-transform duration-[1600ms] group-hover:scale-105"
                    style={{ objectPosition: entry.images[0].focus ?? "50% 50%" }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-obsidian/25 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <div>
                    <p className="label-sm text-ivory/35">Object {entry.objectNo}</p>
                    <p className="display mt-2 text-[20px] leading-none text-ivory">
                      {entry.name}
                    </p>
                  </div>
                  <p className="font-ui text-[13px] tabular-nums text-ivory/70">
                    {formatPrice(entry.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STICKY MOBILE BAR */}
      <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-ivory/12 bg-obsidian/95 px-5 py-4 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="label-sm text-ivory/40">Object {product.objectNo}</p>
            <p className="font-ui text-[13px] tabular-nums text-ivory">
              {formatPrice(product.price)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              add({
                slug: product.slug,
                name: product.name,
                objectNo: product.objectNo,
                price: product.price,
                image: product.images[0].src,
              });
              open();
            }}
            className="btn-line btn-solid label flex-1 justify-center text-obsidian"
          >
            Add to bag
          </button>
        </div>
      </div>
    </div>
  );
}

function Block({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-product-block
      className="grid grid-cols-1 gap-6 border-t border-ivory/10 py-14 md:grid-cols-[180px_1fr] md:gap-12 md:py-20"
    >
      <div className="flex items-start gap-4">
        <span className="label-sm text-gold/70">{index}</span>
        <h2 className="display text-[clamp(1.3rem,2.6vw,2rem)] leading-none text-ivory">
          {title}
        </h2>
      </div>
      <div className="max-w-[820px]">{children}</div>
    </div>
  );
}
