import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Temporary mock data
const mockAudio = {
  id: "1",
  title: "Relaxing Piano Music",
  description: "Beautiful piano music for relaxation and focus.",
  keywords: ["piano", "relaxing", "music", "focus"],
  transcription: "This is a sample transcription of the audio content...",
  categories: ["Music", "Relaxation"],
  youtubeId: "77ZozI0rw7w",
};

export default function AudioDetail() {
  const { id } = useParams();

  return (
    <div className="container py-8 page-transition">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{mockAudio.title}</h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section: Description and Transcription */}
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{mockAudio.description}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Transcription</h2>
            <p className="text-muted-foreground">{mockAudio.transcription}</p>
          </div>
        </div>

        {/* Right Section: Video, Keywords, and Categories */}
        <div className="space-y-8">
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${mockAudio.youtubeId}`}
              title={mockAudio.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Keywords</h2>
            <div className="flex flex-wrap gap-2">
              {mockAudio.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 rounded-full bg-destructive text-primary-foreground text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Categories</h2>
            <div className="flex gap-2">
              {mockAudio.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
