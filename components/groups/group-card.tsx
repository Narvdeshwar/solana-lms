'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Users,
    Lock,
    Globe,
    MessageSquare,
    BookOpen,
    Trophy
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { StudyGroup } from '@/types/group';

interface GroupCardProps {
    group: StudyGroup;
    onJoin?: (groupId: string) => void;
    isJoined?: boolean;
    className?: string;
}

export function GroupCard({ group, onJoin, isJoined = false, className }: GroupCardProps) {
    const isFull = group.members.length >= group.maxMembers;
    const canJoin = !isFull && !isJoined;

    return (
        <Card className={cn('p-6 hover:shadow-lg transition-shadow', className)}>
            <div className="flex gap-4">
                {/* Group Icon */}
                <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                    </div>
                </div>

                {/* Group Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-lg font-semibold">{group.name}</h3>
                        {group.isPrivate ? (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <Globe className="h-4 w-4 text-muted-foreground" />
                        )}
                    </div>
                    {group.courseName && (
                        <p className="text-sm text-muted-foreground mb-2">{group.courseName}</p>
                    )}

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {group.description}
                    </p>

                    {/* Tags */}
                    {group.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {group.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                            {group.tags.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                    +{group.tags.length - 3}
                                </Badge>
                            )}
                        </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>
                                {group.members.length}/{group.maxMembers}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{group.chat.length}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{group.sharedNotes.length}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Trophy className="h-4 w-4" />
                            <span>{group.challenges.length}</span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="flex flex-col gap-2">
                    {isJoined ? (
                        <Link href={`/groups/${group.id}`}>
                            <Button size="sm">View Group</Button>
                        </Link>
                    ) : canJoin && onJoin ? (
                        <Button size="sm" onClick={() => onJoin(group.id)}>
                            Join Group
                        </Button>
                    ) : isFull ? (
                        <Button size="sm" disabled>
                            Full
                        </Button>
                    ) : null}
                </div>
            </div>
        </Card>
    );
}
