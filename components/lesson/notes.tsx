'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Save, Trash2, Plus, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Note {
    id: string;
    content: string;
    timestamp: Date;
    lessonId: string;
}

interface NotesProps {
    lessonId: string;
    initialNotes?: Note[];
    onSave?: (notes: Note[]) => void;
    className?: string;
}

export function Notes({ lessonId, initialNotes = [], onSave, className }: NotesProps) {
    const [notes, setNotes] = useState<Note[]>(initialNotes);
    const [currentNote, setCurrentNote] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleAddNote = () => {
        if (!currentNote.trim()) return;

        const newNote: Note = {
            id: Date.now().toString(),
            content: currentNote,
            timestamp: new Date(),
            lessonId,
        };

        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        setCurrentNote('');
        setIsEditing(false);
        onSave?.(updatedNotes);
    };

    const handleDeleteNote = (noteId: string) => {
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        setNotes(updatedNotes);
        onSave?.(updatedNotes);
    };

    const formatTimestamp = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <div className={cn('space-y-4', className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">My Notes ({notes.length})</h3>
                {!isEditing && (
                    <Button
                        onClick={() => setIsEditing(true)}
                        size="sm"
                        variant="outline"
                        className="gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Add Note
                    </Button>
                )}
            </div>

            {/* New Note Editor */}
            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <Card className="p-4">
                            <textarea
                                value={currentNote}
                                onChange={(e) => setCurrentNote(e.target.value)}
                                placeholder="Write your note here..."
                                className="w-full min-h-[120px] resize-none rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                autoFocus
                            />
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
                {notes.length === 0 ? (
                    <Card className="p-8 text-center">
                        <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                        <p className="mt-2 text-sm text-muted-foreground">
                            No notes yet. Add your first note to remember key concepts!
                        </p>
                    </Card>
                ) : (
                    <AnimatePresence>
                        {notes.map((note) => (
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
                                            <p className="text-sm whitespace-pre-wrap">
                                                {note.content}
                                            </p>
                                            <p className="mt-2 text-xs text-muted-foreground">
                                                {formatTimestamp(note.timestamp)}
                                            </p>
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

            {/* Export Button */}
            {notes.length > 0 && (
                <Button
                    onClick={() => {
                        const notesText = notes
                            .map((note) => `[${formatTimestamp(note.timestamp)}]\n${note.content}`)
                            .join('\n\n---\n\n');
                        const blob = new Blob([notesText], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `lesson-${lessonId}-notes.txt`;
                        a.click();
                        URL.revokeObjectURL(url);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                >
                    <FileText className="h-4 w-4" />
                    Export Notes
                </Button>
            )}
        </div>
    );
}
