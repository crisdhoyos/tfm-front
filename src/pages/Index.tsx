import { AudioCard } from "@/components/AudioCard";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";
// import { AddAudioDialog } from "@/components/AddAudioDialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { AddAudioDialog } from "../components/AddAudioDialog";

// Temporary mock data
const mockAudios = [
  {
    id: "1",
    title: "Relaxing Piano Music",
    thumbnail: "https://i.ytimg.com/vi/77ZozI0rw7w/maxresdefault.jpg",
  },
  {
    id: "2",
    title: "Ambient Study Music",
    thumbnail: "https://i.ytimg.com/vi/sjkrrmBnpGE/maxresdefault.jpg",
  },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    console.log("Searching for:", query);

    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSearchQuery(query);
    setIsSearching(false);
  };

  const filteredAudios = mockAudios.filter((audio) =>
    audio.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    console.log("Theme toggled:", theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="container py-8 space-y-8 page-transition">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <h1 className="main-logo text-4xl font-bold">VozIndex</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="h-10 w-10"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <AddAudioDialog />
        </div>
      </div>

      <SearchBar onSearch={handleSearch} isSearching={isSearching} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isSearching ? (
          // Muestra los skeletons mientras busca
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-video rounded-lg" theme={theme} />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" theme={theme} />
                <Skeleton className="h-4 w-2/3" theme={theme} />
              </div>
            </div>
          ))
        ) : filteredAudios.length > 0 ? (
          filteredAudios.map((audio) => <AudioCard key={audio.id} {...audio} />)
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-lg text-muted-foreground">No videos found</p>
          </div>
        )}
      </div>
    </div>
  );
}
