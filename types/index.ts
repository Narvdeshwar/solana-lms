import { PublicKey } from '@solana/web3.js';

// ============================================================================
// Core Types
// ============================================================================

export type Difficulty = 1 | 2 | 3;

export type LessonType = 'reading' | 'challenge' | 'quiz';

export type AchievementCategory = 'progress' | 'streak' | 'skill' | 'community' | 'special';

export type LeaderboardPeriod = 'weekly' | 'monthly' | 'all-time';

// ============================================================================
// User & Authentication
// ============================================================================

export interface User {
    id: string;
    email: string;
    username: string;
    displayName: string;
    avatar?: string;
    bio?: string;
    joinedAt: Date;
    linkedAccounts: LinkedAccount[];
    linkedWallets: string[];
    preferences: UserPreferences;
}

export interface LinkedAccount {
    provider: 'google' | 'github';
    providerId: string;
    email: string;
    linkedAt: Date;
}

export interface UserPreferences {
    language: 'en' | 'pt-BR' | 'es';
    theme: 'light' | 'dark' | 'system';
    emailNotifications: boolean;
    achievementNotifications: boolean;
}

// ============================================================================
// Course & Lesson
// ============================================================================

export interface Course {
    id: string;
    slug: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    duration: number; // hours
    xpPerLesson: number;
    totalXp: number;
    trackId: number;
    trackLevel: number;
    prerequisite?: string;
    modules: Module[];
    lessonCount: number;
    creator: string;
    creatorName: string;
    isActive: boolean;
    publishedAt: Date;
    updatedAt: Date;
    courseId: string; // On-chain course ID
    contentTxId: string;
    coverImage?: string;
    rating?: number;
    studentCount?: number;
    language?: string;
    lastUpdated?: Date;
    isBestseller?: boolean;
    isNew?: boolean;
}

export interface Module {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
    order: number;
}

export interface Lesson {
    id: string;
    title: string;
    type: LessonType;
    order: number;
    estimatedMinutes: number;
    content: any[]; // Portable Text from Sanity
    challenge?: Challenge;
    quiz?: QuizQuestion[];
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
}

export interface Challenge {
    id: string;
    description: string;
    starterCode: string;
    language: 'rust' | 'typescript' | 'json';
    testCases: TestCase[];
    hints?: Hint[];
    solution?: string;
    solutionExplanation?: string;
}

export interface Hint {
    id: string;
    text: string;
    order: number;
}

export interface TestCase {
    id: string;
    description: string;
    input: string;
    expectedOutput: string;
    isHidden: boolean;
}

// ============================================================================
// Enrollment & Progress
// ============================================================================

export interface Enrollment {
    courseId: string;
    userId: string;
    walletAddress: string;
    enrolledAt: Date;
    completedAt?: Date;
    completedLessons: number[];
    percentComplete: number;
    enrollmentPda: string;
    lessonFlags: number[];
    credentialAsset?: string;
    xpEarned: number;
    estimatedTimeRemaining: number;
}

export interface EnrollmentStatus {
    isEnrolled: boolean;
    enrolledAt?: Date;
    completedAt?: Date;
    credentialAsset?: string;
}

export interface CourseProgress {
    totalLessons: number;
    completedLessons: number;
    percentComplete: number;
    lessonFlags: number[];
}

// ============================================================================
// Achievements & Credentials
// ============================================================================

export interface Achievement {
    id: string;
    name: string;
    description: string;
    category: AchievementCategory;
    icon: string;
    xpReward: number;
    requirements: Record<string, any>;
    isActive: boolean;
    createdAt: Date;
}

export interface UserAchievement {
    achievementId: string;
    userId: string;
    walletAddress: string;
    earnedAt: Date;
    assetAddress: string;
    transactionSignature: string;
}

export interface Credential {
    assetAddress: string;
    trackId: number;
    trackName: string;
    level: number;
    name: string;
    description: string;
    imageUri: string;
    metadataUri: string;
    coursesCompleted: number;
    totalXp: number;
    issuedAt: Date;
    lastUpgradedAt?: Date;
    recipient: string;
    collectionAddress: string;
    transactionSignature: string;
}

// ============================================================================
// Leaderboard & Stats
// ============================================================================

export interface LeaderboardEntry {
    rank: number;
    userId: string;
    username: string;
    avatar?: string;
    walletAddress: string;
    xpBalance: number;
    level: number;
    xpGained?: number;
    rankChange?: number;
}

export interface LeaderboardData {
    period: LeaderboardPeriod;
    entries: LeaderboardEntry[];
    totalUsers: number;
    currentPage: number;
    totalPages: number;
    userRank?: number;
    userEntry?: LeaderboardEntry;
}

// ============================================================================
// Streak
// ============================================================================

export interface Streak {
    userId: string;
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: Date;
    activityCalendar: ActivityDay[];
}

export interface ActivityDay {
    date: Date;
    hasActivity: boolean;
    lessonsCompleted: number;
    xpEarned: number;
}

// ============================================================================
// Service Layer Types
// ============================================================================

export interface CompletionResult {
    success: boolean;
    xpAwarded: number;
    transactionSignature: string;
    newTotalXp: number;
}

export interface FinalizationResult {
    success: boolean;
    bonusXp: number;
    credentialIssued: boolean;
    credentialAsset?: string;
    transactionSignature: string;
}

export interface ValidationProof {
    lessonId: string;
    timestamp: number;
    signature: string;
}

export interface AchievementClaimResult {
    success: boolean;
    assetAddress: string;
    xpAwarded: number;
    transactionSignature: string;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// ============================================================================
// Component Props Types
// ============================================================================

export interface BaseComponentProps {
    className?: string;
    children?: React.ReactNode;
}

export interface CourseCardProps extends BaseComponentProps {
    course: Course;
    progress?: number;
    showProgress?: boolean;
}

export interface LessonCardProps extends BaseComponentProps {
    lesson: Lesson;
    isCompleted: boolean;
    isLocked: boolean;
    onStart?: () => void;
}

export interface ProgressBarProps extends BaseComponentProps {
    value: number;
    max?: number;
    showLabel?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export interface XPDisplayProps extends BaseComponentProps {
    xp: number;
    level: number;
    showProgress?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export interface BadgeProps extends BaseComponentProps {
    achievement: Achievement | UserAchievement;
    size?: 'sm' | 'md' | 'lg';
    showDetails?: boolean;
}
