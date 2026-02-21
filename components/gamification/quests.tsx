'use client';

import { Card } from '@/components/ui/card';
import { Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestsProps {
    className?: string;
}

export function Quests({ className }: QuestsProps) {
    return (
        <div className={cn('space-y-6', className)}>
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Daily Quests
                </h3>
                <p className="text-center py-12 text-muted-foreground">
                    No quests available
                </p>
            </Card>
        </div>
    );
}
