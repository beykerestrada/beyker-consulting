import type { HTMLAttributes, ReactNode } from "react";

export interface LedeProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

/**
 * Opening paragraph. body-lg, max 65ch.
 * Sets the frame for the section that follows.
 */
export function Lede({ className, children, ...props }: LedeProps) {
  return (
    <p className={["bk-lede", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </p>
  );
}
