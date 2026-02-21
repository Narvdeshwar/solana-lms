'use client';

import { Card } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementsProps {
    className?: string;
}

export function Achievements({ className }: AchievementsProps) {
    return (
        <div className={cn('space-y-6', className)}>
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                <p className="text-center py-12 text-muted-foreground">
                    No achievements unlocked yet
                </p>
            </Card>
        </div>
    );
}
