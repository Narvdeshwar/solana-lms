'use client';

import { useState } from 'react';
import { Tabs } from '@/components/ui/tabs';
import { InstructorCard } from '@/components/instructor/instructor-card';
import { OfficeHoursBooking } from '@/components/instructor/office-hours-booking';
import { Messaging } from '@/components/instructor/messaging';
import { Announcements } from '@/components/instructor/announcements';
import { AssignmentFeedback } from '@/components/instructor/assignment-feedback';
import { Instructor } from '@/types/instructor';
import { cn } from '@/lib/utils';

export default function InstructorPage() {
    const [activeTab, setActiveTab] = useState('instructors');
    const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);

    const instructors: Instructor[] = [
        {
            id: 'inst-1',
            name: 'Dr. Sarah Chen',
            avatar: '',
            title: 'Solana Core Developer',
            bio: 'Former Solana Labs engineer with 5+ years of blockchain development experience.',
            expertise: ['Rust', 'Solana', 'Smart Contracts', 'DeFi'],
            rating: 4.9,
            totalStudents: 1250,
            responseTime: 'under 2 hours',
            availability: [
                {
                    id: 'oh-1',
                    instructorId: 'inst-1',
                    day: 'Monday',
                    startTime: '10:00 AM',
                    endTime: '12:00 PM',
                    maxSlots: 6,
                    bookedSlots: 3,
                    isRecurring: true
                },
                {
                    id: 'oh-2',
                    instructorId: 'inst-1',
                    day: 'Wednesday',
                    startTime: '2:00 PM',
                    endTime: '4:00 PM',
                    maxSlots: 6,
                    bookedSlots: 5,
                    isRecurring: true
                },
                {
                    id: 'oh-3',
                    instructorId: 'inst-1',
                    day: 'Friday',
                    startTime: '3:00 PM',
                    endTime: '5:00 PM',
                    maxSlots: 6,
                    bookedSlots: 2,
                    isRecurring: true
                }
            ],
            courses: ['solana-fundamentals', 'advanced-rust']
        },
        {
            id: 'inst-2',
            name: 'Michael Rodriguez',
            avatar: '',
            title: 'Web3 Architect',
            bio: 'Building decentralized applications and teaching the next generation of Web3 developers.',
            expertise: ['TypeScript', 'React', 'Anchor', 'Web3.js'],
            rating: 4.8,
            totalStudents: 980,
            responseTime: 'under 3 hours',
            availability: [
                {
                    id: 'oh-4',
                    instructorId: 'inst-2',
                    day: 'Tuesday',
                    startTime: '1:00 PM',
                    endTime: '3:00 PM',
                    maxSlots: 4,
                    bookedSlots: 1,
                    isRecurring: true
                },
                {
                    id: 'oh-5',
                    instructorId: 'inst-2',
                    day: 'Thursday',
                    startTime: '4:00 PM',
                    endTime: '6:00 PM',
                    maxSlots: 4,
                    bookedSlots: 3,
                    isRecurring: true
                }
            ],
            courses: ['web3-frontend', 'dapp-development']
        }
    ];

    const handleBookOfficeHours = (instructorId: string) => {
        const instructor = instructors.find((i) => i.id === instructorId);
        if (instructor) {
            setSelectedInstructor(instructor);
            setActiveTab('office-hours');
        }
    };

    const handleMessage = (instructorId: string) => {
        setActiveTab('messaging');
    };

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="border-b bg-background">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-2">Instructor Interaction</h1>
                    <p className="text-muted-foreground">
                        Connect with instructors, book office hours, and get personalized feedback
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <div className="flex gap-2 mb-8 border-b overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('instructors')}
                            className={cn(
                                'px-4 py-3 font-medium transition-colors border-b-2 whitespace-nowrap',
                                activeTab === 'instructors'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            )}
                        >
                            Instructors
                        </button>
                        <button
                            onClick={() => setActiveTab('office-hours')}
                            className={cn(
                                'px-4 py-3 font-medium transition-colors border-b-2 whitespace-nowrap',
                                activeTab === 'office-hours'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            )}
                        >
                            Office Hours
                        </button>
                        <button
                            onClick={() => setActiveTab('messaging')}
                            className={cn(
                                'px-4 py-3 font-medium transition-colors border-b-2 whitespace-nowrap',
                                activeTab === 'messaging'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            )}
                        >
                            Messages
                        </button>
                        <button
                            onClick={() => setActiveTab('announcements')}
                            className={cn(
                                'px-4 py-3 font-medium transition-colors border-b-2 whitespace-nowrap',
                                activeTab === 'announcements'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            )}
                        >
                            Announcements
                        </button>
                        <button
                            onClick={() => setActiveTab('assignments')}
                            className={cn(
                                'px-4 py-3 font-medium transition-colors border-b-2 whitespace-nowrap',
                                activeTab === 'assignments'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            )}
                        >
                            Assignments
                        </button>
                    </div>

                    {activeTab === 'instructors' && (
                        <div className="grid md:grid-cols-2 gap-6">
                            {instructors.map((instructor) => (
                                <InstructorCard
                                    key={instructor.id}
                                    instructor={instructor}
                                    onMessage={handleMessage}
                                    onBookOfficeHours={handleBookOfficeHours}
                                />
                            ))}
                        </div>
                    )}

                    {activeTab === 'office-hours' && (
                        <div>
                            {selectedInstructor ? (
                                <OfficeHoursBooking instructor={selectedInstructor} />
                            ) : (
                                <div className="text-center py-12 text-muted-foreground">
                                    Select an instructor to book office hours
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'messaging' && <Messaging instructors={instructors} />}

                    {activeTab === 'announcements' && (
                        <Announcements courseId="solana-fundamentals" />
                    )}

                    {activeTab === 'assignments' && (
                        <AssignmentFeedback courseId="solana-fundamentals" />
                    )}
                </Tabs>
            </div>
        </div>
    );
}
