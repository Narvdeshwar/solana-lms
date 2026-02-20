import { PublicKey } from '@solana/web3.js';
import { getProgram } from '@/lib/solana/program';
import { getEnrollmentPDA, getCoursePDA } from '@/lib/solana/pdas';
import { countCompletedLessons, getCompletionPercentage } from '@/lib/solana/helpers';
import type { EnrollmentStatus, CourseProgress } from '@/types';

/**
 * Learning Progress Service
 * Handles course enrollment and progress tracking
 */
export class LearningProgressService {
    /**
     * Get enrollment status for a course
     */
    static async getEnrollmentStatus(
        courseId: string,
        learnerAddress: string
    ): Promise<EnrollmentStatus> {
        try {
            const learner = new PublicKey(learnerAddress);
            const [enrollmentPda] = getEnrollmentPDA(courseId, learner);
            const program = getProgram();

            // Fetch enrollment account
            const enrollment = await program.provider.connection.getAccountInfo(enrollmentPda);

            if (!enrollment) {
                return {
                    isEnrolled: false,
                };
            }

            // In production, decode the account data
            // For now, return mock data
            return {
                isEnrolled: true,
                enrolledAt: new Date(),
                completedAt: undefined,
                credentialAsset: undefined,
            };
        } catch (error) {
            console.error('Error fetching enrollment status:', error);
            return {
                isEnrolled: false,
            };
        }
    }

    /**
     * Get course progress for a learner
     */
    static async getCourseProgress(
        courseId: string,
        learnerAddress: string
    ): Promise<CourseProgress | null> {
        try {
            const learner = new PublicKey(learnerAddress);
            const [enrollmentPda] = getEnrollmentPDA(courseId, learner);
            const program = getProgram();

            // Fetch enrollment account
            const enrollment = await program.provider.connection.getAccountInfo(enrollmentPda);

            if (!enrollment) {
                return null;
            }

            // In production, decode the account data and extract lesson_flags
            // For now, return mock data
            const lessonFlags = []; // BN[] from on-chain
            const totalLessons = 10; // From course account

            return {
                totalLessons,
                completedLessons: countCompletedLessons(lessonFlags),
                percentComplete: getCompletionPercentage(lessonFlags, totalLessons),
                lessonFlags,
            };
        } catch (error) {
            console.error('Error fetching course progress:', error);
            return null;
        }
    }

    /**
     * Enroll in a course (learner-signed transaction)
     */
    static async enrollInCourse(
        courseId: string,
        learnerAddress: string,
        signTransaction: (tx: any) => Promise<any>
    ): Promise<string> {
        try {
            const learner = new PublicKey(learnerAddress);
            const [coursePda] = getCoursePDA(courseId);
            const [enrollmentPda] = getEnrollmentPDA(courseId, learner);

            // In production, build the actual transaction
            // For now, return a mock signature
            console.log('Enrolling in course:', {
                courseId,
                coursePda: coursePda.toBase58(),
                enrollmentPda: enrollmentPda.toBase58(),
                learner: learner.toBase58(),
            });

            // Build transaction
            // const tx = await program.methods
            //   .enroll(courseId)
            //   .accounts({ course: coursePda, enrollment: enrollmentPda, learner })
            //   .transaction();

            // Sign and send
            // const signed = await signTransaction(tx);
            // const signature = await connection.sendRawTransaction(signed.serialize());

            return 'mock-signature-' + Date.now();
        } catch (error) {
            console.error('Error enrolling in course:', error);
            throw error;
        }
    }

    /**
     * Check if prerequisites are met
     */
    static async checkPrerequisites(
        courseId: string,
        learnerAddress: string
    ): Promise<boolean> {
        try {
            // In production, fetch the course and check prerequisite
            // Then verify the prerequisite enrollment is completed
            return true;
        } catch (error) {
            console.error('Error checking prerequisites:', error);
            return false;
        }
    }

    /**
     * Get completed lesson indices
     */
    static async getCompletedLessons(
        courseId: string,
        learnerAddress: string
    ): Promise<number[]> {
        try {
            const progress = await this.getCourseProgress(courseId, learnerAddress);
            if (!progress) return [];

            // In production, use getCompletedLessonIndices helper
            return [];
        } catch (error) {
            console.error('Error fetching completed lessons:', error);
            return [];
        }
    }
}
