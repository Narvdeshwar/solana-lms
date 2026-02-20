'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    CheckCircle,
    Search,
    Send,
    Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Answer {
    id: string;
    content: string;
    author: string;
    authorRole: 'student' | 'instructor' | 'ta';
    timestamp: Date;
    upvotes: number;
    downvotes: number;
    isAccepted: boolean;
}

interface Question {
    id: string;
    title: string;
    content: string;
    author: string;
    timestamp: Date;
    lessonId: string;
    tags: string[];
    upvotes: number;
    answers: Answer[];
    isSolved: boolean;
    views: number;
}

interface QuestionAnswerSystemProps {
    lessonId: string;
    className?: string;
}

const mockQuestions: Question[] = [
    {
        id: '1',
        title: 'How do I create a PDA in Anchor?',
        content: 'I\'m trying to create a Program Derived Address but getting an error. Can someone explain the correct way to do this?',
        author: 'Developer42',
        timestamp: new Date('2026-02-19'),
        lessonId: 'l2',
        tags: ['anchor', 'pda', 'development'],
        upvotes: 5,
        views: 42,
        isSolved: true,
        answers: [
            {
                id: 'a1',
                content: 'You need to use `Pubkey::find_program_address()` with your seeds. Here\'s an example:\n\n```rust\nlet (pda, bump) = Pubkey::find_program_address(\n    &[b"my-seed", user.key().as_ref()],\n    program_id\n);\n```',
                author: 'InstructorSol',
                authorRole: 'instructor',
                timestamp: new Date('2026-02-19'),
                upvotes: 8,
                downvotes: 0,
                isAccepted: true
            }
        ]
    },
    {
        id: '2',
        title: 'What\'s the difference between SOL and lamports?',
        content: 'I keep seeing both terms used. Are they the same thing?',
        author: 'NewbieDev',
        timestamp: new Date('2026-02-20'),
        lessonId: 'l1',
        tags: ['basics', 'tokens'],
        upvotes: 3,
        views: 28,
        isSolved: false,
        answers: [
            {
                id: 'a2',
                content: '1 SOL = 1,000,000,000 lamports. Lamports are the smallest unit, like satoshis for Bitcoin.',
                author: 'HelpfulStudent',
                authorRole: 'student',
                timestamp: new Date('2026-02-20'),
                upvotes: 4,
                downvotes: 0,
                isAccepted: false
            }
        ]
    }
];

export function QuestionAnswerSystem({ lessonId, className }: QuestionAnswerSystemProps) {
    const [questions, setQuestions] = useState<Question[]>(mockQuestions);
    const [showAskForm, setShowAskForm] = useState(false);
    const [newQuestion, setNewQuestion] = useState({ title: '', content: '', tags: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [newAnswer, setNewAnswer] = useState('');

    const filteredQuestions = questions.filter(q =>
        q.lessonId === lessonId &&
        (searchQuery === '' ||
            q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    const handleAskQuestion = () => {
        if (!newQuestion.title.trim() || !newQuestion.content.trim()) return;

        const question: Question = {
            id: Date.now().toString(),
            title: newQuestion.title,
            content: newQuestion.content,
            author: 'CurrentUser',
            timestamp: new Date(),
            lessonId,
            tags: newQuestion.tags.split(',').map(t => t.trim()).filter(t => t),
            upvotes: 0,
            views: 0,
            isSolved: false,
            answers: []
        };

        setQuestions([question, ...questions]);
        setNewQuestion({ title: '', content: '', tags: '' });
        setShowAskForm(false);
    };

    const handleSubmitAnswer = () => {
        if (!selectedQuestion || !newAnswer.trim()) return;

        const answer: Answer = {
            id: Date.now().toString(),
            content: newAnswer,
            author: 'CurrentUser',
            authorRole: 'student',
            timestamp: new Date(),
            upvotes: 0,
            downvotes: 0,
            isAccepted: false
        };

        const updatedQuestions = questions.map(q =>
            q.id === selectedQuestion.id
                ? { ...q, answers: [...q.answers, answer] }
                :

                upvotes: type === 'up' ? q.upvotes + 1 : q.upvotes
                    };
} else {
    // Vote on answer
    return {
        ...q,
        answers: q.answers.map(a =>
            a.id === answerId
                ? {
                    ...a,
                    upvotes: type === 'up' ? a.upvotes + 1 : a.upvotes,
                    downvotes: type === 'down' ? a.downvotes + 1 : a.downvotes
                }
                : a
        )
    };
}
            }
return q;
        });
setQuestions(updatedQuestions);
    };

const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
};

const getRoleBadge = (role: Answer['authorRole']) => {
    switch (role) {
        case 'instructor':
            return <Badge className="bg-purple-500 gap-1"><Award className="h-3 w-3" />Instructor</Badge>;
        case 'ta':
            return <Badge variant="secondary">TA</Badge>;
        default:
            return null;
    }
};

