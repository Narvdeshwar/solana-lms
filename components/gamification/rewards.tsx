'use client';

import { Card } from '@/components/ui/card';
import { Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RewardsProps {
    className?: string;
}

export function Rewards({ className }: RewardsProps) {
    return (
        <div className={cn('space-y-6', className)}>
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Rewards
                </h3>
                <p className="text-center py-12 text-muted-foreground">
                    No rewards available
                </p>
            </Card>
        </div>
    );
}
