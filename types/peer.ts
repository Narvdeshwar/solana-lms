export interface PeerSession {
    id: string;
    title: string;
    description: string;
    hostId: string;
    hostName: string;
    courseId: string;
    courseName: string;
    topic: string;
    scheduledAt: Date;
    duration: number;
    maxParticipants: number;
    participants: Participant[];
    status: 'scheduled' | 'live' | 'completed' | 'cancelled';
    meetingLink?: string;
    recordingUrl?: string;
    tags: string[];
    createdAt: Date;
}

export interface Participant {
    id: string;
    name: string;
    avatar: string;
    role: 'host' | 'participant';
    joinedAt?: Date;
}

export interface StudyBuddy {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    courses: string[];
    skills: string[];
    learningGoals: string[];
    availability: string[];
    timezone: string;
    matchScore: number;
    isConnected: boolean;
}

export interface CollaborativeProject {
    id: string;
    title: string;
    description: string;
    courseId: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    teamSize: number;
    currentMembers: TeamMember[];
    requiredSkills: string[];
    goals: string[];
    status: 'recruiting' | 'in-progress' | 'completed';
    deadline?: Date;
    repository?: string;
    createdAt: Date;
    createdBy: string;
}

export interface TeamMember {
    id: string;
    name: string;
    avatar: string;
    role: string;
    skills: string[];
    joinedAt: Date;
}

export interface CodeReviewRequest {
    id: string;
    authorId: string;
    authorName: string;
    title: string;
    description: string;
    code: string;
    language: string;
    courseId: string;
    tags: string[];
    reviews: Review[];
    status: 'open' | 'in-review' | 'completed';
    createdAt: Date;
    updatedAt: Date;
}

export interface Review {
    id: string;
    reviewerId: string;
    reviewerName: string;
    rating: number;
    comments: string;
    suggestions: CodeSuggestion[];
    createdAt: Date;
}

export interface CodeSuggestion {
    lineNumber: number;
    originalCode: string;
    suggestedCode: string;
    explanation: string;
}

export interface KnowledgeShare {
    id: string;
    authorId: string;
    authorName: string;
    title: string;
    content: string;
    type: 'tip' | 'tutorial' | 'resource' | 'question';
    courseId: string;
    tags: string[];
    upvotes: number;
    comments: Comment[];
    isBookmarked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Comment {
    id: string;
    authorId: string;
    authorName: string;
    content: string;
    upvotes: number;
    createdAt: Date;
}
