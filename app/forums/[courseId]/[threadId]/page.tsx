'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThreadPost } from '@/components/forum/thread-post';
import {
    ArrowLeft,
    MessageSquare,
    Eye,
    ThumbsUp,
    Bell,
    BellOff,
    Pin,
    Lock,
    CheckCircle
} from 'lucide-react';
import { Forum, ForumThread, ForumPost, Reaction } from '@/types/forum';

export default function ThreadDetailPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;
    const threadId = params.threadId as string;

    const [thread, setThread] = useState<ForumThread | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [replyContent, setReplyContent] = useState('');

    useEffect(() => {
        // Load thread from localStorage
        const saved = localStorage.getItem('forums');
        if (saved) {
            const forums: Forum[] = JSON.parse(saved);
            const forum = forums.find(f => f.courseId === courseId);
            const currentThread = forum?.threads.find(t => t.id === threadId);

            if (currentThread) {
                setThread(currentThread);
                setIsFollowing(currentThread.followers.includes('current-user'));

                // Increment view count
                currentThread.views += 1;
                const updatedForums = forums.map(f =>
                    f.courseId === courseId
 if (post) {
                    const existingReaction = post.reactions.findIndex(
                        r => r.userId === 'current-user' && r.type === type
                    );

                    if (existingReaction >= 0) {
                        // Remove reaction
                        post.reactions.splice(existingReaction, 1);
                    } else {
                        // Add reaction
                        post.reactions.push({
                            type,
                            userId: 'current-user',
                            userName: 'Current User'
                        });
                    }

                    updateThread(updatedThread);
                }
            };

            const handleMarkAsAnswer = (postId: string) => {
                if (!thread) return;

                const updatedThread = { ...thread };
                updatedThread.posts = updatedThread.posts.map(p => ({
                    ...p,
                    isAnswer: p.id === postId
                }));
                updatedThread.isSolved = true;

                updateThread(updatedThread);
            };

            const handleToggleFollow = () => {
                if (!thread) return;

                const updatedThread = { ...thread };
                if (isFollowing) {
                    updatedThread.followers = updatedThread.followers.filter(id => id !== 'current-user');
                } else {
                    updatedThread.followers.push('current-user');
                }

                setIsFollowing(!isFollowing);
                updateThread(updatedThread);
            };

            const handleReply = (e: React.FormEvent) => {
                e.preventDefault();
                if (!thread || !replyContent.trim()) return;

                const newPost: ForumPost = {
                    id: Date.now().toString(),
                    threadId: thread.id,
                    content: replyContent.trim(),
                    author: {
                        id: 'current-user',
                        name: 'Current User',
                        role: 'student'
                    },
                    reactions: [],
                    isAnswer: false,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };

                const updatedThread = {
                    ...thread,
                    posts: [...thread.posts, newPost],
                    updatedAt: new Date()
                };

                updateThread(updatedThread);
                setReplyContent('');
            };

            const updateThread = (updatedThread: ForumThread) => {
                const saved = localStorage.getItem('forums');
                if (saved) {
                    const forums: Forum[] = JSON.parse(saved);
                    const updatedForums = forums.map(f =>
                        f.courseId === courseId
                            ? { ...f, threads: f.threads.map(t => t.id === threadId ? updatedThread : t) }
                            : f
                    );
                    localStorage.setItem('forums', JSON.stringify(updatedForums));
                    setThread(updatedThread);
                }
            };

            if (!thread) {
                return (
                    <div className="min-h-screen bg-muted/30 flex items-center justify-center">
                        <Card className="p-12 text-center">
                            <MessageSquare className="mx-auto h-16 w-16 text-muted-foreground/50" />
                            <h3 className="mt-4 text-lg font-semibold">Thread Not Found</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                This thread doesn't exist or has been removed
                            </p>
                            <Button onClick={() => router.push(`/forums/${courseId}`)} className="mt-4">
                                Back to Forum
                            </Button>
                        </Card>
                    </div>
                );
            }

            const getCategoryColor = (category: ForumThread['category']) => {
                switch (category) {
                    case 'general': return 'bg-gray-500/10 text-gray-600';
                    case 'technical': return 'bg-blue-500/10 text-blue-600';
                    case 'assignment': return 'bg-purple-500/10 text-purple-600';
                    case 'project': return 'bg-green-500/10 text-green-600';
                    case 'discussion': return 'bg-orange-500/10 text-orange-600';
                }
            };

            return (
                <div className="min-h-screen bg-muted/30">
                    {/* Header */}
                    <div className="border-b bg-background">
                        <div className="container mx-auto px-4 py-8">
                            <Button
                                variant="ghost"
                                onClick={() => router.push(`/forums/${courseId}`)}
                                className="mb-4"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Forum
                            </Button>

                            {/* Thread Header */}
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        {thread.isPinned && <Pin className="h-5 w-5 text-primary" />}
                                        <h1 className="text-3xl font-bold">{thread.title}</h1>
                                        {thread.isLocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                                        {thread.isSolved && <CheckCircle className="h-5 w-5 text-green-600" />}
                                    </div>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <Badge variant="outline" className={getCategoryColor(thread.category)}>
                                            {thread.category}
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">
                                            by {thread.author.name}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {new Date(thread.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    variant={isFollowing ? 'default' : 'outline'}
                                    onClick={handleToggleFollow}
                                    className="gap-2"
                                >
                                    {isFollowing ? (
                                        <>
                                            <BellOff className="h-4 w-4" />
                                            Unfollow
                                        </>
                                    ) : (
                                        <>
                                            <Bell className="h-4 w-4" />
                                            Follow
                                        </>
                                    )}
                                </Button>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    <span>{thread.views} views</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>{thread.posts.length} replies</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <ThumbsUp className="h-4 w-4" />
                                    <span>{thread.reactions.length} reactions</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Bell className="h-4 w-4" />
                                    <span>{thread.followers.length} followers</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="container mx-auto px-4 py-8">
                        <div className="max-w-4xl mx-auto space-y-6">
                            {/* Original Post */}
                            <Card className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary flex-shrink-0">
                                        {thread.author.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="font-semibold">{thread.author.name}</span>
                                            {thread.author.role !== 'student' && (
                                                <Badge variant="outline">
                                                    {thread.author.role}
                                                </Badge>
                                            )}
                                            <span className="text-sm text-muted-foreground">
                                                {new Date(thread.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="prose prose-sm max-w-none">
                                            <p className="text-foreground whitespace-pre-wrap">{thread.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Replies */}
                            {thread.posts.length > 0 && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold">
                                        {thread.posts.length} {thread.posts.length === 1 ? 'Reply' : 'Replies'}
                                    </h2>
                                    {thread.posts.map((post) => (
                                        <ThreadPost
                                            key={post.id}
                                            post={post}
                                            onReact={handleReact}
                                            onMarkAsAnswer={handleMarkAsAnswer}
                                            canMarkAsAnswer={thread.author.id === 'current-user' && !thread.isSolved}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Reply Form */}
                            {!thread.isLocked && (
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">Post a Reply</h3>
                                    <form onSubmit={handleReply} className="space-y-4">
                                        <textarea
                                            value={replyContent}
                                            onChange={(e) => setReplyContent(e.target.value)}
                                            placeholder="Share your thoughts..."
                                            className="w-full min-h-[150px] resize-none rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                            required
                                        />
                                        <Button type="submit" disabled={!replyContent.trim()}>
                                            Post Reply
                                        </Button>
                                    </form>
                                </Card>
                            )}

                            {thread.isLocked && (
                                <Card className="p-6 text-center">
                                    <Lock className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                    <p className="mt-4 text-sm text-muted-foreground">
                                        This thread has been locked and no longer accepts new replies
                                    </p>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            );
        }
