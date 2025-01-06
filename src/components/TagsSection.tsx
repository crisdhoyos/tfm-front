import { useState } from "react";

interface TagsSectionProps {
  tags: string[];
  onCategorySelect: (category: string) => void;
}

export default function TagsSection({
  tags,
  onCategorySelect,
}: TagsSectionProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedTags = showAll ? tags : tags.slice(0, 10);

  const handleTagClick = (tag: string) => {
    const newSelectedTag = tag === selectedTag ? null : tag;
    setSelectedTag(newSelectedTag);
    onCategorySelect(newSelectedTag || "");
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {displayedTags.map((tag, index) => (
        <button
          key={index}
          onClick={() => handleTagClick(tag)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedTag === tag
              ? "bg-accent text-white"
              : "bg-muted text-foreground"
          } hover:bg-secondary hover:text-white transition`}
        >
          {tag}
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
