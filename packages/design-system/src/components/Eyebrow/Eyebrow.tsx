import type { HTMLAttributes, ReactNode } from "react";

export interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

/**
 * Uppercase mono label placed above section headings.
 * Max 3 words. Never with emoji. Never as a decorative bullet.
 */
export function Eyebrow({ className, children, ...props }: EyebrowProps) {
  return (
    <p className={["bk-eyebrow", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </p>
  );
}
