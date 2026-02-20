'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Clock, BookOpen, Zap, Star, Users, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DifficultyBadge } from '@/components/shared/difficulty-badge';
import { formatDuration, formatNumber, calculateTotalCourseXP } from '@/lib/solana/helpers';
import { ROUTES } from '@/lib/constants';
import { MOCK_INSTRUCTORS } from '@/lib/mock-data';
import type { Course } from '@/types';
import { cn } from '@/lib/utils';

interface CoursePreviewModalProps {
    course: Course;
    isOpen: boolean;
    onClose: () => void;
}

export function CoursePreviewModal({ course, isOpen, onClose }: CoursePreviewModalProps) {
    const totalXp = calculateTotalCourseXP(course.xpPerLesson, course.lessonCount);
    const instructor = MOCK_INSTRUCTORS[course.creator];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Cover Image */}
                        <div className="relative aspect-video overflow-hidden bg-muted">
                            {course.coverImage ? (
                                <Image
                                    src={course.coverImage}
                                    alt={course.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center bg-gradient-to-br from-solana-purple/20 to-solana-green/20">
                                    <Play className="h-24 w-24 text-muted-foreground/50" />
                                </div>
                            )}

                            {/* Badges Overlay */}
                            <div className="absolute left-4 top-4 flex gap-2">
                                <DifficultyBadge difficulty={course.difficulty} />
                                {course.isBestseller && (
                                    <Badge className="bg-yellow-500 text-white">Bestseller</Badge>
                                )}
                                {course.isNew && (
                                    <Badge className="bg-green-500 text-white">New</Badge>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8">
                            {/* Title & Rating */}
                            <div className="mb-6">
                                <h2 className="mb-3 text-3xl font-bold">{course.title}</h2>
                                {course.rating && (
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold">{course.rating.toFixed(1)}</span>
                                        </div>
                                        {course.studentCount && (
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <Users className="h-4 w-4" />
                                                <span className="text-sm">
                                                    {formatNumber(course.studentCount)} students
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <p className="mb-6 text-muted-foreground">{course.description}</p>

                            {/* Stats Grid */}
                            <div className="mb-6 grid grid-cols-3 gap-4 rounded-lg bg-muted/50 p-4">
                                <div className="text-center">
                                    <div className="mb-1 flex items-center justify-center gap-1">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm font-medium">
                                        {formatDuration(course.duration * 60)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">Duration</p>
                                </div>
                                <div className="text-center">
                                    <div className="mb-1 flex items-center justify-center gap-1">
                                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm font-medium">{course.lessonCount}</p>
                                    <p className="text-xs text-muted-foreground">Lessons</p>
                                </div>
                                <div className="text-center">
                                    <div className="mb-1 flex items-center justify-center gap-1">
                                        <Zap className="h-4 w-4 text-yellow-500" />
                                    </div>
                                    <p className="text-sm font-medium">{formatNumber(totalXp)}</p>
                                    <p className="text-xs text-muted-foreground">XP</p>
                                </div>
                            </div>

                            {/* Instructor */}
                            {instructor && (
                                <div className="mb-6 flex items-center gap-3 rounded-lg border p-4">
                                    <Image
                                        <p className="text-sm text-muted-foreground">{instructor.title}</p>
                                </div>
                                    </div>
                                )}

                        {/* What You'll Learn */}
                        <div className="mb-6">
                            <h3 className="mb-3 font-semibold">What you'll learn</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-sm">
                                    <span className="mt-1 text-green-500">✓</span>
                                    <span>Master the fundamentals of {course.title.toLowerCase()}</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <span className="mt-1 text-green-500">✓</span>
                                    <span>Build real-world projects and applications</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <span className="mt-1 text-green-500">✓</span>
                                    <span>Earn verifiable on-chain credentials</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <span className="mt-1 text-green-500">✓</span>
                                    <span>Join a community of blockchain developers</span>
                                </li>
                            </ul>
                        </div>

                        {/* Sample Lessons */}
                        {course.modules && course.modules.length > 0 && (
                            <div className="mb-6">
                                <h3 className="mb-3 font-semibold">Course Content</h3>
                                <div className="space-y-2">
                                    {course.modules.slice(0, 3).map((module, index) => (
                                        <div
                                            key={module.id}
                                            className="rounded-lg border p-3"
                                        >
                                            <p className="text-sm font-medium">
                                                Module {index + 1}: {module.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {module.lessons.length} lessons
                                            </p>
                                        </div>
                                    ))}
                                    {course.modules.length > 3 && (
                                        <p className="text-sm text-muted-foreground">
                                            + {course.modules.length - 3} more modules
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* CTA Buttons */}
                        <div className="flex gap-3">
                            <Button asChild className="flex-1">
                                <Link href={ROUTES.COURSE_DETAIL(course.slug)}>
                                    View Full Course
                                </Link>
                            </Button>
                            <Button variant="outline" onClick={onClose}>
                                Close
                            </Button>
                        </div>
                    </div>
                </motion.div>
        </div>
                </>
            )
}
        </AnimatePresence >
    );
}
