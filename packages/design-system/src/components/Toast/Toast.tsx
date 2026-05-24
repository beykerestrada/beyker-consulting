import * as RadixToast from "@radix-ui/react-toast";
import { XIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface ToastProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
}

export function Toast({
  title,
  description,
  action,
  open,
  onOpenChange,
  duration = 4000,
}: ToastProps) {
  return (
    <RadixToast.Root
      className="bk-toast"
      {...(open !== undefined && { open })}
      {...(onOpenChange !== undefined && { onOpenChange })}
      duration={duration}
    >
      <div className="bk-toast__content">
        {title && <RadixToast.Title className="bk-toast__title">{title}</RadixToast.Title>}
        {description && (
          <RadixToast.Description className="bk-toast__description">
            {description}
          </RadixToast.Description>
        )}
        {action && <div className="bk-toast__action">{action}</div>}
      </div>
      <RadixToast.Close className="bk-toast__close" aria-label="Close">
        <XIcon width={14} height={14} strokeWidth={1.5} />
      </RadixToast.Close>
    </RadixToast.Root>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <RadixToast.Provider swipeDirection="right">
      {children}
      <RadixToast.Viewport className="bk-toast__viewport" />
    </RadixToast.Provider>
  );
}
