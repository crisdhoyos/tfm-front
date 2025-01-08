import { useState } from "react";
import { ICategory } from "../api/contexts/interfaces";
import { capitalize } from "../utils";

interface TagsSectionProps {
  tags: ICategory[];
  selectedCategory: ICategory | null;
  onCategorySelect: (category: ICategory | null) => void;
}

export default function TagsSection({
  tags,
  selectedCategory,
  onCategorySelect,
}: TagsSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedTags = showAll ? tags : tags.slice(0, 10);

  const handleTagClick = (tag: ICategory) => {
    const newSelectedTag = tag.id === selectedCategory?.id ? null : tag;
    onCategorySelect(newSelectedTag || null);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {displayedTags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => handleTagClick(tag)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedCategory?.id === tag.id
              ? "bg-accent text-white"
              : "bg-muted text-foreground"
          } hover:bg-secondary hover:text-white transition`}
        >
          {capitalize(tag.name)}
        </button>
      ))}
      {tags.length > 10 && (
        <button
          className="ml-2 text-sm text-primary underline hover:text-primary-hover"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}
