import * as RadixRadio from "@radix-ui/react-radio-group";
import type { ComponentPropsWithoutRef } from "react";

export interface RadioOption {
  value: string;
  label: string;
  hint?: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends ComponentPropsWithoutRef<typeof RadixRadio.Root> {
  legend?: string;
  options: RadioOption[];
}

export function RadioGroup({ legend, options, className, ...props }: RadioGroupProps) {
  return (
    <fieldset className={["bk-radio-group", className].filter(Boolean).join(" ")}>
      {legend && <legend className="bk-radio-group__legend">{legend}</legend>}
      <RadixRadio.Root className="bk-radio-group__items" {...props}>
        {options.map((opt) => (
          <div key={opt.value} className="bk-radio-row">
            <RadixRadio.Item
              value={opt.value}
              disabled={opt.disabled}
              id={`bk-radio-${opt.value}`}
              className="bk-radio"
            >
              <RadixRadio.Indicator className="bk-radio__indicator" />
            </RadixRadio.Item>
            <div className="bk-radio__content">
              <label htmlFor={`bk-radio-${opt.value}`} className="bk-radio__label">
                {opt.label}
              </label>
              {opt.hint && <p className="bk-field__hint">{opt.hint}</p>}
            </div>
          </div>
        ))}
      </RadixRadio.Root>
    </fieldset>
  );
}
