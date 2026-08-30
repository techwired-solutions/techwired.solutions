"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "ok" | "error";

const field =
  "w-full rounded-sm border border-white/15 bg-white/[0.04] px-3 py-2.5 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-teal";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.company) return; // honeypot

    setStatus("sending");
    setNote("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { reason?: string };
      if (body.reason === "not_configured") {
        const subject = encodeURIComponent(`Project enquiry — ${data.name}`);
        const mail = encodeURIComponent(
          `${data.message}\n\n— ${data.name}\n${data.email}`,
        );
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${mail}`;
        setStatus("idle");
        return;
      }
      throw new Error(body.reason ?? "failed");
    } catch {
      setStatus("error");
      setNote(`Something went wrong — email ${site.email}.`);
    }
  }

  if (status === "ok") {
    return (
      <div className="flex flex-col items-start gap-2 rounded border border-teal/40 bg-teal/[0.06] p-6">
        <p className="u-mono text-[11px] tracking-[0.16em] text-teal">
          message received
        </p>
        <p className="text-[14px] text-muted">
          Thanks for reaching out — we&apos;ll reply within a day or two.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <label className="flex flex-col gap-1.5">
        <span className="u-mono text-[10px] tracking-[0.14em] text-faint">Name</span>
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="u-mono text-[10px] tracking-[0.14em] text-faint">Email</span>
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="u-mono text-[10px] tracking-[0.14em] text-faint">
          What are you building?
        </span>
        <textarea name="message" required rows={4} className={`${field} resize-y`} />
      </label>
      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded border border-teal bg-teal/10 px-4 py-2.5 text-[13px] font-medium text-teal transition-colors hover:bg-teal hover:text-void disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" && (
          <span className="text-[12px] text-faint">{note}</span>
        )}
      </div>
    </form>
  );
}
