import { PublicKey } from '@solana/web3.js';

// Program IDs
export const PROGRAM_ID = new PublicKey(
    process.env.NEXT_PUBLIC_PROGRAM_ID || 'ACADBRCB3zGvo1KSCbkztS33ZNzeBv2d7bqGceti3ucf'
);

export const XP_MINT = new PublicKey(
    process.env.NEXT_PUBLIC_XP_MINT || 'xpXPUjkfk7t4AJF1tYUoyAYxzuM5DhinZWS1WjfjAu3'
);

export const AUTHORITY = new PublicKey(
    process.env.NEXT_PUBLIC_AUTHORITY || 'ACAd3USj2sMV6drKcMY2wZtNkhVDHWpC4tfJe93hgqYn'
);

export const TOKEN_2022_PROGRAM_ID = new PublicKey(
    'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
);

export const MPL_CORE_PROGRAM_ID = new PublicKey(
    'CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d'
);

// Network
export const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
export const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';
export const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || '';

// PDA Seeds
export const SEEDS = {
    CONFIG: 'config',
    COURSE: 'course',
    ENROLLMENT: 'enrollment',
    MINTER: 'minter',
    ACHIEVEMENT: 'achievement',
    ACHIEVEMENT_RECEIPT: 'achievement_receipt',
} as const;

// XP Rewards
export const XP_REWARDS = {
    LESSON_MIN: 10,
    LESSON_MAX: 50,
    CHALLENGE_MIN: 25,
    CHALLENGE_MAX: 100,
    COURSE_MIN: 500,
    COURSE_MAX: 2000,
    DAILY_STREAK: 10,
    FIRST_DAILY: 25,
} as const;

// Difficulty Levels
export const DIFFICULTY = {
    BEGINNER: 1,
    INTERMEDIATE: 2,
    ADVANCED: 3,
} as const;

export const DIFFICULTY_LABELS = {
    [DIFFICULTY.BEGINNER]: 'Beginner',
    [DIFFICULTY.INTERMEDIATE]: 'Intermediate',
    [DIFFICULTY.ADVANCED]: 'Advanced',
} as const;

// Achievement Categories
export const ACHIEVEMENT_CATEGORIES = {
    PROGRESS: 'progress',
    STREAK: 'streak',
    SKILL: 'skill',
    COMMUNITY: 'community',
    SPECIAL: 'special',
} as const;

// Streak Milestones
export const STREAK_MILESTONES = [7, 30, 100] as const;

// Pagination
export const ITEMS_PER_PAGE = {
    COURSES: 12,
    LEADERBOARD: 50,
    ACHIEVEMENTS: 20,
} as const;

// Routes
export const ROUTES = {
    HOME: '/',
    COURSES: '/courses',
    COURSE_DETAIL: (slug: string) => `/courses/${slug}`,
    LESSON: (courseSlug: string, lessonId: string) => `/courses/${courseSlug}/lessons/${lessonId}`,
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    USER_PROFILE: (username: string) => `/profile/${username}`,
    LEADERBOARD: '/leaderboard',
    LEARNING: '/learning',
    FORUMS: '/forums',
    FORUM_COURSE: (courseId: string) => `/forums/${courseId}`,
    FORUM_THREAD: (courseId: string, threadId: string) => `/forums/${courseId}/${threadId}`,
    GROUPS: '/groups',
    GROUP_DETAIL: (groupId: string) => `/groups/${groupId}`,
    INSTRUCTOR: '/instructor',
    PEER_LEARNING: '/peer-learning',
    SETTINGS: '/settings',
    WISHLIST: '/wishlist',
    CERTIFICATE: (id: string) => `/certificates/${id}`,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
    STREAK_DATA: 'academy_streak_data',
    LESSON_PROGRESS: 'academy_lesson_progress',
    CODE_CACHE: 'academy_code_cache',
    THEME: 'academy_theme',
    LANGUAGE: 'academy_language',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
    COMPLETE_LESSON: '/api/lessons/complete',
    FINALIZE_COURSE: '/api/courses/finalize',
    CLAIM_ACHIEVEMENT: '/api/achievements/claim',
    REWARD_XP: '/api/xp/reward',
} as const;
