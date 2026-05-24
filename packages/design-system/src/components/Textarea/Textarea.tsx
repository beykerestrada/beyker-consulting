import type { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Textarea({ label, hint, error, id, className, ...props }: TextareaProps) {
  const inputId = id ?? `bk-textarea-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div
      className={["bk-field", error ? "bk-field--error" : null, className]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <label className="bk-field__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={["bk-textarea", error ? "bk-textarea--error" : null].filter(Boolean).join(" ")}
        aria-describedby={hint || error ? `${inputId}-hint` : undefined}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {(hint || error) && (
        <p id={`${inputId}-hint`} className={error ? "bk-field__error" : "bk-field__hint"}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
