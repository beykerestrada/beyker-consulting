import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

type SpaceToken = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
type RadiusToken = "none" | "sm" | "md" | "lg" | "pill";

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  padding?: SpaceToken;
  paddingX?: SpaceToken;
  paddingY?: SpaceToken;
  margin?: SpaceToken;
  marginX?: SpaceToken;
  marginY?: SpaceToken;
  radius?: RadiusToken;
  children?: ReactNode;
}

function spaceVar(token: SpaceToken | undefined): string | undefined {
  return token !== undefined ? `var(--bk-space-${token})` : undefined;
}

function radiusVar(token: RadiusToken | undefined): string | undefined {
  return token !== undefined ? `var(--bk-radius-${token})` : undefined;
}

export function Box({
  as: Tag = "div",
  padding,
  paddingX,
  paddingY,
  margin,
  marginX,
  marginY,
  radius,
  style,
  className,
  children,
  ...props
}: BoxProps) {
  const tokenStyle: CSSProperties = {
    padding: spaceVar(padding),
    paddingInline: spaceVar(paddingX),
    paddingBlock: spaceVar(paddingY),
    margin: spaceVar(margin),
    marginInline: spaceVar(marginX),
    marginBlock: spaceVar(marginY),
    borderRadius: radiusVar(radius),
    ...style,
  };

  return (
    <Tag className={className} style={tokenStyle} {...props}>
      {children}
    </Tag>
  );
}
