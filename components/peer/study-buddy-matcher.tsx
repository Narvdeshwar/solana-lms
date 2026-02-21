'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StudyBuddyMatcherProps {
    className?: string;
}

export function StudyBuddyMatcher({ className }: StudyBuddyMatcherProps) {
    return (
        <div className={cn('space-y-6', className)}>
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Study Buddies</h3>
                <p className="text-center py-12 text-muted-foreground">
                    No study buddies found
                </p>
            </Card>
        </div>
    );
}
