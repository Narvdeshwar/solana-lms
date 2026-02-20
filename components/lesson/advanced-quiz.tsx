'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, ChevronRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from '@/components/shared/progress-bar';

type QuestionType = 'multiple-choice' | 'multiple-select' | 'true-false' | 'fill-blank' | 'code-completion';

interface BaseQuestion {
    id: string;
    question: string;
    type: QuestionType;
    explanation?: string;
}

interface MultipleChoiceQuestion extends BaseQuestion {
    type: 'multiple-choice';
    options: string[];
    correctAnswer: number;
}

interface MultipleSelectQuestion extends BaseQuestion {
    type: 'multiple-select';
    options: string[];
    correctAnswers: number[];
}

interface TrueFalseQuestion extends BaseQuestion {
    type: 'true-false';
    correctAnswer: boolean;
}

interface FillBlankQuestion extends BaseQuestion {
    type: 'fill-blank';
    correctAnswer: string;
    caseSensitive?: boolean;
}

interface CodeCompletionQuestion extends BaseQuestion {
    type: 'code-completion';
    codeTemplate: string;
    correctAnswer: string;
}

type Question = MultipleChoiceQuestion | MultipleSelectQuestion | TrueFalseQuestion | FillBlankQuestion | CodeCompletionQuestion;

interface AdvancedQuizProps {
    questions: Question[];
    onComplete?: (score: number, total: number) => void;
    className?: string;
}

