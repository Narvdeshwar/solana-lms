'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    MessageSquare,
    Eye,
    ThumbsUp,
    Pin,
    Lock,
    CheckCircle,
    Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ForumThread } from '@/types/forum';

interface ThreadListProps {
    threads: ForumThread[];
    courseId: string;
    className?: string;
}

export function ThreadList({ threads, courseId, className }: ThreadListProps) {
    const getCategoryColor = (category: ForumThread['category']) => {
        switch (category) {
            case 'ge
                (diff / 60000);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);

                if (days > 0) return `${days}d ago`;
                if (hours > 0) return `${hours}h ago`;
                if (minutes > 0) return `${minutes}m ago`;
                return 'Just now';
        };

        return (
            <div className={cn('space-y-3', className)}>
                {threads.map((thread) => (
                    <Link key={thread.id} href={`/forums/${courseId}/${thread.id}`}>
                        <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                            <div className="flex items-start gap-4">
                                {/* Author Avatar */}
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                    {thread.author.name.charAt(0)}
                                </div>

                                {/* Thread Content */}
                                <div className="flex-1 min-w-0">
                                    {/* Title and Badges */}
                                    <div className="flex items-start gap-2 mb-2">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {thread.isPinned && (
                                                    <Pin className="h-4 w-4 text-primary" />
                                                )}
                                                <h3 className="font-semibold hover:text-primary transition-colors">
                                                    {thread.title}
                                                </h3>
                                                {thread.isLocked && (
                                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                                )}
                                                {thread.isSolved && (
                                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                                {thread.content}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Meta Information */}
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                                        <Badge variant="outline" className={getCategoryColor(thread.category)}>
                                            {thread.category}
                                        </Badge>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {getTimeAgo(thread.createdAt)}
                                        </span>
                                        <span>by {thread.author.name}</span>
                                        {thread.author.role !== 'student' && (
                                            <Badge variant="secondary" className="text-xs">
                                                {thread.author.role}
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="flex flex-col items-end gap-2 text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <MessageSquare className="h-4 w-4" />
                                            <span>{thread.posts.length}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <Eye className="h-4 w-4" />
                                            <span>{thread.views}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <ThumbsUp className="h-4 w-4" />
                                            <span>{thread.reactions.length}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        );
    }
