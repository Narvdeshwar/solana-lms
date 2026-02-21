'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Megaphone, Pin, Calendar, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Announcement } from '@/types/instructor';

interface AnnouncementsProps {
    courseId: string;
    className?: string;
}

export function Announcements({ courseId, className }: AnnouncementsProps) {
    const [announcements] = useState<Announcement[]>([
        {
            id: '1',
            instructorId: 'inst-1',
            courseId,
            title: 'Welcome to the Course!',
            content: 'Welcome everyone! Looking forward to an amazing learning journey together.',
            priority: 'high',
            isPinned: true,
            createdAt: new Date(Date.now() - 86400000),
            updatedAt: new Date(Date.now() - 86400000)
        },
        {
            id: '2',
            instructorId: 'inst-1',
            courseId,
            title: 'Assignment 1 Released',
            content: 'The first assignment is now available. Due date is next Friday.',
            priority: 'medium',
            isPinned: false,
            createdAt: new Date(Date.now() - 43200000),
            updatedAt: new Date(Date.now() - 43200000)
        }
    ]);

    const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

    const filteredAnnouncements = announcements
        .filter((a) => filter === 'all' || a.priority === filter)
        .sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return b.createdAt.getTime() - a.createdAt.getTime();
        });

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'medium':
                return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'low':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            default:
                return 'bg-muted text-muted-foreground';
        }
    };

    return (
        <div className={cn('space-y-6', className)}>
            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Megaphone className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Course Announcements</h3>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={filter === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('all')}
                        >
                            All
                        </Button>
                        <Button
                            variant={filter === 'high' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('high')}
                        >
                            High
                        </Button>
                        <Button
                            variant={filter === 'medium' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('medium')}
                        >
                            Medium
                        </Button>
                        <Button
                            variant={filter === 'low' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('low')}
                        >
                            Low
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredAnnouncements.map((announcement) => (
                        <Card
                            key={announcement.id}
                            className={cn(
                                'p-4 transition-shadow hover:shadow-md',
                                announcement.isPinned && 'border-primary'
                            )}
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        {announcement.isPinned ? (
                                            <Pin className="h-5 w-5 text-primary" />
                                        ) : (
                                            <Megaphone className="h-5 w-5 text-primary" />
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="font-semibold">{announcement.title}</h4>
                                        <Badge
                                            className={cn(
                                                'text-xs',
                                                getPriorityColor(announcement.priority)
                                            )}
                                        >
                                            {announcement.priority}
                                        </Badge>
                                        {announcement.isPinned && (
                                            <Badge variant="outline" className="text-xs">
                                                Pinned
                                            </Badge>
                                        )}
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-3">
                                        {announcement.content}
                                    </p>

                                    {announcement.attachments && announcement.attachments.length > 0 && (
                                        <div className="flex items-center gap-2 mb-3">
                                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground">
                                                {announcement.attachments.length} attachment(s)
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {announcement.createdAt.toLocaleDateString()}
                                        </span>
                                        <span>
                                            {announcement.createdAt.toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    );
}
