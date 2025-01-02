import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export function SearchBar({ onSearch, isSearching }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    onSearch(query);
  };

  const handleClear = () => {
    setInputValue("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
      <div className="relative flex group focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 rounded-md">
        <div className="relative flex-1">
          {inputValue ? (
            <button
              type="button"
              onClick={handleClear}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          )}
          <Input
            name="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="pl-10 rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
            placeholder="Search by title, keywords, or transcription..."
          />
        </div>
        <Button 
          type="submit" 
          disabled={isSearching}
          className="h-12 rounded-l-none border-l-0 min-w-[100px] focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {isSearching ? (
            <span className="animate-spin">⏳</span>
          ) : (
            'Search'
          )}
        </Button>
      </div>
    </form>
  );
}