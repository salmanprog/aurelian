"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { useBag } from "./BagProvider";
import { Monogram } from "./Monogram";

const LINKS = [
  { label: "The House", href: "/#house" },
  { label: "Objects", href: "/#objects" },
  { label: "Drop 001", href: "/#drop" },
  { label: "Journal", href: "/journal" },
];

export function scrollToTarget(hash: string) {
  const id = hash.replace("/#", "");
  const element = document.getElementById(id);
  if (!element) return false;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(element, { offset: -10, duration: 1.5 });
  } else {
    element.scrollIntoView({ behavior: "smooth" });
  }
  return true;
}

export function Nav() {
  const { count, open } = useBag();
  const shellRef = useRef<HTMLElement | null>(null);
  const markRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setSolid(true);
      return;
    }
    const trigger = ScrollTrigger.create({
      start: 90,
      onToggle: (self) => setSolid(self.isActive),
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    gsap.to(shell, {
      yPercent: solid ? 0 : 0,
      opacity: 1,
      duration: 0.8,
    });
  }, [solid]);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      window.__lenis?.stop();
      gsap.fromTo(
        menu,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" },
      );
      gsap.fromTo(
        menu.querySelectorAll("[data-menu-line]"),
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          delay: 0.25,
          stagger: 0.07,
          ease: "power4.out",
        },
      );
    } else {
      document.body.style.overflow = "";
      window.__lenis?.start();
      gsap.to(menu, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.6,
        ease: "expo.inOut",
      });
    }
  }, [menuOpen]);

  const onHashClick = (href: string) => (event: React.MouseEvent) => {
    if (!href.includes("#")) return;
    event.preventDefault();
    setMenuOpen(false);
    window.setTimeout(() => scrollToTarget(href), menuOpen ? 420 : 0);
  };

  return (
    <>
      <header
        ref={shellRef}
        className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-700 ${
          solid
            ? "border-b border-ivory/10 bg-obsidian/85 backdrop-blur-[10px]"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1680px] items-center justify-between px-5 md:px-10">
          <Link
            href="/"
            onClick={onHashClick("/")}
            className="group flex items-center gap-3"
            data-cursor="view"
            aria-label="AURELIAN home"
          >
            <div ref={markRef} className="text-ivory transition-transform duration-700">
              <Monogram className={`transition-all duration-700 ${solid ? "h-5 w-5" : "h-7 w-7"}`} />
            </div>
            <span
              className={`font-ui uppercase text-ivory transition-all duration-700 ${
                solid
                  ? "text-[10px] tracking-[0.46em]"
                  : "text-[12px] tracking-[0.58em] md:text-[13px]"
              }`}
            >
              Aurelian
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onHashClick(link.href)}
                className="label uline text-ivory/60 transition-colors duration-500 hover:text-ivory"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-7">
            <Link
              href="/shop"
              className="label hidden text-ivory/60 transition-colors hover:text-gold md:block"
            >
              Shop
            </Link>
            <button
              type="button"
              onClick={open}
              data-cursor="bag"
              className="label flex items-center gap-2 text-ivory/80 transition-colors hover:text-gold"
              aria-label="Open bag"
            >
              Bag
              <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center border border-ivory/25 px-1 text-[9px] leading-none text-ivory">
                {count}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="label text-ivory/80 transition-colors hover:text-gold lg:hidden"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        className={`fixed inset-0 z-[79] bg-charcoal lg:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col justify-center gap-2 px-6 pb-20 pt-28">
          {LINKS.map((link) => (
            <div key={link.href} className="overflow-hidden">
              <div data-menu-line>
                <Link
                  href={link.href}
                  onClick={onHashClick(link.href)}
                  className="display block py-2 text-[13vw] leading-[0.9] text-ivory md:text-[8vw]"
                >
                  {link.label}
                </Link>
              </div>
            </div>
          ))}
          <div className="overflow-hidden">
            <div data-menu-line className="pt-8">
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="label text-gold"
              >
                Shop the house →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
