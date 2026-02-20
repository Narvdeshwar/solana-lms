'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/shared/progress-bar';
import {
    TrendingUp,
    Target,
    BookOpen,
    Award,
    CheckCircle,
    Clock,
    Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillLevel {
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    score: number;
    strengths: string[];
    weaknesses: string[];
    recommendedCourses: string[];
}

interface LearningGoal {
    id: string;
    title: string;
    35,
    milestones: [
        { id: 'm1', title: 'Complete Solana Fundamentals', completed: true },
        { id: 'm2', title: 'Build first dApp', completed: false },
        { id: 'm3', title: 'Deploy to mainnet', completed: false },
    ]
},
{
    id: '2',
        title: 'Learn DeFi Protocols',
            description: 'Understand and build DeFi applications',
                targetDate: new Date('2026-07-01'),
                    progress: 15,
                        milestones: [
                            { id: 'm4', title: 'Study AMM mechanics', completed: false },
                            { id: 'm5', title: 'Build DEX interface', completed: false },
                            { id: 'm6', title: 'Implement liquidity pools', completed: false },
                        ]
}
];

export function LearningPathDashboard({ skillLevel, goals = mockGoals, className }: LearningPathDashboardProps) {
    const getLevelColor = (level: string) => {
        switch (level) {
            case 'beginner': return 'bg-blue-500';
            case 'intermediate': return 'bg-green-500';
            case 'advanced': return 'bg-purple-500';
            case 'expert': return 'bg-orange-500';
            default: return 'bg-gray-500';
        }
    };

    const getLevelIcon = (level: string) => {
        switch (level) {
            case 'beginner': return '🌱';
            case 'intermediate': return '🌿';
            case 'advanced': return '🌳';
            case 'expert': return '🏆';
            default: return '📚';
        }
    };

    return (
        <div className={cn('space-y-6', className)}>
            {/* Skill Level Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Your Skill Level
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className="text-6xl">{getLevelIcon(skillLevel.level)}</div>
                        <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                                <h3 className="text-2xl font-bold capitalize">{skillLevel.level}</h3>
                                <Badge className={getLevelColor(skillLevel.level)}>
                                    {Math.round(skillLevel.score)}%
                                </Badge>
                            </div>
                            <ProgressBar value={skillLevel.score} className="mb-2" />
                            <p className="text-sm text-muted-foreground">
                                Based on your assessment results
                            </p>
                        </div>
                    </div>

                    {/* Strengths and Weaknesses */}
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div>
                            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                                <Zap className="h-4 w-4 text-green-500" />
                                Strengths
                            </h4>
                            {skillLevel.strengths.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {skillLevel.strengths.map(strength => (
                                        <Badge key={strength} variant="secondary" className="capitalize">
                                            {strength}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">Complete more assessments</p>
                            )}
                        </div>
                        <div>
                            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                                <Target className="h-4 w-4 text-orange-500" />
                                Areas to Improve
                            </h4>
                            {skillLevel.weaknesses.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {skillLevel.weaknesses.map(weakness => (
                                        <Badge key={weakness} variant="outline" className="capitalize">
                                            {weakness}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">Great job! Keep learning</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Recommended Courses */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Recommended for You
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {skillLevel.recommendedCourses.map((course, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                        <BookOpen className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{course}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Matches your {skillLevel.level} level
                                        </p>
                                    </div>
                                </div>
                                <Button size="sm">Start Learning</Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Learning Goals */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Learning Goals
                        </CardTitle>
                        <Button size="sm" variant="outline">
                            Add Goal
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {goals.map(goal => (
                            <div key={goal.id} className="rounded-lg border p-4">
                                <div className="mb-3 flex items-start justify-between">
                                    <div>
                                        <h4 className="font-semibold">{goal.title}</h4>
                                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                                    </div>
                                    <Badge variant="outline" className="gap-1">
                                        <Clock className="h-3 w-3" />
                                        {new Date(goal.targetDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </Badge>
                                </div>

                                <div className="mb-3">
                                    <div className="mb-1 flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Progress</span>
                                        <span className="font-medium">{goal.progress}%</span>
                                    </div>
                                    <ProgressBar value={goal.progress} />
                                </div>

                                <div className="space-y-2">
                                    {goal.milestones.map(milestone => (
                                        <div
                                            key={milestone.id}
                                            className="flex items-center gap-2 text-sm"
                                        >
                                            {milestone.completed ? (
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                                            )}
                                            <span className={cn(
                                                milestone.completed && 'text-muted-foreground line-through'
                                            )}>
                                                {milestone.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                                <BookOpen className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">3</p>
                                <p className="text-sm text-muted-foreground">Courses in Progress</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                                <Award className="h-6 w-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">1</p>
                                <p className="text-sm text-muted-foreground">Certificates Earned</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                                <Target className="h-6 w-6 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{goals.length}</p>
                                <p className="text-sm text-muted-foreground">Active Goals</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
