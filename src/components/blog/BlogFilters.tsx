import { Filter, X } from "lucide-react"
import { Button, Badge } from "@/components/ui"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/types"

interface BlogFiltersProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  postCounts?: Record<string, number>
  className?: string
}

const categoryLabels: Record<BlogPost["category"] | "all", string> = {
  all: "All Posts",
  "ai-ml": "AI & ML",
  "software-dev": "Software Dev",
  "web-mobile": "Web & Mobile",
  "cloud-devops": "Cloud & DevOps",
}

const categoryColors: Record<
  BlogPost["category"] | "all",
  "default" | "secondary" | "luxury" | "outline"
> = {
  all: "default",
  "ai-ml": "luxury",
  "software-dev": "default",
  "web-mobile": "secondary",
  "cloud-devops": "outline",
}

export function BlogFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  postCounts = {},
  className,
}: BlogFiltersProps) {
  const allCategories = ["all", ...categories]

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category)
  }

  const handleClearFilters = () => {
    onCategoryChange("all")
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filter Posts</h3>
        </div>

        {selectedCategory !== "all" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {allCategories.map((category) => {
          const isSelected = selectedCategory === category
          const count = postCounts[category] || 0
          const label =
            categoryLabels[category as keyof typeof categoryLabels] || category

          return (
            <Button
              key={category}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(category)}
              className={cn(
                "transition-all duration-200 hover:scale-105",
                isSelected && "shadow-lg"
              )}
            >
              <span>{label}</span>
              {count > 0 && (
                <Badge
                  variant={isSelected ? "secondary" : "outline"}
                  className="ml-2 text-xs px-1.5 py-0.5 min-w-[20px] h-5"
                >
                  {count}
                </Badge>
              )}
            </Button>
          )
        })}
      </div>

      {/* Active Filter Display */}
      {selectedCategory !== "all" && (
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
          <span className="text-sm text-gray-600">Showing posts in:</span>
          <Badge
            variant={
              categoryColors[selectedCategory as keyof typeof categoryColors]
            }
            className="font-medium"
          >
            {categoryLabels[selectedCategory as keyof typeof categoryLabels]}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="ml-auto text-xs text-gray-500 hover:text-gray-700 p-1 h-auto"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}
    </div>
  )
}
