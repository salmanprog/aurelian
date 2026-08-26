"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/db/schema";
import { useBag } from "@/components/system/BagProvider";
import { formatPrice } from "@/lib/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Mode = "editorial" | "grid";

const PRICE_BANDS = [
  { key: "all", label: "Any price", max: Infinity },
  { key: "under120", label: "Under $120", max: 120 },
  { key: "under250", label: "Under $250", max: 250 },
  { key: "above", label: "$250 +", max: Infinity, min: 250 },
];

export function ShopExperience({ products }: { products: Product[] }) {
  const [mode, setMode] = useState<Mode>("editorial");
  const [collection, setCollection] = useState("all");
  const [material, setMaterial] = useState("all");
  const [band, setBand] = useState("all");
  const [drop, setDrop] = useState("all");
  const [availability, setAvailability] = useState("all");
  const listRef = useRef<HTMLDivElement | null>(null);

  const collections = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.collection)))],
    [products],
  );
  const materials = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.material)))],
    [products],
  );
  const drops = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.drop)))],
    [products],
  );

  const filtered = useMemo(() => {
    const priceBand = PRICE_BANDS.find((entry) => entry.key === band) ?? PRICE_BANDS[0];
    return products.filter((product) => {
      if (collection !== "all" && product.collection !== collection) return false;
      if (material !== "all" && product.material !== material) return false;
      if (drop !== "all" && product.drop !== drop) return false;
      if (availability === "limited" && !product.limited) return false;
      if (availability === "available" && product.stock <= 0) return false;
      if (priceBand.min && product.price < priceBand.min) return false;
      if (Number.isFinite(priceBand.max) && product.price > priceBand.max) return false;
      return true;
    });
  }, [products, collection, material, band, drop, availability]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      list.querySelectorAll("[data-shop-item]"),
      { opacity: 0, y: 44, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.06,
        ease: "power3.out",
      },
    );
    return () => {
      tween.kill();
    };
  }, [filtered, mode]);

  return (
    <div className="bg-obsidian px-5 pb-28 pt-28 md:px-10 md:pt-36">
      <div className="mx-auto max-w-[1680px]">
        {/* Header */}
        <div className="flex flex-col gap-8 border-b border-ivory/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="label text-gold/80">The house / Inventory</p>
            <h1 className="display mt-6 text-[clamp(2.6rem,9vw,8rem)] leading-[0.86] text-ivory">
              Shop the house
            </h1>
            <p className="mt-6 max-w-[420px] text-[13px] leading-relaxed text-ivory/45">
              Eight objects. Numbered runs. Everything photographed in the same light it is
              made in.
            </p>
          </div>

          <div className="flex items-center gap-1 border border-ivory/15 p-1">
            {(["editorial", "grid"] as Mode[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value)}
                className={`label px-5 py-3 transition-colors duration-500 ${
                  mode === value ? "bg-ivory text-obsidian" : "text-ivory/55 hover:text-ivory"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="no-scrollbar -mx-5 mt-8 flex gap-8 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
          <FilterGroup label="Collection" value={collection} options={collections} onChange={setCollection} />
          <FilterGroup label="Material" value={material} options={materials} onChange={setMaterial} />
          <FilterGroup
            label="Price"
            value={band}
            options={PRICE_BANDS.map((entry) => entry.key)}
            labels={PRICE_BANDS.map((entry) => entry.label)}
            onChange={setBand}
          />
          <FilterGroup
            label="Availability"
            value={availability}
            options={["all", "limited", "available"]}
            labels={["All", "Limited", "Available"]}
            onChange={setAvailability}
          />
          <FilterGroup label="Drop" value={drop} options={drops} onChange={setDrop} />
        </div>

        <div className="mt-6 flex items-center justify-between border-b border-ivory/10 pb-5">
          <p className="label-sm text-ivory/40">
            {String(filtered.length).padStart(2, "0")} objects shown
          </p>
          <button
            type="button"
            onClick={() => {
              setCollection("all");
              setMaterial("all");
              setBand("all");
              setDrop("all");
              setAvailability("all");
            }}
            className="label-sm text-ivory/40 transition-colors hover:text-gold"
          >
            Reset
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="mt-12">
          {mode === "grid" ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product, index) => (
                <ShopCard key={product.slug} product={product} index={index} variant="grid" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-24 md:gap-32">
              {filtered.map((product, index) => (
                <ShopCard
                  key={product.slug}
                  product={product}
                  index={index}
                  variant="editorial"
                />
              ))}
            </div>
          )}
          {filtered.length === 0 ? (
            <p className="serif-body py-24 text-center text-[22px] text-ivory/40">
              Nothing in the house matches that. Loosen a filter.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  value,
  options,
  labels,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  labels?: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const currentLabel = labels?.[options.indexOf(value)] ?? value;

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-4 border border-ivory/12 px-5 py-3 transition-colors hover:border-ivory/30"
      >
        <span className="label-sm text-ivory/35">{label}</span>
        <span className="label text-ivory">
          {currentLabel === "all" ? "All" : currentLabel}
        </span>
        <span className="text-[9px] text-gold">{open ? "−" : "+"}</span>
      </button>
      {open ? (
        <div className="absolute left-0 top-[calc(100%+6px)] z-30 min-w-[210px] border border-ivory/12 bg-charcoal p-2">
          {options.map((option, index) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`label block w-full px-4 py-3 text-left transition-colors ${
                option === value ? "text-gold" : "text-ivory/55 hover:text-ivory"
              }`}
            >
              {labels?.[index] ?? (option === "all" ? "All" : option)}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ShopCard({
  product,
  index,
  variant,
}: {
  product: Product;
  index: number;
  variant: "grid" | "editorial";
}) {
  const { add } = useBag();
  const image = product.images[0];
  const secondary = product.images[1] ?? image;
  const editorial = variant === "editorial";
  const reverse = index % 2 === 1;

  const quickAdd = () =>
    add({
      slug: product.slug,
      name: product.name,
      objectNo: product.objectNo,
      price: product.price,
      image: image.src,
    });

  if (editorial) {
    return (
      <article
        data-shop-item
        className={`grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12 ${
          reverse ? "" : ""
        }`}
      >
        <Link
          href={`/object/${product.slug}`}
          data-cursor="explore"
          className={`group relative block overflow-hidden md:col-span-7 ${
            index % 3 === 0 ? "md:aspect-[4/5]" : "md:aspect-[5/4]"
          } aspect-[4/5] ${reverse ? "md:order-2" : ""}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            loading={index < 2 ? "eager" : "lazy"}
            className="media-cover img-cinema absolute inset-0 transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
            style={{ objectPosition: image.focus ?? "50% 50%" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={secondary.src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="media-cover absolute inset-0 opacity-0 transition-opacity duration-[1200ms] group-hover:opacity-100"
            style={{ objectPosition: secondary.focus ?? "50% 50%" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
          <span className="label absolute left-5 top-5 text-ivory/80">
            Object {product.objectNo}
          </span>
        </Link>

        <div className={`md:col-span-5 ${reverse ? "md:order-1 md:pr-6" : "md:pl-6"}`}>
          <p className="label-sm text-gold/75">{product.collection}</p>
          <h2 className="display mt-5 text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[0.92] text-ivory">
            {product.name}
          </h2>
          <p className="serif-body mt-5 text-[17px] text-ivory/60">{product.tagline}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="font-ui text-[15px] tabular-nums text-ivory">
              {formatPrice(product.price)}
            </span>
            <span className="label-sm text-ivory/40">{product.edition}</span>
            <span className="label-sm text-ivory/40">{product.material}</span>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={quickAdd}
              data-cursor="enter"
              className="btn-line label text-ivory"
            >
              Add to bag
            </button>
            <Link
              href={`/object/${product.slug}`}
              className="label uline text-ivory/60 hover:text-gold"
            >
              View object →
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article data-shop-item className="group">
      <Link
        href={`/object/${product.slug}`}
        data-cursor="explore"
        className={`relative block overflow-hidden ${
          index % 4 === 1 ? "aspect-[3/4]" : "aspect-[4/5]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          loading={index < 3 ? "eager" : "lazy"}
          className="media-cover img-cinema absolute inset-0 transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
          style={{ objectPosition: image.focus ?? "50% 50%" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-obsidian/25 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <span className="label absolute left-4 top-4 text-ivory/80">
          {product.objectNo}
        </span>
        {product.limited ? (
          <span className="label-sm absolute right-4 top-4 border border-gold/40 px-2 py-1 text-gold">
            Limited
          </span>
        ) : null}
      </Link>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="display text-[22px] leading-none text-ivory">{product.name}</h2>
          <p className="label-sm mt-3 text-ivory/40">{product.material}</p>
        </div>
        <div className="text-right">
          <p className="font-ui text-[13px] tabular-nums text-ivory">
            {formatPrice(product.price)}
          </p>
          <button
            type="button"
            onClick={quickAdd}
            className="label-sm mt-2 text-gold transition-opacity hover:opacity-70"
          >
            Add +
          </button>
        </div>
      </div>
    </article>
  );
}
