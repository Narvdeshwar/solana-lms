/**
 * Centralized Mock Data
 * Import only what you need to reduce bundle size
 * Example: import { MOCK_COURSES } from '@/lib/mock-data';
 */

import type { Course, Module, LeaderboardEntry } from '@/types';
import { DIFFICULTY } from '@/lib/constants';

// ============================================================================
// COURSES
// ============================================================================

// ============================================================================
// INSTRUCTORS
// ============================================================================

export interface MockInstructor {
    id: string;
    name: string;
    avatar: string;
    title: string;
    bio: string;
}

export const MOCK_INSTRUCTORS: Record<string, MockInstructor> = {
    'creator1': {
        id: 'creator1',
        name: 'Solana Foundation',
        avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=solana',
        title: 'Core Team',
        bio: 'Official Solana Foundation education team',
    },
    'creator2': {
        id: 'creator2',
        name: 'Coral Team',
        avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=coral',
        title: 'Anchor Framework Creators',
        bio: 'Building developer tools for Solana',
    },
    'creator3': {
        id: 'creator3',
        name: 'DeFi Labs',
        avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=defi',
        title: 'DeFi Specialists',
        bio: 'Experts in decentralized finance protocols',
    },
};

export const MOCK_COURSES: Course[] = [
    {
        id: '1',
        slug: 'solana-fundamentals',
        title: 'Solana Fundamentals',
        description: 'Learn the basics of Solana blockchain, accounts, transactions, and programs.',
        difficulty: DIFFICULTY.BEGINNER,
        duration: 4,
        xpPerLesson: 50,
        totalXp: 750,
        trackId: 1,
        trackLevel: 1,
        modules: [],
        lessonCount: 10,
        creator: 'creator1',
        creatorName: 'Solana Foundation',
        isActive: true,
        publishedAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        courseId: 'solana-fundamentals',
        contentTxId: 'mock-tx-id',
        coverImage: undefined,
        rating: 4.8,
        studentCount: 12543,
        language: 'English',
        lastUpdated: new Date('2024-01-15'),
        isBestseller: true,
    },
    {
        id: '2',
        slug: 'anchor-framework',
        title: 'Anchor Framework',
        description: 'Master Anchor framework for building secure and efficient Solana programs.',
        difficulty: DIFFICULTY.INTERMEDIATE,
        duration: 8,
        xpPerLesson: 75,
        totalXp: 1500,
        trackId: 1,
        trackLevel: 2,
        prerequisite: '1',
        modules: [],
        lessonCount: 15,
        creator: 'creator2',
        creatorName: 'Coral Team',
        isActive: true,
        publishedAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
        courseId: 'anchor-framework',
        contentTxId: 'mock-tx-id-2',
        coverImage: undefined,
        rating: 4.9,
        studentCount: 8234,
        language: 'English',
        lastUpdated: new Date('2024-02-10'),
        isBestseller: true,
    },
    {
        id: '3',
        slug: 'defi-protocols',
        title: 'DeFi Protocols on Solana',
        description: 'Build decentralized finance applications with AMMs, lending protocols, and more.',
        difficulty: DIFFICULTY.ADVANCED,
        duration: 12,
        xpPerLesson: 100,
        totalXp: 2500,
        trackId: 2,
        trackLevel: 1,
        modules: [],
        lessonCount: 20,
        creator: 'creator3',
        creatorName: 'DeFi Labs',
        isActive: true,
        publishedAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-03-01'),
        courseId: 'defi-protocols',
        contentTxId: 'mock-tx-id-3',
        coverImage: undefined,
        rating: 4.7,
        studentCount: 5621,
        language: 'English',
        lastUpdated: new Date('2024-03-05'),
        isNew: true,
    },
];

// ============================================================================
// MODULES & LESSONS
// ============================================================================

