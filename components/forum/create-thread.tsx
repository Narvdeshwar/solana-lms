'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ForumThread } from '@/types/forum';

interface CreateThreadProps {
    courseId: string;
    courseName: string;
    onSubmit: (thread: Omit<ForumThread, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'posts' | 'reactions' | 'followers'>) => void;
    onCancel: () => void;
    className?: string;
}

export function CreateThread({ courseId, courseName, onSubmit, onCancel, className }: CreateThreadProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState<ForumThread['category']>('general');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        onSubmit({
            courseId,
            courseName,
            title: title.trim(),
            content: content.trim(),
            category,
            author: {
                id: 'current-user',
                name: 'Current User',
                role: 'student'
            },
            isPinned: false,
            isLocked: false,
            isSolved: false
        });

        // Reset form
        setTitle('');
        setContent('');
        setCategory('general');
    };

    return (
        <Card className={cn('p-6', className)}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Create New Thread</h2>
                <Button variant="ghost" size="sm" onClick={onCancel}>
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="mb-2 block text-sm font-medium">Thread Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What's your question or topic?"
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="mb-2 block text-sm font-medium">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as ForumThread['category'])}
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        <option value="general">General Discussion</option>
                        <option value="technical">Technical Question</option>
                        <option value="assignment">Assignment Help</option>
                        <option value="project">Project Discussion</option>
                        <option value="discussion">Course Discussion</option>
                    </select>
                </div>

                {/* Content */}
                <div>
                    <label className="mb-2 block text-sm font-medium">Description</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Provide details about your question or topic..."
                        className="w-full min-h-[200px] resize-none rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                        Tip: Use clear, descriptive language. Include code snippets if relevant.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <Button type="submit" disabled={!title.trim() || !content.trim()}>
                        Create Thread
                    </Button>
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Card>
    );
}
