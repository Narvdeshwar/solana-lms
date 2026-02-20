'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ForumList } from '@/components/forum/forum-list';
import { MessageSquare, Search, TrendingUp } from 'lucide-react';
import { Forum } from '@/types/forum';

export default function ForumsPage() {
    const [forums, setForums] = useState<Forum[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Load forums from localStorage or use mock data
        const saved = localStorage.getItem('forums');
        if (saved) {
            setForums(JSON.parse(saved));
        } else {
            // Mock data
            const mockForums: Forum[] = [
                {
                    id: '1',
                    courseId: 'solana-fundamentals',
                    courseName: 'Solana Fundamentals',
                    description: 'Discuss Solana basics, blockchain concepts, and getting started',
                    memberCount: 1234,
                    threads: [
                        {
                            id: 't1',
                            courseId: 'solana-fundamentals',
                            courseName: 'Solana Fundamentals',
                            title: 'What is Proof of History?',
                            content: 'Can someone explain how PoH works in simple terms?',
                            author: {
                                id: 'u1',
                                name: 'Alice Johnson',
                                role: 'student'
                            },
                            category: 'technical',
                            isPinned: true,
                            isLocked: false,
                            isSolved: true,
                            posts: [
                                {
                                    id: 'p1',
                                    threadId: 't1',
                                    content: 'Proof of History is a cryptographic clock that helps order events in the blockchain...',
                                    author: {
                                        id: 'u2',
                                        name: 'Dr. Smith',
                                        role: 'instructor'
                                    },
                                    reactions: [
                                        { type: 'helpful', userId: 'u1', userName: 'Alice' }
                                    ],
                                    isAnswer: true,
                                    createdAt: new Date(Date.now() - 3600000),
                                    updatedAt: new Date(Date.now() - 3600000)
                                }
                            ],
                            reactions: [
                                { type: 'like', userId: 'u3', userName: 'Bob' }
                            ],
                            followers: ['u1', 'u2'],
                            views: 156,
                            createdAt: new Date(Date.now() - 7200000),
                            updatedAt: new Date(Date.now() - 3600000)
                        }
                    ]
                },
                {
                    id: '2',
                    courseId: 'anchor-development',
                    courseName: 'Anchor Framework Development',
                    description: 'Learn and discuss Anchor framework for Solana programs',
                    memberCount: 892,
                    threads: []
                },
                {
                    id: '3',
                    courseId: 'defi-solana',
                    courseName: 'DeFi on Solana',
                    description: 'Explore DeFi protocols, AMMs, and yield farming on Solana',
                    memberCount: 567,
                    threads: []
                }
            ];
            setForums(mockForums);
            localStorage.setItem('forums', JSON.stringify(mockForums));
        }
    }, []);

    const filteredForums = forums.filter(forum =>
        forum.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        forum.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Header */}
            <div className="border-b bg-background">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold flex items-center gap-2">
                                <MessageSquare className="h-8 w-8" />
                                Discussion Forums
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Connect with fellow learners and instructors
                            </p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search forums..."
                            className="w-full rounded-md border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3 mb-8">
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Forums</p>
                                <p className="text-2xl font-bold">{forums.length}</p>
                            </div>
                            <MessageSquare className="h-8 w-8 text-blue-600" />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Threads</p>
                                <p className="text-2xl font-bold">
                                    {forums.reduce((sum, f) => sum + f.threads.length, 0)}
                                </p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Active Members</p>
                                <p className="text-2xl font-bold">
                                    {forums.reduce((sum, f) => sum + f.memberCount, 0)}
                                </p>
                            </div>
                            <MessageSquare className="h-8 w-8 text-purple-600" />
                        </div>
                    </Card>
                </div>

                {/* Forums List */}
                {filteredForums.length > 0 ? (
                    <ForumList forums={filteredForums} />
                ) : (
                    <Card className="p-12 text-center">
                        <MessageSquare className="mx-auto h-16 w-16 text-muted-foreground/50" />
                        <h3 className="mt-4 text-lg font-semibold">No Forums Found</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Try adjusting your search query
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
}
