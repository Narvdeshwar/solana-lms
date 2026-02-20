import type { CompletionResult, ValidationProof } from '@/types';
import { API_ENDPOINTS } from '@/lib/constants';

/**
 * Completion Service
 * Handles lesson completion with backend co-signing
 */
export class CompletionService {
    /**
     * Complete a lesson (backend-signed transaction)
     */
    static async completeLesson(
        courseId: string,
        lessonIndex: number,
        userId: string,
        validationProof: ValidationProof
    ): Promise<CompletionResult> {
        try {
            const response = await fetch(API_ENDPOINTS.COMPLETE_LESSON, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId,
                    lessonIndex,
                    userId,
                    validationProof,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to complete lesson');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error completing lesson:', error);
            throw error;
        }
    }

    /**
     * Validate lesson completion criteria
     */
    static async validateLessonCompletion(
        lessonId: string,
        userResponse: unknown
    ): Promise<ValidationProof> {
        // In production, validate the user's response
        // For challenges, check if all test cases pass
        // For reading lessons, check if time threshold met

        return {
            lessonId,
            timestamp: Date.now(),
            signature: 'mock-signature', // Backend signature
        };
    }

    /**
     * Mark lesson as complete locally (optimistic update)
     */
    static markLessonCompleteLocally(
        courseId: string,
        lessonIndex: number
    ): void {
        const key = `lesson_progress_${courseId}`;
        const stored = localStorage.getItem(key);
        const progress = stored ? JSON.parse(stored) : { completed: [] };

        if (!progress.completed.includes(lessonIndex)) {
            progress.completed.push(lessonIndex);
            progress.completed.sort((a: number, b: number) => a - b);
            localStorage.setItem(key, JSON.stringify(progress));
        }
    }

    /**
     * Get locally stored progress
     */
    static getLocalProgress(courseId: string): number[] {
        const key = `lesson_progress_${courseId}`;
        const stored = localStorage.getItem(key);
        if (!stored) return [];

        try {
            const progress = JSON.parse(stored);
            return progress.completed || [];
        } catch {
            return [];
        }
    }
}
