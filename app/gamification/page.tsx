'use client';

import { useState } from 'react';
import { Tabs } from '@/components/ui/tabs';
import { Achievements } from '@/components/gamification/achievements';
import { Quests } from '@/components/gamification/quests';
import { Rewards } from '@/components/gamification/rewards';
import { cn } from '@/lib/utils';

export default function GamificationPage() {
    const [activeTab, setActiveTab] = useState('achievements');

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="border-b bg-background">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-2">Gamification</h1>
                    <p className="text-muted-foreground">
                        Track progress and earn rewards
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <div className="flex gap-2 mb-8 border-b">
                        <button
                            onClick={() => setActiveTab('achievements')}
                            className={cn(
                                'px-4 py-3 font-medium border-b-2',
                                activeTab === 'achievements'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground'
                            )}
                        >
                            Achievements
                        </button>
                        <button
                            onClick={() => setActiveTab('quests')}
                            className={cn(
                                'px-4 py-3 font-medium border-b-2',
                                activeTab === 'quests'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground'
                            )}
                        >
                            Quests
                        </button>
                        <button
                            onClick={() => setActiveTab('rewards')}
                            className={cn(
                                'px-4 py-3 font-medium border-b-2',
                                activeTab === 'rewards'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground'
                            )}
                        >
                            Rewards
                        </button>
                    </div>

                    {activeTab === 'achievements' && <Achievements />}
                    {activeTab === 'quests' && <Quests />}
                    {activeTab === 'rewards' && <Rewards />}
                </Tabs>
            </div>
        </div>
    );
}
