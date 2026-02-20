'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, BookOpen, Zap, Star, Users, Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/shared/progress-bar';
import { DifficultyBadge } from '@/components/shared/difficulty-badge';
import { formatDuration, formatNumber, calculateTotalCourseXP } from '@/lib/solana/helpers';
import { ROUTES } from '@/lib/constants';
import { MOCK_INSTRUCTORS } from '@/lib/mock-data';
import { useWishlist } from '@/lib/contexts/wishlist-context';
import type { Course } from '@/types';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface EnhancedCourseCardProps {
    course: Course;
    progress?: number;
    showProgress?: boolean;
    className?: string;
}

export function EnhancedCourseCard({
    course,
    progress,
    showProgress = false,
    className,
}: EnhancedCourseCardProps): JSX.Element {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const isWishlisted = isInWishlist(course.id);
    const totalXp = calculateTotalCourseXP(course.xpPerLesson, course.lessonCount);
    const isEnrolled = progress !== undefined;
    const instructor = MOCK_INSTRUCTORS[course.creator];

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        toggleWishlist(course.id);
    };

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        if (typeof navigator !== 'undefined' && navigator.share) {
            navigator.share({
                title: course.title,
                text: course.description,
                url: window.location.origin + ROUTES.COURSE_DETAIL(course.slug),
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -4 }}
        >
            <Card className={cn('group overflow-hidden transition-all hover:shadow-xl border-2 hover:border-primary/20', className)}>
                {/* Cover Image */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                    {course.coverImage ? (
                        <Image
                            src={course.coverImage}
                            alt={course.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-solana-purple/20 to-solana-green/20">
                            <BookOpen className="h-12 w-12 text-muted-foreground" />
                        </div>
                    )}

                    {/* Badges */}
                    <div className="absolute left-2 top-2 flex gap-2">
                        <DifficultyBadge difficulty={course.difficulty} />
                        {course.isBestseller && (
                            <Badge className="bg-yellow-500 text-white">
                                Bestseller
                            </Badge>
                        )}
                        {course.isNew && (
                            <Badge className="bg-green-500 text-white">
                                New
                            </Badge>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute right-2 top-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleWishlist}
                            className="rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm hover:bg-white"
                        >
                            <Heart
                                className={cn(
                                    'h-4 w-4 transition-colors',
                                    isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'
                                )}
                            />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleShare}
                            className="rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm hover:bg-white"
                        >
                            <Share2 className="h-4 w-4 text-gray-700" />
                        </motion.button>
                    </div>
                </div>

                <CardHeader className="space-y-3">
                    {/* Instructor */}
                    {instructor && (
                        <div className="flex items-center gap-2">
                            <Image
                                src={instructor.avatar}
                                alt={instructor.name}
                                width={24}
                                height={24}
                                className="rounded-full"
                            />
                            <span className="text-xs text-muted-foreground">
                                {instructor.name}
                            </span>
                        </div>
                    )}

                    {/* Title */}
                    <h3 className="line-clamp-2 text-xl font-semibold transition-colors group-hover:text-primary">
                        {course.title}
                    </h3>

                    {/* Description */}
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                        {course.description}
                    </p>

                    {/* Rating */}
                    {course.rating && (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold">{course.rating.toFixed(1)}</span>
                            </div>
                            {course.studentCount && (
                                <span className="text-xs text-muted-foreground">
                                    ({formatNumber(course.studentCount)} students)
                                </span>
                            )}
                        </div>
                    )}
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

                    {/* Student Count */}
                    {course.studentCount && !course.rating && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{formatNumber(course.studentCount)} students enrolled</span>
                        </div>
                    )}

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

                    {/* Last Updated */}
                    {course.lastUpdated && (
                        <p className="text-xs text-muted-foreground">
                            Updated {course.lastUpdated.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                    )}
                </CardContent>

                <CardFooter>
                    <Button asChild className="w-full group-hover:shadow-lg transition-shadow">
                        <Link href={ROUTES.COURSE_DETAIL(course.slug)}>
                            {isEnrolled ? 'Continue Learning' : 'View Course'}
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
