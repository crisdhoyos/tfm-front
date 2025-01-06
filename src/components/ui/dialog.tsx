import {
  Dialog as HeadlessDialog,
  DialogPanel as HeadlessDialogPanel,
  DialogTitle as HeadlessDialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { X } from "lucide-react";
import { Fragment, ReactNode } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Dialog({ isOpen, onClose, children }: DialogProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-40" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </TransitionChild>

        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 w-96 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialogPanel className="w-full max-w-md transform overflow-hidden rounded-lg bg-bg-color p-6 text-left align-middle shadow-xl transition-all">
                {children}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-md p-1 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                >
                  <X className="h-5 w-5" />
                </button>
              </HeadlessDialogPanel>
            </TransitionChild>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return <div className="text-lg font-semibold">{children}</div>;
}

export function DialogFooter({ children }: { children: ReactNode }) {
  return <div className="mt-4 flex justify-end space-x-2">{children}</div>;
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return (
    <HeadlessDialogTitle className="text-card-foreground p-3 font-medium">
      {children}
    </HeadlessDialogTitle>
  );
}
