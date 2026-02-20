'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    CheckCircle,
    Send,
    Search,
    Filter,
    Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Answer {
    id: string;
    questionId: string;
    content: string;
    author: string;
    authorRole: 'student' | 'instructor' | 'ta';
    timestamp: Date;
    upvotes: number;
    downvotes: number;
    isAccepted: boolean;
    userVote?: 'up' | 'down';
}

interface Question {
    id: string;
    lessonId: string;
    title: string;
    content: string;
    author: string;
    timestamp: Date;
    upvotes: number;
    downvotes: number;
    answers: Answer[];
    isSolved: boolean;
    tags: string[];
    userVote?: 'up' | 'down';
}

interface QASystemProps {
    lessonId: string;
    lessonTitle?: string;
    currentUser?: string;
    currentUserRole?: 'student' | 'instructor' | 'ta';
    className?: string;
}

export function QASystem({
    lessonId,
    lessonTitle = 'Lesson',
    currentUser = 'Anonymous',
    currentUserRole = 'student',
    className
}: QASystemProps) {
    const [questions, setQuestions] = useState<Question[]>(() => {
        // Load from localStorage
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(`qa-${lessonId}`);
            if (saved) {
                const parsed = JSON.parse(saved);
                return parsed.map((q: any) => ({
                    ...q,
                    timestamp: new Date(q.timestamp),
                    answers: q.answers.map((a: any) => ({
                        ...a,
                        timestamp: new Date(a.timestamp)
                    }))
                }));
            }
        }
        return [];
    });

    const [isAsking, setIsAsking] = useState(false);
    const [questionTitle, setQuestionTi
 const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'unanswered'>('recent');

    // Save to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(`qa-${lessonId}`, JSON.stringify(questions));
        }
    }, [questions, lessonId]);

    const handleAskQuestion = () => {
        if (!questionTitle.trim() || !questionContent.trim()) return;

        const newQuestion: Question = {
            id: Date.now().toString(),
            lessonId,
            title: questionTitle,
            content: questionContent,
            author: currentUser,
            timestamp: new Date(),
            upvotes: 0,
            downvotes: 0,
            answers: [],
            isSolved: false,
            tags: questionTags,
        };

        setQuestions([newQuestion, ...questions]);
        setQuestionTitle('');
        setQuestionContent('');
        setQuestionTags([]);
        setIsAsking(false);
    };

    const handleAddAnswer = (questionId: string) => {
        if (!answerContent.trim()) return;

        const newAnswer: Answer = {
            id: Date.now().toString(),
            questionId,
            content: answerContent,
            author: currentUser,
            authorRole: currentUserRole,
            timestamp: new Date(),
            upvotes: 0,
            downvotes: 0,
            isAccepted: false,
        };

        setQuestions(questions.map(q =>
            q.id === questionId
                ? { ...q, answers: [...q.answers, newAnswer] }
                : q
        ));
        setAnswerContent('');
    };

    const handleVoteQuestion = (questionId: string, voteType:
        ype) {
        newVote = undefined;
    } else {
        if (voteType === 'up') upvotes++;
    if (voteType === 'down') downvotes++;
}

return { ...q, upvotes, downvotes, userVote: newVote };
        }));
    };

const handleVoteAnswer = (questionId: string, answerId: string, voteType: 'up' | 'down') => {
    setQuestions(questions.map(q => {
        if (q.id !== questionId) return q;

        return {
            ...q,
            answers: q.answers.map(a => {
                if (a.id !== answerId) return a;

                const currentVote = a.userVote;
                let upvotes = a.upvotes;
                let downvotes = a.downvotes;
                let newVote: 'up' | 'down' | undefined = voteType;

                if (currentVote === 'up') upvotes--;
                if (currentVote === 'down') downvotes--;

                if (currentVote === voteType) {
                    newVote = undefined;
                } else {
                    if (voteType === 'up') upvotes++;
                    if (voteType === 'down') downvotes++;
                }

                return { ...a, upvotes, downvotes, userVote: newVote };
            })
        };
    }));
};

const handleAcceptAnswer = (questionId: string, answerId: string) => {
    setQuestions(questions.map(q => {
        if (q.id !== questionId) return q;

        return {
            ...q,
            isSolved: true,
            answers: q.answers.map(a => ({
                ...a,
                isAccepted: a.id === answerId
            }))
        };
    }));
};

