'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/shared/progress-bar';
import { CheckCircle, XCircle, TrendingUp, Award } from 'lucide-react';
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
    onComplete: (result: SkillLevel) => void;
    className?: string;
}

const assessmentQuestions: AssessmentQuestion[] = [
    {
        id: '1',
        question: 'What is Solana primarily known for?',
        options: [
            'Smart contract platform with high throughput',
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
        difficulty: 'intermediate',
        topic: 'architecture'
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
        question: 'What is a Program Derived Address (PDA)?',
        options: [
            'A user wallet address',
            'An address derived from a program ID and seeds',
            'A validator node address',
            'A token mint address'
        ],
        correctAnswer: 1,
        difficulty: 'advanced',
        topic: 'development'
    },
    {
        id: '5',
        question: 'What is the typical transaction fee on Solana?',
        options: [
            'Less than $0.01',
            '$0.10 - $1.00',
            '$1.00 - $5.00',
            'More than $5.00'
        ],
        correctAnswer: 0,
        difficulty: 'beginner',
        topic: 'basics'
    },
    {
        id: '6',
        question: 'What is the Anchor framework used for?',
        options: [
            'Building web frontends',
            'Simplifying Solana program development',
            'Managing validator nodes',
            'Creating NFT collections'
        ],
        correctAnswer: 1,
        difficulty: 'intermediate',
        topic: 'development'
    },
    {
        id: '7',
        question: 'What is the purpose of rent in Solana?',
        options: [
            'Transaction fees',
            'Validator rewards',
            'Storage cost for accounts',
            'Staking requirements'
        ],
        correctAnswer: 2,
        difficulty: 'intermediate',
        topic: 'architecture'
    },
    {
        id: '8',
        question: 'What is a Cross-Program Invocation (CPI)?',
        options: [
            'Calling one program from another',
            'Transferring tokens between wallets',
            'Validating transactions',
            'Creating new accounts'
        ],
        correctAnswer: 0,
        difficulty: 'advanced',
        topic: 'development'
    }
];

export function SkillAssessment({ onComplete, className }: SkillAssessmentProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answers, setAnswers] = useState<{ questionId: string; correct: boolean; difficulty: string }[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const question = assessmentQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;

    const handleAnswer = () => {
        if (selectedAnswer === null) return;

        const isCorrect
    }
};

const calculateSkillLevel = () => {
    const totalCorrect = answers.filter(a => a.correct).length + (selectedAnswer === question.correctAnswer ? 1 : 0);
    const totalQuestions = assessmentQuestions.length;
    const scorePercentage = (totalCorrect / totalQuestions) * 100;

    // Calculate performance by difficulty
    const beginnerCorrect = answers.filter(a => a.difficulty === 'beginner' && a.correct).length;
    const intermediateCorrect = answers.filter(a => a.difficulty === 'intermediate' && a.correct).length;
    const advancedCorrect = answers.filter(a => a.difficulty === 'advanced' && a.correct).length;

    // Determine skill level
    let level: SkillLevel['level'] = 'beginner';
    if (scorePercentage >= 90 && advancedCorrect >= 1) {
        level = 'expert';
    } else if (scorePercentage >= 70 && intermediateCorrect >= 2) {
        level = 'advanced';
    } else if (scorePercentage >= 50) {
        level = 'intermediate';
    }

    // Determine strengths and weaknesses
    const topicPerformance: Record<string, { correct: number; total: number }> = {};
    [...answers, { questionId: question.id, correct: selectedAnswer === question.correctAnswer, difficulty: question.difficulty }]
        .forEach((answer, index) => {
            const q = assessmentQuestions[index];
            if (!topicPerformance[q.topic]) {
                topicPerformance[q.topic] = { correct: 0, total: 0 };
            }
            topicPerformance[q.topic].total++;
            if (answer.correct) {
                topicPerformance[q.topic].correct++;
            }
        });

    const strengths = Object.entries(topicPerformance)
        .filter(([_, perf]) => perf.correct / perf.total >= 0.7)
        .map(([topic]) => topic);

    const weaknesses = Object.entries(topicPerformance)
        .filter(([_, perf]) => perf.correct / perf.total < 0.5)
        .map(([topic]) => topic);

    // Recommend courses based on level
    const recommendedCourses = level === 'beginner'
        ? ['Solana Fundamentals', 'Introduction to Blockchain']
        : level === 'intermediate'
            ? ['Advanced Solana Development', 'DeFi on Solana']
            : ['Solana Program Security', 'Building Production dApps'];

    const result: SkillLevel = {
        level,
        score: scorePercentage,
        strengths,
        weaknesses,
        recommendedCourses
    };

    setIsComplete(true);
    onComplete(result);
};

if (isComplete) {
    return (
        <Card className={cn('p-8 text-center', className)}>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
            >
                <Award className="mx-auto h-16 w-16 text-primary" />
            </motion.div>
            <h2 className="mt-4 text-2xl font-bold">Assessment Complete!</h2>
            <p className="mt-2 text-muted-foreground">
                Your personalized learning path is ready
            </p>
        </Card>
    );
}

return (
    <div className={cn('space-y-6', className)}>
        {/* Progress */}
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                    Question {currentQuestion + 1} of {assessmentQuestions.length}
                </span>
                <Badge variant="outline" className="capitalize">
                    {question.difficulty}
                </Badge>
            </div>
            <ProgressBar value={progress} />
        </div>

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
                    <div className="mb-6">
                        <Badge variant="secondary" className="mb-3">
                            {question.topic}
                        </Badge>
                        <h3 className="text-xl font-semibold">{question.question}</h3>
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => !showResult && setSelectedAnswer(index)}
                                disabled={showResult}
                                className={cn(
                                    'w-full rounded-lg border-2 p-4 text-left transition-all',
                                    selectedAnswer === index
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50',
                                    showResult && index === question.correctAnswer && 'border-green-500 bg-green-500/10',
                                    showResult && selectedAnswer === index && index !== question.correctAnswer && 'border-red-500 bg-red-500/10'
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{option}</span>
                                    {showResult && index === question.correctAnswer && (
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    )}
                                    {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                                        <XCircle className="h-5 w-5 text-red-600" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex justify-end gap-2">
                        {!showResult ? (
                            <Button
                                onClick={handleAnswer}
                                disabled={selectedAnswer === null}
                            >
                                Submit Answer
                            </Button>
                        ) : (
                            <Button onClick={handleNext} className="gap-2">
                                {currentQuestion < assessmentQuestions.length - 1 ? 'Next Question' : 'See Results'}
                                <TrendingUp className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </Card>
            </motion.div>
        </AnimatePresence>
    </div>
);
}
