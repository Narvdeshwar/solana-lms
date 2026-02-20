'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp, Clock, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import type { Course } from '@/types';

interface SearchAutocompleteProps {
    courses: Course[];
    className?: string;
}

export function SearchAutocomplete({ courses, className }: SearchAutocompleteProps) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Filter courses based on query
    const filteredCourses = query.trim()
        ? courses.filter((course) =>
            course.title.toLowerCase().includes(query.toLowerCase()) ||
            course.description.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    // Trending courses (mock data)
    const trendingCourses = courses.slice(0, 3);

    // Load recent searches from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    // Save recent search
    const saveRecentSearch = (searchQuery: string) => {
        const updated = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    // Handle course selection
    const handleSelectCourse = (course: Course) => {
        saveRecentSearch(course.title);
        setQuery('');
        setIsOpen(false);
        router.push(ROUTES.COURSE_DETAIL(course.slug));
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < filteredCourses.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && filteredCourses[selectedIndex]) {
                    handleSelectCourse(filteredCourses[selectedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                inputRef.current?.blur();
                break;
        }
    };

    // Clear recent search
    const clearRecentSearch = (search: string) => {
        const updated = recentSearches.filter((s) => s !== search);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    return (
        <div className={cn('relative', className)}>
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search courses..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                        setSelectedIndex(-1);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    className="w-full rounded-lg border bg-background px-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            inputRef.current?.focus();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Results */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[400px] overflow-y-auto rounded-lg border bg-background shadow-lg"
                        >
                            {/* Search Results */}
                            {query.trim() && filteredCourses.length > 0 && (
                                <div className="border-b p-2">
                                    <p className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                                        Courses
                                    </p>
                                    {filteredCourses.map((course, index) => (
                                        <button
                                            key={course.id}
                                            onClick={() => handleSelectCourse(course)}
                                            className={cn(
                                                'w-full rounded-md p-3 text-left transition-colors',
                                                'hover:bg-accent',
                                                selectedIndex === index && 'bg-accent'
                                            )}
                                        >
                                            <p className="font-medium">{course.title}</p>
                                            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                                                {course.description}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* No Results */}
                            {query.trim() && filteredCourses.length === 0 && (
                                <div className="p-8 text-center">
                                    <p className="text-sm text-muted-foreground">
                                        No courses found for &quot;{query}&quot;
                                    </p>
                                </div>
                            )}

                            {/* Recent Searches */}
                            {!query.trim() && recentSearches.length > 0 && (
                                <div className="border-b p-2">
                                    <p className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                                        Recent Searches
                                    </p>
                                    {recentSearches.map((search) => (
                                        <div
                                            key={search}
                                            className="flex items-center justify-between rounded-md p-3 hover:bg-accent"
                                        >
                                            <button
                                                onClick={() => setQuery(search)}
                                                className="flex flex-1 items-center gap-2 text-left"
                                            >
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">{search}</span>
                                            </button>
                                            <button
                                                onClick={() => clearRecentSearch(search)}
                                                className="text-muted-foreground hover:text-foreground"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Trending Courses */}
                            {!query.trim() && (
                                <div className="p-2">
                                    <p className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                                        Trending Courses
                                    </p>
                                    {trendingCourses.map((course) => (
                                        <button
                                            key={course.id}
                                            onClick={() => handleSelectCourse(course)}
                                            className="w-full rounded-md p-3 text-left transition-colors hover:bg-accent"
                                        >
                                            <div className="flex items-start gap-2">
                                                <TrendingUp className="h-4 w-4 text-green-500" />
                                                <div className="flex-1">
                                                    <p className="font-medium">{course.title}</p>
                                                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                                                        {course.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
