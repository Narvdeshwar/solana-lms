import BN from 'bn.js';

/**
 * Lesson Bitmap Helpers
 * Utilities for working with lesson completion bitmaps
 */

export class LessonBitmapHelper {
    /**
     * Check if a specific lesson is completed
     */
    static isLessonComplete(lessonFlags: BN[], lessonIndex: number): boolean {
        const wordIndex = Math.floor(lessonIndex / 64);
        const bitIndex = lessonIndex % 64;

        if (wordIndex >= lessonFlags.length) {
            return false;
        }

        return !lessonFlags[wordIndex].and(new BN(1).shln(bitIndex)).isZero();
    }

    /**
     * Count total completed lessons
     */
    static countCompletedLessons(lessonFlags: BN[]): number {
        return lessonFlags.reduce((sum, word) => {
            let count = 0;
            let w = word.clone();
            while (!w.isZero()) {
                count += w.and(new BN(1)).toNumber();
                w = w.shrn(1);
            }
            return sum + count;
        }, 0);
    }

    /**
     * Get array of completed lesson indices
     */
    static getCompletedLessonIndices(lessonFlags: BN[], lessonCount: number): number[] {
        const completed: number[] = [];
        for (let i = 0; i < lessonCount; i++) {
            if (LessonBitmapHelper.isLessonComplete(lessonFlags, i)) {
                completed.push(i);
            }
        }
        return completed;
    }

    /**
     * Check if all lessons are completed
     */
    static areAllLessonsComplete(lessonFlags: BN[], lessonCount: number): boolean {
        return LessonBitmapHelper.countCompletedLessons(lessonFlags) === lessonCount;
    }

    /**
     * Get completion percentage
     */
    static getCompletionPercentage(lessonFlags: BN[], lessonCount: number): number {
        if (lessonCount === 0) return 0;
        const completed = LessonBitmapHelper.countCompletedLessons(lessonFlags);
        return Math.round((completed / lessonCount) * 100);
    }
}

/**
 * XP Calculation Helpers
 */

export class XPHelper {
    /**
     * Calculate user level from total XP
     * Level = floor(sqrt(totalXP / 100))
     */
    static calculateLevel(totalXp: number): number {
        return Math.floor(Math.sqrt(totalXp / 100));
    }

    /**
     * Calculate XP required for a specific level
     */
    static xpForLevel(level: number): number {
        return level ** 2 * 100;
    }

    /**
     * Calculate XP required for next level
     */
    static xpForNextLevel(currentLevel: number): number {
        return XPHelper.xpForLevel(currentLevel + 1);
    }

    /**
     * Calculate XP remaining to next level
     */
    static xpToNextLevel(totalXp: number): number {
        const currentLevel = XPHelper.calculateLevel(totalXp);
        const nextLevelXp = XPHelper.xpForNextLevel(currentLevel);
        return Math.max(0, nextLevelXp - totalXp);
    }

    /**
     * Calculate course completion bonus XP
     * Bonus = floor((xp_per_lesson * lesson_count) / 2)
     */
    static calculateCompletionBonus(xpPerLesson: number, lessonCount: number): number {
        return Math.floor((xpPerLesson * lessonCount) / 2);
    }

    /**
     * Calculate total XP for completing a course
     */
    static calculateTotalCourseXP(xpPerLesson: number, lessonCount: number): number {
        const lessonXp = xpPerLesson * lessonCount;
        const bonusXp = XPHelper.calculateCompletionBonus(xpPerLesson, lessonCount);
        return lessonXp + bonusXp;
    }
}

/**
 * Formatting Helpers
 */

export class FormatHelper {
    /**
     * Format wallet address for display
     */
    static truncateAddress(address: string, chars = 4): string {
        if (address.length <= chars * 2) return address;
        return `${address.slice(0, chars)}...${address.slice(-chars)}`;
    }

    /**
     * Format large numbers with K/M suffixes
     */
    static formatNumber(num: number): string {
        if (num >= 1_000_000) {
            return `${(num / 1_000_000).toFixed(1)}M`;
        }
        if (num >= 1_000) {
            return `${(num / 1_000).toFixed(1)}K`;
        }
        return num.toLocaleString();
    }

    /**
     * Format duration in minutes to human-readable string
     */
    static formatDuration(minutes: number): string {
        if (minutes < 60) {
            return `${minutes}m`;
        }
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }

    /**
     * Format date relative to now
     */
    static formatRelativeDate(date: Date): string {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffSecs < 60) return 'just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
        return `${Math.floor(diffDays / 365)}y ago`;
    }

    /**
     * Format percentage
     */
    static formatPercentage(value: number, decimals = 0): string {
        return `${value.toFixed(decimals)}%`;
    }
}

/**
 * Validation Helpers
 */

export class ValidationHelper {
    /**
     * Validate Solana address
     */
    static isValidAddress(address: string): boolean {
        try {
            new PublicKey(address);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Validate course ID format
     */
    static isValidCourseId(courseId: string): boolean {
        return /^[a-z0-9-]+$/.test(courseId) && courseId.length > 0 && courseId.length <= 32;
    }

    /**
     * Validate achievement ID format
     */
    static isValidAchievementId(achievementId: string): boolean {
        return /^[a-z0-9-]+$/.test(achievementId) && achievementId.length > 0 && achievementId.length <= 32;
    }

    /**
     * Validate lesson index
     */
    static isValidLessonIndex(index: number, lessonCount: number): boolean {
        return Number.isInteger(index) && index >= 0 && index < lessonCount;
    }
}

/**
 * Convenience exports
 */
import { PublicKey } from '@solana/web3.js';

export const {
    isLessonComplete,
    countCompletedLessons,
    getCompletedLessonIndices,
    areAllLessonsComplete,
    getCompletionPercentage,
} = LessonBitmapHelper;

export const {
    calculateLevel,
    xpForLevel,
    xpForNextLevel,
    xpToNextLevel,
    calculateCompletionBonus,
    calculateTotalCourseXP,
} = XPHelper;

export const {
    truncateAddress,
    formatNumber,
    formatDuration,
    formatRelativeDate,
    formatPercentage,
} = FormatHelper;

export const {
    isValidAddress,
    isValidCourseId,
    isValidAchievementId,
    isValidLessonIndex,
} = ValidationHelper;
