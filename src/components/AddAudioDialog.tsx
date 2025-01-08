import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  IToast,
  Toast,
  ToastContainer,
  ToastVariant,
} from "@/components/ui/toast";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { API } from "../api";

interface AddAudioDialogProps {
  refreshAudios: () => void;
}

export function AddAudioDialog({ refreshAudios }: AddAudioDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<IToast[]>([]);

  const addToast = (data: IToast) => {
    setToasts([...toasts, data]);
    setTimeout(() => removeToast(data.id), 8000);
  };

  const removeToast = (id?: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const indexVideo = async (youtubeUrl: string) => {
    try {
      const response = await API.youtube.indexVideo(youtubeUrl);
      console.log(response);
      setIsLoading(false);
      setUrl("");
      if (response) {
        addToast({
          id: Date.now(),
          message: "Audio agregado",
          description:
            "Se agregó el audio y se realizó la indexación correctamente",
          variant: ToastVariant.DEFAULT,
        });
        setIsOpen(false);
        refreshAudios();
      } else {
        addToast({
          id: Date.now(),
          message: "Error al agregar el audio",
          description: "Hubo un error al agregar el audio, intente de nuevo",
          variant: ToastVariant.ERROR,
        });
      }
    } catch (error) {
      setIsLoading(false);
      setUrl("");
      addToast({
        id: Date.now(),
        message: "Error al agregar el audio",
        description: "Hubo un error al agregar el audio, intente de nuevo",
        variant: ToastVariant.ERROR,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    indexVideo(url);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="gap-2">
        <Plus className="w-4 h-4" />
        Agregar audio
      </Button>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DialogHeader>
          <DialogTitle>Agregar nuevo audio para indexar</DialogTitle>
        </DialogHeader>

        {!isLoading ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Ingrese la url de YouTube..."
              className="bg-input-bg text-input-text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Agregar
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
            variant={toast.variant}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </>
  );
}
