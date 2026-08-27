import * as React from "react";
import { cn } from "@/lib/utils";

type Common = {
  variant?: "ghost" | "solid";
  tone?: "onDark" | "onLight";
  className?: string;
  children: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-button px-4 py-2.5 text-[14px] font-medium leading-none transition-colors duration-200 select-none";

function classesFor(variant: "ghost" | "solid", tone: "onDark" | "onLight") {
  if (variant === "solid") {
    return tone === "onDark"
      ? "bg-whiteout text-ink border border-whiteout hover:bg-transparent hover:text-whiteout"
      : "bg-ink text-whiteout border border-ink hover:bg-transparent hover:text-ink";
  }
  // ghost
  return tone === "onDark"
    ? "border border-whiteout/70 text-whiteout hover:border-whiteout hover:bg-whiteout/[0.06]"
    : "border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.04]";
}

type ButtonAsButton = Common &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof Common> & {
    as?: "button";
  };

type ButtonAsLink = Common &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof Common> & {
    as: "a";
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "ghost",
    tone = "onDark",
    className,
    children,
    ...rest
  } = props;

  const cls = cn(base, classesFor(variant, tone), className);

  if (rest && "as" in rest && rest.as === "a") {
    const { as: _as, ...anchorProps } = rest as ButtonAsLink;
    void _as;
    return (
      <a className={cls} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { as: _as, ...buttonProps } = rest as ButtonAsButton;
  void _as;
  return (
    <button className={cls} {...buttonProps}>
      {children}
    </button>
  );
}
