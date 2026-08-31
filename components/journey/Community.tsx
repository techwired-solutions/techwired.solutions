"use client";

import { useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site";

export function Community() {
  const [idea, setIdea] = useState("");

  const suggest = (e: React.FormEvent) => {
    e.preventDefault();
    const body = idea.trim();
    if (!body) return;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      "A product for the community",
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="community"
      className="relative z-30 w-full overflow-hidden border-t border-white/10 bg-void"
    >
      <Image
        src="/journey/keyframes/08.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/85 to-void/95" />

      <div className="relative mx-auto flex max-w-[1100px] flex-col gap-12 px-6 py-24 sm:px-12 sm:py-32">
        <div className="flex flex-col gap-5">
          <span className="u-mono text-[11px] tracking-[0.3em] text-teal">
            A product for the people
          </span>
          <h2 className="u-poster text-[clamp(2.6rem,8vw,6rem)] leading-[0.94] text-ink">
            What should we
            <br />
            build for everyone?
          </h2>
          <p className="max-w-[54ch] text-[15px] leading-[1.6] text-muted">
            Once a year we set the business aside and build something for the
            commons — no pricing page, no growth targets. Just a tool a community
            needs and no one is paid to make. Tell us what it should be.
          </p>
        </div>

        <form onSubmit={suggest} className="flex flex-col gap-4">
          <label
            htmlFor="community-idea"
            className="u-mono text-[10px] tracking-[0.16em] text-faint"
          >
            The idea
          </label>
          <textarea
            id="community-idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={4}
            placeholder="A tool that would help a lot of people, if only someone built it…"
            className="w-full resize-y rounded-sm border border-white/15 bg-white/[0.04] px-3 py-2.5 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-teal"
          />
          <button
            type="submit"
            className="btn btn-primary w-fit"
            disabled={!idea.trim()}
          >
            Send the idea
          </button>
        </form>
      </div>
    </section>
  );
}
