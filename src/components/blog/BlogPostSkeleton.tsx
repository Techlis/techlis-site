import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface BlogPostSkeletonProps {
  className?: string
}

export function BlogPostSkeleton({ className }: BlogPostSkeletonProps) {
  return (
    <Card className={cn("animate-pulse", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
        </div>

        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-4/5"></div>
          <div className="h-5 bg-gray-200 rounded w-3/5"></div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
      </CardFooter>
    </Card>
  )
}

interface BlogSkeletonGridProps {
  count?: number
  className?: string
}

export function BlogSkeletonGrid({
  count = 6,
  className,
}: BlogSkeletonGridProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <BlogPostSkeleton key={index} />
      ))}
    </div>
  )
}
