"use client";

import { useEffect, useState } from "react";
import type { GalleryImage } from "@/data/work";

export default function MediaGallery({
  title,
  cover,
  gallery,
}: {
  title: string;
  cover?: string;
  gallery: GalleryImage[];
}) {
  const slides: GalleryImage[] = cover
    ? [{ src: cover, caption: `${title} · Cover` }, ...gallery]
    : gallery;

  const [index, setIndex] = useState(0);
  const current = slides[index] ?? slides[0];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % slides.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + slides.length) % slides.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden bg-surface-elevated">
        {/* Ambient blurred fill handles mixed 1:1 cover and widescreen screenshots */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-xl"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.src}
          alt={current.caption ?? title}
          className="relative z-10 h-full w-full object-contain"
        />

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous screenshot"
              className="absolute left-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/90 text-sm font-bold text-ink shadow-sm backdrop-blur transition hover:border-accent hover:text-accent"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next screenshot"
              className="absolute right-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/90 text-sm font-bold text-ink shadow-sm backdrop-blur transition hover:border-accent hover:text-accent"
            >
              ›
            </button>
          </>
        )}

        <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 flex items-center justify-between gap-2">
          {current.caption ? (
            <span className="truncate rounded-lg border border-line bg-surface/90 px-2.5 py-1 text-xs font-semibold text-ink backdrop-blur">
              {current.caption}
            </span>
          ) : (
            <span />
          )}
          <span className="shrink-0 rounded-lg border border-line bg-surface/90 px-2.5 py-1 font-mono text-[11px] font-semibold text-ink backdrop-blur">
            {index + 1} / {slides.length}
          </span>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-line bg-surface p-2.5">
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={`${s.src}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={s.caption ?? `Screenshot ${i + 1}`}
                className={`relative h-12 w-20 shrink-0 overflow-hidden rounded-lg border transition ${
                  active
                    ? "border-accent ring-2 ring-accent/40"
                    : "border-line opacity-70 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
