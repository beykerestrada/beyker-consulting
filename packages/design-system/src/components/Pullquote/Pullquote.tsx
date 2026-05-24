import type { HTMLAttributes, ReactNode } from "react";

export interface PullquoteProps extends HTMLAttributes<HTMLElement> {
  attribution?: string;
  attributionRole?: string;
  children?: ReactNode;
}

/**
 * Large-format quote with attribution.
 * Left rule in signal primary. Left-aligned, never centered.
 */
export function Pullquote({
  attribution,
  attributionRole,
  className,
  children,
  ...props
}: PullquoteProps) {
  return (
    <figure className={["bk-pullquote", className].filter(Boolean).join(" ")} {...props}>
      <blockquote className="bk-pullquote__quote">{children}</blockquote>
      {attribution && (
        <figcaption className="bk-pullquote__attribution">
          <span className="bk-pullquote__name">{attribution}</span>
          {attributionRole && <span className="bk-pullquote__role">{attributionRole}</span>}
        </figcaption>
      )}
    </figure>
  );
}
