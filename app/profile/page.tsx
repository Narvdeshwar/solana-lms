'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { User, Award, BookOpen, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { XPDisplay } from '@/components/shared/xp-display';
import { truncateAddress } from '@/lib/solana/helpers';

const mockAchievements = [
    { id: '1', name: 'First Steps', icon: '🎯', description: 'Complete your first lesson' },
    { id: '2', name: 'Week Warrior', icon: '🔥', description: '7 day streak' },
    { id: '3', name: 'Fast Learner', icon: '⚡', description: 'Complete 10 lessons' },
    { id: '4', name: 'Course Master', icon: '🏆', description: 'Complete your first course' },
];

const mockCourses = [
    { id: '1', title: 'Solana Fundamentals', completedAt: new Date('2024-01-15') },
];

export default function ProfilePage() {
    const { connected, publicKey } = useWallet();

    if (!connected) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="flex flex-col items-center justify-center space-y-6 text-center">
                    <div className="rounded-full bg-muted p-6">
                        <User className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Connect Your Wallet</h1>
                        <p className="text-muted-foreground">
                            Connect your wallet to view your profile
                        </p>
                    </div>
                    <WalletMultiButton />
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Profile Header */}
            <Card className="mb-8">
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center gap-6 md:flex-row">
                        {/* Avatar */}
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-solana-purple to-solana-green text-4xl font-bold text-white">
                            {publicKey?.toBase58().slice(0, 2).toUpperCase()}
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="mb-2 text-3xl font-bold">
                                {truncateAddress(publicKey?.toBase58() || '', 8)}
                            </h1>
                            <p className="mb-4 text-muted-foreground">
                                Solana Developer | Learning since January 2024
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                                <Badge variant="secondary">
                                    <Calendar className="mr-1 h-3 w-3" />
                                    Joined Jan 2024
                                </Badge>
                                <Badge variant="secondary">
                                    <Award className="mr-1 h-3 w-3" />
                                    4 Achievements
                                </Badge>
                                <Badge variant="secondary">
                                    <BookOpen className="mr-1 h-3 w-3" />
                                    1 Course Completed
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Content */}
                <div className="space-y-8 lg:col-span-2">
                    {/* XP & Level */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Experience & Level</CardTitle>
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

                    {/* Completed Courses */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Completed Courses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {mockCourses.length === 0 ? (
                                <p className="text-center text-muted-foreground">
                                    No completed courses yet
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {mockCourses.map((course) => (
                                        <div
                                            key={course.id}
                                            className="flex items-center justify-between rounded-lg border p-4"
                                        >
                                            <div>
                                                <div className="font-semibold">{course.title}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    Completed {course.completedAt.toLocaleDateString()}
                                                </div>
                                            </div>
                                            <Badge variant="success">✓ Completed</Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Achievements */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Achievements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                {mockAchievements.map((achievement) => (
                                    <div
                                        key={achievement.id}
                                        className="flex flex-col items-center rounded-lg border p-4 text-center"
                                    >
                                        <div className="mb-2 text-3xl">{achievement.icon}</div>
                                        <div className="text-sm font-medium">{achievement.name}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {achievement.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Global Rank</span>
                                <span className="font-semibold">#42</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Current Streak</span>
                                <span className="font-semibold">7 days</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Longest Streak</span>
                                <span className="font-semibold">14 days</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Lessons Completed</span>
                                <span className="font-semibold">25</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
