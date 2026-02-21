'use client';

import { useState } from 'react';
import { Tabs } from '@/components/ui/tabs';
import { PeerSessions } from '@/components/peer/peer-sessions';
import { StudyBuddyMatcher } from '@/components/peer/study-buddy-matcher';
import { CollaborativeProjects } from '@/components/peer/collaborative-projects';
import { CodeReview } from '@/components/peer/code-review';
import { cn } from '@/lib/utils';

export default function PeerLearningPage() {
    const [activeTab, setActiveTab] = useState('sessions');

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="border-b bg-background">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-2">Peer Learning & Collaboration</h1>
                    <p className="text-muted-foreground">
                        Connect with peers, collaborate on projects, and learn together
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <div className="flex gap-2 mb-8 border-b overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('sessions')}
                            className={cn(
                                'px-4 py-3 font-medium transition-colors border-b-2 whitespace-nowrap',
                                activeTab === 'sessions'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            )}
                        >
                            Peer Sessions
                        </button>
                        <button
                            onClick={() => setActiveTab('buddies')}
                            className={cn(
                                'px-4 py-3 font-medium transition-colors border-b-2 whitespace-nowrap',
                                activeTab === 'buddies'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            )}
                        >
                            Study Buddies
                        </button>
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={cn(
                                'px-4 py-3 font-medium transition-colors border-b-2 whitespace-nowrap',
                                activeTab === 'projects'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            )}
                        >
                            Projects
                        </button>
                        <button
                            onClick={() => setActiveTab('code-review')}
                            className={cn(
                                'px-4 py-3 font-medium transition-colors border-b-2 whitespace-nowrap',
                                activeTab === 'code-review'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            )}
                        >
                            Code Review
                        </button>
                    </div>

                    {activeTab === 'sessions' && <PeerSessions />}
                    {activeTab === 'buddies' && <StudyBuddyMatcher />}
                    {activeTab === 'projects' && <CollaborativeProjects />}
                    {activeTab === 'code-review' && <CodeReview />}
                </Tabs>
            </div>
        </div>
    );
}
