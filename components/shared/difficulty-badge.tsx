import { Badge } from '@/components/ui/badge';
import { DIFFICULTY, DIFFICULTY_LABELS } from '@/lib/constants';
import type { Difficulty } from '@/types';

interface DifficultyBadgeProps {
    difficulty: Difficulty;
    className?: string;
}

const difficultyVariants = {
    [DIFFICULTY.BEGINNER]: 'success' as const,
    [DIFFICULTY.INTERMEDIATE]: 'warning' as const,
    [DIFFICULTY.ADVANCED]: 'destructive' as const,
};

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
    return (
        <Badge variant={difficultyVariants[difficulty]} className={className}>
            {DIFFICULTY_LABELS[difficulty]}
        </Badge>
    );
}
