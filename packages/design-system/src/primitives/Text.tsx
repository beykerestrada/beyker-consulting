import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

type TypeVariant =
  | "display-xl"
  | "display-lg"
  | "heading-xl"
  | "heading-lg"
  | "heading-md"
  | "heading-sm"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "mono-md"
  | "mono-sm";

type ColorVariant = "primary" | "secondary" | "muted" | "signal";

const variantClassMap: Record<TypeVariant, string> = {
  "display-xl": "bk-display-xl",
  "display-lg": "bk-display-lg",
  "heading-xl": "bk-heading-xl",
  "heading-lg": "bk-heading-lg",
  "heading-md": "bk-heading-md",
  "heading-sm": "bk-heading-sm",
  "body-lg": "bk-body-lg",
  "body-md": "bk-body-md",
  "body-sm": "bk-body-sm",
  "mono-md": "bk-mono-md",
  "mono-sm": "bk-mono-sm",
};

const colorClassMap: Record<ColorVariant, string> = {
  primary: "bk-text-primary",
  secondary: "bk-text-secondary",
  muted: "bk-text-muted",
  signal: "bk-text-signal",
};

const defaultTagMap: Partial<Record<TypeVariant, ElementType>> = {
  "display-xl": "h1",
  "display-lg": "h2",
  "heading-xl": "h1",
  "heading-lg": "h2",
  "heading-md": "h3",
  "heading-sm": "h4",
  "body-lg": "p",
  "body-md": "p",
  "body-sm": "p",
  "mono-md": "span",
  "mono-sm": "span",
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: TypeVariant;
  color?: ColorVariant;
  maxWidth?: string;
  children?: ReactNode;
}

export function Text({
  as,
  variant = "body-md",
  color = "primary",
  maxWidth,
  className,
  style,
  children,
  ...props
}: TextProps) {
  const Tag = as ?? defaultTagMap[variant] ?? "span";
  const classes = [variantClassMap[variant], colorClassMap[color], className]
    .filter(Boolean)
    .join(" ");

  const tokenStyle: CSSProperties = {
    maxWidth,
    ...style,
  };

  return (
    <Tag className={classes} style={tokenStyle} {...props}>
      {children}
    </Tag>
  );
}
