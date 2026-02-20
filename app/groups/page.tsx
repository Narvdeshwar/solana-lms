'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GroupCard } from '@/components/groups/group-card';
import { Users, Plus, Search, TrendingUp } from 'lucide-react';
import { StudyGroup } from '@/types/group';

export default function GroupsPage() {
    const [groups, setGroups] = useState<StudyGroup[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [maxMembers, setMaxMembers] = useState(10);
    const [isPrivate, setIsPrivate] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('study-groups');
        if (saved) {
            const parsed = JSON.parse(saved);
            setGroups(parsed.map((g: any) => ({
                ...g,
                createdAt: new Date(g.createdAt),
                updatedAt: new Date(g.updatedAt)
            })));
        } else {
            // Mock data
            const mockGroups: StudyGroup[] = [
                {
                    id: '1',
                    name: 'Solana Builders',
                    description: 'Building the future on Solana together',
                    courseId: 'solana-fundamentals',
                    courseName: 'Solana Fundamentals',
                    members: [
                        { id: 'u1', name: 'Alice', role: 'owner', joinedAt: new Date(), xp: 1500 }
                    ],
                    maxMembers: 10,
                    isPrivate: false,
                    chat: [],
                    sharedNotes: [],
                    challenges: [],
                    leaderboard: [],
                    tags: ['solana', 'blockchain', 'web3'],
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];
            setGroups(mockGroups);
            localStorage.setItem('study-groups', JSON.stringify(mockGroups));
        }
    }, []);

    const handleCreateGroup = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !description.trim()) return;

        const newGroup: StudyGroup = {
            id: Date.now().toString(),
            name: name.trim(),
            description: description.trim(),
            members: [{
                id: 'current-user',
                name: 'Current User',
                role: 'owner',
                joinedAt: new Date(),
                xp: 0
            }],
            maxMembers,
            isPrivate,
            chat: [],
            sharedNotes: [],
            challenges: [],
            leaderboard: [],
            tags: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const updated = [newGroup, ...groups];
        setGroups(updated);
        localStorage.setItem('study-groups', JSON.stringify(updated));

        setName('');
        setDescription('');
        setMaxMembers(10);
        setIsPrivate(false);
        setIsCreating(false);
    };

    const handleJoinGroup = (groupId: string) => {
        const updated = groups.map(g => {
            if (g.id === groupId && g.members.length < g.maxMembers) {
                return {
                    ...g,
                    members: [...g.members, {
                        id: 'current-user',
                        name: 'Current User',
                        role: 'member' as const,
                        joinedAt: new Date(),
                        xp: 0
                    }]
                };
            }
            return g;
        });
        setGroups(updated);
        localStorage.setItem('study-groups', JSON.stringify(updated));
    };

    const filteredGroups = groups.filter(g =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const myGroups = groups.filter(g =>
        g.members.some(m => m.id === 'current-user')
    );

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="border-b bg-background">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold flex items-center gap-2">
                                <Users className="h-8 w-8" />
                                Study Groups
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Learn together, achieve more
                            </p>
                        </div>
                        {!isCreating && (
                            <Button onClick={() => setIsCreating(true)} className="gap-2">
                                <Plus className="h-4 w-4" />
                                Create Group
                            </Button>
                        )}
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search groups..."
                            className="w-full rounded-md border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3 mb-8">
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Groups</p>
                                <p className="text-2xl font-bold">{groups.length}</p>
                            </div>
                            <Users className="h-8 w-8 text-blue-600" />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">My Groups</p>
                                <p className="text-2xl font-bold">{myGroups.length}</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Active Members</p>
                                <p className="text-2xl font-bold">
                                    {groups.reduce((sum, g) => sum + g.members.length, 0)}
                                </p>
                            </div>
                            <Users className="h-8 w-8 text-purple-600" />
                        </div>
                    </Card>
                </div>

                {/* Create Form */}
                {isCreating && (
                    <Card className="p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-4">Create Study Group</h2>
                        <form onSubmit={handleCreateGroup} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium">Group Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g., Solana Builders"
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="What's your group about?"
                                    className="w-full min-h-[100px] resize-none rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    required
                                />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Max Members</label>
                                    <input
                                        type="number"
                                        value={maxMembers}
                                        onChange={(e) => setMaxMembers(parseInt(e.target.value))}
                                        min="2"
                                        max="50"
                                        className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="private"
                                        checked={isPrivate}
                                        onChange={(e) => setIsPrivate(e.target.checked)}
                                        className="h-4 w-4 rounded"
                                    />
                                    <label htmlFor="private" className="text-sm font-medium">
                                        Private Group
                                    </label>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit">Create Group</Button>
                                <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Card>
                )}

                {/* Groups List */}
                <div className="space-y-4">
                    {filteredGroups.map((group) => (
                        <GroupCard
                            key={group.id}
                            group={group}
                            onJoin={handleJoinGroup}
                            isJoined={group.members.some(m => m.id === 'current-user')}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