export const MOCK_MODULES: Module[] = [
    {
        id: 'm1',
        title: 'Introduction to Solana',
        description: 'Get started with Solana fundamentals',
        order: 1,
        lessons: [
            {
                id: 'l1',
                title: 'What is Solana?',
                type: 'reading',
                order: 1,
                estimatedMinutes: 15,
                content: [],
            },
            {
                id: 'l2',
                title: 'Solana Architecture',
                type: 'reading',
                order: 2,
                estimatedMinutes: 20,
                content: [],
            },
            {
                id: 'l3',
                title: 'Setting Up Your Environment',
                type: 'challenge',
                order: 3,
                estimatedMinutes: 25,
                content: [],
            },
        ],
    },
    {
        id: 'm2',
        title: 'Accounts and Transactions',
        description: 'Learn about Solana accounts and transaction structure',
        order: 2,
        lessons: [
            {
                id: 'l4',
                title: 'Understanding Accounts',
                type: 'reading',
                order: 1,
                estimatedMinutes: 30,
                content: [],
            },
            {
                id: 'l5',
                title: 'Transaction Structure',
                type: 'reading',
                order: 2,
                estimatedMinutes: 25,
                content: [],
            },
            {
                id: 'l6',
                title: 'Signing Transactions',
                type: 'challenge',
                order: 3,
                estimatedMinutes: 20,
                content: [],
            },
        ],
    },
    {
        id: 'm3',
        title: 'Programs and PDAs',
        description: 'Master Solana programs and Program Derived Addresses',
        order: 3,
        lessons: [
            {
                id: 'l7',
                title: 'Introduction to Programs',
                type: 'reading',
                order: 1,
                estimatedMinutes: 30,
                content: [],
            },
            {
                id: 'l8',
                title: 'Program Derived Addresses',
                type: 'reading',
                order: 2,
                estimatedMinutes: 35,
                content: [],
            },
            {
                id: 'l9',
                title: 'Cross-Program Invocation',
                type: 'challenge',
                order: 3,
                estimatedMinutes: 40,
                content: [],
            },
        ],
    },
    {
        id: 'm4',
        title: 'Building Your First dApp',
        description: 'Put it all together and build a complete dApp',
        order: 4,
        lessons: [
            {
                id: 'l10',
                title: 'Project Setup',
                type: 'reading',
                order: 1,
                estimatedMinutes: 20,
                content: [],
            },
            {
                id: 'l11',
                title: 'Implementing Core Logic',
                type: 'challenge',
                order: 2,
                estimatedMinutes: 45,
                content: [],
            },
            {
                id: 'l12',
                title: 'Testing and Deployment',
                type: 'challenge',
                order: 3,
                estimatedMinutes: 30,
                content: [],
            },
        ],
    },
];

export const MOCK_COURSE_WITH_MODULES: Course = {
    ...MOCK_COURSES[0],
    modules: MOCK_MODULES,
};

// ============================================================================
// PROGRESS & ENROLLMENT
// ============================================================================

export const MOCK_COURSE_PROGRESS: Record<string, number> = {
    '1': 65,
    '2': 30,
};

export const MOCK_COMPLETED_LESSONS = ['l1', 'l2', 'l3'];
export const MOCK_IS_ENROLLED = false;

// ============================================================================
// ACHIEVEMENTS
// ============================================================================

export interface MockAchievement {
    id: string;
    name: string;
    icon: string;
    description: string;
    earnedAt?: Date;
}

export const MOCK_ACHIEVEMENTS: MockAchievement[] = [
    {
        id: '1',
        name: 'First Steps',
        icon: '🎯',
        description: 'Complete your first lesson',
        earnedAt: new Date('2024-01-10'),
    },
    {
        id: '2',
        name: 'Week Warrior',
        icon: '🔥',
        description: '7 day streak',
        earnedAt: new Date('2024-01-17'),
    },
    {
        id: '3',
        name: 'Knowledge Seeker',
        icon: '📚',
        description: 'Complete 5 courses',
        earnedAt: new Date('2024-02-01'),
    },
    {
        id: '4',
        name: 'Code Master',
        icon: '💻',
        description: 'Complete 10 coding challenges',
    },
    {
        id: '5',
        name: 'Community Helper',
        icon: '🤝',
        description: 'Help 10 other learners',
    },
];

