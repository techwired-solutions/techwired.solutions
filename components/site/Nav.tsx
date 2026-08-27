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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-white/10 bg-black/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-[72px] items-center justify-between">
        <a href="#top" aria-label="Techwired Solutions — home">
          <Wordmark />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-button px-3 py-2 text-[14px] font-medium text-white/70 transition-colors hover:text-whiteout"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button as="a" href="#contact" variant="ghost" tone="onDark">
            Start a project
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 p-2 text-whiteout md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X strokeWidth={2} /> : <Menu strokeWidth={2} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/10 bg-black md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-button px-3 py-3 text-[16px] font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-whiteout"
                >
                  {item.label}
                </a>
              ))}
              <div className="px-3 pt-3">
                <Button
                  as="a"
                  href="#contact"
                  variant="solid"
                  tone="onDark"
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
