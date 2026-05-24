import type { HTMLAttributes, ReactNode } from "react";

export interface SpecItem {
  term: string;
  detail: ReactNode;
}

export interface SpecsheetProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  items: SpecItem[];
}

/**
 * Definition-list styled as a technical spec sheet.
 * The document-style alternative to feature grids.
 * Terms in mono, definitions in sans body.
 */
export function Specsheet({ title, items, className, ...props }: SpecsheetProps) {
  return (
    <div className={["bk-specsheet", className].filter(Boolean).join(" ")} {...props}>
      {title && <p className="bk-specsheet__title">{title}</p>}
      <dl className="bk-specsheet__list">
        {items.map((item) => (
          <div key={item.term} className="bk-specsheet__row">
            <dt className="bk-specsheet__term">{item.term}</dt>
            <dd className="bk-specsheet__detail">{item.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
