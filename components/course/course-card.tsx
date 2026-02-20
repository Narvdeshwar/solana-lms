import Link from 'next/link';
import Image from 'next/image';
import { Clock, BookOpen, Zap } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/shared/progress-bar';
import { DifficultyBadge } from '@/components/shared/difficulty-badge';
import { formatDuration, formatNumber, calculateTotalCourseXP } from '@/lib/solana/helpers';
import { ROUTES } from '@/lib/constants';
import type { Course } from '@/types';
import { cn } from '@/lib/utils';

interface CourseCardProps {
    course: Course;
    progress?: number;
    showProgress?: boolean;
    className?: string;
}

export function CourseCard({
    course,
    progress,
    showProgress = false,
    className,
}: CourseCardProps) {
    const totalXp = calculateTotalCourseXP(course.xpPerLesson, course.lessonCount);
    const isEnrolled = progress !== undefined;

    return (
        <Card className={cn('group overflow-hidden transition-all hover:shadow-lg', className)}>
            {/* Cover Image */}
            <div className="relative aspect-video overflow-hidden bg-muted">
                {course.coverImage ? (
                    <Image
                        src={course.coverImage}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-solana-purple/20 to-solana-green/20">
                        <BookOpen className="h-12 w-12 text-muted-foreground" />
                    </div>
                )}
                <div className="absolute right-2 top-2">
                    <DifficultyBadge difficulty={course.difficulty} />
                </div>
            </div>

            <CardHeader>
                <h3 className="line-clamp-2 text-xl font-semibold group-hover:text-primary">
                    {course.title}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {course.description}
                </p>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Course Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatDuration(course.duration * 60)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.lessonCount} lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span>{formatNumber(totalXp)} XP</span>
                    </div>
                </div>

                {/* Progress Bar */}
                {showProgress && isEnrolled && (
                    <ProgressBar
                        value={progress}
                        showLabel
                        label="Progress"
                        size="sm"
                        variant={progress === 100 ? 'success' : 'default'}
                    />
                )}
            </CardContent>

            <CardFooter>
                <Button asChild className="w-full">
                    <Link href={ROUTES.COURSE_DETAIL(course.slug)}>
                        {isEnrolled ? 'Continue Learning' : 'View Course'}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