if (selectedQuestion) {
    return (
        <div className={cn('space-y-4', className)}>
            <Button
                onClick={() => setSelectedQuestion(null)}
                variant="ghost"
                size="sm"
            >
                ← Back to Questions
            </Button>

            {/* Question Detail */}
            <Card className="p-6">
                <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                        <h2 className="mb-2 text-2xl font-bold">{selectedQuestion.title}</h2>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>Asked by {selectedQuestion.author}</span>
                            <span>•</span>
                            <span>{formatTimestamp(selectedQuestion.timestamp)}</span>
                            <span>•</span>
                            <span>{selectedQuestion.views} views</span>
                        </div>
                    </div>
                    {selectedQuestion.isSolved && (
                        <Badge className="bg-green-500 gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Solved
                        </Badge>
                    )}
                </div>

                <p className="mb-4 whitespace-pre-wrap">{selectedQuestion.content}</p>

                <div className="flex items-center gap-2">
                    {selectedQuestion.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <Button
                        onClick={() => handleVote(selectedQuestion.id, null, 'up')}
                        size="sm"
                        variant="outline"
                        className="gap-1"
                    >
                        <ThumbsUp className="h-4 w-4" />
                        {selectedQuestion.upvotes}
                    </Button>
                </div>
            </Card>

            {/* Answers */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                    {selectedQuestion.answers.length} Answer{selectedQuestion.answers.length !== 1 ? 's' : ''}
                </h3>

                {selectedQuestion.answers.map(answer => (
                    <Card key={answer.id} className={cn(
                        'p-4',
                        answer.isAccepted && 'border-green-500 bg-green-500/5'
                    )}>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="font-medium">{answer.author}</span>
                            {getRoleBadge(answer.authorRole)}
                            <span className="text-sm text-muted-foreground">
                                {formatTimestamp(answer.timestamp)}
                            </span>
                            {answer.isAccepted && (
                                <Badge className="ml-auto bg-green-500 gap-1">
                                    <CheckCircle className="h-3 w-3" />
                                    Accepted Answer
                                </Badge>
                            )}
                        </div>

                        <p className="mb-3 whitespace-pre-wrap">{answer.content}</p>

                        <div className="flex items-center gap-2">
                            <Button
                                onClick={() => handleVote(selectedQuestion.id, answer.id, 'up')}
                                size="sm"
                                variant="ghost"
                                className="gap-1"
                            >
                                <ThumbsUp className="h-4 w-4" />
                                {answer.upvotes}
                            </Button>
                            <Button
                                onClick={() => handleVote(selectedQuestion.id, answer.id, 'down')}
                                size="sm"
                                variant="ghost"
                                className="gap-1"
                            >
                                <ThumbsDown className="h-4 w-4" />
                                {answer.downvotes}
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Answer Form */}
            <Card className="p-4">
                <h4 className="mb-3 font-semibold">Your Answer</h4>
                <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Write your answer here..."
                    className="w-full min-h-[150px] resize-none rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="mt-3 flex justify-end">
                    <Button
                        onClick={handleSubmitAnswer}
                        disabled={!newAnswer.trim()}
                        className="gap-2"
                    >
                        <Send className="h-4 w-4" />
                        Post Answer
                    </Button>
                </div>
            </Card>
        </div>
    );
}

return (
    <div className={cn('space-y-4', className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Questions & Answers</h3>
            <Button
                onClick={() => setShowAskForm(!showAskForm)}
                size="sm"
                className="gap-2"
            >
                <MessageSquare className="h-4 w-4" />
                Ask Question
            </Button>
        </div>

        {/* Search */}
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

        {/* Ask Question Form */}
        <AnimatePresence>
            {showAskForm && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    <Card className="p-4">
                        <h4 className="mb-3 font-semibold">Ask a Question</h4>
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={newQuestion.title}
                                onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                                placeholder="Question title..."
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <textarea
                                value={newQuestion.content}
                                onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                                placeholder="Describe your question in detail..."
                                className="w-full min-h-[120px] resize-none rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <input
                                type="text"
                                value={newQuestion.tags}
                                onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value })}
                                placeholder="Tags (comma separated)..."
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <div className="flex justify-end gap-2">
                                <Button
                                    onClick={() => setShowAskForm(false)}
                                    variant="outline"
                                    size="sm"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleAskQuestion}
                                    disabled={!newQuestion.title.trim() || !newQuestion.content.trim()}
                                    size="sm"
                                >
                                    Post Question
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Questions List */}
        <div className="space-y-3">
            {filteredQuestions.length === 0 ? (
                <Card className="p-8 text-center">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-2 text-sm text-muted-foreground">
                        No questions yet. Be the first to ask!
                    </p>
                </Card>
            ) : (
                filteredQuestions.map(question => (
                    <Card
                        key={question.id}
                        className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedQuestion(question)}
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex flex-col items-center gap-1">
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleVote(question.id, null, 'up');
                                    }}
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                >
                                    <ThumbsUp className="h-4 w-4" />
                                </Button>
                                <span className="text-sm font-medium">{question.upvotes}</span>
                            </div>

                            <div className="flex-1">
                                <div className="mb-2 flex items-start justify-between">
                                    <h4 className="font-semibold hover:text-primary">{question.title}</h4>
                                    {question.isSolved && (
                                        <Badge className="bg-green-500 gap-1">
                                            <CheckCircle className="h-3 w-3" />
                                            Solved
                                        </Badge>
                                    )}
                                </div>
                                <p className="mb-2 text-sm text-muted-foreground line-clamp-2">
                                    {question.content}
                                </p>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <span>{question.author}</span>
                                    <span>•</span>
                                    <span>{formatTimestamp(question.timestamp)}</span>
                                    <span>•</span>
                                    <span>{question.answers.length} answers</span>
                                    <span>•</span>
                                    <span>{question.views} views</span>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {question.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))
            )}
        </div>
    </div>
);
}
