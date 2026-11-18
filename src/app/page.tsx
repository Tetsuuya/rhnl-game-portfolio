import Image from "next/image";
import Nav from "@/components/Nav";
import Work from "@/components/Work";
import Socials from "@/components/Socials";
import ContactForm from "@/components/ContactForm";
import { featuredGame, profile, services, toolGroups } from "@/data/site";

function iconFilterClass(icon: string) {
  if (icon === "github") return "tool-icon-invert";
  if (icon === "audio" || icon === "physics" || icon === "streaming" || icon === "ui") {
    return "tool-icon-adaptive";
  }
  return "";
}

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top" className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Hero */}
        <section id="hero" className="py-12 sm:py-20">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto] md:gap-12">
            <div>
              <p className="flex items-center gap-2 font-mono text-xs font-semibold text-roblox-green">
                <span
                  className="h-2 w-2 rounded-full bg-roblox-green"
                  style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
                />
                available for roblox projects
              </p>

              <h1 className="mt-4 text-[2.75rem] font-extrabold leading-[0.98] tracking-tight text-ink sm:text-7xl">
                Hi, I&apos;m Rhenel.
              </h1>

              <p className="mt-4 max-w-lg text-lg text-ink-soft sm:mt-5 sm:text-xl">
                I script complete games &amp; systems in{" "}
                <span className="font-bold text-ink">Roblox</span>{" "}
                <span className="font-mono text-sm text-muted">(Luau · Rojo)</span>.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
                <a
                  href="#work"
                  className="rounded-xl bg-ink px-5 py-3 text-center text-sm font-extrabold text-canvas transition hover:opacity-90"
                >
                  See games &amp; systems
                </a>
                <a
                  href={featuredGame.playUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-roblox-green px-5 py-3 text-center text-sm font-extrabold text-white transition hover:brightness-110"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                    <path d="M4 2.5v11L13.5 8 4 2.5z" />
                  </svg>
                  Play {featuredGame.title}
                </a>
                <a
                  href="#contact"
                  className="rounded-xl border border-line-strong bg-surface-card px-5 py-3 text-center text-sm font-bold text-ink transition hover:bg-surface-hover"
                >
                  Let&apos;s talk
                </a>
              </div>
            </div>

            {/* Clean Profile Card */}
            <figure className="order-first w-36 overflow-hidden rounded-2xl border border-line bg-surface-card shadow-sm sm:w-52 md:order-none md:w-60">
              <div className="relative bg-surface-elevated">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  width={256}
                  height={256}
                  priority
                  className="aspect-square w-full object-cover"
                />
                <span
                  title="Online / Available"
                  className="absolute bottom-2.5 right-2.5 h-3.5 w-3.5 rounded-full border-2 border-surface-card bg-roblox-green"
                />
              </div>
              <figcaption className="flex items-center justify-between border-t border-line px-3.5 py-2.5 font-mono text-xs text-ink-soft">
                <span className="font-semibold text-ink">rhenel.lua</span>
                <span className="text-roblox-green">✓</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* What I build + Tools */}
        <section id="services" className="border-t border-line py-12 sm:py-16">
          <p className="mb-5 font-mono text-sm text-ink-soft sm:mb-6">what I build</p>

          <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-line bg-surface-card p-5 transition hover:border-line-strong"
              >
                <span className="inline-block rounded-lg bg-accent/10 px-2.5 py-1 font-mono text-xs font-bold text-accent">
                  {s.node}
                </span>
                <h3 className="mt-3 text-lg font-extrabold text-ink sm:mt-4">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4 sm:mt-10">
            {toolGroups.map((g) => (
              <div
                key={g.label}
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
              >
                <p className="w-32 shrink-0 font-mono text-sm text-ink-soft">{g.label}</p>
                <ul className="flex flex-wrap gap-2">
                  {g.tools.map((t) => (
                    <li
                      key={t.name}
                      className="flex items-center gap-2 rounded-xl border border-line bg-surface-card py-1 pl-1 pr-3 text-xs font-bold text-ink sm:py-1.5 sm:pl-1.5 sm:pr-3.5 sm:text-sm"
                    >
                      <span className="grid h-6 w-6 place-items-center rounded-lg bg-surface-elevated sm:h-7 sm:w-7">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/tools/${t.icon}.svg`}
                          alt=""
                          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${iconFilterClass(t.icon)}`}
                        />
                      </span>
                      {t.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Games & Systems */}
        <section id="work" className="border-t border-line py-12 sm:py-16">
          <p className="mb-5 font-mono text-sm text-ink-soft sm:mb-6">
            games &amp; systems · tap to inspect
          </p>
          <Work />
          <div className="mt-6 rounded-2xl border border-line bg-surface-card p-5">
            <p className="font-extrabold text-ink">Built so games hold up under real players</p>
            <ul className="mt-3 grid gap-2 font-mono text-xs text-ink-soft sm:grid-cols-3">
              <li>
                <span className="text-roblox-green">✓</span> server-authoritative RemoteEvent checks
              </li>
              <li>
                <span className="text-roblox-green">✓</span> DataStore loadedOk guards prevent wipes
              </li>
              <li>
                <span className="text-roblox-green">✓</span> StreamingEnabled-safe world replication
              </li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-line py-12 sm:py-16">
          <p className="mb-5 font-mono text-sm text-ink-soft sm:mb-6">contact</p>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Need a Roblox scripter or systems dev?
              </h2>
              <p className="mt-3 text-ink-soft">Send your game doc or prototype.</p>
              {profile.booking && (
                <a
                  href={profile.booking}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block rounded-xl bg-ink px-5 py-3 text-sm font-extrabold text-canvas transition hover:opacity-90"
                >
                  Book a call
                </a>
              )}
              <div>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-6 inline-block font-bold text-ink underline decoration-accent decoration-2 underline-offset-4 transition hover:text-accent"
                >
                  {profile.email}
                </a>
              </div>
              <div className="mt-6">
                <Socials />
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-5xl px-4 pb-10 font-mono text-xs text-ink-soft sm:px-6">
        <span className="text-roblox-green">●</span> place published · © 2026 {profile.name}
      </footer>
    </>
  );
}
