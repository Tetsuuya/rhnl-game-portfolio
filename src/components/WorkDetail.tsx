import type { WorkItem } from "@/data/work";

// Shared breakdown rendered inside both the modal viewer and /work/[slug].
export default function WorkDetail({
  item,
  heading = "h3",
}: {
  item: WorkItem;
  heading?: "h1" | "h3";
}) {
  const TitleTag = heading;
  const isShipped = item.kind === "Shipped Game";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
              isShipped
                ? "bg-roblox-green/15 text-roblox-green"
                : "bg-accent/10 text-accent"
            }`}
          >
            {item.kind}
          </span>
          <TitleTag
            className={
              heading === "h1"
                ? "mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl"
                : "mt-2 text-xl font-extrabold tracking-tight text-ink sm:text-2xl"
            }
          >
            {item.title}
          </TitleTag>
        </div>

        {item.playUrl && (
          <a
            href={item.playUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-roblox-green px-5 py-2.5 text-sm font-extrabold text-white transition hover:brightness-110"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
              <path d="M4 2.5v11L13.5 8 4 2.5z" />
            </svg>
            Play on Roblox
          </a>
        )}
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-accent">challenge</p>
      <p className="mt-1 text-sm leading-relaxed text-ink-soft sm:text-base">{item.problem}</p>

      {item.steps && (
        <>
          <p className="mt-5 text-xs font-bold uppercase tracking-wider text-accent">
            architecture &amp; systems
          </p>
          <ol className="mt-2 space-y-2">
            {item.steps.map((s, i) => (
              <li key={s} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                <span className="font-mono font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </>
      )}

      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-accent">outcome</p>
      <p className="mt-1 font-semibold text-ink">{item.result}</p>
      <p className="mt-4 font-mono text-xs text-muted">{item.nodes.join(" → ")}</p>
    </div>
  );
}
