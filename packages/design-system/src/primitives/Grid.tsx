import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

type SpaceToken = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
type ColCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  columns?: ColCount;
  gap?: SpaceToken;
  gapX?: SpaceToken;
  gapY?: SpaceToken;
  children?: ReactNode;
}

export interface GridItemProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  span?: ColCount;
  children?: ReactNode;
}

export function Grid({
  as: Tag = "div",
  columns = 12,
  gap,
  gapX,
  gapY,
  style,
  className,
  children,
  ...props
}: GridProps) {
  const tokenStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: gap !== undefined ? `var(--bk-space-${gap})` : undefined,
    columnGap: gapX !== undefined ? `var(--bk-space-${gapX})` : undefined,
    rowGap: gapY !== undefined ? `var(--bk-space-${gapY})` : undefined,
    ...style,
  };

  return (
    <Tag className={className} style={tokenStyle} {...props}>
      {children}
    </Tag>
  );
}

export function GridItem({
  as: Tag = "div",
  span,
  style,
  className,
  children,
  ...props
}: GridItemProps) {
  const tokenStyle: CSSProperties = {
    gridColumn: span !== undefined ? `span ${span}` : undefined,
    ...style,
  };

  return (
    <Tag className={className} style={tokenStyle} {...props}>
      {children}
    </Tag>
  );
}
