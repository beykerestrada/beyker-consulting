import type { LucideIcon } from "lucide-react";

type IconSize = "sm" | "md" | "lg";

const sizeMap: Record<IconSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};

export interface IconProps {
  icon: LucideIcon;
  size?: IconSize;
  label?: string;
  className?: string;
}

export function Icon({ icon: LucideIconComponent, size = "md", label, className }: IconProps) {
  const px = sizeMap[size];

  return (
    <LucideIconComponent
      width={px}
      height={px}
      strokeWidth={1.5}
      aria-hidden={label === undefined ? true : undefined}
      aria-label={label}
      role={label !== undefined ? "img" : undefined}
      className={className}
    />
  );
}
