'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SkillAssessment } from '@/components/learning/skill-assessment';
import { LearningGoals } from '@/components/learning/learning-goals';
import { Brain, Target, TrendingUp, Award } from 'lucide-react';

export default function LearningPage() {
    const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
    const [skillLevel, setSkillLevel] = useState<any>(null);

    const handleAssessmentComplete = (result: any) => {
        setSkillLevel(result);
        setHasCompletedAssessment(true);
    };

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Header */}
            <div className="border-b bg-background">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-2">
                        <h1 className="text-3xl font-bold">Your Learning Journey</h1>
                        <p className="text-muted-foreground">
                            Assess your skills and set learning goals
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <Tabs defaultValue="assessment" className="space-y-6">
                    <TabsList className="grid w-full max-w-md grid-cols-2">
                        <TabsTrigger value="assessment" className="gap-2">
                            <Brain className="h-4 w-4" />
                            Skill Assessment
                        </TabsTrigger>
                        <TabsTrigger value="goals" className="gap-2">
                            <Target className="h-4 w-4" />
                            Learning Goals
                        </TabsTrigger>
                    </TabsList>

                    {/* Skill Assessment Tab */}
                    <TabsContent value="assessment" className="space-y-6">
                        {!hasCompletedAssessment ? (
                            <>
                                {/* Info Card */}
                                <Card className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                                            <Brain className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="mb-2 text-xl font-semibold">
                                                Take Your Skill Assessment
                                            </h2>
                                            <p className="mb-4 text-sm text-muted-foreground">
                                                Answer 10 questions to determine your Solana knowledge level and get personalized course recommendations.
                                            </p>
                                            <div className="flex flex-wrap gap-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-2 rounded-full bg-green-600" />
                                                    <span className="text-sm">3 Beginner Questions</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                                                    <span className="text-sm">4 Intermediate Questions</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-2 rounded-full bg-purple-600" />
                                                    <span className="text-sm">3 Advanced Questions</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* Assessment Component */}
                                <SkillAssessment onComplete={handleAssessmentComplete} />
                            </>
                        ) : (
                            <>
                                {/* Result Summary Card */}
                                <Card className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="mb-1 text-2xl font-bold">
                                                Your Skill Level: <span className="capitalize text-primary">{skillLevel?.level}</span>
                                            </h2>
                                            <p className="text-sm text-muted-foreground">
                                                You scored {Math.round(skillLevel?.score)}% on the assessment
                                            </p>
                                        </div>
                                        <Button
                                            onClick={() => {
                                                setHasCompletedAssessment(false);
                                                setSkillLevel(null);
                                            }}
                                            variant="outline"
                                        >
                                            Retake Assessment
                                        </Button>
                                    </div>
                                </Card>

                                {/* Recommended Courses */}
                                <Card className="p-6">
                                    <h3 className="mb-4 text-lg font-semibold">Recommended for You</h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {skillLevel?.recommendedCourses.map((course: string, index: number) => (
                                            <div
                                                key={course}
                                                className="flex items-center gap-3 rounded-lg border p-4 hover:bg-accent transition-colors"
                                            >
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium">{course}</h4>
                                                    <p className="text-xs text-muted-foreground">
                                                        Based on your assessment
                                                    </p>
                                                </div>
                                                <Button size="sm">View</Button>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </>
                        )}
                    </TabsContent>

                    {/* Learning Goals Tab */}
                    <TabsContent value="goals" className="space-y-6">
                        <LearningGoals />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
