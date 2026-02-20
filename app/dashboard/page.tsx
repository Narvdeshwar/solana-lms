'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { BookOpen, Flame, Trophy, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XPDisplay } from '@/components/shared/xp-display';
import { ProgressBar } from '@/components/shared/progress-bar';
import { CourseCard } from '@/components/course/course-card';
import { Badge } from '@/components/ui/badge';
import type { Course } from '@/types';

// Mock data
const mockCourses: Course[] = [
    {
        id: '1',
        slug: 'solana-fundamentals',
        title: 'Solana Fundamentals',
        description: 'Learn the basics of Solana blockchain',
        difficulty: 1,
        duration: 4,
        xpPerLesson: 50,
        totalXp: 750,
        trackId: 1,
        trackLevel: 1,
        modules: [],
        lessonCount: 10,
        creator: 'creator1',
        creatorName: 'Solana Foundation',
        isActive: true,
        publishedAt: new Date(),
        updatedAt: new Date(),
        courseId: 'solana-fundamentals',
        contentTxId: 'mock',
    },
];

const mockProgress = {
    '1': 65,
};

const mockAchievements = [
    { id: '1', name: 'First Steps', icon: '🎯', earnedAt: new Date() },
    { id: '2', name: 'Week Warrior', icon: '🔥', earnedAt: new Date() },
    { id: '3', name: 'Fast Learner', icon: '⚡', earnedAt: new Date() },
];

export default function DashboardPage() {
    const { connected, publicKey } = useWallet();

    if (!connected) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="flex flex-col items-center justify-center space-y-6 text-center">
                    <div className="rounded-full bg-muted p-6">
                        <BookOpen className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Connect Your Wallet</h1>
                        <p className="text-muted-foreground">
                            Connect your Solana wallet to access your dashboard and track your progress
                        </p>
                    </div>
                    <WalletMultiButton />
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="mb-2 text-4xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back! Track your progress and continue learning.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* XP Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total XP</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">10,000</div>
                        <p className="text-xs text-muted-foreground">Level 10</p>
                    </CardContent>
                </Card>

                {/* Courses Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Courses</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">1 completed</p>
                    </CardContent>
                </Card>

                {/* Streak Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                        <Flame className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">7 days</div>
                        <p className="text-xs text-muted-foreground">Keep it up!</p>
                    </CardContent>
                </Card>

                {/* Rank Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
                        <Trophy className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">#42</div>
                        <p className="text-xs text-muted-foreground">Top 10%</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Content */}
                <div className="space-y-8 lg:col-span-2">
                    {/* XP Progress */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <XPDisplay
                                xp={10000}
                                level={10}
                                showProgress
                                variant="detailed"
                                size="lg"
                            />
                        </CardContent>
                    </Card>

                    {/* Enrolled Courses */}
                    <div>
                        <h2 className="mb-4 text-2xl font-bold">Continue Learning</h2>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {mockCourses.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    progress={mockProgress[course.id]}
                                    showProgress
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Achievements */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Achievements</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {mockAchievements.map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className="flex items-center gap-3 rounded-lg border p-3"
                                >
                                    <div className="text-2xl">{achievement.icon}</div>
                                    <div className="flex-1">
                                        <div className="font-medium">{achievement.name}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {achievement.earnedAt.toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-start gap-3 text-sm">
                                <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500" />
                                <div>
                                    <div className="font-medium">Completed lesson</div>
                                    <div className="text-xs text-muted-foreground">2 hours ago</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 text-sm">
                                <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                                <div>
                                    <div className="font-medium">Earned achievement</div>
                                    <div className="text-xs text-muted-foreground">1 day ago</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 text-sm">
                                <div className="mt-0.5 h-2 w-2 rounded-full bg-purple-500" />
                                <div>
                                    <div className="font-medium">Enrolled in course</div>
                                    <div className="text-xs text-muted-foreground">3 days ago</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
