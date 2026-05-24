import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

type SpaceToken = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
type AlignValue = "start" | "center" | "end" | "stretch" | "baseline";
type JustifyValue = "start" | "center" | "end" | "between" | "around" | "evenly";

const justifyMap: Record<JustifyValue, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

export interface InlineProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  gap?: SpaceToken;
  align?: AlignValue;
  justify?: JustifyValue;
  wrap?: boolean;
  children?: ReactNode;
}

export function Inline({
  as: Tag = "div",
  gap,
  align = "center",
  justify,
  wrap = false,
  style,
  className,
  children,
  ...props
}: InlineProps) {
  const tokenStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    gap: gap !== undefined ? `var(--bk-space-${gap})` : undefined,
    alignItems: align,
    justifyContent: justify ? justifyMap[justify] : undefined,
    flexWrap: wrap ? "wrap" : undefined,
    ...style,
  };

  return (
    <Tag className={className} style={tokenStyle} {...props}>
      {children}
    </Tag>
  );
}
