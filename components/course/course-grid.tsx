import { CourseCard } from './course-card';
import { EmptyState } from '@/components/shared/empty-state';
import { BookOpen } from 'lucide-react';
import type { Course } from '@/types';
import { cn } from '@/lib/utils';

interface CourseGridProps {
    courses: Course[];
    progress?: Record<string, number>;
    showProgress?: boolean;
    emptyMessage?: string;
    className?: string;
}

export function CourseGrid({
    courses,
    progress,
    showProgress = false,
    emptyMessage = 'No courses found',
    className,
}: CourseGridProps) {
    if (courses.length === 0) {
        return (
            <EmptyState
                icon={BookOpen}
                title={emptyMessage}
                description="Check back later for new courses or adjust your filters"
            />
        );
    }

    return (
        <div
            className={cn(
                'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
                className
            )}
        >
            {courses.map((course) => (
                <CourseCard
                    key={course.id}
                    course={course}
                    progress={progress?.[course.id]}
                    showProgress={showProgress}
                />
            ))}
        </div>
    );
}
