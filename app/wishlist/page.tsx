'use client';

import { Heart } from 'lucide-react';
import { EnhancedCourseCard } from '@/components/course/enhanced-course-card';
import { EmptyState } from '@/components/shared/empty-state';
import { useWishlist } from '@/lib/contexts/wishlist-context';
import { MOCK_COURSES } from '@/lib/mock-data';

export default function WishlistPage() {
    const { wishlist } = useWishlist();

    const wishlistedCourses = MOCK_COURSES.filter((course) =>
        wishlist.includes(course.id)
    );

    return (
        <div className="container py-12">
            <div className="mb-8">
                <div className="flex items-center gap-3">
                    <Heart className="h-8 w-8 text-red-500" />
                    <h1 className="text-4xl font-bold">My Wishlist</h1>
                </div>
                <p className="mt-2 text-muted-foreground">
                    Courses you've saved for later
                </p>
            </div>

            {wishlistedCourses.length === 0 ? (
                <EmptyState
                    icon={Heart}
                    title="Your wishlist is empty"
                    description="Start adding courses you're interested in to your wishlist"
                />
            ) : (
                <>
                    <p className="mb-6 text-sm text-muted-foreground">
                        {wishlistedCourses.length} {wishlistedCourses.length === 1 ? 'course' : 'courses'} in your wishlist
                    </p>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {wishlistedCourses.map((course) => (
                            <EnhancedCourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
