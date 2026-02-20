'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
    src?: string;
    title: string;
    onProgress?: (progress: number) => void;
    onComplete?: () => void;
    className?: string;
}

export function VideoPlayer({
    src,
    title,
    onProgress,
    onComplete,
    className,
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [showControls, setShowControls] = useState(true);

    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            const current = video.currentTime;
            const total = video.duration;
            setCurrentTime(current);
            setProgress((current / total) * 100);
            onProgress?.(current / total);
        };

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            onComplete?.();
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleEnded);
        };
    }, [onProgress, onComplete]);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) return;

        const newTime = (parseFloat(e.target.value) / 100) * duration;
        video.currentTime = newTime;
        setProgress(parseFloat(e.target.value));
    };

    const changeSpeed = () => {
        const video = videoRef.current;
        if (!video) return;

        const currentIndex = speeds.indexOf(playbackSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        const newSpeed = speeds[nextIndex];
        video.playbackRate = newSpeed;
        setPlaybackSpeed(newSpeed);
    };

    const toggleFullscreen = () => {
        const video = videoRef.current;
        if (!video) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            video.requestFullscreen();
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Placeholder when no video source
    if (!src) {
        return (
            <div className={cn('relative aspect-video overflow-hidden rounded-lg bg-muted', className)}>
                <div className="flex h-full flex-col items-center justify-center p-8 text-center">
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
        <div
            className={cn('relative aspect-video overflow-hidden rounded-lg bg-black', className)}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(isPlaying ? false : true)}
        >
            <video
                ref={videoRef}
                src={src}
                className="h-full w-full"
                onClick={togglePlay}
            />

            {/* Controls Overlay */}
            <div
                className={cn(
                    'absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity',
                    showControls ? 'opacity-100' : 'opacity-0'
                )}
            >
                {/* Play/Pause Button (Center) */}
                {!isPlaying && (
                    <button
                        onClick={togglePlay}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 p-6 backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
                    >
                        <Play className="h-12 w-12 text-white" />
                    </button>
                )}

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                    {/* Progress Bar */}
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleSeek}
                        className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    />

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={togglePlay}
                                size="sm"
                                variant="ghost"
                                className="text-white hover:bg-white/20"
                            >
                                {isPlaying ? (
                                    <Pause className="h-5 w-5" />
                                ) : (
                                    <Play className="h-5 w-5" />
                                )}
                            </Button>

                            <Button
                                onClick={toggleMute}
                                size="sm"
                                variant="ghost"
                                className="text-white hover:bg-white/20"
                            >
                                {isMuted ? (
                                    <VolumeX className="h-5 w-5" />
                                ) : (
                                    <Volume2 className="h-5 w-5" />
                                )}
                            </Button>

                            <span className="text-sm text-white">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                onClick={changeSpeed}
                                size="sm"
                                variant="ghost"
                                className="text-white hover:bg-white/20"
                            >
                                <Settings className="h-4 w-4 mr-1" />
                                {playbackSpeed}x
                            </Button>

                            <Button
                                onClick={toggleFullscreen}
                                size="sm"
                                variant="ghost"
                                className="text-white hover:bg-white/20"
                            >
                                <Maximize className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
