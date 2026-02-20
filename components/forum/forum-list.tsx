'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    MessageSquare,
    Users,
    TrendingUp,
    Clock,
    Pin,
    Lock,
    CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Forum } from '@/types/forum';

interface ForumListProps {
    forums: Forum[];
    className?: string;
}

export function ForumList({ forums, className }: ForumListProps) {
    return (
        <div className={cn('space-y-4', className)}>
            {forums.map((forum) => {
                const totalThreads = forum.threads.length;
                const totalPosts = forum.threads.reduce((sum, t) => sum + t.posts.length, 0);
                const latestThread = forum.threads[0];

                return (
                    <Link key={forum.id} href={`/forums/${forum.courseId}`}>
                        <Card className="p-6 hover:bg-accent transition-colors cursor-pointer">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            <MessageSquare className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">{forum.courseName}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {forum.description}
                                            </p>
                                        </div>
                                    </div>

                                    {latestThread && (
                                        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            <span>Latest: {latestThread.title}</span>
                                            <span>•</span>
                                            <span>{new Date(latestThread.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1">
                                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">{totalThreads}</span>
                                            <span className="text-muted-foreground">threads</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">{totalPosts}</span>
                                            <span className="text-muted-foreground">posts</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <Users className="h-4 w-4" />
                                        <span>{forum.memberCount} members</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}