const handleAddTag = () => {
    if (tagInput.trim() && !questionTags.includes(tagInput.trim())) {
        setQuestionTags([...questionTags, tagInput.trim()]);
        setTagInput('');
    }
};

const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
};

// Filter and sort questions
let filteredQuestions = questions.filter(q => {
    // Search filter
    if (searchQuery && !q.title.toLowerCase().includes(searchQuery.toLowerCase())
        && !q.content.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
    }

    // Status filter
    if (filterBy === 'solved' && !q.isSolved) return false;
    if (filterBy === 'unsolved' && q.isSolved) return false;
    if (filterBy === 'myQuestions' && q.author !== currentUser) return false;

    return true;
});

// Sort questions
filteredQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
        case 'popular':
            return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
        case 'unanswered':
            return a.answers.length - b.answers.length;
        case 'recent':
        default:
            return b.timestamp.getTime() - a.timestamp.getTime();
    }
});

const getRoleBadge = (role: 'student' | 'instructor' | 'ta') => {
    switch (role) {
        case 'instructor':
            return <Badge className="bg-purple-500">Instructor</Badge>;
        case 'ta':
            return <Badge className="bg-blue-500">TA</Badge>;
        default:
            return null;
    }
};

return (
    <div className={cn('space-y-4', className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
            <div>
                <h3 className="font-semibold flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Q&A ({questions.length})
                </h3>
                <p className="text-xs text-muted-foreground">Ask questions and help others</p>
            </div>
            {!isAsking && (
                <Button
                    onClick={() => setIsAsking(true)}
                    size="sm"
                    className="gap-2"
                >
                    <MessageSquare className="h-4 w-4" />
                    Ask Question
                </Button>
            )}
        </div>

        {/* Ask Question Form */}
        <AnimatePresence>
            {isAsking && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    <Card className="p-4">
                        <h4 className="mb-3 font-semibold">Ask a Question</h4>

                        <input
                            type="text"
                            value={questionTitle}
                            onChange={(e) => setQuestionTitle(e.target.value)}
                            placeholder="Question title..."
                            className="w-full mb-3 rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />

                        <textarea
                            value={questionContent}
                            onChange={(e) => setQuestionContent(e.target.value)}
                            placeholder="Describe your question in detail..."
                            className="w-full min-h-[100px] resize-none rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />

                        {/* Tags */}
                        <div className="mt-3">
                            <div className="flex flex-wrap gap-2 mb-2">
                                {questionTags.map(tag => (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="cursor-pointer"
                                        onClick={() => setQuestionTags(questionTags.filter(t => t !== tag))}
                                    >
                                        {tag} ×
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                                    placeholder="Add tags..."
                                    className="flex-1 rounded-md border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                                <Button onClick={handleAddTag} size="sm" variant="outline">
                                    Add
                                </Button>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <Button
                                onClick={handleAskQuestion}
                                size="sm"
                                disabled={!questionTitle.trim() || !questionContent.trim()}
                            >
                                Post Question
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsAsking(false);
                                    setQuestionTitle('');
                                    setQuestionContent('');
                                    setQuestionTags([]);
                                }}
                                size="sm"
                                variant="outline"
                            >
                                Cancel
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Search and Filters */}
        {questions.length > 0 && (
            <Card className="p-3">
                <div className="flex flex-col gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search questions..."
                            className="w-full rounded-md border bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <Button
                            variant={filterBy === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterBy('all')}
                        >
                            All
                        </Button>
                        <Button
                            variant={filterBy === 'unsolved' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterBy('unsolved')}
                        >
                            Unsolved
                        </Button>
                        <Button
                            variant={filterBy === 'solved' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterBy('solved')}
                        >
                            Solved
                        </Button>
                        <Button
                            variant={filterBy === 'myQuestions' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterBy('myQuestions')}
                        >
                            My Questions
                        </Button>
                        <div className="ml-auto flex gap-2">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="rounded-md border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="recent">Recent</option>
                                <option value="popular">Popular</option>
                                <option value="unanswered">Unanswered</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Card>
        )}

        {/* Questions List */}
        <div className="space-y-3">
            {filteredQuestions.length === 0 ? (
                <Card className="p-8 text-center">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-2 text-sm text-muted-foreground">
                        {searchQuery ? 'No questions match your search' : 'No questions yet. Be the first to ask!'}
                    </p>
                </Card>
            ) : (
                filteredQuestions.map((question) => (
                    <Card key={question.id} className="p-4">
                        {/* Question Header */}
                        <div className="flex items-start gap-3">
                            {/* Vote Column */}
                            <div className="flex flex-col items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        "h-8 w-8 p-0",
                                        question.userVote === 'up' && "text-green-600"
                                    )}
                                    onClick={() => handleVoteQuestion(question.id, 'up')}
                                >
                                    <ThumbsUp className="h-4 w-4" />
                                </Button>
                                <span className="text-sm font-semibold">
                                    {question.upvotes - question.downvotes}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        "h-8 w-8 p-0",
                                        question.userVote === 'down' && "text-red-600"
                                    )}
                                    onClick={() => handleVoteQuestion(question.id, 'down')}
                                >
                                    <ThumbsDown className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Question Content */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between gap-2">
                                    <h4 className="font-semibold">{question.title}</h4>
                                    {question.isSolved && (
                                        <Badge className="bg-green-500">
                                            <CheckCircle className="mr-1 h-3 w-3" />
                                            Solved
                                        </Badge>
                                    )}
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
                                    {question.content}
                                </p>
                                <div className="mt-3 flex items-center gap-2 flex-wrap">
                                    <span className="text-xs text-muted-foreground">
                                        by {question.author} • {formatTimestamp(question.timestamp)}
                                    </span>
                                    {question.tags.map(tag => (
                                        <Badge key={tag} variant="outline" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedQuestion(
                                            selectedQuestion === question.id ? null : question.id
                                        )}
                                        className="ml-auto text-xs"
                                    >
                                        {question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}
                                    </Button>
                                </div>

                                {/* Answers */}
                                <AnimatePresence>
                                    {selectedQuestion === question.id && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-4 space-y-3 border-t pt-4"
                                        >
                                            {question.answers.map((answer) => (
                                                <div key={answer.id} className="flex gap-3">
                                                    {/* Answer Vote Column */}
                                                    <div className="flex flex-col items-center gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className={cn(
                                                                "h-6 w-6 p-0",
                                                                answer.userVote === 'up' && "text-green-600"
                                                            )}
                                                            onClick={() => handleVoteAnswer(question.id, answer.id, 'up')}
                                                        >
                                                            <ThumbsUp className="h-3 w-3" />
                                                        </Button>
                                                        <span className="text-xs font-semibold">
                                                            {answer.upvotes - answer.downvotes}
                                                        </span>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className={cn(
                                                                "h-6 w-6 p-0",
                                                                answer.userVote === 'down' && "text-red-600"
                                                            )}
                                                            onClick={() => handleVoteAnswer(question.id, answer.id, 'down')}
                                                        >
                                                            <ThumbsDown className="h-3 w-3" />
                                                        </Button>
                                                        {answer.isAccepted && (
                                                            <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                                                        )}
                                                    </div>

                                                    {/* Answer Content */}
                                                    <div className={cn(
                                                        "flex-1 rounded-lg p-3",
                                                        answer.isAccepted ? "bg-green-500/10 border border-green-500/20" : "bg-muted/50"
                                                    )}>
                                                        <p className="text-sm whitespace-pre-wrap">{answer.content}</p>
                                                        <div className="mt-2 flex items-center gap-2">
                                                            <span className="text-xs text-muted-foreground">
                                                                {answer.author}
                                                            </span>
                                                            {getRoleBadge(answer.authorRole)}
                                                            <span className="text-xs text-muted-foreground">
                                                                • {formatTimestamp(answer.timestamp)}
                                                            </span>
                                                            {!answer.isAccepted && question.author === currentUser && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleAcceptAnswer(question.id, answer.id)}
                                                                    className="ml-auto text-xs gap-1"
                                                                >
                                                                    <CheckCircle className="h-3 w-3" />
                                                                    Accept
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Add Answer */}
                                            <div className="flex gap-2 pt-3 border-t">
                                                <textarea
                                                    value={answerContent}
                                                    onChange={(e) => setAnswerContent(e.target.value)}
                                                    placeholder="Write your answer..."
                                                    className="flex-1 min-h-[80px] resize-none rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                                />
                                                <Button
                                                    onClick={() => handleAddAnswer(question.id)}
                                                    disabled={!answerContent.trim()}
                                                    size="sm"
                                                    className="gap-1"
                                                >
                                                    <Send className="h-3 w-3" />
                                                    Post
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </Card>
                ))
            )}
        </div>
    </div>
);
}
