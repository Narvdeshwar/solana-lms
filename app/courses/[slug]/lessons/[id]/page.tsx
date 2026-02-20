'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, CheckCircle, BookOpen, Code, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/shared/progress-bar';
import { ProfessionalVideoPlayer } from '@/components/lesson/professional-video-player';
import { MarkdownContent } from '@/components/lesson/markdown-content';
import { AdvancedCodeEditor } from '@/components/lesson/advanced-code-editor';
import { AdvancedQuiz } from '@/components/lesson/advanced-quiz';
import { Notes } from '@/components/lesson/notes';
import { ROUTES } from '@/lib/constants';
import { MOCK_LESSON_CONTENT } from '@/lib/mock-data';

// Mock lesson data with different types
const mockLessons = {
    'l1': {
        id: 'l1',
        title: 'What is Solana?',
        type: 'reading' as const,
        order: 1,
        estimatedMinutes: 15,
        content: MOCK_LESSON_CONTENT,
    },
    'l2': {
        id: 'l2',
        title: 'Your First Solana Program',
        type: 'challenge' as const,
        order: 2,
        estimatedMinutes: 30,
        content: '# Coding Challenge\n\nWrite your first Solana program!',
        challenge: {
            starterCode: `// Write a function that returns "Hello, Solana!"
function greet() {
    // Your code here
}

console.log(greet());`,
            language: 'typescript' as const,
            testCases: [
                {
                    id: 't1',
                    description: 'Should return correct greeting',
                    input: '',
                    expectedOutput: 'Hello, Solana!',
                    isHidden: false,
                },
            ],
            hints: [
                {
                    id: 'h1',
                    text: 'You need to return a string from the function',
                    order: 1,
                },
                {
                    id: 'h2',
                    text: 'Use the return keyword followed by the greeting string',
                    order: 2,
                },
                {
                    id: 'h3',
                    text: 'The exact string should be: "Hello, Solana!"',
                    order: 3,
                },
            ],
            solution: `// Write a function that returns "Hello, Solana!"
function greet() {
    return "Hello, Solana!";
}

console.log(greet());`,
            solutionExplanation: 'The function simply returns the string "Hello, Solana!" which is then logged to the console.',
        },
    },
    'l3': {
        id: 'l3',
        title: 'Solana Architecture Quiz',
        type: 'quiz' as const,
        order: 3,
        estimatedMinutes: 10,
        content: '# Test Your Knowledge\n\nAnswer these questions about Solana architecture.',
        quiz: [
            {
                id: 'q1',
                type: 'multiple-choice',
                question: 'What is the approximate transaction throughput of Solana?',
                options: [
                    '1,000 TPS',
                    '10,000 TPS',
                    '65,000+ TPS',
                    '100,000 TPS',
                ],
                correctAnswer: 2,
                explanation: 'Solana can process over 65,000 transactions per second, making it one of the fastest blockchains.',
            },
            {
                id: 'q2',
                type: 'multiple-choice',
                question: 'What consensus mechanism does Solana use?',
                options: [
                    'Proof of Work',
                    'Proof of Stake with Proof of History',
                    'Delegated Proof of Stake',
                    'Proof of Authority',
                ],
                correctAnswer: 1,
                explanation: 'Solana combines Proof of Stake with its innovative Proof of History mechanism for fast consensus.',
            },
            {
                id: 'q3',
                type: 'multiple-choice',
                question: 'What is the typical transaction fee on Solana?',
                options: [
                    'Less than $0.01',
                    '$0.10 - $0.50',
                    '$1 - $5',
                    '$10+',
                ],
                correctAnswer: 0,
                explanation: 'Solana transaction fees are typically less than $0.01, making it very cost-effective.',
            },
        ],
    },
};

