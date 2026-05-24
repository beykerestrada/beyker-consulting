import type { HTMLAttributes, ReactNode } from "react";

type SectionTone = "canvas" | "raised" | "sunken";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  contained?: boolean;
  children?: ReactNode;
}

export function Section({
  tone = "canvas",
  contained = true,
  className,
  children,
  ...props
}: SectionProps) {
  const classes = ["bk-section", `bk-section--${tone}`, className].filter(Boolean).join(" ");

  return (
    <section className={classes} {...props}>
      {contained ? <div className="bk-section__inner">{children}</div> : children}
    </section>
  );
}
