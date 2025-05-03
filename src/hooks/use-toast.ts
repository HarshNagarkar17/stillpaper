"use client";

import { toast, type ToastT } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function useToast() {
  const showToast = (
    type: ToastType,
    title: string,
    options?: ToastOptions
  ) => {
    const { description, duration, action } = options || {};

    const toastOptions: Partial<ToastT> = {
      description,
      duration,
      action: action
        ? {
            label: action.label,
            onClick: action.onClick,
          }
        : undefined,
    };

    switch (type) {
      case "success":
        toast.success(title, toastOptions);
        break;
      case "error":
        toast.error(title, toastOptions);
        break;
      case "warning":
        toast.warning(title, toastOptions);
        break;
      case "info":
      default:
        toast.info(title, toastOptions);
        break;
    }
  };

  return {
    success: (title: string, options?: ToastOptions) =>
      showToast("success", title, options),
    error: (title: string, options?: ToastOptions) =>
      showToast("error", title, options),
    warning: (title: string, options?: ToastOptions) =>
      showToast("warning", title, options),
    info: (title: string, options?: ToastOptions) =>
      showToast("info", title, options),
  };
}
