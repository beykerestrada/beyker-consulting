import type { HTMLAttributes, ReactNode } from "react";

export interface ManifestoProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  children?: ReactNode;
}

/**
 * Full-width statement block. display-lg type, asymmetric padding.
 * For declarative brand statements — not for body copy.
 */
export function Manifesto({ eyebrow, className, children, ...props }: ManifestoProps) {
  return (
    <div className={["bk-manifesto", className].filter(Boolean).join(" ")} {...props}>
      {eyebrow && <p className="bk-manifesto__eyebrow">{eyebrow}</p>}
      <div className="bk-manifesto__statement">{children}</div>
    </div>
  );
}
