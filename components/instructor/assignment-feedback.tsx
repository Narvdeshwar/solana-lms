'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import {
    FileText,
    CheckCircle,
    Clock,
    Star,
    TrendingUp,
    AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Assignment, Submission } from '@/types/instructor';

interface AssignmentFeedbackProps {
    courseId: string;
    className?: string;
}

export function AssignmentFeedback({ courseId, className }: AssignmentFeedbackProps) {
    const [assignments] = useState<Assignment[]>([
        {
            id: '1',
            courseId,
            title: 'Build a Token Program',
            description: 'Create a basic SPL token program on Solana',
            dueDate: new Date(Date.now() + 604800000),
            maxScore: 100,
            submissions: [],
            createdAt: new Date(Date.now() - 86400000)
        }
    ]);

    const [submissions] = useState<Submission[]>([
        {
            id: 'sub-1',
            assignmentId: '1',
            studentId: 'current-user',
            content: 'Here is my token program implementation...',
            submittedAt: new Date(Date.now() - 43200000),
            feedback: {
                score: 85,
                comments: 'Great work! Your implementation is solid.',
                strengths: [
                    'Clean code structure',
                    'Good error handling',
                    'Comprehensive tests'
                ],
                improvements: [
                    'Add more inline comments',
                    'Consider edge cases for token transfers'
                ],
                codeReview: [
                    {
                        lineNumber: 45,
                        file: 'lib.rs',
                        comment: 'Consider using checked_add here to prevent overflow',
                        severity: 'warning',
                        suggestion: 'amount.checked_add(fee)?'
                    }
                ],
                submittedAt: new Date(Date.now() - 21600000),
                instructorId: 'inst-1'
            }
        }
    ]);

    const [activeTab, setActiveTab] = useState('assignments');

    return (
        <div className={cn('space-y-6', className)}>
            <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Assignments & Feedback</h3>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <div className="flex gap-2 mb-6 border-b">
                        <button
                            onClick={() => setActiveTab('assignments')}
                            className={cn(
                                'px-4 py-2 font-medium transition-colors border-b-2',
                                activeTab === 'assignments'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            )}
                        >
                            Assignments
                        </button>
                        <button
                            onClick={() => setActiveTab('submissions')}
                            className={cn(
                                'px-4 py-2 font-medium transition-colors border-b-2',
                                activeTab === 'submissions'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            )}
                        >
                            My Submissions
                        </button>
                    </div>

                    {activeTab === 'assignments' && (
                        <div className="space-y-4">
                            {assignments.map((assignment) => (
                                <Card key={assignment.id} className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="font-semibold mb-1">{assignment.title}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {assignment.description}
                                            </p>
                                        </div>
                                        <Badge variant="outline">
                                            {assignment.maxScore} pts
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            <span>Due: {assignment.dueDate.toLocaleDateString()}</span>
                                        </div>
                                        <Button size="sm">Submit Assignment</Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {activeTab === 'submissions' && (
                        <div className="space-y-4">
                            {submissions.map((submission) => {
                                const assignment = assignments.find(
                                    (a) => a.id === submission.assignmentId
                                );
                                return (
                                    <Card key={submission.id} className="p-4">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="font-semibold mb-1">
                                                    {assignment?.title}
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Submitted: {submission.submittedAt.toLocaleDateString()}
                                                </p>
                                            </div>
                                            {submission.feedback && (
                                                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                                                    <CheckCircle className="h-3 w-3 mr-1" />
                                                    Graded
                                                </Badge>
                                            )}
                                        </div>

                                        {submission.feedback && (
                                            <div className="space-y-4 pt-4 border-t">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Star className="h-5 w-5 text-yellow-500" />
                                                        <span className="text-2xl font-bold">
                                                            {submission.feedback.score}
                                                        </span>
                                                        <span className="text-muted-foreground">
                                                            / {assignment?.maxScore}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h5 className="font-medium mb-2">Instructor Comments</h5>
                                                    <p className="text-sm text-muted-foreground">
                                                        {submission.feedback.comments}
                                                    </p>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h5 className="font-medium mb-2 flex items-center gap-2 text-green-600">
                                                            <CheckCircle className="h-4 w-4" />
                                                            Strengths
                                                        </h5>
                                                        <ul className="space-y-1">
                                                            {submission.feedback.strengths.map((strength, i) => (
                                                                <li key={i} className="text-sm text-muted-foreground">
                                                                    • {strength}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h5 className="font-medium mb-2 flex items-center gap-2 text-yellow-600">
                                                            <TrendingUp className="h-4 w-4" />
                                                            Areas for Improvement
                                                        </h5>
                                                        <ul className="space-y-1">
                                                            {submission.feedback.improvements.map((improvement, i) => (
                                                                <li key={i} className="text-sm text-muted-foreground">
                                                                    • {improvement}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {submission.feedback.codeReview && submission.feedback.codeReview.length > 0 && (
                                                    <div>
                                                        <h5 className="font-medium mb-2">Code Review</h5>
                                                        <div className="space-y-2">
                                                            {submission.feedback.codeReview.map((review, i) => (
                                                                <div
                                                                    key={i}
                                                                    className="p-3 rounded-lg bg-muted"
                                                                >
                                                                    <div className="flex items-start gap-2">
                                                                        <AlertCircle
                                                                            className={cn(
                                                                                'h-4 w-4 mt-0.5',
                                                                                review.severity === 'error' && 'text-red-500',
                                                                                review.severity === 'warning' && 'text-yellow-500',
                                                                                review.severity === 'info' && 'text-blue-500'
                                                                            )}
                                                                        />
                                                                        <div className="flex-1">
                                                                            <div className="text-sm font-medium">
                                                                                {review.file}:{review.lineNumber}
                                                                            </div>
                                                                            <p className="text-sm text-muted-foreground mt-1">
                                                                                {review.comment}
                                                                            </p>
                                                                            {review.suggestion && (
                                                                                <code className="text-xs bg-background px-2 py-1 rounded mt-2 block">
                                                                                    {review.suggestion}
                                                                                </code>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </Tabs>
            </Card>
        </div>
    );
}
