'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThreadList } from '@/components/forum/thread-list';
import { CreateThread } from '@/components/forum/create-thread';
import {
    MessageSquare,
    Plus,
    Search,
    Filter,
    ArrowLeft,
    Pin,
    TrendingUp
} from 'lucide-react';
import { Forum, ForumThread } from '@/types/forum';

export default function CourseForumPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;

    const [forum, setForum] = useState<Forum | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState<'all' | ForumThread['category']>('all');
    const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'unanswered'>('recent');

    useEffect(() => {
        // Load forum from localStorage
        const saved = localStorage.getItem('forums');
        if (saved) {
            const forums: Forum[] = JSON.parse(saved);
            const currentForum = forums.find(f => f.courseId === courseId);
            setForum(currentForum || null);
        }
    }, [courseId]);

    const handleCreateThread = (threadData: Omit<ForumThread, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'posts' | 'reactions' | 'followers'>) => {
        if (!forum) return;

        const newThread: ForumThread = {
            ...threadData,
            id: Date.now().toString(),
            posts: [],
            reactions: [],
            followers: [],
            views: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const updatedForum = {
            ...forum,
            threads: [newThread, ...forum.threads]
        };

        // Update localStorage
        const saved = localStorage.getItem('forums');
        if (saved) {
            const forums: Forum[] = JSON.parse(saved);
            const updatedForums = forums.map(f =>
                f.courseId === courseId ? updatedForum : f
            );
            localStorage.setItem('forums', JSON.stringify(updatedForums));
        }

        setForum(updatedForum);
        setIsCreating(false);
    };

    if (!forum) {
        return (
            <div className="min-h-screen bg-muted/30 flex items-center justify-center">
                <Card className="p-12 text-center">
                    <MessageSquare className="mx-auto h-16 w-16 text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-semibold">Forum Not Found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        This forum doesn't exist or has been removed
                    </p>
                    <Button onClick={() => router.push('/forums')} className="mt-4">
                        Back to Forums
                    </Button>
                </Card>
            </div>
        );
    }

    const filteredThreads = forum.threads
        .filter(thread => {
            const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                thread.content.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = filterCategory === 'all' || thread.category === filterCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'popular':
                    return (b.reactions.length + b.posts.length) - (a.reactions.length + a.posts.length);
                case 'unanswered':
                    return a.posts.length - b.posts.length;
                case 'recent':
                default:
                    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            }
        });

    const pinnedThreads = filteredThreads.filter(t => t.isPinned);
    const regularThreads = filteredThreads.filter(t => !t.isPinned);

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Header */}
            <div className="border-b bg-background">
                <div className="container mx-auto px-4 py-8">
                    <Button
                        variant="ghost"
                        onClick={() => router.push('/forums')}
                        className="mb-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Forums
                    </Button>

                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold">{forum.courseName}</h1>
                            <p className="text-muted-foreground mt-1">{forum.description}</p>
                        </div>
                        {!isCreating && (
                            <Button onClick={() => setIsCreating(true)} className="gap-2">
                                <Plus className="h-4 w-4" />
                                New Thread
                            </Button>
                        )}
                    </div>

                    {/* Search and Filters */}
                    <div className="flex gap-4 flex-wrap">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                e as any)}
                            className="rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="all">All Categories</option>
                            <option value="general">General</option>
                            <option value="technical">Technical</option>
                            <option value="assignment">Assignment</option>
                            <option value="project">Project</option>
                            <option value="discussion">Discussion</option>
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="recent">Most Recent</option>
                            <option value="popular">Most Popular</option>
                            <option value="unanswered">Unanswered</option>
                        </select>
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
                                <p className="text-sm text-muted-foreground">Total Threads</p>
                                <p className="text-2xl font-bold">{forum.threads.length}</p>
                            </div>
                            <MessageSquare className="h-8 w-8 text-blue-600" />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Posts</p>
                                <p className="text-2xl font-bold">
                                    {forum.threads.reduce((sum, t) => sum + t.posts.length, 0)}
                                </p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Members</p>
                                <p className="text-2xl font-bold">{forum.memberCount}</p>
                            </div>
                            <MessageSquare className="h-8 w-8 text-purple-600" />
                        </div>
                    </Card>
                </div>

                {/* Create Thread Form */}
                {isCreating && (
                    <div className="mb-8">
                        <CreateThread
                            courseId={courseId}
                            courseName={forum.courseName}
                            onSubmit={handleCreateThread}
                            onCancel={() => setIsCreating(false)}
                        />
                    </div>
                )}

                {/* Pinned Threads */}
                {pinnedThreads.length > 0 && (
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Pin className="h-5 w-5 text-primary" />
                            <h2 className="text-lg font-semibold">Pinned Threads</h2>
                        </div>
                        <ThreadList threads={pinnedThreads} courseId={courseId} />
                    </div>
                )}

                {/* Regular Threads */}
                {regularThreads.length > 0 ? (
                    <ThreadList threads={regularThreads} courseId={courseId} />
                ) : (
                    <Card className="p-12 text-center">
                        <MessageSquare className="mx-auto h-16 w-16 text-muted-foreground/50" />
                        <h3 className="mt-4 text-lg font-semibold">No Threads Yet</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Be the first to start a discussion!
                        </p>
                        <Button onClick={() => setIsCreating(true)} className="mt-4">
                            Create Thread
                        </Button>
                    </Card>
                )}
            </div>
        </div>
    );
}
