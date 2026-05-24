import * as RadixSelect from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectGroup {
  label?: string;
  options: SelectOption[];
}

export interface SelectProps {
  label?: string;
  hint?: string;
  error?: string;
  id?: string;
  placeholder?: string;
  options?: SelectOption[];
  groups?: SelectGroup[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Select({
  label,
  hint,
  error,
  id,
  placeholder = "Select an option",
  options,
  groups,
  value,
  defaultValue,
  onValueChange,
  disabled,
  className,
}: SelectProps) {
  const inputId = id ?? `bk-select-${Math.random().toString(36).slice(2, 9)}`;
  const items = options ? [{ options }] : (groups ?? []);

  return (
    <div
      className={["bk-field", error ? "bk-field--error" : null, className]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <label className="bk-field__label" htmlFor={inputId} id={`${inputId}-label`}>
          {label}
        </label>
      )}
      <RadixSelect.Root
        {...(value !== undefined && { value })}
        {...(defaultValue !== undefined && { defaultValue })}
        {...(onValueChange !== undefined && { onValueChange })}
        {...(disabled !== undefined && { disabled })}
      >
        <RadixSelect.Trigger
          className={["bk-select", error ? "bk-select--error" : null].filter(Boolean).join(" ")}
          aria-labelledby={label ? `${inputId}-label` : undefined}
          aria-invalid={error ? true : undefined}
          id={inputId}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className="bk-select__icon">
            <ChevronDownIcon width={16} height={16} strokeWidth={1.5} />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content className="bk-select__content" position="popper" sideOffset={4}>
            <RadixSelect.ScrollUpButton className="bk-select__scroll-btn">
              <ChevronUpIcon width={16} height={16} strokeWidth={1.5} />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport className="bk-select__viewport">
              {items.map((group, gi) => (
                <RadixSelect.Group key={group.label ?? gi}>
                  {group.label && (
                    <RadixSelect.Label className="bk-select__group-label">
                      {group.label}
                    </RadixSelect.Label>
                  )}
                  {group.options.map((opt) => (
                    <RadixSelect.Item
                      key={opt.value}
                      value={opt.value}
                      {...(opt.disabled !== undefined && { disabled: opt.disabled })}
                      className="bk-select__item"
                    >
                      <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                      <RadixSelect.ItemIndicator className="bk-select__item-indicator">
                        <CheckIcon width={14} height={14} strokeWidth={1.5} />
                      </RadixSelect.ItemIndicator>
                    </RadixSelect.Item>
                  ))}
                </RadixSelect.Group>
              ))}
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton className="bk-select__scroll-btn">
              <ChevronDownIcon width={16} height={16} strokeWidth={1.5} />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>

      {(hint || error) && (
        <p className={error ? "bk-field__error" : "bk-field__hint"}>{error ?? hint}</p>
      )}
    </div>
  );
}
