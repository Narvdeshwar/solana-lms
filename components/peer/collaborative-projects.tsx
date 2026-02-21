'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GitBranch, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollaborativeProjectsProps {
    className?: string;
}

export function CollaborativeProjects({ className }: CollaborativeProjectsProps) {
    return (
        <div className={cn('space-y-6', className)}>
            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <GitBranch className="h-5 w-5" />
                        Projects
                    </h3>
                    <Button size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Create
                    </Button>
                </div>
                <p className="text-center py-12 text-muted-foreground">
                    No projects available
                </p>
            </Card>
        </div>
    );
}
