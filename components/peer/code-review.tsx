'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, MessageSquare, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CodeReviewRequest } from '@/types/peer';

interface CodeReviewProps {
    className?: string;
}

export function CodeReview({ className }: CodeReviewProps) {
    const [requests] = useState<CodeReviewRequest[]>([]);

    return (
        <div className={cn('space-y-6', className)}>
            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Code Review</h3>
                    </div>
                    <Button size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Request
                    </Button>
                </div>

                <div className="text-center py-12 text-muted-foreground">
                    No code review requests yet
                </div>
            </Card>
        </div>
    );
}
