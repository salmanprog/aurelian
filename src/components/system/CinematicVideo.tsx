"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
  /** object-position for the frame */
  focus?: string;
  /** Poster-only under this viewport width (mobile fallback) */
  posterBelow?: number;
  scrollScale?: boolean;
  cursorLabel?: string;
  alt?: string;
};

/**
 * House film player: muted, looping, inline, poster-first and fully lazy.
 * Nothing is downloaded until the section approaches the viewport, and
 * `prefers-reduced-motion` / small screens get the still frame instead.
 */
export function CinematicVideo({
  src,
  poster,
  className = "",
  focus = "50% 50%",
  posterBelow = 0,
  cursorLabel = "play",
  alt = "AURELIAN campaign film",
}: Props) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [usePosterOnly, setPosterOnly] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = posterBelow > 0 && window.innerWidth < posterBelow;
    setPosterOnly(reduce || small);
  }, [posterBelow]);

  useEffect(() => {
    if (usePosterOnly) return;
    const shell = shellRef.current;
    if (!shell) return;

    let activated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = videoRef.current;
          if (!video) return;
          if (entry.isIntersecting) {
            if (!activated) {
              activated = true;
              video.src = src;
              video.load();
            }
            void video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: "400px 0px", threshold: 0.01 },
    );
    observer.observe(shell);
    return () => observer.disconnect();
  }, [src, usePosterOnly]);

  return (
    <div
      ref={shellRef}
      className={`relative overflow-hidden ${className}`}
      data-cursor={usePosterOnly ? undefined : cursorLabel}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="media-cover img-cinema absolute inset-0"
        style={{ objectPosition: focus }}
      />
      {!usePosterOnly ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          onCanPlay={() => setReady(true)}
          className={`media-cover img-cinema absolute inset-0 transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: focus }}
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-obsidian/35" />
    </div>
  );
}