export function AdvancedQuiz({ questions, onComplete, className }: AdvancedQuizProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<any>(null);
    const [textAnswer, setTextAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

    const question = questions[currentQuestion];
    const isLastQuestion = currentQuestion === questions.length - 1;
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    const checkAnswer = () => {
        let isCorrect = false;

        switch (question.type) {
            case 'multiple-choice':
                isCorrect = selectedAnswers === (question as MultipleChoiceQuestion).correctAnswer;
                break;
            case 'multiple-select':
                const correctAnswers = (question as MultipleSelectQuestion).correctAnswers;
                isCorrect =
                    Array.isArray(selectedAnswers) &&
                    selectedAnswers.length === correctAnswers.length &&
                    selectedAnswers.every((ans: number) => correctAnswers.includes(ans));
                break;
            case 'true-false':
                isCorrect = selectedAnswers === (question as TrueFalseQuestion).correctAnswer;
                break;
            case 'fill-blank':
                const fillQuestion = question as FillBlankQuestion;
                const userAnswer = fillQuestion.caseSensitive ? textAnswer : textAnswer.toLowerCase();
                const correct = fillQuestion.caseSensitive ? fillQuestion.correctAnswer : fillQuestion.correctAnswer.toLowerCase();
                isCorrect = userAnswer.trim() === correct.trim();
                break;
            case 'code-completion':
                isCorrect = textAnswer.trim() === (question as CodeCompletionQuestion).correctAnswer.trim();
                break;
        }

        return isCorrect;
    };

    const handleSubmit = () => {
        const isCorrect = checkAnswer();
        setShowResult(true);

        if (isCorrect && !answeredQuestions.has(currentQuestion)) {
            setScore(score + 1);
            setAnsweredQuestions(new Set(answeredQuestions).add(currentQuestion));
        }
    };

    const handleNext = () => {
        if (isLastQuestion) {
            const finalScore = score + (checkAnswer() && !answeredQuestions.has(currentQuestion) ? 1 : 0);
            onComplete?.(finalScore, questions.length);
        } else {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswers(null);
            setTextAnswer('');
            setShowResult(false);
        }
    };

    const handleRetry = () => {
        setCurrentQuestion(0);
        setSelectedAnswers(null);
        setTextAnswer('');
        setShowResult(false);
        setScore(0);
        setAnsweredQuestions(new Set());
    };

    const handleMultipleSelect = (index: number) => {
        if (showResult) return;

        const current = Array.isArray(selectedAnswers) ? selectedAnswers : [];
        if (current.includes(index)) {
            setSelectedAnswers(current.filter((i: number) => i !== index));
        } else {
            setSelectedAnswers([...current, index]);
        }
    };

    const isAnswered = () => {
        if (question.type === 'fill-blank' || question.type === 'code-completion') {
            return textAnswer.trim().length > 0;
        }
        return selectedAnswers !== null;
    };

    const renderQuestion = () => {
        switch (question.type) {
            case 'multiple-choice':
                const mcQuestion = question as MultipleChoiceQuestion;
                return (
                    <div className="space-y-3">
                        {mcQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => !showResult && setSelectedAnswers(index)}
                                disabled={showResult}
                                className={cn(
                                    'w-full rounded-lg border-2 p-4 text-left transition-all',
                                    selectedAnswers === index
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50',
                                    showResult && index === mcQuestion.correctAnswer && 'border-green-500 bg-green-500/10',
                                    showResult && selectedAnswers === index && index !== mcQuestion.correctAnswer && 'border-red-500 bg-red-500/10'
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{option}</span>
                                    {showResult && index === mcQuestion.correctAnswer && (
                                        <Check className="h-5 w-5 text-green-600" />
                                    )}
                                    {showResult && selectedAnswers === index && index !== mcQuestion.correctAnswer && (
                                        <X className="h-5 w-5 text-red-600" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                );

            case 'multiple-select':
                const msQuestion = question as MultipleSelectQuestion;
                return (
                    <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">Select all that apply</p>
                        {msQuestion.options.map((option, index) => {
                            const isSelected = Array.isArray(selectedAnswers) && selectedAnswers.includes(index);
                            const isCorrectAnswer = msQuestion.correctAnswers.includes(index);
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleMultipleSelect(index)}
                                    disabled={showResult}
                                    className={cn(
                                        'w-full rounded-lg border-2 p-4 text-left transition-all',
                                        isSelected
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary/50',
                                        showResult && isCorrectAnswer && 'border-green-500 bg-green-500/10',
                                        showResult && isSelected && !isCorrectAnswer && 'border-red-500 bg-red-500/10'
                                    )}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{option}</span>
                                        {showResult && isCorrectAnswer && (
                                            <Check className="h-5 w-5 text-green-600" />
                                        )}
                                        {showResult && isSelected && !isCorrectAnswer && (
                                            <X className="h-5 w-5 text-red-600" />
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                );

            case 'true-false':
                return (
                    <div className="flex gap-4">
                        {[true, false].map((value) => (
                            <button
                                key={value.toString()}
                                onClick={() => !showResult && setSelectedAnswers(value)}
                                disabled={showResult}
                                className={cn(
                                    'flex-1 rounded-lg border-2 p-6 text-center text-lg font-medium transition-all',
                                    selectedAnswers === value
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50',
                                    showResult && value === (question as TrueFalseQuestion).correctAnswer && 'border-green-500 bg-green-500/10',
                                    showResult && selectedAnswers === value && value !== (question as TrueFalseQuestion).correctAnswer && 'border-red-500 bg-red-500/10'
                                )}
                            >
                                {value ? 'True' : 'False'}
                            </button>
                        ))}
                    </div>
                );

            case 'fill-blank':
                return (
                    <div>
                        <input
                            type="text"
                            value={textAnswer}
                            onChange={(e) => setTextAnswer(e.target.value)}
                            disabled={showResult}
                            placeholder="Type your answer..."
                            className={cn(
                                'w-full rounded-lg border-2 p-4 transition-all',
                                showResult && checkAnswer() && 'border-green-500 bg-green-500/10',
                                showResult && !checkAnswer() && 'border-red-500 bg-red-500/10'
                            )}
                        />
                    </div>
                );

            case 'code-completion':
                const ccQuestion = question as CodeCompletionQuestion;
                return (
                    <div className="space-y-3">
                        <pre className="rounded-lg bg-muted p-4 text-sm">
                            <code>{ccQuestion.codeTemplate}</code>
                        </pre>
                        <textarea
                            value={textAnswer}
                            onChange={(e) => setTextAnswer(e.target.value)}
                            disabled={showResult}
                            placeholder="Complete the code..."
                            rows={4}
                            className={cn(
                                'w-full rounded-lg border-2 p-4 font-mono text-sm transition-all',
                                showResult && checkAnswer() && 'border-green-500 bg-green-500/10',
                                showResult && !checkAnswer() && 'border-red-500 bg-red-500/10'
                            )}
                        />
                    </div>
                );
        }
    };

    return (
        <div className={cn('space-y-6', className)}>
            {/* Progress */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">
                        Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span className="text-muted-foreground">
                        Score: {score}/{questions.length}
                    </span>
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
                        {/* Question Header */}
                        <div className="mb-6">
                            <div className="mb-2 flex items-center gap-2">
                                <Badge variant="outline" className="capitalize">
                                    {question.type.replace('-', ' ')}
                                </Badge>
                            </div>
                            <h3 className="text-xl font-semibold">{question.question}</h3>
                        </div>

                        {/* Question Content */}
                        {renderQuestion()}

                        {/* Result & Explanation */}
                        {showResult && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-6"
                            >
                                <div
                                    className={cn(
                                        'rounded-lg p-4',
                                        checkAnswer()
                                            ? 'bg-green-500/10 text-green-900 dark:text-green-100'
                                            : 'bg-red-500/10 text-red-900 dark:text-red-100'
                                    )}
                                >
                                    <div className="flex items-center gap-2 font-semibold">
                                        {checkAnswer() ? (
                                            <>
                                                <Check className="h-5 w-5" />
                                                Correct!
                                            </>
                                        ) : (
                                            <>
                                                <X className="h-5 w-5" />
                                                Incorrect
                                            </>
                                        )}
                                    </div>
                                    {question.explanation && (
                                        <p className="mt-2 text-sm opacity-90">{question.explanation}</p>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Actions */}
                        <div className="mt-6 flex items-center justify-between">
                            <Button
                                onClick={handleRetry}
                                variant="outline"
                                className="gap-2"
                            >
                                <RotateCcw className="h-4 w-4" />
                                Retry Quiz
                            </Button>

                            <div className="flex gap-2">
                                {!showResult ? (
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={!isAnswered()}
                                    >
                                        Submit Answer
                                    </Button>
                                ) : (
                                    <Button onClick={handleNext} className="gap-2">
                                        {isLastQuestion ? 'Complete Quiz' : 'Next Question'}
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
