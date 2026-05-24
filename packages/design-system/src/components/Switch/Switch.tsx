import * as RadixSwitch from "@radix-ui/react-switch";
import type { ComponentPropsWithoutRef } from "react";

export interface SwitchProps extends ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  label?: string;
  hint?: string;
}

export function Switch({ label, hint, id, className, ...props }: SwitchProps) {
  const switchId = id ?? `bk-switch-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className={["bk-switch-wrapper", className].filter(Boolean).join(" ")}>
      <div className="bk-switch-row">
        <RadixSwitch.Root id={switchId} className="bk-switch" {...props}>
          <RadixSwitch.Thumb className="bk-switch__thumb" />
        </RadixSwitch.Root>
        {label && (
          <label htmlFor={switchId} className="bk-switch__label">
            {label}
          </label>
        )}
      </div>
      {hint && <p className="bk-field__hint bk-field__hint--indented">{hint}</p>}
    </div>
  );
}