// ============================================================================
// LEADERBOARD
// ============================================================================

export const MOCK_LEADERBOARD: LeaderboardEntry[] = Array.from({ length: 50 }, (_, i) => ({
    rank: i + 1,
    userId: `user-${i + 1}`,
    username: `Developer${i + 1}`,
    walletAddress: `${Math.random().toString(36).substring(2, 8).toUpperCase()}...${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    xpBalance: 10000 - i * 150,
    level: Math.floor((10000 - i * 150) / 1000) + 1,
}));

// ============================================================================
// USERS
// ============================================================================

export interface MockUser {
    username: string;
    walletAddress: string;
    xp: number;
    level: number;
    streak: number;
    coursesCompleted: number;
    lessonsCompleted: number;
    achievementsEarned: number;
    joinedAt: Date;
    bio?: string;
}

export const MOCK_CURRENT_USER: MockUser = {
    username: 'YourUsername',
    walletAddress: 'ABC123...XYZ789',
    xp: 2450,
    level: 3,
    streak: 7,
    coursesCompleted: 2,
    lessonsCompleted: 24,
    achievementsEarned: 5,
    joinedAt: new Date('2024-01-01'),
    bio: 'Passionate about Web3 and Solana development',
};

export const MOCK_PUBLIC_USER: MockUser = {
    username: 'Developer42',
    walletAddress: 'ABC123...XYZ789',
    xp: 5420,
    level: 6,
    streak: 15,
    coursesCompleted: 4,
    lessonsCompleted: 48,
    achievementsEarned: 8,
    joinedAt: new Date('2023-11-15'),
    bio: 'Building the future of decentralized applications on Solana',
};

// ============================================================================
// CERTIFICATES
// ============================================================================

export interface MockCertificate {
    id: string;
    assetAddress: string;
    courseName: string;
    studentName: string;
    studentWallet: string;
    completedAt: Date;
    instructorName: string;
    credentialId: string;
    verificationUrl: string;
}

export const MOCK_CERTIFICATE: MockCertificate = {
    id: 'cert-1',
    assetAddress: 'CertNFT123...XYZ789',
    courseName: 'Solana Fundamentals',
    studentName: 'Developer42',
    studentWallet: 'ABC123...XYZ789',
    completedAt: new Date('2024-02-15'),
    instructorName: 'Solana Foundation',
    credentialId: 'CERT-2024-001234',
    verificationUrl: 'https://solscan.io/token/CertNFT123...XYZ789',
};

// ============================================================================
// LESSON CONTENT
// ============================================================================

export const MOCK_LESSON_CONTENT = `
# What is Solana?

Solana is a high-performance blockchain designed for decentralized applications and crypto-currencies. It aims to provide fast, secure, and scalable solutions for developers.

## Key Features

- **High Throughput**: Capable of processing 65,000+ transactions per second
- **Low Fees**: Transaction costs typically under $0.01
- **Fast Finality**: Blocks confirmed in ~400ms
- **Energy Efficient**: Proof of Stake consensus mechanism

## Architecture

Solana uses a unique combination of technologies:

1. **Proof of History (PoH)**: A cryptographic clock that enables nodes to agree on time
2. **Tower BFT**: A PoH-optimized version of PBFT consensus
3. **Turbine**: Block propagation protocol
4. **Gulf Stream**: Mempool-less transaction forwarding
5. **Sealevel**: Parallel smart contract runtime
6. **Pipelining**: Transaction processing optimization
7. **Cloudbreak**: Horizontally-scaled accounts database
8. **Archivers**: Distributed ledger storage

## Why Learn Solana?

- Growing ecosystem with major projects
- Developer-friendly tools and frameworks
- Strong community support
- Career opportunities in Web3

Ready to dive deeper? Let's continue!
`;
