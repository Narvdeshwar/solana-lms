// Forum Types

export interface User {
    id: string;
    name: string;
    avatar?: string;
    role: 'student' | 'instructor' | 'ta';
}

export interface Reaction {
    type: 'like' | 'helpful' | 'insightful';
    userId: string;
    userName: string;
}

export interface ForumPost {
    id: string;
    threadId: string;
    content: string;
    author: User;
    reactions: Reaction[];
    isAnswer: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ForumThread {
    id: string;
    courseId: string;
    courseName: string;
    title: string;
    content: string;
    author: User;
    category: 'general' | 'technical' | 'assignment' | 'project' | 'discussion';
    isPinned: boolean;
    isLocked: boolean;
    isSolved: boolean;
    posts: ForumPost[];
    reactions: Reaction[];
    followers: string[];
    views: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Forum {
    id: string;
    courseId: string;
    courseName: string;
    description: string;
    threads: ForumThread[];
    memberCount: number;
}
