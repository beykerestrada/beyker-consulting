import type { HTMLAttributes, ReactNode } from "react";

export interface AsideProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  children?: ReactNode;
}

/**
 * Marginalia-style note. Mono label, offset from the main prose flow.
 * Use for technical asides, caveats, constraints.
 */
export function Aside({ label = "Note", className, children, ...props }: AsideProps) {
  return (
    <aside className={["bk-aside", className].filter(Boolean).join(" ")} {...props}>
      <span className="bk-aside__label">{label}</span>
      <div className="bk-aside__body">{children}</div>
    </aside>
  );
}
