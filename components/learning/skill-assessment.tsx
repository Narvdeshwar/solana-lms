'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/shared/progress-bar';
import {
    Brain,
    CheckCircle,
    XCircle,
    TrendingUp,
    Award,
    Target,
    Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface AssessmentQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    topic: string;
}

interface SkillLevel {
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    score: number;
    strengths: string[];
    weaknesses: string[];
    recommendedCourses: string[];
}

interface SkillAssessmentProps {
    onComplete?: (result: SkillLevel) => void;
    className?: string;
}

const assessmentQuestions: AssessmentQuestion[] = [
    {
        id: '1',
        question: 'What is Solana?',
        options: [
            'A high-performance blockchain platform with high throughput',
            'Privacy-focused cryptocurrency',
            'Decentralized storage network',
            'Layer 2 scaling solution'
        ],
        correctAnswer: 0,
        difficulty: 'beginner',
        topic: 'basics'
    },
    {
        id: '2',
        question: 'What is Proof of History (PoH)?',
        options: [
            'A consensus mechanism',
            'A cryptographic clock for ordering events',
            'A type of smart contract',
            'A wallet protocol'
        ],
        correctAnswer: 1,
        difficulty: 'beginner',
        topic: 'consensus'
    },
    {
        id: '3',
        question: 'What programming language is primarily used for Solana smart contracts?',
        options: [
            'Solidity',
            'JavaScript',
            'Rust',
            'Python'
        ],
        correctAnswer: 2,
        difficulty: 'beginner',
        topic: 'development'
    },
    {
        id: '4',
        question: 'What is an Account in Solana?',
        options: [
            'A user wallet address',
            'A data storage unit that can hold SOL or program data',
            'A smart contract function',
            'A transaction type'
        ],
        correctAnswer: 1,
        difficulty: 'intermediate',
        topic: 'architecture'
    },
    {
        id: '5',
        question: 'What is a Program Derived Address (PDA)?',
        options: [
            'A user-generated wallet address',
            'An address derived from a program ID and seeds',
            'A temporary transaction address',
            'An encrypted account address'
        ],
        correctAnswer: 1,
        difficulty: 'intermediate',
        topic: 'development'
    },
    {
        id: '6',
        question: 'What is the purpose of the Anchor framework?',
        options: [
            'To mine SOL tokens',
            'To simplify Solana program development',
            'To create NFTs',
            'To manage validator nodes'
        ],
        correctAnswer: 1,
        difficulty: 'intermediate',
        topic: 'development'
    },
    {
        id: '7',
        question: 'How does Solana achieve parallel transaction processing?',
        options: [
            'Using sharding',
            'Through Sealevel runtime that processes non-overlapping transactions in parallel',
            'By increasing block size',
            'Using multiple consensus mechanisms'
        ],
        correctAnswer: 1,
        difficulty: 'advanced',
        topic: 'architecture'
    },
    {
        id: '8',
        question: 'What is the role of the Turbine protocol in Solana?',
        options: [
            'Transaction validation',
            'Block propagation optimization',
            'Consensus mechanism',
            'Smart contract execution'
        ],
        correctAnswer: 1,
        difficulty: 'advanced',
        topic: 'architecture'
    },
    {
        id: '9',
        question: 'What is Cross-Program Invocation (CPI)?',
        options: [
            'Calling one program from another program',
            'Transferring SOL between accounts',
            'Creating new accounts',
            'Validating transactions'
        ],
        correctAnswer: 0,
        difficulty: 'advanced',
        topic: 'development'
    },
    {
        id: '10',
        question: 'What is the purpose of rent in Solana?',
        options: [
            'Transaction fees',
            'Validator rewards',
            'Storage cost for keeping accounts alive',
            'Staking rewards'
        ],
        correctAnswer: 2,
        difficulty: 'intermediate',
        topic: 'economics'
    }
];

