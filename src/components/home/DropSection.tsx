"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CinematicVideo } from "@/components/system/CinematicVideo";
import { Magnetic } from "@/components/system/Reveal";
import { DROP, FILM, formatPrice } from "@/lib/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Remaining = { days: string; hours: string; minutes: string; seconds: string; live: boolean };

function useCountdown(target: string): Remaining {
  const [state, setState] = useState<Remaining>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    live: false,
  });

  useEffect(() => {
    const tick = () => {
      const diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) {
        setState({ days: "00", hours: "00", minutes: "00", seconds: "00", live: true });
        return;
      }
      const totalSeconds = Math.floor(diff / 1000);
      setState({
        days: String(Math.floor(totalSeconds / 86400)).padStart(2, "0"),
        hours: String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, "0"),
        minutes: String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0"),
        seconds: String(totalSeconds % 60).padStart(2, "0"),
        live: false,
      });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return state;
}

/** 13 / 14 — The current drop. Deep maroon, editorial countdown. */
export function DropSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const countdown = useCountdown(DROP.launchIso);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(18% 12% 18% 12%)", scale: 1.18 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 70%", end: "center center", scrub: 1 },
        },
      );
      gsap.fromTo(
        "[data-drop-digit]",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 60%" },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const digits: Array<[string, string]> = [
    [countdown.days, "Days"],
    [countdown.hours, "Hours"],
    [countdown.minutes, "Minutes"],
    [countdown.seconds, "Seconds"],
  ];

  return (
    <section
      ref={sectionRef}
      id="drop"
      className="relative overflow-hidden border-t border-ivory/10 bg-maroon"
    >
      <div className="absolute inset-0 opacity-30">
        <CinematicVideo
          src={FILM.ink}
          poster="/images/object-limited.jpg"
          className="h-full w-full"
          focus="50% 50%"
          posterBelow={900}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian via-maroon/70 to-obsidian" />

      <div className="relative mx-auto grid max-w-[1680px] grid-cols-1 gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <div className="flex items-center gap-5">
            <span className="label text-gold">05 — {DROP.chapter}</span>
            <span className="h-px w-16 bg-gold/40" />
          </div>

          <h2 className="display mt-7 text-[clamp(3.4rem,12vw,10rem)] leading-[0.86] text-ivory">
            {DROP.code.split(" ")[0]}
            <br />
            <span className="display-italic text-gold">{DROP.code.split(" ")[1]}</span>
          </h2>

          <p className="serif-body mt-9 max-w-[420px] text-[19px] leading-[1.5] text-ivory/75">
            NOT MADE TO LAST FOREVER.
            <br />
            MADE TO MATTER NOW.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="label-sm text-ivory/60">Available</span>
            <span className="h-3 w-px bg-ivory/20" />
            <span className="label-sm text-ivory/60">Limited quantity</span>
            <span className="h-3 w-px bg-ivory/20" />
            <span className="label-sm text-gold/80">Released {DROP.released}</span>
          </div>

          <div className="mt-12 flex flex-wrap items-baseline gap-x-3 gap-y-1 md:gap-x-5">
            {digits.map(([value, label], index) => (
              <div key={label} className="flex items-baseline gap-3 md:gap-5">
                <div className="overflow-hidden">
                  <span
                    data-drop-digit
                    className="display block text-[clamp(2.8rem,9vw,7rem)] leading-none tabular-nums text-ivory"
                  >
                    {value}
                  </span>
                  <span className="label-sm mt-2 block text-ivory/40">{label}</span>
                </div>
                {index < digits.length - 1 ? (
                  <span className="display text-[clamp(2rem,6vw,4.5rem)] text-gold/50">:</span>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link href="/shop" className="btn-line btn-gold label text-ivory" data-cursor="enter">
                {countdown.live ? "Explore drop" : "Shop drop 001"}
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="#access" className="btn-line label text-ivory/70">
                Join the next drop
              </Link>
            </Magnetic>
          </div>

          {countdown.live ? (
            <p className="label mt-6 text-gold">The drop is live.</p>
          ) : (
            <p className="label-sm mt-6 text-ivory/35">
              Objects released in order of request. No restock.
            </p>
          )}
        </div>

        <div className="relative">
          <div ref={imageRef} className="relative aspect-[4/5] w-full overflow-hidden will-clip">
            <CinematicVideo
              src={FILM.droplet}
              poster="/images/object-limited.jpg"
              className="h-full w-full"
              focus="50% 50%"
              posterBelow={640}
              cursorLabel="view"
            />
          </div>
          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="label-sm text-ivory/45">Aurelian / 001</p>
              <p className="display mt-2 text-2xl text-ivory">Obsidian Cuff</p>
            </div>
            <div className="text-right">
              <p className="font-ui text-[13px] tabular-nums text-gold">{formatPrice(340)}</p>
              <p className="label-sm mt-1 text-ivory/40">Numbered / 18 left</p>
            </div>
          </div>
          <Link
            href="/object/obsidian-cuff"
            data-cursor="explore"
            className="label uline mt-6 inline-flex items-center gap-2 text-ivory/80"
          >
            View object <span className="text-gold">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/** 15 — The private room. */
export function PrivateRoom() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-room-line]",
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 65%" },
        },
      );
      gsap.fromTo(
        "[data-room-film]",
        { scale: 1.25, filter: "brightness(0.25)" },
        {
          scale: 1,
          filter: "brightness(0.75)",
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const request = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) return;
    setStatus("sending");
    try {
      await Promise.all([
        fetch("/api/access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, note: "private-room" }),
        }),
        fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source: "private-room" }),
        }),
      ]);
    } catch {
      /* silent — the house does not apologise */
    }
    setStatus("sent");
  };

  return (
    <section
      ref={sectionRef}
      id="access"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-obsidian"
    >
      <div data-room-film className="absolute inset-0 will-clip">
        <CinematicVideo
          src={FILM.hallway}
          poster="/images/private-room.jpg"
          className="h-full w-full"
          focus="50% 50%"
          posterBelow={720}
        />
        <div className="pointer-events-none absolute inset-0 bg-obsidian/72" />
      </div>

      <div className="relative mx-auto w-full max-w-[1680px] px-5 py-28 md:px-10">
        <p className="label text-gold/80">06 — The private room</p>
        <h2 className="display mt-8 text-[clamp(2.6rem,9vw,8rem)] leading-[0.88] text-ivory">
          <span className="block overflow-hidden">
            <span data-room-line className="block">Some pieces</span>
          </span>
          <span className="block overflow-hidden">
            <span data-room-line className="block">
              aren&rsquo;t for <span className="display-italic text-gold">everyone.</span>
            </span>
          </span>
        </h2>

        <p className="mt-9 max-w-[430px] text-[14px] leading-relaxed text-ivory/60">
          Private access to limited releases, early collections, and pieces before they
          enter the public house.
        </p>

        {status === "sent" ? (
          <div className="mt-12 max-w-[460px] border border-gold/30 bg-obsidian/60 p-7">
            <p className="label text-gold">Request received</p>
            <p className="mt-4 text-[13px] leading-relaxed text-ivory/60">
              The house reviews access requests weekly. If your name is added, you will
              receive a single email — no catalogue, no reminders.
            </p>
          </div>
        ) : (
          <form onSubmit={request} className="mt-12 max-w-[460px]">
            <div className="flex items-center gap-4 border-b border-ivory/25 pb-3 focus-within:border-gold">
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="YOUR EMAIL"
                aria-label="Your email"
                className="w-full bg-transparent font-ui text-[12px] uppercase tracking-[0.28em] text-ivory placeholder:text-ivory/30"
              />
              <button
                type="submit"
                data-cursor="enter"
                className="label shrink-0 text-gold transition-opacity hover:opacity-70"
              >
                {status === "sending" ? "Sending" : "Request access"}
              </button>
            </div>
            <div className="mt-6 flex items-center gap-5">
              <span className="label-sm text-ivory/30">or</span>
              <Link href="#newsletter" className="label-sm uline text-ivory/60">
                Join the list
              </Link>
            </div>
          </form>
        )}
      </div>

      <div className="absolute bottom-8 right-5 hidden md:right-10 md:block">
        <p className="label-sm vertical-text text-ivory/25">Door 001 / Members only</p>
      </div>
    </section>
  );
}


