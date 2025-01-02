import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Headphones, Play } from "lucide-react";
import { Link } from "react-router-dom";

interface AudioCardProps {
  id: string;
  title: string;
  thumbnail: string;
}

export function AudioCard({ id, title, thumbnail }: AudioCardProps) {
  return (
    <Link to={`/audio/${id}`}>
      <Card className="audio-card group">
        <CardContent className="p-0 relative aspect-video">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Play className="w-12 h-12 text-white" />
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <div className="flex items-start gap-2">
            <Headphones className="w-4 h-4 mt-1 flex-shrink-0" />
            <h3 className="font-medium line-clamp-2">{title}</h3>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
