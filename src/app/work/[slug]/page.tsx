import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Media from "@/components/Media";
import CopyLink from "@/components/CopyLink";
import WorkDetail from "@/components/WorkDetail";
import ThemeToggle from "@/components/ThemeToggle";
import { work } from "@/data/work";
import { profile } from "@/data/site";

// One shareable page per game or system: /work/<slug>
export const dynamicParams = false;

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug);
  if (!item) return {};
  const ogImage =
    item.media?.type === "image"
      ? item.media.src
      : item.media?.type === "video"
        ? item.media.poster
        : undefined;
  return {
    title: `${item.title} | Rhenel.s`,
    description: item.summary,
    openGraph: { title: item.title, description: item.summary, images: ogImage ? [ogImage] : [] },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug);
  if (!item) notFound();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
        <nav className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-ink">
            rhenel<span className="text-accent">.s</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/#work" className="font-mono text-xs text-ink-soft hover:text-ink sm:text-sm">
              ← all games &amp; systems
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="overflow-hidden rounded-2xl border border-line bg-surface-card">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-xs text-ink-soft">
            <span>{item.slug}.luau</span>
            <CopyLink path={`/work/${item.slug}`} className="hover:text-accent" />
          </div>
          <div className="bg-surface-elevated">
            <Media item={item} full />
          </div>
        </div>

        <div className="mt-6">
          <WorkDetail item={item} heading="h1" />
        </div>

        <div className="mt-10 rounded-2xl border border-line bg-surface-card p-5 sm:flex sm:items-center sm:justify-between">
          <p className="font-extrabold text-ink">Need systems like this in your Roblox game?</p>
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent(`About: ${item.title}`)}`}
            className="mt-3 inline-block rounded-xl bg-accent px-4 py-2 text-sm font-extrabold text-white transition hover:brightness-110 sm:mt-0"
          >
            Let&apos;s talk ▸
          </a>
        </div>
      </main>
    </>
  );
}
