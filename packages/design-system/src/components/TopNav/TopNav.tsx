"use client";

import { useEffect, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";

export interface TopNavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface TopNavProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  links?: TopNavLink[];
  actions?: ReactNode;
}

export function TopNav({ logo, links = [], actions, className, ...props }: TopNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const classes = ["bk-topnav", scrolled ? "bk-topnav--scrolled" : null, className]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classes} {...props}>
      <div className="bk-topnav__inner">
        {logo && <div className="bk-topnav__logo">{logo}</div>}
        {links.length > 0 && (
          <nav className="bk-topnav__nav" aria-label="Main navigation">
            <ul className="bk-topnav__links">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={["bk-topnav__link", link.active ? "bk-topnav__link--active" : null]
                      .filter(Boolean)
                      .join(" ")}
                    aria-current={link.active ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {actions && <div className="bk-topnav__actions">{actions}</div>}
      </div>
    </header>
  );
}
