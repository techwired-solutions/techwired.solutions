"use client";

import { useState } from "react";
import { Check, AlertCircle } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "ok" | "error";

const inputBase =
  "w-full rounded-input border border-black/10 bg-white px-3 py-2.5 text-[15px] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-signal";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Honeypot
    if (data.company) return;

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
        const mailBody = encodeURIComponent(
          `${data.message}\n\n— ${data.name}\n${data.email}`,
        );
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${mailBody}`;
        setStatus("idle");
        return;
      }
      throw new Error(body.reason ?? "failed");
    } catch {
      setStatus("error");
      setNote(`Something went wrong. Email us at ${site.email}.`);
    }
  }

  if (status === "ok") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-button border border-black/10 bg-white p-6 text-ink">
        <Check className="h-6 w-6 text-signal" strokeWidth={2} />
        <p className="text-[16px] font-medium text-ink">Message sent.</p>
        <p className="text-[14px] text-ink/60">
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
        <span className="text-[13px] font-medium text-ink/70">Name</span>
        <input name="name" required autoComplete="name" className={inputBase} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-ink/70">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputBase}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-ink/70">
          What are you building?
        </span>
        <textarea
          name="message"
          required
          rows={4}
          className={`${inputBase} resize-y`}
        />
      </label>

      <div className="flex items-center gap-3 pt-1">
        <Button
          type="submit"
          variant="solid"
          tone="onLight"
          disabled={status === "sending"}
          className="disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
        {status === "error" && (
          <span className="flex items-center gap-1.5 text-[13px] text-ink/60">
            <AlertCircle className="h-4 w-4" strokeWidth={2} />
            {note}
          </span>
        )}
      </div>
    </form>
  );
}
