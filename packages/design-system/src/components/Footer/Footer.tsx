import type { HTMLAttributes, ReactNode } from "react";

export interface FooterColumn {
  label: string;
  links: Array<{ label: string; href: string }>;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  columns?: FooterColumn[];
  legal?: ReactNode;
}

export function Footer({ columns = [], legal, className, ...props }: FooterProps) {
  return (
    <footer className={["bk-footer", className].filter(Boolean).join(" ")} {...props}>
      <div className="bk-footer__inner">
        {columns.length > 0 && (
          <div className="bk-footer__columns">
            {columns.map((col) => (
              <div key={col.label} className="bk-footer__column">
                <p className="bk-footer__col-label">{col.label}</p>
                <ul className="bk-footer__col-links">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="bk-footer__link">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {legal && <div className="bk-footer__legal">{legal}</div>}
      </div>
    </footer>
  );
}
