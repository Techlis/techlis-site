import * as React from "react"
import { ExternalLink, Calendar, Tag } from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { handleKeyboardNavigation } from "@/lib/accessibility"
import type { BlogPost } from "@/types"

interface BlogPostCardProps {
  post: BlogPost
  onReadMore: (post: BlogPost) => void
  className?: string
}

const categoryLabels: Record<BlogPost["category"], string> = {
  "ai-ml": "AI & ML",
  "software-dev": "Software Dev",
  "web-mobile": "Web & Mobile",
  "cloud-devops": "Cloud & DevOps",
}

const categoryColors: Record<
  BlogPost["category"],
  "default" | "secondary" | "luxury" | "outline"
> = {
  "ai-ml": "luxury",
  "software-dev": "default",
  "web-mobile": "secondary",
  "cloud-devops": "outline",
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return "Unknown date"
  }
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}

export function BlogPostCard({
  post,
  onReadMore,
  className,
}: BlogPostCardProps) {
  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault()
    onReadMore(post)
  }

  const handleExternalLink = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(post.link, "_blank", "noopener,noreferrer")
  }

  const handleCardKeyDown = (event: React.KeyboardEvent) => {
    handleKeyboardNavigation(event, () => onReadMore(post))
  }

  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-xl sm:hover:-translate-y-1 touch-target focus-visible-ring",
        post.isArchived && "opacity-75 border-gray-300",
        className
      )}
      onClick={handleReadMore}
      onKeyDown={handleCardKeyDown}
      tabIndex={0}
      role="article"
      aria-labelledby={`blog-post-title-${post.id}`}
    >
      <CardHeader className="pb-2 sm:pb-3 p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2">
          <Badge
            variant={categoryColors[post.category]}
            className="shrink-0 text-xs px-2 py-1"
          >
            <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
            {categoryLabels[post.category]}
          </Badge>
          {post.isArchived && (
            <Badge variant="outline" className="text-xs px-2 py-1">
              Archived
            </Badge>
          )}
        </div>

        <CardTitle
          id={`blog-post-title-${post.id}`}
          className="text-base sm:text-lg leading-tight group-hover:text-primary-600 transition-colors"
        >
          {truncateText(post.title, 80)}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-3 sm:pb-4 p-4 sm:p-6 pt-0">
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
          {truncateText(post.description, 150)}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(post.pubDate)}</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"></span>
            <span className="font-medium">{post.source}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 p-4 sm:p-6 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReadMore}
          className="text-primary-600 hover:text-primary-700 p-0 h-auto font-medium text-sm touch-target"
        >
          Read More
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleExternalLink}
          className="text-gray-500 hover:text-gray-700 p-2 h-auto touch-target"
          aria-label={`Open ${post.title} in new tab`}
        >
          <ExternalLink className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
