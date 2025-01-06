import { AudioCard } from "@/components/AudioCard";
import { SearchBar } from "@/components/SearchBar";
import TagsSection from "@/components/TagsSection";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
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
  {
    id: "3",
    title: "Ambient Study Music",
    thumbnail: "https://i.ytimg.com/vi/sjkrrmBnpGE/maxresdefault.jpg",
  },
  {
    id: "4",
    title: "Ambient Study Music",
    thumbnail: "https://i.ytimg.com/vi/sjkrrmBnpGE/maxresdefault.jpg",
  },
  {
    id: "5",
    title: "Ambient Study Music",
    thumbnail: "https://i.ytimg.com/vi/sjkrrmBnpGE/maxresdefault.jpg",
  },
  {
    id: "6",
    title: "Ambient Study Music",
    thumbnail: "https://i.ytimg.com/vi/sjkrrmBnpGE/maxresdefault.jpg",
  },
  {
    id: "7",
    title: "Ambient Study Music",
    thumbnail: "https://i.ytimg.com/vi/sjkrrmBnpGE/maxresdefault.jpg",
  },
  {
    id: "8",
    title: "Ambient Study Music",
    thumbnail: "https://i.ytimg.com/vi/sjkrrmBnpGE/maxresdefault.jpg",
  },
  {
    id: "9",
    title: "Ambient Study Music",
    thumbnail: "https://i.ytimg.com/vi/sjkrrmBnpGE/maxresdefault.jpg",
  },
  {
    id: "10",
    title: "Ambient Study Music",
    thumbnail: "https://i.ytimg.com/vi/sjkrrmBnpGE/maxresdefault.jpg",
  },
];

const mockTags = [
  "Relaxing",
  "Ambient",
  "Piano",
  "Study",
  "Focus",
  "Sleep",
  "Meditation",
  "Nature",
  "Background",
  "Chill",
  "Classical",
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [_selectedCategory, setSelectedCategory] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { theme, setTheme } = useTheme();

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setCurrentPage(1);
    console.log("Searching for:", query);

    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSearchQuery(query);
    setIsSearching(false);
  };

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    console.log("Selected category:", category);

    // Aquí podrías agregar lógica adicional para filtrar los audios por categoría
  };

  const filteredAudios = mockAudios.filter((audio) =>
    audio.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedAudios = filteredAudios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredAudios.length / itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="container py-8 space-y-8 page-transition">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* logo */}
        <h1 className="main-logo h-12 text-5xl font-bold">VozIndex</h1>
        {/* barra de busqueda */}
        <SearchBar onSearch={handleSearch} isSearching={isSearching} />
        <div className="flex items-center gap-2">
          {/* boton de cambiar de tema */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="h-12 w-12"
          >
            {theme === "dark" ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </Button>
          {/* boton de agregar audio */}
          <AddAudioDialog />
        </div>
      </div>

      <TagsSection tags={mockTags} onCategorySelect={handleCategory} />

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
        ) : paginatedAudios.length > 0 ? (
          // Muestra los audios que coinciden con la busqueda
          paginatedAudios.map((audio) => (
            <AudioCard key={audio.id} {...audio} />
          ))
        ) : (
          // Muestra un mensaje si no encuentra resultados
          <div className="col-span-full text-center py-8">
            <p className="text-lg text-muted-foreground">No videos found</p>
          </div>
        )}
      </div>

      {filteredAudios.length > itemsPerPage && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant={index + 1 === currentPage ? "default" : "outline"}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
