"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function Nav() {
  const [docked, setDocked] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setDocked(window.scrollY > window.innerHeight * 1.02);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onSky = !docked && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        docked || open
          ? "border-b border-ink/10 bg-page/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container className="relative flex h-[72px] items-center justify-between">
        {/* left — nav links (desktop) / menu button (mobile) */}
        <div className="flex items-center">
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-button px-3 py-2 text-[14px] font-medium transition-colors",
                  onSky
                    ? "text-white/75 hover:text-white"
                    : "text-ink/60 hover:text-ink",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className={cn("-ml-2 p-2 md:hidden", onSky ? "text-whiteout" : "text-ink")}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X strokeWidth={2} /> : <Menu strokeWidth={2} />}
          </button>
        </div>

        {/* centre — wordmark (crossfades in as the sculpture docks) */}
        <a
          href="#top"
          aria-label="Techwired Solutions — home"
          className={cn(
            "absolute left-1/2 -translate-x-1/2 transition-opacity duration-500",
            docked ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <Wordmark className="text-ink" />
        </a>

        {/* right — CTA */}
        <div className="hidden md:block">
          <Button as="a" href="#contact" variant={onSky ? "glass" : "ghost"}>
            Start a project
          </Button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-ink/10 bg-page md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-button px-3 py-3 text-[16px] font-medium text-ink/70 transition-colors hover:bg-haze hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
              <div className="px-3 pt-3">
                <Button
                  as="a"
                  href="#contact"
                  variant="solid"
                  onClick={() => setOpen(false)}
                  className="w-full"
                >
                  Start a project
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
