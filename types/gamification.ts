export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: 'progress' | 'streak' | 'skill' | 'community' | 'special';
    points: number;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    unlockedAt?: Date;
    progress: number;
    maxProgress: number;
    isUnlocked: boolean;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    level: number;
    earnedAt: Date;
}

export interface Leaderboard {
    id: string;
    userId: string;
    username: string;
    avatar: string;
    totalXP: number;
    level: number;
    rank: number;
    coursesCompleted: number;
    streak: number;
    badges: Badge[];
}

export interface Quest {
    id: string;
    title: string;
    description: string;
    type: 'daily' | 'weekly' | 'special';
    objectives: QuestObjective[];
    rewards: Reward[];
    expiresAt?: Date;
    isCompleted: boolean;
    progress: number;
}

export interface QuestObjective {
    id: string;
    description: string;
    current: number;
    target: number;
    isCompleted: boolean;
}

export interface Reward {
    type: 'xp' | 'badge' | 'token' | 'nft';
    amount: number;
    name: string;
    description: string;
}

export interface UserProgress {
    userId: string;
    level: number;
    currentXP: number;
    nextLevelXP: number;
    totalXP: number;
    streak: number;
    longestStreak: number;
    coursesCompleted: number;
    lessonsCompleted: number;
    achievements: Achievement[];
    badges: Badge[];
    rank: number;
}