const mockCourse = {
    slug: 'solana-fundamentals',
    title: 'Solana Fundamentals',
    totalLessons: 10,
};

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const [isCompleting, setIsCompleting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showNotes, setShowNotes] = useState(false);

    const lessonId = params.id as string;
    const lesson = mockLessons[lessonId as keyof typeof mockLessons] || mockLessons['l1'];
    const course = mockCourse;
    const currentLessonNumber = lesson.order;

    const handleComplete = async () => {
        setIsCompleting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsCompleted(true);
            setTimeout(() => {
                router.push(ROUTES.COURSE_DETAIL(course.slug));
            }, 1500);
        } catch (error) {
            console.error('Failed to complete lesson:', error);
        } finally {
            setIsCompleting(false);
        }
    };

    const handleCodeRun = async (code: string) => {
        // Simulate code execution
        await new Promise(resolve => setTimeout(resolve, 500));

        // Simple evaluation for demo
        if (code.includes('return "Hello, Solana!"') || code.includes("return 'Hello, Solana!'")) {
            return {
                success: true,
                output: 'Hello, Solana!',
            };
        }

        return {
            success: false,
            output: 'undefined',
        };
    };

    const handleQuizComplete = (score: number, total: number) => {
        if (score === total) {
            setIsCompleted(true);
        }
    };

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Header */}
            <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        <Button
                            variant="ghost"
                            onClick={() => router.push(ROUTES.COURSE_DETAIL(course.slug))}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to Course
                        </Button>

                        <div className="flex items-center gap-4">
                            <div className="hidden text-sm text-muted-foreground md:block">
                                Lesson {currentLessonNumber} of {course.totalLessons}
                            </div>
                            <ProgressBar
                                value={(currentLessonNumber / course.totalLessons) * 100}
                                className="hidden w-32 md:block"
                                size="sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Lesson Header */}
                        <div className="mb-8">
                            <div className="mb-4 flex items-center gap-2">
                                <Badge variant="outline">
                                    {lesson.type === 'challenge' ? (
                                        <><Code className="mr-1 h-3 w-3" />Challenge</>
                                    ) : lesson.type === 'quiz' ? (
                                        <><HelpCircle className="mr-1 h-3 w-3" />Quiz</>
                                    ) : (
                                        <><BookOpen className="mr-1 h-3 w-3" />Reading</>
                                    )}
                                </Badge>
                                <Badge variant="outline">{lesson.estimatedMinutes} min</Badge>
                                {isCompleted && (
                                    <Badge className="bg-green-500">
                                        <CheckCircle className="mr-1 h-3 w-3" />
                                        Completed
                                    </Badge>
                                )}
                            </div>
                            <h1 className="text-4xl font-bold">{lesson.title}</h1>
                        </div>

                        {/* Video Player (if video lesson) */}
                        {lesson.type === 'reading' && (
                            <ProfessionalVideoPlayer
                                title={lesson.title}
                                className="mb-8"
                                onComplete={() => setIsCompleted(true)}
                            />
                        )}

                        {/* Lesson Content */}
                        <Card className="mb-8 p-8">
                            <MarkdownContent content={lesson.content} />
                        </Card>

                        {/* Code Editor (for challenges) */}
                        {lesson.type === 'challenge' && lesson.challenge && (
                            <Card className="mb-8 p-6">
                                <h2 className="mb-4 text-xl font-semibold">Code Challenge</h2>
                                <AdvancedCodeEditor
                                    initialCode={lesson.challenge.starterCode}
                                    language={lesson.challenge.language}
                                    onRun={handleCodeRun}
                                    testCases={lesson.challenge.testCases}
                                    hints={lesson.challenge.hints}
                                    solution={lesson.challenge.solution}
                                    solutionExplanation={lesson.challenge.solutionExplanation}
                                />
                            </Card>
                        )}

                        {/* Quiz (for quiz lessons) */}
                        {lesson.type === 'quiz' && lesson.quiz && (
                            <Card className="mb-8 p-6">
                                <AdvancedQuiz
                                    questions={lesson.quiz}
                                    onComplete={handleQuizComplete}
                                />
                            </Card>
                        )}

                        {/* Navigation */}
                        <div className="flex items-center justify-between">
                            <Button
                                variant="outline"
                                onClick={() => router.push(ROUTES.COURSE_DETAIL(course.slug))}
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Previous
                            </Button>

                            <div className="flex gap-4">
                                {!isCompleted && lesson.type === 'reading' && (
                                    <Button onClick={handleComplete} disabled={isCompleting}>
                                        {isCompleting ? 'Completing...' : 'Mark as Complete'}
                                    </Button>
                                )}
                                <Button onClick={() => router.push(ROUTES.COURSE_DETAIL(course.slug))}>
                                    Next
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Notes */}
                            <Notes
                                lessonId={lesson.id}
                                onSave={(notes) => console.log('Notes saved:', notes)}
                            />

                            {/* Lesson Info */}
                            <Card className="p-4">
                                <h3 className="mb-3 font-semibold">Lesson Info</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Duration</span>
                                        <span className="font-medium">{lesson.estimatedMinutes} min</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Type</span>
                                        <span className="font-medium capitalize">{lesson.type}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Order</span>
                                        <span className="font-medium">{lesson.order}/{course.totalLessons}</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
