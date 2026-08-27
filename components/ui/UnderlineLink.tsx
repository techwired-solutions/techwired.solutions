import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  tone?: "signal" | "whiteout" | "ink";
  arrow?: boolean;
  external?: boolean;
};

export function UnderlineLink({
  tone = "signal",
  arrow = false,
  external = false,
  className,
  children,
  ...rest
}: Props) {
  const color =
    tone === "signal"
      ? "text-signal"
      : tone === "ink"
        ? "text-ink"
        : "text-whiteout";

  return (
    <a
      className={cn(
        "group inline-flex items-center gap-1 px-2 text-[14px] font-medium transition-opacity hover:opacity-70",
        color,
        className,
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <span className="border-b-2 border-current pb-0.5">{children}</span>
      {arrow && (
        <ArrowUpRight
          className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      )}
    </a>
  );
}
