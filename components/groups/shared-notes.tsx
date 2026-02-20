'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Plus,
    Search,
    BookOpen,
    Edit,
    Trash2,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SharedNote } from '@/types/group';

interface SharedNotesProps {
    notes: SharedNote[];
    onCreateNote: (note: Omit<SharedNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onDeleteNote: (noteId: string) => void;
    currentUserId: string;
    className?: string;
}

export function SharedNotes({
() || !content.trim()) return;

onCreateNote({
    groupId: '', // Will be set by parent
    title: title.trim(),
    content: content.trim(),
    authorId: currentUserId,
    authorName: 'Current User',
    tags
});

// Reset form
setTitle('');
setContent('');
setTags([]);
setIsCreating(false);
    };

const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
    }
};

const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
};

const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
);

return (
    <div className={cn('space-y-4', className)}>
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search notes..."
                    className="w-full rounded-md border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
            </div>
            {!isCreating && (
                <Button onClick={() => setIsCreating(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Note
                </Button>
            )}
        </div>

        {/* Create Note Form */}
        {isCreating && (
            <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Create Shared Note</h3>
                    <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Note title..."
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your note..."
                            className="w-full min-h-[200px] resize-none rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">Tags</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                placeholder="Add tag..."
                                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <Button type="button" onClick={addTag} size="sm">
                                Add
                            </Button>
                        </div>
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="gap-1">
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="ml-1 hover:text-destructive"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit">Create Note</Button>
                        <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Card>
        )}

        {/* Notes List */}
        {filteredNotes.length === 0 ? (
            <Card className="p-12 text-center">
                <BookOpen className="mx-auto h-16 w-16 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">No Notes Yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    Create the first shared note for your group
                </p>
            </Card>
        ) : (
            <div className="grid gap-4 md:grid-cols-2">
                {filteredNotes.map((note) => (
                    <Card key={note.id} className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-semibold">{note.title}</h4>
                            {note.authorId === currentUserId && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onDeleteNote(note.id)}
                                >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                            {note.content}
                        </p>

                        {note.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {note.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>by {note.authorName}</span>
                            <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                        </div>
                    </Card>
                ))}
            </div>
        )}
    </div>
);
}
