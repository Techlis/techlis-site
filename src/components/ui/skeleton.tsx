import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse rounded-md bg-gray-200", className)} />
  )
}

interface TextSkeletonProps {
  lines?: number
  className?: string
}

export function TextSkeleton({ lines = 3, className }: TextSkeletonProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn("h-4", index === lines - 1 ? "w-3/4" : "w-full")}
        />
      ))}
    </div>
  )
}

interface CardSkeletonProps {
  className?: string
  showImage?: boolean
  showFooter?: boolean
}

export function CardSkeleton({
  className,
  showImage = false,
  showFooter = true,
}: CardSkeletonProps) {
  return (
    <div className={cn("border rounded-lg p-6 space-y-4", className)}>
      {showImage && <Skeleton className="h-48 w-full" />}

      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {showFooter && (
        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      )}
    </div>
  )
}

interface ServiceCardSkeletonProps {
  className?: string
}

export function ServiceCardSkeleton({ className }: ServiceCardSkeletonProps) {
  return (
    <div className={cn("border rounded-xl p-6 space-y-4", className)}>
      {/* Icon */}
      <Skeleton className="h-12 w-12 rounded-lg" />

      {/* Title */}
      <Skeleton className="h-6 w-3/4" />

      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      {/* Features list */}
      <div className="space-y-2 pt-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 pt-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-6 w-16 rounded-full" />
        ))}
      </div>

      {/* Pricing */}
      <div className="pt-4 border-t">
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  )
}

interface ServiceGridSkeletonProps {
  count?: number
  className?: string
}

export function ServiceGridSkeleton({
  count = 6,
  className,
}: ServiceGridSkeletonProps) {
  return (
    <div
      data-testid="service-grid-skeleton"
      className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}
    >
      {Array.from({ length: count }).map((_, index) => (
        <ServiceCardSkeleton key={index} />
      ))}
    </div>
  )
}

interface AboutSectionSkeletonProps {
  className?: string
}

export function AboutSectionSkeleton({ className }: AboutSectionSkeletonProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <Skeleton className="h-8 w-64 mx-auto" />
        <div className="space-y-2 max-w-2xl mx-auto">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mx-auto" />
        </div>
      </div>

      {/* Content cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>

      {/* Team section */}
      <div className="space-y-6">
        <Skeleton className="h-6 w-48 mx-auto" />
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <TextSkeleton lines={3} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