export function SkillAssessment({ onComplete, className }: SkillAssessmentProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [skillResult, setSkillResult] = useState<SkillLevel | null>(null);

    const question = assessmentQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
    const isLastQuestion = currentQuestion === assessmentQuestions.length - 1;

    const handleAnswer = () => {
        if (selectedAnswer === null) return;

        const newAnswers = [...answers, selectedAnswer];
        setAnswers(newAnswers);
        setShowResult(true);

        setTimeout(() => {
            if (isLastQuestion) {
                calculateSkillLevel(newAnswers);
            } else {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
                setShowResult(false);
            }
        }, 1500);
    };

    const calculateSkillLevel = (userAnswers: number[]) => {
        let score = 0;
        const topicScores: Record<string, { correct: number; total: number }> = {};

        assessmentQuestions.forEach((q, index) => {
            const isCorrect = userAnswers[index] === q.correctAnswer;
            if (isCorrect) score++;

            if (!topicScores[q.topic]) {
                topicScores[q.topic] = { correct: 0, total: 0 };
            }
            topicScores[q.topic].total++;
            if (isCorrect) topicScores[q.topic].correct++;
        });

        const percentage = (score / assessmentQuestions.length) * 100;

        let level: SkillLevel['level'];
        if (percentage >= 90) level = 'expert';
        else if (percentage >= 70) level = 'advanced';
        else if (percentage >= 50) level = 'intermediate';
        else level = 'beginner';

        const strengths: string[] = [];
        const weaknesses: string[] = [];

        Object.entries(topicScores).forEach(([topic, scores]) => {
            const topicPercentage = (scores.correct / scores.total) * 100;
            if (topicPercentage >= 70) {
                strengths.push(topic);
            } else if (topicPercentage < 50) {
                weaknesses.push(topic);
            }
        });

        const recommendedCourses: string[] = [];
        if (level === 'beginner') {
            recommendedCourses.push('Solana Fundamentals', 'Introduction to Blockchain');
        } else if (level === 'intermediate') {
            recommendedCourses.push('Advanced Solana Development', 'Building DeFi on Solana');
        } else {
            recommendedCourses.push('Solana Architecture Deep Dive', 'Advanced Program Security');
        }

        if (weaknesses.includes('development')) {
            recommendedCourses.push('Rust for Solana Developers');
        }
        if (weaknesses.includes('architecture')) {
            recommendedCourses.push('Solana System Design');
        }

        const result: SkillLevel = {
            level,
            score: percentage,
            strengths,
            weaknesses,
            recommendedCourses
        };

        setSkillResult(result);
        setIsComplete(true);
        onComplete?.(result);
    };

    const getLevelColor = (level: SkillLevel['level']) => {
        switch (level) {
            case 'expert': return 'text-purple-600 bg-purple-500/10';
            case 'advanced': return 'text-blue-600 bg-blue-500/10';
            case 'intermediate': return 'text-green-600 bg-green-500/10';
            case 'beginner': return 'text-orange-600 bg-orange-500/10';
        }
    };

    const getLevelIcon = (level: SkillLevel['level']) => {
        switch (level) {
            case 'expert': return <Award className="h-8 w-8" />;
            case 'advanced': return <TrendingUp className="h-8 w-8" />;
            case 'intermediate': return <Target className="h-8 w-8" />;
            case 'beginner': return <Zap className="h-8 w-8" />;
        }
    };

    if (isComplete && skillResult) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn('space-y-6', className)}
            >
                {/* Result Header */}
                <Card className="p-8 text-center">
                    <div className={cn(
                        'mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full',
                        getLevelColor(skillResult.level)
                    )}>
                        {getLevelIcon(skillResult.level)}
                    </div>
                    <h2 className="mb-2 text-3xl font-bold capitalize">{skillResult.level} Level</h2>
                    <p className="text-muted-foreground">
                        You scored {Math.round(skillResult.score)}% on the assessment
                    </p>
                    <div className="mt-6">
                        <ProgressBar value={skillResult.score} className="h-3" />
                    </div>
                </Card>

                {/* Strengths & Weaknesses */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Strengths */}
                    <Card className="p-6">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            Your Strengths
                        </h3>
                        {skillResult.strengths.length > 0 ? (
                            <div className="space-y-2">
                                {skillResult.strengths.map(strength => (
                                    <div key={strength} className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-600" />
                                        <span className="capitalize">{strength}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Keep learning to build your strengths!
                            </p>
                        )}
                    </Card>

                    {/* Areas to Improve */}
                    <Card className="p-6">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                            <Target className="h-5 w-5 text-orange-600" />
                            Areas to Improve
                        </h3>
                        {skillResult.weaknesses.length > 0 ? (
                            <div className="space-y-2">
                                {skillResult.weaknesses.map(weakness => (
                                    <div key={weakness} className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-orange-600" />
                                        <span className="capitalize">{weakness}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Great job! You're strong across all areas.
                            </p>
                        )}
                    </Card>
                </div>

                {/* Recommended Courses */}
                <Card className="p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                        <Brain className="h-5 w-5 text-blue-600" />
                        Recommended Learning Path
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                        Based on your assessment, we recommend these courses:
                    </p>
                    <div className="space-y-3">
                        {skillResult.recommendedCourses.map((course, index) => (
                            <div
                                key={course}
                                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent transition-colors"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                    {index + 1}
                                </div>
                                <span className="font-medium">{course}</span>
                                <Button size="sm" className="ml-auto">
                                    Start
                                </Button>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Actions */}
                <div className="flex justify-center gap-4">
                    <Button
                        onClick={() => {
                            setCurrentQuestion(0);
                            setSelectedAnswer(null);
                            setAnswers([]);
                            setShowResult(false);
                            setIsComplete(false);
                            setSkillResult(null);
                        }}
                        variant="outline"
                    >
                        Retake Assessment
                    </Button>
                    <Button>
                        View Recommended Courses
                    </Button>
                </div>
            </motion.div>
        );
    }

    return (
        <div className={cn('space-y-6', className)}>
            {/* Header */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Brain className="h-6 w-6" />
                            Skill Assessment
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Answer {assessmentQuestions.length} questions to determine your skill level
                        </p>
                    </div>
                    <Badge variant="outline" className="text-sm">
                        Question {currentQuestion + 1}/{assessmentQuestions.length}
                    </Badge>
                </div>
                <ProgressBar value={progress} className="h-2" />
            </Card>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="p-6">
                        {/* Question Header */}
                        <div className="mb-6">
                            <div className="mb-3 flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        question.difficulty === 'beginner' && 'border-green-500 text-green-600',
                                        question.difficulty === 'intermediate' && 'border-blue-500 text-blue-600',
                                        question.difficulty === 'advanced' && 'border-purple-500 text-purple-600'
                                    )}
                                >
                                    {question.difficulty}
                                </Badge>
                                <Badge variant="secondary" className="capitalize">
                                    {question.topic}
                                </Badge>
                            </div>
                            <h3 className="text-xl font-semibold">{question.question}</h3>
                        </div>

                        {/* Options */}
                        <div className="space-y-3">
                            {question.options.map((option, index) => {
                                const isSelected = selectedAnswer === index;
                                const isCorrect = index === question.correctAnswer;
                                const showCorrect = showResult && isCorrect;
                                const showIncorrect = showResult && isSelected && !isCorrect;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => !showResult && setSelectedAnswer(index)}
                                        disabled={showResult}
                                        className={cn(
                                            'w-full rounded-lg border-2 p-4 text-left transition-all',
                                            isSelected && !showResult && 'border-primary bg-primary/5',
                                            !isSelected && !showResult && 'border-border hover:border-primary/50',
                                            showCorrect && 'border-green-500 bg-green-500/10',
                                            showIncorrect && 'border-red-500 bg-red-500/10'
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{option}</span>
                                            {showCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                                            {showIncorrect && <XCircle className="h-5 w-5 text-red-600" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Submit Button */}
                        {!showResult && (
                            <div className="mt-6">
                                <Button
                                    onClick={handleAnswer}
                                    disabled={selectedAnswer === null}
                                    className="w-full"
                                >
                                    {isLastQuestion ? 'Finish Assessment' : 'Next Question'}
                                </Button>
                            </div>
                        )}
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
