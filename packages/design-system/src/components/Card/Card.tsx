import type { HTMLAttributes, ReactNode } from "react";

type CardVariant = "default" | "raised" | "sunken";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: boolean;
  children?: ReactNode;
}

export function Card({
  variant = "default",
  padding = true,
  className,
  children,
  ...props
}: CardProps) {
  const classes = ["bk-card", `bk-card--${variant}`, padding ? "bk-card--padded" : null, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
