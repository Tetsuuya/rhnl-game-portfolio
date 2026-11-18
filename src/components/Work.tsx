"use client";

import { useEffect, useState } from "react";
import { work, type WorkItem } from "@/data/work";
import Media from "./Media";
import CopyLink from "./CopyLink";
import WorkDetail from "./WorkDetail";

export default function Work() {
  const [open, setOpen] = useState<WorkItem | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* swipeable row on phones, 2-column grid from md up */}
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
        {work.map((item) => {
          const isVideo = item.media?.type === "video" || item.media?.type === "youtube";
          const isShipped = item.kind === "Shipped Game";
          return (
            <article
              key={item.slug}
              className="group flex w-[85%] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-line bg-surface-card transition hover:-translate-y-0.5 hover:border-accent/50 md:w-auto"
            >
              <button type="button" onClick={() => setOpen(item)} className="flex flex-1 flex-col text-left">
                <div className="relative aspect-video w-full overflow-hidden border-b border-line bg-surface-elevated">
                  <Media item={item} />
                  <span
                    className={`absolute left-3 top-3 z-20 rounded-full px-2.5 py-0.5 text-[11px] font-bold backdrop-blur ${
                      isShipped
                        ? "bg-roblox-green text-white"
                        : "border border-line bg-surface/90 text-ink"
                    }`}
                  >
                    {item.kind}
                  </span>
                  <span className="absolute bottom-3 right-3 z-20 grid h-9 w-9 place-items-center rounded-full border border-line bg-surface/90 text-sm font-bold text-ink transition group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    {isVideo ? "▶" : "↗"}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg font-extrabold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.summary}</p>
                </div>
              </button>

              {isShipped && item.playUrl && (
                <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-xs sm:px-5">
                  <button
                    type="button"
                    onClick={() => setOpen(item)}
                    className="font-semibold text-ink-soft transition hover:text-ink"
                  >
                    inspect breakdown
                    {item.gallery?.length ? ` · ${item.gallery.length} scenes` : ""}
                  </button>
                  <a
                    href={item.playUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-roblox-green hover:underline"
                  >
                    ▶ Play on Roblox
                  </a>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setOpen(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl border border-b-0 border-line bg-surface-card shadow-2xl sm:rounded-2xl sm:border-b"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-xs">
              <span className="truncate text-ink-soft">{open.slug}.luau</span>
              <span className="flex shrink-0 gap-4">
                <a
                  href={`/work/${open.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-soft hover:text-accent"
                >
                  new tab ↗
                </a>
                <CopyLink path={`/work/${open.slug}`} className="text-ink-soft hover:text-accent" />
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  className="text-ink-soft hover:text-accent"
                  aria-label="Close"
                >
                  ✕
                </button>
              </span>
            </div>
            <div className="bg-surface-elevated">
              <Media item={open} full />
            </div>
            <div className="p-5 sm:p-6">
              <WorkDetail item={open} heading="h3" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
