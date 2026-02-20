import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Calculate user level from total XP
 * Level = floor(sqrt(totalXP / 100))
 */
export function calculateLevel(totalXp: number): number {
    return Math.floor(Math.sqrt(totalXp / 100));
}

/**
 * Calculate XP required for next level
 */
export function xpForNextLevel(currentLevel: number): number {
    return (currentLevel + 1) ** 2 * 100;
}

/**
 * Calculate progress to next level (0-100)
 */
export function levelProgress(totalXp: number): number {
    const currentLevel = calculateLevel(totalXp);
    const currentLevelXp = currentLevel ** 2 * 100;
    const nextLevelXp = xpForNextLevel(currentLevel);
    const xpInCurrentLevel = totalXp - currentLevelXp;
    const xpNeededForLevel = nextLevelXp - currentLevelXp;
    return (xpInCurrentLevel / xpNeededForLevel) * 100;
}

/**
 * Format wallet address for display
 */
export function truncateAddress(address: string, chars = 4): string {
    return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Format large numbers with K/M suffixes
 */
export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
}
