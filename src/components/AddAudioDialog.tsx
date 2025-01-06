import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toast, ToastContainer } from "@/components/ui/toast";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";

export function AddAudioDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<
    { id: number; message: string; description?: string; variant?: string }[]
  >([]);

  const addToast = () => {
    const newToast = {
      id: Date.now(),
      message: "New Notification",
      description: "This is a toast message",
      variant: "error",
    };
    setToasts([...toasts, newToast]);
    setTimeout(() => removeToast(newToast.id), 4000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we'll add the logic to process the YouTube URL
    addToast();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    // setUrl("");
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="gap-2">
        <Plus className="w-4 h-4" />
        Add Audio
      </Button>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DialogHeader>
          <DialogTitle>Add new audio</DialogTitle>
        </DialogHeader>

        {!isLoading ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Enter YouTube URL..."
              className="bg-input-bg text-input-text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Add Audio
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <ScaleLoader color="#187ff5" />
            <p className="text-center text-sm text-card-foreground">
              Cargando...
            </p>
          </div>
        )}
      </Dialog>

      <ToastContainer>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            description={toast.description}
            variant={toast.variant as "default" | "error"}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </>
  );
}
