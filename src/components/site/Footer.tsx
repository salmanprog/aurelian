"use client";

import Link from "next/link";
import { FOOTER_NAV } from "@/lib/site";
import { Monogram } from "@/components/system/Monogram";
import { Reveal } from "@/components/system/Reveal";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ivory/10 bg-obsidian px-5 pb-10 pt-24 md:px-10 md:pt-32">
      <div className="mx-auto max-w-[1680px]">
        <Reveal>
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <Monogram className="h-10 w-10 text-ivory" />
              <p className="display mt-7 text-[clamp(3rem,13vw,11rem)] leading-[0.82] text-ivory">
                Aurelian
              </p>
            </div>
            <p className="label-sm max-w-[240px] leading-[2.4] text-ivory/35">
              Men&rsquo;s object house / Individuality without noise / Firenze — IT
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-10 border-t border-ivory/10 pt-12 md:grid-cols-4">
          {FOOTER_NAV.map((group) => (
            <div key={group.title}>
              <p className="label-sm text-gold/70">{group.title}</p>
              <ul className="mt-6 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="label uline text-ivory/55 transition-colors hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-ivory/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="label-sm text-ivory/30">
            © Aurelian / All rights reserved / {new Date().getFullYear()}
          </p>
          <p className="label-sm text-ivory/25">
            Objects numbered. Chapters closed. Never restocked.
          </p>
        </div>
      </div>
    </footer>
  );
}
