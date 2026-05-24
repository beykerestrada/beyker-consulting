import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  label?: string;
  hint?: string;
}

export function Checkbox({ label, hint, id, className, ...props }: CheckboxProps) {
  const checkId = id ?? `bk-checkbox-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className={["bk-checkbox-wrapper", className].filter(Boolean).join(" ")}>
      <div className="bk-checkbox-row">
        <RadixCheckbox.Root id={checkId} className="bk-checkbox" {...props}>
          <RadixCheckbox.Indicator className="bk-checkbox__indicator">
            <CheckIcon width={12} height={12} strokeWidth={2.5} />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label && (
          <label htmlFor={checkId} className="bk-checkbox__label">
            {label}
          </label>
        )}
      </div>
      {hint && <p className="bk-field__hint bk-field__hint--indented">{hint}</p>}
    </div>
  );
}
