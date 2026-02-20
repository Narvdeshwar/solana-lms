'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Save, Trash2, Plus, FileText, Download, Search, Tag, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Note {
    id: string;
    content: string;
    plainText: string;
    timestamp: Date;
    lessonId: string;
    tags: string[];
    hasCode: boolean;
}

interface EnhancedNotesProps {
    lessonId: string;
    initialNotes?: Note[];
    onSave?: (notes: Note[]) => void;
    className?: string;
}

export function EnhancedNotes({ lessonId, initialNotes = [], onSave, className }: EnhancedNotesProps) {
    const [notes, setNotes] = useState<Note[]>(initialNotes);
    const [currentNote, setCurrentNote] = useState('');
    const [currentTags, setCurrentTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Load notes from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(`enhanced-notes-${lessonId}`);
        if (saved) {
            const parsed = JSON.parse(saved);
            setNotes(parsed.map((n: any) => ({ ...n, timestamp: new Date(n.timestamp) })));
        }
    }, [lessonId]);

    // Save notes to localStorage
    useEffect(() => {
        if (notes.length > 0) {
            localStorage.setItem(`enhanced-notes-${lessonId}`, JSON.stringify(notes));
        }
    }, [notes, lessonId]);

    const handleAddNote = () => {
        if (!currentNote.trim()) r
        CurrentNote('');
        setCurrentTags([]);
        setIsEditing(false);
        onSave?.(updatedNotes);
    };

    const handleDeleteNote = (noteId: string) => {
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        setNotes(updatedNotes);
        onSave?.(updatedNotes);
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
            setCurrentTags([...currentTags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        setCurrentTags(currentTags.filter(t => t !== tag));
    };

    const exportToMarkdown = () => {
        const markdown = notes
            .map((note) => {
                const tags = note.tags.length > 0 ? `\nTags: ${note.tags.join(', ')}` : '';
                return `## ${formatTimestamp(note.timestamp)}${tags}\n\n${note.content}\n\n---\n`;
            })
            .join('\n');

        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lesson-${lessonId}-notes.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const formatTimestamp = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const allTags = Array.from(new Set(notes.flatMap(n => n.tags)));

    const filteredNotes = notes.filter(note => {
        const matchesSearch = searchQuery === '' ||
            note.plainText.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesTag = !selectedTag || note.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    const renderNoteContent = (content: string) => {
        // Simple markdown-like rendering for code blocks
        const parts = content.split(/(```[\s\S]*?```|`[^`]+`)/g);
        return parts.map((part, index) => {
            if (part.startsWith('```') && part.endsWith('```')) {
                const code = part.slice(3, -3).trim();
                return (
                    <pre key={index} className="my-2 rounded-md bg-slate-900 p-3 text-sm text-slate-50 overflow-x-auto">
                        <code>{code}</code>
                    </pre>
                );
            } else if (part.startsWith('`') && part.endsWith('`')) {
                return (
                    <code key={index} className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                        {part.slice(1, -1)}
                    </code>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className={cn('space-y-4', className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">Enhanced Notes ({filteredNotes.length})</h3>
                <div className="flex items-center gap-2">
                    {notes.length > 0 && (
                        <Button
                            onClick={exportToMarkdown}
                            size="sm"
                            variant="outline"
                            className="gap-2"
                        >
                            <Download className="h-4 w-4" />
                            Export
                        </Button>
                    )}
                    {!isEditing && (
                        <Button
                            onClick={() => setIsEditing(true)}
                            size="sm"
                            className="gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add Note
                        </Button>
                    )}
                </div>
            </div>

            {/* Search and Filter */}
            {notes.length > 0 && (
                <Card className="p-3">
                    <div className="flex flex-col gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search notes..."
                                className="w-full rounded-md border bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        {allTags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    onClick={() => setSelectedTag(null)}
                                    size="sm"
                                    variant={selectedTag === null ? 'default' : 'outline'}
                                    className="h-7"
                                >
                                    All
                                </Button>
                                {allTags.map(tag => (
                                    <Button
                                        key={tag}
                                        onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                                        size="sm"
                                        variant={selectedTag === tag ? 'default' : 'outline'}
                                        className="h-7"
                                    >
                                        {tag}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>
                </Card>
            )}

            {/* New Note Editor */}
            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <Card className="p-4">
                            <div className="mb-3 text-sm text-muted-foreground">
                                <p className="mb-1">Tip: Use markdown-style formatting:</p>
                                <p>• Inline code: `code here`</p>
                                <p>• Code block: ```code here```</p>
                            </div>
                            <textarea
                                value={currentNote}
                                onChange={(e) => setCurrentNote(e.target.value)}
                                placeholder="Write your note here... Use `code` for inline code or ```code``` for code blocks"
                                className="w-full min-h-[150px] resize-none rounded-md border bg-background p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                                autoFocus
                            />

                            {/* Tags Input */}
                            <div className="mt-3">
                                <div className="mb-2 flex items-center gap-2">
                                    <Tag className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Tags</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {currentTags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="gap-1">
                                            {tag}
                                            <button
                                                onClick={() => handleRemoveTag(tag)}
                                                className="ml-1 hover:text-destructive"
                                            >
                                                ×
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                                        placeholder="Add tag..."
                                        className="flex-1 rounded-md border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                    <Button onClick={handleAddTag} size="sm" variant="outline">
                                        Add
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-3 flex items-center gap-2">
                                <Button
                                    onClick={handleAddNote}
                                    size="sm"
                                    disabled={!currentNote.trim()}
                                    className="gap-2"
                                >
                                    <Save className="h-4 w-4" />
                                    Save Note
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setCurrentNote('');
                                        setCurrentTags([]);
                                    }}
                                    size="sm"
                                    variant="outline"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Notes List */}
            <div className="space-y-3">
                {filteredNotes.length === 0 ? (
                    <Card className="p-8 text-center">
                        <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                        <p className="mt-2 text-sm text-muted-foreground">
                            {notes.length === 0
                                ? 'No notes yet. Add your first note with code snippets!'
                                : 'No notes match your search.'}
                        </p>
                    </Card>
                ) : (
                    <AnimatePresence>
                        {filteredNotes.map((note) => (
                            <motion.div
                                key={note.id}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card className="group p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-center gap-2">
                                                <p className="text-xs text-muted-foreground">
                                                    {formatTimestamp(note.timestamp)}
                                                </p>
                                                {note.hasCode && (
                                                    <Badge variant="outline" className="h-5 gap-1">
                                                        <Code className="h-3 w-3" />
                                                        Code
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="text-sm whitespace-pre-wrap">
                                                {renderNoteContent(note.content)}
                                            </div>
                                            {note.tags.length > 0 && (
                                                <div className="mt-2 flex flex-wrap gap-1">
                                                    {note.tags.map(tag => (
                                                        <Badge key={tag} variant="secondary" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <Button
                                            onClick={() => handleDeleteNote(note.id)}
                                            size="sm"
                                            variant="ghost"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
