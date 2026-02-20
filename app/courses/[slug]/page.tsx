'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { Clock, BookOpen, Zap, CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/shared/progress-bar';
import { DifficultyBadge } from '@/components/shared/difficulty-badge';
import { formatDuration, formatNumber, calculateTotalCourseXP } from '@/lib/solana/helpers';
import { ROUTES } from '@/lib/constants';
import { MOCK_COURSE_WITH_MODULES, MOCK_COMPLETED_LESSONS, MOCK_IS_ENROLLED } from '@/lib/mock-data';
import type { Lesson } from '@/types';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { connected } = useWallet();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [expandedModules, setExpandedModules] = useState<string[]>(['m1']);

  const course = MOCK_COURSE_WITH_MODULES;
  const isEnrolled = MOCK_IS_ENROLLED;
  const completedLessons = MOCK_COMPLETED_LESSONS;

  const totalXp = calculateTotalCourseXP(course.xpPerLesson, course.lessonCount);
  const progress = isEnrolled ? (completedLessons.length / course.lessonCount) * 100 : 0;

  const handleEnroll = async () => {
    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }

    setIsEnrolling(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Successfully enrolled!');
      router.refresh();
    } catch (error) {
      console.error('Enrollment failed:', error);
      alert('Enrollment failed. Please try again.');
    } finally {
      setIsEnrolling(false);
    }
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const isLessonLocked = (lesson: Lesson, moduleIndex: number, lessonIndex: number) => {
    if (!isEnrolled) return true;
    if (moduleIndex === 0 && lessonIndex === 0) return false;

    const allLessons = course.modules.flatMap(m => m.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
    if (currentIndex === 0) return false;

    const previousLesson = allLessons[currentIndex - 1];
    return !completedLessons.includes(previousLesson.id);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Course Header */}
      <div className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <DifficultyBadge difficulty={course.difficulty} />
          <Badge variant="outline">
            <Clock className="mr-1 h-3 w-3" />
            {formatDuration(course.duration * 60)}
          </Badge>
          <Badge variant="outline">
            <BookOpen className="mr-1 h-3 w-3" />
            {course.lessonCount} lessons
          </Badge>
          <Badge variant="outline">
            <Zap className="mr-1 h-3 w-3 text-yellow-500" />
            {formatNumber(totalXp)} XP
          </Badge>
        </div>

        <h1 className="mb-4 text-4xl font-bold">{course.title}</h1>
        <p className="mb-6 text-lg text-muted-foreground">{course.description}</p>

        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            By {course.creatorName}
          </div>
          {!isEnrolled && (
            <Button onClick={handleEnroll} disabled={isEnrolling} size="lg">
              {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
            </Button>
          )}
        </div>

        {isEnrolled && (
          <div className="mt-6">
            <ProgressBar
              value={progress}
              showLabel
              label="Your Progress"
              variant={progress === 100 ? 'success' : 'default'}
            />
          </div>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Course Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.modules.map((module, moduleIndex) => {
                const isExpanded = expandedModules.includes(module.id);
                const moduleCompleted = module.lessons.every(l => completedLessons.includes(l.id));

                return (
                  <div key={module.id} className="rounded-lg border">
                    {/* Module Header */}
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{module.title}</span>
                          {moduleCompleted && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {module.lessons.length} lessons
                      </div>
                    </button>

                    {/* Lessons */}
                    {isExpanded && (
                      <div className="border-t">
                        {module.lessons.map((lesson, lessonIndex) => {
                          const isCompleted = completedLessons.includes(lesson.id);
                          const isLocked = isLessonLocked(lesson, moduleIndex, lessonIndex);

                          return (
                            <button
                              key={lesson.id}
                              onClick={() => {
                                if (!isLocked) {
                                  router.push(ROUTES.LESSON(course.slug, lesson.id));
                                }
                              }}
                              disabled={isLocked}
                              className="flex w-full items-center gap-4 border-t p-4 text-left transition-colors hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-full border">
                                {isCompleted ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : isLocked ? (
                                  <Lock className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <PlayCircle className="h-4 w-4" />
                                )}
                              </div>

                              <div className="flex-1">
                                <div className="font-medium">{lesson.title}</div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>{lesson.type === 'challenge' ? 'Challenge' : 'Reading'}</span>
                                  <span>•</span>
                                  <span>{lesson.estimatedMinutes} min</span>
                                </div>
                              </div>

                              {lesson.type === 'challenge' && (
                                <Badge variant="outline">
                                  <Zap className="mr-1 h-3 w-3 text-yellow-500" />
                                  {course.xpPerLesson} XP
                                </Badge>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* What You'll Learn */}
          <Card>
            <CardHeader>
              <CardTitle>What You'll Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Understand Solana's architecture and core concepts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Work with accounts and transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Create and interact with Solana programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Understand Program Derived Addresses (PDAs)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Course Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Course Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Lessons</span>
                <span className="font-semibold">{course.lessonCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total XP</span>
                <span className="font-semibold">{formatNumber(totalXp)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-semibold">{formatDuration(course.duration * 60)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Difficulty</span>
                <span className="font-semibold">
                  <DifficultyBadge difficulty={course.difficulty} />
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
