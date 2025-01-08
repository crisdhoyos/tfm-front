import { AudioCard } from "@/components/AudioCard";
import { SearchBar } from "@/components/SearchBar";
import TagsSection from "@/components/TagsSection";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { API } from "../api";
import {
  IAudio,
  ICategory,
  IFilterAllAudios,
} from "../api/contexts/interfaces";
import { AddAudioDialog } from "../components/AddAudioDialog";

export default function Index() {
  // search
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // audios
  const [audios, setAudios] = useState<IAudio[]>([]);
  const [paginatedAudios, setPaginatedAudios] = useState<IAudio[]>([]);

  // categories
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  // paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 8;

  // theme
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    refreshAudios();
  }, []);

  useEffect(() => {
    handlePageChange(currentPage);
  }, [audios]);

  const getCategories = async () => {
    const response = await API.categories.getAllCategories();
    setCategories(response);
  };

  const getAudios = async (filters: IFilterAllAudios = {}) => {
    // Se simula una demora en la busqueda, para que tenga la misma experiencia que con el search
    await new Promise((resolve) => setTimeout(resolve, 200));

    const response = await API.audios.getAllAudios(filters);
    setTotalPages(Math.ceil(response.length / itemsPerPage));
    setCurrentPage(1);
    setAudios(response);
    setIsSearching(false);
  };

  const searchAudios = async (searchText: string) => {
    const response = await API.audios.searchAudios(searchText);
    setTotalPages(Math.ceil(response.length / itemsPerPage));
    setCurrentPage(1);
    setAudios(response);
    setIsSearching(false);
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSelectedCategory(null);
    if (query) {
      searchAudios(query);
    } else {
      getAudios();
    }
  };

  const handleCategory = (category: ICategory | null) => {
    setIsSearching(true);
    setSearchQuery("");
    setSelectedCategory(category);
    // Se filtran los audios por categoria
    getAudios({ ...(category ? { categoryId: category.id } : {}) });
  };

  const handlePageChange = (page: number) => {
    setPaginatedAudios(
      audios.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    );
    setCurrentPage(page);
  };

  const refreshAudios = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    getAudios();
    getCategories();
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
        <SearchBar
          inputValue={searchQuery}
          setInputValue={setSearchQuery}
          onSearch={handleSearch}
          isSearching={isSearching}
        />
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
          <AddAudioDialog refreshAudios={refreshAudios} />
        </div>
      </div>

      <TagsSection
        tags={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategory}
      />

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
            <p className="text-lg text-muted-foreground">
              No se encontraron audios
            </p>
          </div>
        )}
      </div>

      {audios.length > itemsPerPage && (
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
