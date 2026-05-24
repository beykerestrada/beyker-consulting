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

export interface StackProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  gap?: SpaceToken;
  align?: AlignValue;
  justify?: JustifyValue;
  direction?: "row" | "column";
  wrap?: boolean;
  children?: ReactNode;
}

export function Stack({
  as: Tag = "div",
  gap,
  align,
  justify,
  direction = "column",
  wrap = false,
  style,
  className,
  children,
  ...props
}: StackProps) {
  const tokenStyle: CSSProperties = {
    display: "flex",
    flexDirection: direction,
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
