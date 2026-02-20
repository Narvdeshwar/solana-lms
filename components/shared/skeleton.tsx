import { cn } from '@/lib/utils';

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-md bg-muted',
                className
            )}
        />
    );
}

export function CourseCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-lg border bg-card">
            {/* Cover Image Skeleton */}
            <Skeleton className="aspect-video w-full" />

            <div className="p-6 space-y-4">
                {/* Title */}
                <Skeleton className="h-6 w-3/4" />

                {/* Description */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Stats */}
                <div className="flex gap-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                </div>

                {/* Button */}
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    );
}

export function CourseGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <CourseCardSkeleton key={i} />
            ))}
        </div>
    );
}
