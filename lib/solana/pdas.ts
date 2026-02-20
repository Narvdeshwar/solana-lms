import { PublicKey } from '@solana/web3.js';
import { PROGRAM_ID, SEEDS } from '@/lib/constants';

/**
 * PDA Derivation Utilities
 * Centralized location for all PDA derivations
 */

export class PDAHelper {
    /**
     * Derive Config PDA (singleton)
     */
    static getConfigPDA(): [PublicKey, number] {
        return PublicKey.findProgramAddressSync(
            [Buffer.from(SEEDS.CONFIG)],
            PROGRAM_ID
        );
    }

    /**
     * Derive Course PDA
     */
    static getCoursePDA(courseId: string): [PublicKey, number] {
        return PublicKey.findProgramAddressSync(
            [Buffer.from(SEEDS.COURSE), Buffer.from(courseId)],
            PROGRAM_ID
        );
    }

    /**
     * Derive Enrollment PDA
     */
    static getEnrollmentPDA(courseId: string, learner: PublicKey): [PublicKey, number] {
        return PublicKey.findProgramAddressSync(
            [Buffer.from(SEEDS.ENROLLMENT), Buffer.from(courseId), learner.toBuffer()],
            PROGRAM_ID
        );
    }

    /**
     * Derive MinterRole PDA
     */
    static getMinterRolePDA(minter: PublicKey): [PublicKey, number] {
        return PublicKey.findProgramAddressSync(
            [Buffer.from(SEEDS.MINTER), minter.toBuffer()],
            PROGRAM_ID
        );
    }

    /**
     * Derive AchievementType PDA
     */
    static getAchievementTypePDA(achievementId: string): [PublicKey, number] {
        return PublicKey.findProgramAddressSync(
            [Buffer.from(SEEDS.ACHIEVEMENT), Buffer.from(achievementId)],
            PROGRAM_ID
        );
    }

    /**
     * Derive AchievementReceipt PDA
     */
    static getAchievementReceiptPDA(
        achievementId: string,
        recipient: PublicKey
    ): [PublicKey, number] {
        return PublicKey.findProgramAddressSync(
            [
                Buffer.from(SEEDS.ACHIEVEMENT_RECEIPT),
                Buffer.from(achievementId),
                recipient.toBuffer(),
            ],
            PROGRAM_ID
        );
    }

    /**
     * Batch derive multiple PDAs
     */
    static batchDerive(operations: Array<{
        type: 'config' | 'course' | 'enrollment' | 'minter' | 'achievement' | 'receipt';
        params?: any;
    }>): PublicKey[] {
        return operations.map(op => {
            switch (op.type) {
                case 'config':
                    return this.getConfigPDA()[0];
                case 'course':
                    return this.getCoursePDA(op.params.courseId)[0];
                case 'enrollment':
                    return this.getEnrollmentPDA(op.params.courseId, op.params.learner)[0];
                case 'minter':
                    return this.getMinterRolePDA(op.params.minter)[0];
                case 'achievement':
                    return this.getAchievementTypePDA(op.params.achievementId)[0];
                case 'receipt':
                    return this.getAchievementReceiptPDA(
                        op.params.achievementId,
                        op.params.recipient
                    )[0];
                default:
                    throw new Error(`Unknown PDA type: ${op.type}`);
            }
        });
    }
}

/**
 * Convenience exports for common PDA derivations
 */
export const getConfigPDA = PDAHelper.getConfigPDA;
export const getCoursePDA = PDAHelper.getCoursePDA;
export const getEnrollmentPDA = PDAHelper.getEnrollmentPDA;
export const getMinterRolePDA = PDAHelper.getMinterRolePDA;
export const getAchievementTypePDA = PDAHelper.getAchievementTypePDA;
export const getAchievementReceiptPDA = PDAHelper.getAchievementReceiptPDA;
