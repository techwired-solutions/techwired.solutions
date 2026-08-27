import * as React from "react";
import { cn } from "@/lib/utils";

type Common = {
  variant?: "ghost" | "solid" | "glass";
  className?: string;
  children: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-button px-4 py-2.5 text-[14px] font-medium leading-none transition-colors duration-200 select-none";

function classesFor(variant: NonNullable<Common["variant"]>) {
  switch (variant) {
    case "solid":
      // "Solid Light Button": haze fill, ink text, ink border
      return "bg-haze text-ink border border-ink hover:bg-ink hover:text-whiteout";
    case "glass":
      // over the photographic hero
      return "glass text-whiteout hover:bg-white/20";
    default:
      // ghost: transparent + border
      return "border border-ink/30 text-ink hover:border-ink hover:bg-ink/[0.05]";
  }
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
  const { variant = "ghost", className, children, ...rest } = props;
  const cls = cn(base, classesFor(variant), className);

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
