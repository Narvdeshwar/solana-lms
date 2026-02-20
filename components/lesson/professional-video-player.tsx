'use client';

import { useEffect, useRef, useState } from 'react';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, BookmarkPlus, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoBookmark {
    id: string;
    time: number;
    label: string;
}

interface ProfessionalVideoPlayerProps {
    src?: string;
    title: string;
    duration?: number;
    onProgress?: (currentTime: number, duration: number) => void;
    onComplete?: () => void;
    resumeFrom?: number;
    bookmarks?: VideoBookmark[];
    className?: string;
}

export function ProfessionalVideoPlayer({
    src,
    title,
    duration = 0,
    onProgress,
    onComplete,
    resumeFrom = 0,
    bookmarks = [],
    className,
}: ProfessionalVideoPlayerProps) {
    const playerRef = useRef<any>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(duration);
    const [isReady, setIsReady] = useState(false);
    const [showBookmarks, setShowBookmarks] = useState(false);
    const [customBookmarks, setCustomBookmarks] = useState<VideoBookmark[]>(bookmarks);

    // Plyr options
    const plyrOptions = {
        controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            'captions',
            'settings',
            'pip',
            'airplay',
            'fullscreen',
        ],
        settings: ['captions', 'quality', 'speed'],
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
        quality: {
            default: 720,
            options: [360, 720, 1080],
        },
        keyboard: {
            focused: true,
            global: false,
        },
    };

    // Set up event listeners when player is ready
    useEffect(() => {
        const player = playerRef.current?.plyr;
        if (!player || !src) return;

        // Resume from saved position
        if (resumeFrom > 0) {
            player.currentTime = resumeFrom;
        } else if (src) {
            const savedProgress = localStorage.getItem(`video-progress-${src}`);
            if (savedProgress) {
                player.currentTime = parseFloat(savedProgress);
            }
        }

        // Set up event listeners
        player.on('ready', () => {
            setIsReady(true);
            setVideoDuration(player.duration);
        });

        player.on('timeupdate', () => {
            const current = player.currentTime;
            const total = player.duration;
            setCurrentTime(current);
            onProgress?.(current, total);

            // Save progress to localStorage
            if (src) {
                localStorage.setItem(`video-progress-${src}`, current.toString());
            }
        });

        player.on('ended', () => {
            onComplete?.();
            // Clear saved progress
            if (src) {
                localStorage.removeItem(`video-progress-${src}`);
            }
        });
    }, [src, resumeFrom, onProgress, onComplete]);

    // Add bookmark at current time
    const addBookmark = () => {
        if (!playerRef.current?.plyr) return;

        const time = playerRef.current.plyr.currentTime;
        const newBookmark: VideoBookmark = {
            id: Date.now().toString(),
            time,
            label: `Bookmark at ${formatTime(time)}`,
        };

        setCustomBookmarks([...customBookmarks, newBookmark]);

        // Save to localStorage
        if (src) {
            const saved = [...customBookmarks, newBookmark];
            localStorage.setItem(`video-bookmarks-${src}`, JSON.stringify(saved));
        }
    };

    // Jump to bookmark
    const jumpToBookmark = (time: number) => {
        if (playerRef.current?.plyr) {
            playerRef.current.plyr.currentTime = time;
        }
    };

    // Delete bookmark
    const deleteBookmark = (id: string) => {
        const updated = customBookmarks.filter((b) => b.id !== id);
        setCustomBookmarks(updated);

        if (src) {
            localStorage.setItem(`video-bookmarks-${src}`, JSON.stringify(updated));
        }
    };

    // Format time helper
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Calculate progress percentage
    const progressPercentage = videoDuration > 0 ? (currentTime / videoDuration) * 100 : 0;

    // Placeholder when no video source
    if (!src) {
        return (
            <div className={cn('relative overflow-hidden rounded-lg bg-muted', className)}>
                <div className="flex aspect-video flex-col items-center justify-center p-8 text-center">
                    <Play className="h-16 w-16 text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Video content will be available soon
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn('space-y-4', className)}>
            {/* Video Player */}
            <div className="overflow-hidden rounded-lg">
                <Plyr
                    ref={playerRef}
                    source={{
                        type: 'video',
                        sources: [
                            {
                                src: src,
                                type: 'video/mp4',
                                size: 720,
                            },
                        ],
                    }}
                    options={plyrOptions}
                />
            </div>

            {/* Video Info & Controls */}
            <Card className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h3 className="font-semibold">{title}</h3>
                        <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {formatTime(currentTime)} / {formatTime(videoDuration)}
                            </span>
                            <span>{Math.round(progressPercentage)}% complete</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => setShowBookmarks(!showBookmarks)}
                            variant="outline"
                            size="sm"
                            className="gap-2"
                        >
                            <BookmarkPlus className="h-4 w-4" />
                            Bookmarks ({customBookmarks.length})
                        </Button>
                        <Button onClick={addBookmark} size="sm" className="gap-2">
                            <BookmarkPlus className="h-4 w-4" />
                            Add Bookmark
                        </Button>
                    </div>
                </div>

                {/* Bookmarks Panel */}
                {showBookmarks && (
                    <div className="mt-4 space-y-2 border-t pt-4">
                        <h4 className="text-sm font-semibold">Video Bookmarks</h4>
                        {customBookmarks.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No bookmarks yet. Add bookmarks to mark important moments.
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {customBookmarks.map((bookmark) => (
                                    <div
                                        key={bookmark.id}
                                        className="flex items-center justify-between rounded-md border p-2 hover:bg-accent"
                                    >
                                        <button
                                            onClick={() => jumpToBookmark(bookmark.time)}
                                            className="flex-1 text-left text-sm"
                                        >
                                            <span className="font-medium">
                                                {formatTime(bookmark.time)}
                                            </span>
                                            <span className="ml-2 text-muted-foreground">
                                                {bookmark.label}
                                            </span>
                                        </button>
                                        <Button
                                            onClick={() => deleteBookmark(bookmark.id)}
                                            variant="ghost"
                                            size="sm"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </Card>

            {/* Keyboard Shortcuts Info */}
            <Card className="p-4">
                <h4 className="mb-2 text-sm font-semibold">Keyboard Shortcuts</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground md:grid-cols-4">
                    <div>
                        <kbd className="rounded bg-muted px-2 py-1">Space</kbd> Play/Pause
                    </div>
                    <div>
                        <kbd className="rounded bg-muted px-2 py-1">←/→</kbd> Seek ±5s
                    </div>
                    <div>
                        <kbd className="rounded bg-muted px-2 py-1">↑/↓</kbd> Volume
                    </div>
                    <div>
                        <kbd className="rounded bg-muted px-2 py-1">F</kbd> Fullscreen
                    </div>
                    <div>
                        <kbd className="rounded bg-muted px-2 py-1">M</kbd> Mute
                    </div>
                    <div>
                        <kbd className="rounded bg-muted px-2 py-1">C</kbd> Captions
                    </div>
                    <div>
                        <kbd className="rounded bg-muted px-2 py-1">0-9</kbd> Jump to %
                    </div>
                    <div>
                        <kbd className="rounded bg-muted px-2 py-1">Shift+&gt;</kbd> Speed up
                    </div>
                </div>
            </Card>
        </div>
    );
}
