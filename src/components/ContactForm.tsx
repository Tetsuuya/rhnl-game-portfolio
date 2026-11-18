"use client";

import { profile } from "@/data/site";

// Opens the visitor's mail app with the project message pre-filled.
export default function ContactForm() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = new FormData(e.currentTarget).get("message");
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Roblox project inquiry")}&body=${encodeURIComponent(String(message))}`;
  }

  return (
    <form onSubmit={onSubmit} className="overflow-hidden rounded-2xl border border-line bg-surface-card">
      <div className="border-b border-line px-4 py-2.5 font-mono text-xs text-ink-soft">
        studio · new project
      </div>
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Tell me about your Roblox game or system..."
        className="block w-full resize-none bg-transparent px-4 py-3 text-sm text-ink outline-none placeholder:text-muted"
      />
      <div className="flex justify-end px-3 pb-3">
        <button
          type="submit"
          className="rounded-xl bg-accent px-5 py-2 text-sm font-extrabold text-white transition hover:brightness-110"
        >
          Send ▸
        </button>
      </div>
    </form>
  );
}
