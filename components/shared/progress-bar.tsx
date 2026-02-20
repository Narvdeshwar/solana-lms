import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { formatPercentage } from '@/lib/solana/helpers';

interface ProgressBarProps {
    value: number;
    max?: number;
    showLabel?: boolean;
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    variant?: 'default' | 'success' | 'warning';
}

const sizeClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
};

const variantClasses = {
    default: '',
    success: '[&>div]:bg-green-500',
    warning: '[&>div]:bg-yellow-500',
};

export function ProgressBar({
    value,
    max = 100,
    showLabel = false,
    label,
    size = 'md',
    className,
    variant = 'default',
}: ProgressBarProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div className={cn('w-full space-y-2', className)}>
            {(showLabel || label) && (
                <div className="flex items-center justify-between text-sm">
                    {label && <span className="font-medium">{label}</span>}
                    {showLabel && (
                        <span className="text-muted-foreground">
                            {formatPercentage(percentage)}
                        </span>
                    )}
                </div>
            )}
            <Progress
                value={percentage}
                className={cn(sizeClasses[size], variantClasses[variant])}
            />
        </div>
    );
}
