export interface Instructor {
    id: string;
    name: string;
    avatar: string;
    title: string;
    bio: string;
    expertise: string[];
    rating: number;
    totalStudents: number;
    responseTime: string;
    availability: OfficeHours[];
    courses: string[];
}

export interface OfficeHours {
    id: string;
    instructorId: string;
    day: string;
    startTime: string;
    endTime: string;
    maxSlots: number;
    bookedSlots: number;
    isRecurring: boolean;
}

export interface Booking {
    id: string;
    studentId: string;
    instructorId: string;
    officeHoursId: string;
    date: Date;
    startTime: string;
    endTime: string;
    topic: string;
    notes: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    meetingLink?: string;
    createdAt: Date;
}

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    attachments?: Attachment[];
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Conversation {
    id: string;
    participants: string[];
    lastMessage: Message;
    unreadCount: number;
    updatedAt: Date;
}

export interface Announcement {
    id: string;
    instructorId: string;
    courseId: string;
    title: string;
    content: string;
    priority: 'low' | 'medium' | 'high';
    isPinned: boolean;
    attachments?: Attachment[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Assignment {
    id: string;
    courseId: string;
    title: string;
    description: string;
    dueDate: Date;
    maxScore: number;
    submissions: Submission[];
    createdAt: Date;
}

export interface Submission {
    id: string;
    assignmentId: string;
    studentId: string;
    content: string;
    attachments?: Attachment[];
    submittedAt: Date;
    feedback?: Feedback;
}

export interface Feedback {
    score: number;
    comments: string;
    strengths: string[];
    improvements: string[];
    codeReview?: CodeReview[];
    submittedAt: Date;
    instructorId: string;
}

export interface CodeReview {
    lineNumber: number;
    file: string;
    comment: string;
    severity: 'info' | 'warning' | 'error';
    suggestion?: string;
}

export interface Attachment {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
}
