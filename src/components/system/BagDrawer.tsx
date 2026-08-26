"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { formatPrice } from "@/lib/site";
import { useBag } from "./BagProvider";

type Stage = "bag" | "processing" | "reserved";

export function BagDrawer() {
  const { lines, isOpen, close, subtotal, setQuantity, remove, count, clear } = useBag();
  const shellRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [stage, setStage] = useState<Stage>("bag");
  const [reference, setReference] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const panel = panelRef.current;
    const shell = shellRef.current;
    if (!panel || !shell) return;

    if (isOpen) {
      shell.style.pointerEvents = "auto";
      gsap.to(shell, { autoAlpha: 1, duration: 0.5, ease: "power2.out" });
      gsap.to(panel, { xPercent: 0, duration: 0.95, ease: "expo.out" });
      gsap.fromTo(
        panel.querySelectorAll("[data-bag-line]"),
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.18, stagger: 0.06, ease: "power3.out" },
      );
      window.__lenis?.stop();
    } else {
      gsap.to(shell, { autoAlpha: 0, duration: 0.4, delay: 0.25 });
      gsap.to(panel, { xPercent: 100, duration: 0.7, ease: "expo.inOut" });
      window.__lenis?.start();
      window.setTimeout(() => {
        setStage("bag");
      }, 700);
    }
  }, [isOpen]);

  useEffect(() => {
    const panel = panelRef.current;
    if (panel) gsap.set(panel, { xPercent: 100 });
  }, []);

  const checkout = async () => {
    if (lines.length === 0) return;
    setStage("processing");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email || "house@aurelian.co",
          items: lines.map((line) => ({
            slug: line.slug,
            name: line.name,
            objectNo: line.objectNo,
            price: line.price,
            quantity: line.quantity,
          })),
        }),
      });
      const data = (await response.json()) as { reference?: string };
      setReference(data.reference ?? "AUR-001");
      clear();
      setStage("reserved");
    } catch {
      setReference("AUR-OFFLINE");
      setStage("reserved");
    }
  };

  const shipping = subtotal > 250 || subtotal === 0 ? 0 : 18;

  return (
    <div
      ref={shellRef}
      className="pointer-events-none fixed inset-0 z-[110] invisible opacity-0"
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Close bag"
        onClick={close}
        className="absolute inset-0 h-full w-full cursor-default bg-obsidian/70 backdrop-blur-[3px]"
      />
      <aside
        ref={panelRef}
        className="absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col border-l border-ivory/10 bg-charcoal"
      >
        <div className="flex items-center justify-between border-b border-ivory/10 px-7 py-6">
          <div>
            <p className="label text-ivory/45">Your bag</p>
            <p className="mt-1 font-ui text-[11px] uppercase tracking-[0.3em] text-ivory">
              {count} {count === 1 ? "object" : "objects"}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            data-cursor="close"
            className="label text-ivory/50 transition-colors hover:text-gold"
          >
            Close
          </button>
        </div>

        {stage === "reserved" ? (
          <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
            <p className="label text-gold">Reserved</p>
            <h3 className="display mt-6 text-4xl">Your objects<br />are held.</h3>
            <p className="mt-6 max-w-[280px] text-[13px] leading-relaxed text-ivory/55">
              Reference {reference}. A member of the house will confirm your pieces by
              email within the hour. Nothing is charged until your objects are allocated.
            </p>
            <Link href="/shop" onClick={close} className="btn-line label mt-10 text-ivory">
              Continue exploring
            </Link>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
            <p className="label text-ivory/40">Empty</p>
            <h3 className="display mt-6 text-4xl">Nothing<br />chosen yet.</h3>
            <Link href="/shop" onClick={close} className="btn-line label mt-10 text-ivory">
              Enter the house
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-7 py-7">
              <p className="label-sm mb-6 text-gold/80">
                Your pieces are reserved for a short time.
              </p>
              <ul className="space-y-6">
                {lines.map((line) => (
                  <li
                    key={line.slug}
                    data-bag-line
                    className="flex gap-4 border-b border-ivory/8 pb-6"
                  >
                    <Link href={`/object/${line.slug}`} onClick={close} className="shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={line.image}
                        alt={line.name}
                        className="h-[104px] w-[78px] object-cover img-cinema"
                        loading="lazy"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="label-sm text-ivory/40">Aurelian / {line.objectNo}</p>
                        <p className="display mt-2 text-xl leading-none">{line.name}</p>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="flex items-center gap-3 border border-ivory/15 px-3 py-2">
                          <button
                            type="button"
                            onClick={() => setQuantity(line.slug, line.quantity - 1)}
                            className="text-ivory/60 transition-colors hover:text-gold"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="font-ui text-[11px] tabular-nums">
                            {String(line.quantity).padStart(2, "0")}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(line.slug, line.quantity + 1)}
                            className="text-ivory/60 transition-colors hover:text-gold"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-ui text-[12px] tabular-nums text-ivory">
                            {formatPrice(line.price * line.quantity)}
                          </p>
                          <button
                            type="button"
                            onClick={() => remove(line.slug)}
                            className="label-sm mt-1 text-ivory/35 transition-colors hover:text-maroon"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-3">
                <label className="label-sm block text-ivory/40" htmlFor="bag-email">
                  Email for allocation
                </label>
                <input
                  id="bag-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="YOUR EMAIL"
                  className="w-full border-b border-ivory/20 bg-transparent pb-3 font-ui text-[12px] uppercase tracking-[0.2em] text-ivory placeholder:text-ivory/25 focus:border-gold"
                />
              </div>
            </div>

            <div className="border-t border-ivory/10 px-7 py-7">
              <div className="flex items-baseline justify-between">
                <span className="label text-ivory/45">Subtotal</span>
                <span className="display text-3xl tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-ivory/40">
                {shipping === 0
                  ? "Complimentary insured shipping. Duties included."
                  : `Insured shipping ${formatPrice(shipping)} — complimentary over $250.`}
              </p>
              <button
                type="button"
                onClick={checkout}
                disabled={stage === "processing"}
                className="btn-line btn-solid label mt-6 w-full justify-center text-obsidian disabled:opacity-60"
              >
                {stage === "processing" ? "Reserving…" : "Proceed to checkout"}
              </button>
              <p className="label-sm mt-4 text-center text-ivory/30">
                Objects allocated in order of request
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
