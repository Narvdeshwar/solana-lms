import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatNumber, calculateLevel, levelProgress, xpToNextLevel } from '@/lib/solana/helpers';
import { ProgressBar } from './progress-bar';

interface XPDisplayProps {
    xp: number;
    level?: number;
    showProgress?: boolean;
    showLevel?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    variant?: 'default' | 'compact' | 'detailed';
}

const sizeClasses = {
    sm: {
        icon: 'h-3 w-3',
        text: 'text-sm',
        level: 'text-xs',
    },
    md: {
        icon: 'h-4 w-4',
        text: 'text-base',
        level: 'text-sm',
    },
    lg: {
        icon: 'h-5 w-5',
        text: 'text-lg',
        level: 'text-base',
    },
};

export function XPDisplay({
    xp,
    level: providedLevel,
    showProgress = false,
    showLevel = true,
    size = 'md',
    className,
    variant = 'default',
}: XPDisplayProps) {
    const level = providedLevel ?? calculateLevel(xp);
    const progress = levelProgress(xp);
    const xpRemaining = xpToNextLevel(xp);
    const sizes = sizeClasses[size];

    if (variant === 'compact') {
        return (
            <div className={cn('flex items-center gap-1.5', className)}>
                <Zap className={cn(sizes.icon, 'text-yellow-500')} />
                <span className={cn('font-semibold', sizes.text)}>
                    {formatNumber(xp)}
                </span>
                {showLevel && (
                    <span className={cn('text-muted-foreground', sizes.level)}>
                        (Lv {level})
                    </span>
                )}
            </div>
        );
    }

    if (variant === 'detailed') {
        return (
            <div className={cn('space-y-3', className)}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Zap className={cn(sizes.icon, 'text-yellow-500')} />
                        <div>
                            <div className={cn('font-bold', sizes.text)}>
                                {formatNumber(xp)} XP
                            </div>
                            <div className={cn('text-muted-foreground', sizes.level)}>
                                Level {level}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={cn('text-muted-foreground', sizes.level)}>
                            Next level
                        </div>
                        <div className={cn('font-semibold', sizes.text)}>
                            {formatNumber(xpRemaining)} XP
                        </div>
                    </div>
                </div>
                {showProgress && (
                    <ProgressBar
                        value={progress}
                        size={size === 'lg' ? 'md' : 'sm'}
                        variant="success"
                    />
                )}
            </div>
        );
    }

    // Default variant
    return (
        <div className={cn('space-y-2', className)}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Zap className={cn(sizes.icon, 'text-yellow-500')} />
                    <span className={cn('font-semibold', sizes.text)}>
                        {formatNumber(xp)} XP
                    </span>
                </div>
                {showLevel && (
                    <span className={cn('font-medium', sizes.text)}>
                        Level {level}
                    </span>
                )}
            </div>
            {showProgress && (
                <ProgressBar
                    value={progress}
                    size={size === 'lg' ? 'md' : 'sm'}
                    showLabel
                />
            )}
        </div>
    );
}
