import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../api";
import { IAudio } from "../api/contexts/interfaces";
import { capitalize } from "../utils";

export default function AudioDetail() {
  const { audioId } = useParams();
  const [audio, setAudio] = useState<IAudio | null>(null);

  useEffect(() => {
    getAudio();
  }, [audioId]);

  const getAudio = async () => {
    const response = await API.audios.getAudioById(audioId as string);
    if (response) {
      setAudio(response);
    }
  };

  return (
    <div className="container py-8 page-transition">
      {/* titulo */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{audio?.name}</h1>
      </div>

      {/* contenido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* seccion izquierda: descripcion y transcripcion */}
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-2">Descripción</h2>
            <p className="text-muted-foreground">{audio?.description}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Transcripción</h2>
            <p className="text-muted-foreground">{audio?.transcription}</p>
          </div>
        </div>

        {/* seccion derecha: video, keywords y categorias */}
        <div className="space-y-8">
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${audio?.youtubeId}`}
              title={audio?.name}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Plabras clave</h2>
            <div className="flex flex-wrap gap-2">
              {audio?.keywords?.split(",").map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 rounded-full bg-destructive text-primary-foreground text-sm"
                >
                  {capitalize(keyword)}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Categorías</h2>
            <div className="flex gap-2">
              {audio?.categories.map((category) => (
                <span
                  key={category.id}
                  className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm"
                >
                  {capitalize(category.name)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
