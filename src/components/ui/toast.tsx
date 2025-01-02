import { X } from "lucide-react";
import { ReactNode } from "react";

interface ToastProps {
  message: string;
  description?: string;
  variant?: "default" | "error";
  onClose?: () => void;
}

export function Toast({
  message,
  description,
  variant = "default",
  onClose,
}: ToastProps) {
  const baseClasses = `
    flex items-center justify-between w-full max-w-sm p-4 rounded-md shadow-lg 
    transition-transform transform-gpu duration-300 ease-in-out
  `;

  const variantClasses =
    variant === "error"
      ? "bg-error text-white border border-white"
      : "bg-success text-white border border-white";

  return (
    <div className={`${baseClasses} ${variantClasses} animate-toast`}>
      <div className="flex flex-col">
        <strong className="text-sm font-semibold">{message}</strong>
        {description && <p className="text-xs opacity-80">{description}</p>}
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <X className="h-5 w-5" color="white" />
      </button>
    </div>
  );
}

export function ToastContainer({ children }: { children: ReactNode }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2">
      {children}
    </div>
  );
}
