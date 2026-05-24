import type { HTMLAttributes } from "react";

type DividerVariant = "full" | "indented" | "labeled";

export interface DividerProps extends HTMLAttributes<HTMLElement> {
  variant?: DividerVariant;
  label?: string;
}

export function Divider({ variant = "full", label, className, ...props }: DividerProps) {
  const classes = ["bk-divider", `bk-divider--${variant}`, className].filter(Boolean).join(" ");

  if (variant === "labeled" && label) {
    return (
      <div className={classes} aria-hidden="true" {...props}>
        <span className="bk-divider__label">{label}</span>
      </div>
    );
  }

  return <hr className={classes} {...props} />;
}
