import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Input({ label, hint, error, id, className, ...props }: InputProps) {
  const inputId = id ?? `bk-input-${Math.random().toString(36).slice(2, 9)}`;

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
      <input
        id={inputId}
        className={["bk-input", error ? "bk-input--error" : null].filter(Boolean).join(" ")}
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
