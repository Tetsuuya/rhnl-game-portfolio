import type { WorkItem } from "@/data/work";
import FlowPreview from "./FlowPreview";
import MediaGallery from "./MediaGallery";

// `full` renders playable or uncropped media (plus gallery when available) for the viewer; otherwise a card thumbnail.
export default function Media({ item, full = false }: { item: WorkItem; full?: boolean }) {
  const m = item.media;

  if (full && item.gallery?.length) {
    return (
      <MediaGallery
        title={item.title}
        cover={m?.type === "image" ? m.src : undefined}
        gallery={item.gallery}
      />
    );
  }

  if (!m) {
    return full ? (
      <div className="aspect-video bg-surface-elevated">
        <FlowPreview nodes={item.nodes} />
      </div>
    ) : (
      <FlowPreview nodes={item.nodes} />
    );
  }

  if (m.type === "image") {
    const content = (
      <div className="relative h-full w-full overflow-hidden bg-surface-elevated">
        {/* Ambient blurred fill keeps square game covers framed cleanly inside widescreen cards */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={m.src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-xl"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={m.src}
          alt={item.title}
          className={`relative z-10 h-full w-full object-contain ${full ? "p-2 sm:p-4" : ""}`}
        />
      </div>
    );
    return full ? <div className="aspect-video bg-surface-elevated">{content}</div> : content;
  }

  if (m.type === "video") {
    return full ? (
      <div className="aspect-video bg-black">
        <video src={m.src} poster={m.poster} controls autoPlay muted playsInline className="h-full w-full object-contain" />
      </div>
    ) : (
      <video src={m.src} poster={m.poster} muted loop playsInline autoPlay className="h-full w-full object-cover" />
    );
  }

  return full ? (
    <div className="aspect-video bg-black">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${m.id}?autoplay=1`}
        title={item.title}
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`https://i.ytimg.com/vi/${m.id}/hqdefault.jpg`} alt={item.title} className="h-full w-full object-cover" />
  );
}
