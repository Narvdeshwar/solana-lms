'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GroupChat } from '@/components/groups/group-chat';
import { SharedNotes } from '@/components/groups/shared-notes';
import {
    ArrowLeft,
    Users,
    MessageSquare,
    BookOpen,
    Trophy,
    TrendingUp,
    Crown
} from 'lucide-react';
import { StudyGroup, ChatMessage, SharedNote } from '@/types/group';

export default function GroupDetailPage() {
    const params = useParams();
    const router = useRouter();
    const groupId = params.groupId as string;

    const [group, setGroup] = useState<StudyGroup | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('study-groups');
        if (saved) {
            const groups: StudyGroup[] = JSON.parse(saved);
            const current = groups.find(g => g.id === groupId);
            if (current) {
                setGroup({
                    ...current,
                    createdAt: new Date(current.createdAt),
                    updatedAt: new Date(current.updatedAt)
                });
            }
        }
    }, [groupId]);

    const handleSendMessage = (content: string) => {
        if (!group) return;

        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            groupId: group.id,
            senderId: 'current-user',
            senderName: 'Current User',
            content,
            createdAt: new Date()
        };

        const updatedGroup = {
            ...group,
            chat: [...group.chat, newMessage],
            updatedAt: new Date()
        };

        updateGroup(updatedGroup);
    };

    const handleCreateNote = (noteData: Omit<SharedNote, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (!group) return;

        const newNote: SharedNote = {
            ...noteData,
            id: Date.now().toString(),
            groupId: group.id,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const updatedGroup = {
            ...group,
            sharedNotes: [...group.sharedNotes, newNote],
            updatedAt: new Date()
        };

        updateGroup(updatedGroup);
    };

    const handleDeleteNote = (noteId: string) => {
        if (!group) return;

        const updatedGroup = {
            ...group,
            sharedNotes: group.sharedNotes.filter(n => n.id !== noteId),
            updatedAt: new Date()
        };

        updateGroup(updatedGroup);
    };

    const updateGroup = (updatedGroup: StudyGroup) => {
        const saved = loca
Users className = "mx-auto h-16 w-16 text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-semibold">Group Not Found</h3>
                    <Button onClick={() => router.push('/groups')} className="mt-4">
                        Back to Groups
                    </Button>
                </Card >
            </div >
        );
}

const isMember = group.members.some(m => m.id === 'current-user');

return (
    <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <div className="border-b bg-background">
            <div className="container mx-auto px-4 py-8">
                <Button
                    variant="ghost"
                    onClick={() => router.push('/groups')}
                    className="mb-4"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Groups
                </Button>

                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-2">{group.name}</h1>
                        <p className="text-muted-foreground mb-4">{group.description}</p>
                        {group.courseName && (
                            <Badge variant="secondary">{group.courseName}</Badge>
                        )}
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Users className="h-4 w-4" />
                            <span>{group.members.length}/{group.maxMembers} members</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
            {!isMember ? (
                <Card className="p-12 text-center">
                    <Users className="mx-auto h-16 w-16 text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-semibold">Join to Access</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        You need to be a member to access this group
                    </p>
                    <Button onClick={() => router.push('/groups')} className="mt-4">
                        Browse Groups
                    </Button>
                </Card>
            ) : (
                <Tabs defaultValue="chat" className="space-y-6">
                    <TabsList className="grid w-full max-w-2xl grid-cols-4">
                        <TabsTrigger value="chat" className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Chat
                        </TabsTrigger>
                        <TabsTrigger value="notes" className="gap-2">
                            <BookOpen className="h-4 w-4" />
                            Notes
                        </TabsTrigger>
                        <TabsTrigger value="challenges" className="gap-2">
                            <Trophy className="h-4 w-4" />
                            Challenges
                        </TabsTrigger>
                        <TabsTrigger value="leaderboard" className="gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Leaderboard
                        </TabsTrigger>
                    </TabsList>

                    {/* Chat Tab */}
                    <TabsContent value="chat">
                        <GroupChat
                            groupId={group.id}
                            messages={group.chat}
                            onSendMessage={handleSendMessage}
                            currentUserId="current-user"
                        />
                    </TabsContent>

                    {/* Notes Tab */}
                    <TabsContent value="notes">
                        <SharedNotes
                            notes={group.sharedNotes}
                            onCreateNote={handleCreateNote}
                            onDeleteNote={handleDeleteNote}
                            currentUserId="current-user"
                        />
                    </TabsContent>

                    {/* Challenges Tab */}
                    <TabsContent value="challenges">
                        <Card className="p-12 text-center">
                            <Trophy className="mx-auto h-16 w-16 text-muted-foreground/50" />
                            <h3 className="mt-4 text-lg font-semibold">No Challenges Yet</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Group challenges coming soon!
                            </p>
                        </Card>
                    </TabsContent>

                    {/* Leaderboard Tab */}
                    <TabsContent value="leaderboard">
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Group Leaderboard</h3>
                            <div className="space-y-3">
                                {group.members
                                    .sort((a, b) => b.xp - a.xp)
                                    .map((member, index) => (
                                        <div
                                            key={member.id}
                                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">{member.name}</span>
                                                        {member.role === 'owner' && (
                                                            <Crown className="h-4 w-4 text-yellow-600" />
                                                        )}
                                                        {member.role === 'admin' && (
                                                            <Badge variant="secondary" className="text-xs">
                                                                Admin
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Joined {new Date(member.joinedAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">{member.xp} XP</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            )}
        </div>
    </div>
);
}
