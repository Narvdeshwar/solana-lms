'use client';

import { useParams } from 'next/navigation';
import { User, Award, BookOpen, Calendar, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { XPDisplay } from '@/components/shared/xp-display';
import { LoadingPage } from '@/components/shared/loading-spinner';
import { truncateAddress } from '@/lib/solana/helpers';

// Mock user data
const mockUser = {
    username: 'Developer42',
    walletAddress: 'ABC123...XYZ789',
    avatar: undefined,
    bio: 'Passionate Solana developer learning and building on the fastest blockchain.',
    joinedAt: new Date('2024-01-15'),
    xp: 10000,
    level: 10,
    rank: 42,
    currentStreak: 7,
    longestStreak: 14,
    lessonsCompleted: 25,
    coursesCompleted: 1,
};

const mockAchievements = [
    { id: '1', name: 'First Steps', icon: '🎯', description: 'Complete your first lesson' },
    { id: '2', name: 'Week Warrior', icon: '🔥', description: '7 day streak' },
    { id: '3', name: 'Fast Learner', icon: '⚡', description: 'Complete 10 lessons' },
    { id: '4', name: 'Course Master', icon: '🏆', description: 'Complete your first course' },
];

const mockCompletedCourses = [
    { id: '1', title: 'Solana Fundamentals', completedAt: new Date('2024-01-15') },
];

export default function PublicProfilePage() {
    const params = useParams();
    const username = params.username as string;

    const user = mockUser; // In production, fetch by username

    if (!user) {
        return <LoadingPage text="Loading profile..." />;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Profile Header */}
            <Card className="mb-8">
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center gap-6 md:flex-row">
                        {/* Avatar */}
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-solana-purple to-solana-green text-4xl font-bold text-white">
                            {user.username.slice(0, 2).toUpperCase()}
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="mb-2 text-3xl font-bold">{user.username}</h1>
                            <p className="mb-3 text-muted-foreground">{user.bio}</p>
                            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                                <Badge variant="secondary">
                                    <Calendar className="mr-1 h-3 w-3" />
                                    Joined {user.joinedAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </Badge>
                                <Badge variant="secondary">
                                    <Trophy className="mr-1 h-3 w-3" />
                                    Rank #{user.rank}
                                </Badge>
                                <Badge variant="secondary">
                                    <Award className="mr-1 h-3 w-3" />
                                    {mockAchievements.length} Achievements
                                </Badge>
                                <Badge variant="secondary">
                                    <BookOpen className="mr-1 h-3 w-3" />
                                    {user.coursesCompleted} Courses
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
                                xp={user.xp}
                                level={user.level}
                                showProgress
                                variant="detailed"
                                size="lg"
                            />
                        </CardContent>
                    </Card>

                    {/* Achievements */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Achievements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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

                    {/* Completed Courses */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Completed Courses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {mockCompletedCourses.length === 0 ? (
                                <p className="text-center text-muted-foreground">
                                    No completed courses yet
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {mockCompletedCourses.map((course) => (
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
                    {/* Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Global Rank</span>
                                <span className="font-semibold">#{user.rank}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Total XP</span>
                                <span className="font-semibold">{user.xp.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Level</span>
                                <span className="font-semibold">{user.level}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Current Streak</span>
                                <span className="font-semibold">{user.currentStreak} days</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Longest Streak</span>
                                <span className="font-semibold">{user.longestStreak} days</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Lessons Completed</span>
                                <span className="font-semibold">{user.lessonsCompleted}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Courses Completed</span>
                                <span className="font-semibold">{user.coursesCompleted}</span>
                            </div>
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
                                    <div className="font-medium">Completed course</div>
                                    <div className="text-xs text-muted-foreground">2 days ago</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 text-sm">
                                <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                                <div>
                                    <div className="font-medium">Earned achievement</div>
                                    <div className="text-xs text-muted-foreground">5 days ago</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 text-sm">
                                <div className="mt-0.5 h-2 w-2 rounded-full bg-purple-500" />
                                <div>
                                    <div className="font-medium">Reached level 10</div>
                                    <div className="text-xs text-muted-foreground">1 week ago</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );
}
