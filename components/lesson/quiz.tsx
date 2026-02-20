'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
}

interface QuizProps {
    questions: QuizQuestion[];
    onComplete?: (score: number, total: number) => void;
    className?: string;
}

export function Quiz({ questions, onComplete, className }: QuizProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

    const question = questions[currentQuestion];
    const isLastQuestion = currentQuestion === questions.length - 1;
    const isCorrect = selectedAnswer === question.correctAnswer;

    const handleSelectAnswer = (index: number) => {
        if (!showResult) {
            setSelectedAnswer(index);
        }
    };

    const handleSubmit = () => {
        if (selectedAnswer === null) return;

        setShowResult(true);

        if (isCorrect && !answeredQuestions.has(currentQuestion)) {
            setScore(score + 1);
            setAnsweredQuestions(new Set(answeredQuestions).add(currentQuestion));
        }
    };

    const handleNext = () => {
        if (isLastQuestion) {
            onComplete?.(score + (isCorrect && !answeredQuestions.has(currentQuestion) ? 1 : 0), questions.length);
        } else {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        }
    };

    const handleRetry = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setAnsweredQuestions(new Set());
    };

    return (
        <div className={cn('space-y-6', className)}>
            {/* Progress */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                        Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span className="font-medium">
                        Score: {score}/{questions.length}
                    </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{
                            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div

                    const isSelected= selectedAnswer === index;
                const isCorrectAnswer = index === question.correctAnswer;
                const showCorrect = showResult && isCorrectAnswer;
                const showIncorrect = showResult && isSelected && !isCorrect;

                return (
                <motion.button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={showResult}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    className={cn(
                        'w-full rounded-lg border-2 p-4 text-left transition-all',
                        'hover:border-primary hover:bg-primary/5',
                        isSelected && !showResult && 'border-primary bg-primary/10',
                        showCorrect && 'border-green-500 bg-green-500/10',
                        showIncorrect && 'border-red-500 bg-red-500/10',
                        showResult && !isSelected && !isCorrectAnswer && 'opacity-50'
                    )}
                >
                    <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showCorrect && (
                            <Check className="h-5 w-5 text-green-600" />
                        )}
                        {showIncorrect && (
                            <X className="h-5 w-5 text-red-600" />
                        )}
                    </div>
                </motion.button>
                );
                            })}
        </div>

                        {/* Explanation */ }
    {
        showResult && question.explanation && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={cn(
                    'mt-4 rounded-lg p-4',
                    isCorrect ? 'bg-green-500/10' : 'bg-blue-500/10'
                )}
            >
                <p className="text-sm font-medium mb-1">
                    {isCorrect ? '✓ Correct!' : 'Explanation:'}
                </p>
                <p className="text-sm text-muted-foreground">
                    {question.explanation}
                </p>
            </motion.div>
        )
    }
                    </Card >
                </motion.div >
            </AnimatePresence >

        {/* Actions */ }
        < div className = "flex items-center justify-between" >
            {!showResult ? (
                <>
                    <div />
                    <Button
                        onClick={handleSubmit}
                        disabled={selectedAnswer === null}
                        className="gap-2"
                    >
                        Submit Answer
                    </Button>
                </>
            ) : (
                <>
                    {!isLastQuestion ? (
                        <>
                            <div />
                            <Button onClick={handleNext} className="gap-2">
                                Next Question
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={handleRetry} variant="outline">
                                Retry Quiz
                            </Button>
                            <Button onClick={handleNext} className="gap-2">
                                Complete Quiz
                                <Check className="h-4 w-4" />
                            </Button>
                        </>
                    )}
                </>
            )
}
            </div >
        </div >
    );
}
