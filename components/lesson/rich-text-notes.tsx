'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Save,
    Trash2,
    Plus,
    FileText,
    Search,
    Download,
    Tag,
    Code,
    Bold,
    Italic,
    List,
    ListOrdered
} from 'lucide-react';
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

interface RichTextNotesProps {
    lessonId: string;
    lessonTitle?: string;
    initialNotes?: Note[];
    onSave?: (notes: Note[]) => void;
    className?: string;
}

export function RichTextNotes({
    lessonId,
    lessonTitle = 'Lesson',
    initialNotes = [],
    onSave,
    className
}: RichTextNotesProps) {
    const [notes, setNotes] = useState<Note[]>(() => {
        // Load from localStorage
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(`notes-${lessonId}`);
            if (saved) {
                const parsed = JSON.parse(saved);
                return parsed.map((n: any) => ({
                    ...n,
                    timestamp: new Date(n.timestamp)
                }));
            }
        }
        return initialNotes;
    });

    const [currentNote, setCurrentNote] = useState('');
    const [currentTags, setCurrentTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'code' | 'tagged'>('all');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);

    // Save to localStorage whenever notes change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(`notes-${lessonId}`, JSON.stringify(notes));
        }
        onSave?.(notes);
    }, [notes, lessonId, onSave]);

    const handleAddNote = () => {
        if (!currentNote.trim()) return;

        const hasCode = currentNote.includes('```') || currentNote.includes('`');
        const plainText = currentNote.replace(/[*_`#]/g, '');

        const newNote: Note = {
            id: Date.now().toString(),
            content: currentNote,
            plainText,
            timestamp: new Date(),
            lessonId,
            tags: currentTags,
            hasCode,
        };

        const updatedNotes = [newNote, ...notes];
        setNotes(updatedNotes);
        setCurrentNote('');
        setCurrentTags([]);
        setIsEditing(false);
    };

    const handleDeleteNote = (noteId: string) => {
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        setNotes(updatedNotes);
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

    const insertFormatting = (format: 'bold' | 'italic' | 'code' | 'list' | 'orderedList') => {
        const textarea = document.querySelector('textarea');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = currentNote.substring(start, end);
        let newText = '';
        let cursorOffset = 0;

        switch (format) {
            case 'bold':
                newText = `**${selectedText}**`;
                cursorOffset = 2;
                break;
            case 'italic':
                newText = `*${selectedText}*`;
                cursorOffset = 1;
                break;
            case 'code':
                newText = selectedText.includes('\n')
                    ? `\`\`\`\n${selectedText}\n\`\`\``
                    : `\`${selectedText}\``;
                cursorOffset = selectedText.includes('\n') ? 4 : 1;
                break;
            case 'list':
                newText = `- ${selectedText}`;
                cursorOffset = 2;
                break;
            case 'orderedList':
                newText = `1. ${selectedText}`;
                cursorOffset = 3;
                break;
        }

        const before = currentNote.substring(0, start);
        const after = currentNote.substring(end);
        setCurrentNote(before + newText + after);

        // Set cursor position after formatting
        setTimeout(() => {
            n(', ')
        }\n\n-- -\n\n`
                ).join('');
                filename += '.txt';
                break;
            case 'md':
                content = `# ${ lessonTitle } - Notes\n\n`;
                content += notes.map(note =>
                    `## ${ formatTimestamp(note.timestamp)
    }\n\n${ note.content }\n\n** Tags:** ${ note.tags.map(t => `\`${t}\``).join(', ') } \n\n-- -\n\n`
                ).join('');
                filename += '.md';
                mimeType = 'text/markdown';
                break;
            case 'json':
                content = JSON.stringify(notes, null, 2);
                filename += '.json';
                mimeType = 'application/json';
                break;
        }

        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
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

    const renderNoteContent = (content: string) => {
        // Simple markdown-like rendering
        let html = content;

        // Code blocks
        html = html.replace(/```([\s\S] *?)```/g, '<pre class="bg-muted p-2 rounded my-2 overflow-x-auto"><code>$1</code></pre>');

        // Inline code
        html = html.replace(/`([^ `]+)` / g, '<code class="bg-muted px-1 rounded text-sm">$1</code>');

    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Lists
    html = html.replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>');
    html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4">$2</li>');

    return html;
};

const filteredNotes = notes.filter(note => {
    // Filter by search query
    if (searchQuery && !note.plainText.toLowerCase().includes(searchQuery.toLowerCase())
        && !note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
    }

    // Filter by type
    if (selectedFilter === 'code' && !note.hasCode) return false;
    if (selectedFilter === 'tagged' && note.tags.length === 0) return false;

    return true;
});

const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

return (
    <div className={cn('space-y-4', className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
            <div>
                <h3 className="font-semibold">My Notes ({notes.length})</h3>
                <p className="text-xs text-muted-foreground">Enhanced with formatting & search</p>
            </div>
            {!isEditing && (
                <Button
                    onClick={() => setIsEditing(true)}
                    size="sm"
                    className="gap-2"
                >
                    <Plus className="h-4 w-4" />
                    New Note
                </Button>
            )}
        </div>

        {/* Search & Filter */}
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
                    <div className="flex items-center gap-2">
                        <Button
                            variant={selectedFilter === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedFilter('all')}
                        >
                            All ({notes.length})
                        </Button>
                        <Button
                            variant={selectedFilter === 'code' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedFilter('code')}
                            className="gap-1"
                        >
                            <Code className="h-3 w-3" />
                            Code ({notes.filter(n => n.hasCode).length})
                        </Button>
                        <Button
                            variant={selectedFilter === 'tagged' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedFilter('tagged')}
                            className="gap-1"
                        >
                            <Tag className="h-3 w-3" />
                            Tagged ({notes.filter(n => n.tags.length > 0).length})
                        </Button>
                    </div>
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
                        {/* Formatting Toolbar */}
                        <div className="mb-3 flex items-center gap-1 border-b pb-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => insertFormatting('bold')}
                                className="h-8 w-8 p-0"
                                title="Bold"
                            >
                                <Bold className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => insertFormatting('italic')}
                                className="h-8 w-8 p-0"
                                title="Italic"
                            >
                                <Italic className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => insertFormatting('code')}
                                className="h-8 w-8 p-0"
                                title="Code"
                            >
                                <Code className="h-4 w-4" />
                            </Button>
                            <div className="mx-2 h-6 w-px bg-border" />
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => insertFormatting('list')}
                                className="h-8 w-8 p-0"
                                title="Bullet List"
                            >
                                <List className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => insertFormatting('orderedList')}
                                className="h-8 w-8 p-0"
                                title="Numbered List"
                            >
                                <ListOrdered className="h-4 w-4" />
                            </Button>
                        </div>

                        <textarea
                            value={currentNote}
                            onChange={(e) => setCurrentNote(e.target.value)}
                            placeholder="Write your note here... Use **bold**, *italic*, `code`, or ```code blocks```"
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
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="gap-1 cursor-pointer"
                                        onClick={() => handleRemoveTag(tag)}
                                    >
                                        {tag}
                                        <span className="text-xs">×</span>
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

                        <div className="mt-4 flex items-center gap-2">
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
                        {searchQuery ? 'No notes match your search' : 'No notes yet. Create your first note!'}
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
                                        <div
                                            className="prose prose-sm max-w-none text-sm"
                                            dangerouslySetInnerHTML={{ __html: renderNoteContent(note.content) }}
                                        />
                                        <div className="mt-3 flex items-center gap-2 flex-wrap">
                                            <span className="text-xs text-muted-foreground">
                                                {formatTimestamp(note.timestamp)}
                                            </span>
                                            {note.hasCode && (
                                                <Badge variant="outline" className="text-xs">
                                                    <Code className="mr-1 h-3 w-3" />
                                                    Code
                                                </Badge>
                                            )}
                                            {note.tags.map(tag => (
                                                <Badge key={tag} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
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

        {/* Export Options */}
        {notes.length > 0 && (
            <Card className="p-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Export Notes</span>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => exportNotes('txt')}
                            variant="outline"
                            size="sm"
                            className="gap-1"
                        >
                            <Download className="h-3 w-3" />
                            TXT
                        </Button>
                        <Button
                            onClick={() => exportNotes('md')}
                            variant="outline"
                            size="sm"
                            className="gap-1"
                        >
                            <Download className="h-3 w-3" />
                            Markdown
                        </Button>
                        <Button
                            onClick={() => exportNotes('json')}
                            variant="outline"
                            size="sm"
                            className="gap-1"
                        >
                            <Download className="h-3 w-3" />
                            JSON
                        </Button>
                    </div>
                </div>
            </Card>
        )}

        {/* All Tags */}
        {allTags.length > 0 && (
            <Card className="p-3">
                <div className="mb-2 text-sm font-medium">All Tags</div>
                <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                        <Badge
                            key={tag}
                            variant="outline"
                            className="cursor-pointer hover:bg-accent"
                            onClick={() => setSearchQuery(tag)}
                        >
                            {tag} ({notes.filter(n => n.tags.includes(tag)).length})
                        </Badge>
                    ))}
                </div>
            </Card>
        )}
    </div>
);
}
