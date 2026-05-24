import type { HTMLAttributes, ReactNode } from "react";

export interface WorkLogEntry {
  timestamp: string;
  label?: string;
  children: ReactNode;
}

export interface WorkLogProps extends HTMLAttributes<HTMLElement> {
  entries: WorkLogEntry[];
}

/**
 * Timestamped entry list for case-study writeups.
 * Mono timestamp signals operational authority. Sans body for readability.
 */
export function WorkLog({ entries, className, ...props }: WorkLogProps) {
  return (
    <div className={["bk-worklog", className].filter(Boolean).join(" ")} {...props}>
      {entries.map((entry) => (
        <div key={entry.timestamp} className="bk-worklog__entry">
          <div className="bk-worklog__meta">
            <time className="bk-worklog__timestamp" dateTime={entry.timestamp}>
              {entry.timestamp}
            </time>
            {entry.label && <span className="bk-worklog__label">{entry.label}</span>}
          </div>
          <div className="bk-worklog__body">{entry.children}</div>
        </div>
      ))}
    </div>
  );
}
