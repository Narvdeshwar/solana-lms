'use client';

import { useState, Suspense } from 'react';
import { EnhancedCourseCard } from '@/components/course/enhanced-course-card';
import { CourseGridSkeleton } from '@/components/shared/skeleton';
import { SearchAutocomplete } from '@/components/shared/search-autocomplete';
import { DIFFICULTY } from '@/lib/constants';
import { MOCK_COURSES, MOCK_COURSE_PROGRESS } from '@/lib/mock-data';
import type { Difficulty } from '@/types';

const difficultyFilters = [
    { label: 'All Levels', value: null },
    { label: 'Beginner', value: DIFFICULTY.BEGINNER },
    { label: 'Intermediate', value: DIFFICULTY.INTERMEDIATE },
    { label: 'Advanced', value: DIFFICULTY.ADVANCED },
];

export default function CoursesPage() {
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
    const progress = MOCK_COURSE_PROGRESS;

    // Filter courses by difficulty
    const filteredCourses = MOCK_COURSES.filter((course) => {
        return selectedDifficulty === null || course.difficulty === selectedDifficulty;
    });

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
                <h1 className="mb-4 text-4xl font-bold">Explore Courses</h1>
                <p className="text-lg text-muted-foreground">
                    Learn Solana development through interactive, project-based courses
                </p>
            </div>

            {/* Filters */}
            <div className="mb-8 space-y-4">
                {/* Search Autocomplete */}
                <SearchAutocomplete courses={MOCK_COURSES} />

                {/* Difficulty Filter */}
                <div className="flex flex-wrap gap-2">
                    {difficultyFilters.map((filter) => (
                        <button
                            key={filter.label}
                            className={`px-4 py-2 text-sm rounded-md transition-colors ${selectedDifficulty === filter.value
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-transparent border border-input hover:bg-accent'
                                }`}
                            onClick={() => setSelectedDifficulty(filter.value)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                    {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
                </p>
            </div>

            {/* Course Grid */}
            <Suspense fallback={<CourseGridSkeleton count={6} />}>
                {filteredCourses.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-muted-foreground">No courses match your filters</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredCourses.map((course) => (
                            <EnhancedCourseCard
                                key={course.id}
                                course={course}
                                progress={progress[course.id]}
                                showProgress={!!progress[course.id]}
                            />
                        ))}
                    </div>
                )}
            </Suspense>
        </div>
    );
}
