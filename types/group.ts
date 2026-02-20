// Study Group Types

export interface GroupMember {
    id: string;
    name: string;
    avatar?: string;
    role: 'owner' | 'admin' | 'member';
    joinedAt: Date;
    xp: number;
}

export interface ChatMessage {
    id: string;
    groupId: string;
    senderId: string;
    senderName: string;
    content: string;
    createdAt: Date;
}

export interface SharedNote {
    id: string;
    groupId: string;
    title: string;
    content: string;
    authorId: string;
    authorName: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Challenge {
    id: string;
    groupId: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    xpReward: number;
    completedBy: string[];
    createdAt: Date;
    deadline?: Date;
}

export interface LeaderboardEntry {
    userId: string;
    userName: string;
    xp: number;
    rank: number;
    challengesCompleted: number;
}

export interface StudyGroup {
    id: string;
    name: string;
    description: string;
    courseId?: string;
    courseName?: string;
    members: GroupMember[];
    maxMembers: number;
    isPrivate: boolean;
    chat: ChatMessage[];
    sharedNotes: SharedNote[];
    challenges: Challenge[];
    leaderboard: LeaderboardEntry[];
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}
