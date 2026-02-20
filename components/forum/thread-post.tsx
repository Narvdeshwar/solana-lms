'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ThumbsUp,
    Lightbulb,
    Heart,
    CheckCircle,
    MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ForumPost, Reaction } from '@/types/forum';

interface ThreadPostProps {
    post: ForumPost;
    onReact: (postId: string, type: Reaction['type']) => void;
    onMarkAsAnswer?: (postId: string) => void;
    canMarkAsAnswer?: boolean;
    className?: string;
}

export function ThreadPost({
    post,
    onReact,
    onMarkAsAnswer,
    canMarkAsAnswer = false,
    className
}: ThreadPostProps) {
    const [showActions, setShowActions] = useState(false);

    const getReactionCount = (type: Reaction['type']) => {
        return post.reactions.filter(r => r.type === type).length;
    };

    const hasUserReacted = (type: Reaction['type']) => {
        // Mock: check if current user has reacted
        return post.reactions.some(r => r.type === type && r.userId === 'current-user');
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'instructor': return 'bg-purple-500/10 text-purple-600';
            case 'ta': return 'bg-blue-500/10 text-blue-600';
            default: return 'bg-gray-500/10 text-gray-600';
        }
    };

    const getTimeAgo = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - new Date(date).getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        return 'Just now';
    };

    return (
        <Card className={cn(
            'p-6',
            post.isAnswer && 'border-green-500 bg-green-500/5',
            className
        )}>
            <div className="flex items-start gap-4">
                {/* Author Avatar */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary flex-shrink-0">
                    {post.author.name.charAt(0)}
                </div>

                {/* Post Content */}
                <div className="flex-1 min-w-0">
                    {/* Author Info */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold">{post.author.name}</span>
                        {post.author.role !== 'student' && (
                            <Badge variant="outline" className={getRoleBadgeColor(post.author.role)}>
                                {post.author.role}
                            </Badge>
                        )}
                        {post.isAnswer && (
                            <Badge className="bg-green-500">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Accepted Answer
                            </Badge>
                        )}
                        <span className="text-sm text-muted-foreground">
                            {getTimeAgo(post.createdAt)}
                        </span>
                    </div>

                    {/* Post Content */}
                    <div className="prose prose-sm max-w-none mb-4">
                        <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {/* Reactions */}
                        <Button
                            variant={hasUserReacted('like') ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => onReact(post.id, 'like')}
                            className="gap-1"
                        >
                            <ThumbsUp className="h-4 w-4" />
                            <span>{getReactionCount('like')}</span>
                        </Button>

                        <Button
                            variant={hasUserReacted('helpful') ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => onReact(post.id, 'helpful')}
                            className="gap-1"
                        >
                            <Lightbulb className="h-4 w-4" />
                            <span>{getReactionCount('helpful')}</span>
                        </Button>

                        <Button
                            variant={hasUserReacted('insightful') ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => onReact(post.id, 'insightful')}
                            className="gap-1"
                        >
                            <Heart className="h-4 w-4" />
                            <span>{getReactionCount('insightful')}</span>
                        </Button>

                        {/* Mark as Answer */}
                        {canMarkAsAnswer && !post.isAnswer && onMarkAsAnswer && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onMarkAsAnswer(post.id)}
                                className="gap-1 ml-auto"
                            >
                                <CheckCircle className="h-4 w-4" />
                                Mark as Answer
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
