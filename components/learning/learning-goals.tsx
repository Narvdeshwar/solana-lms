'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/shared/progress-bar';
import {
    Target,
    Plus,
    CheckCircle,
    Calendar,
    TrendingUp,
    Trash2,
    Edit,
    Flag
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Goal {
    id: string;
    title: string;
    description: string;
    targetDate: Date;
    progress: number;
    milestones: Milestone[];
    category: 'course' | 'skill' | 'project' | 'certification';
    priority: 'low' | 'medium' | 'high';
    isCompleted: boolean;
    createdAt: Date;
}

interface Milestone {
    id: string;
    title: string;
    isCompleted: boolean;
}

interface LearningGoalsProps {
    className?: string;
}

export function LearningGoals({ className }: LearningGoalsProps) {
    const [goals, setGoals] = useState<Goal[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('learning-goals');
            if (saved) {
                const parsed = JSON.parse(saved);
                return parsed.map((g: any) => ({
                    ...g,
                    targetDate: new Date(g.targetDate),
                    createdAt: new Date(g.createdAt)
ones, setMilestones] = useState<string[]> (['']);

                    const [filterCategory, setFilterCategory] = useState<'all' | Goal['category']>('all');
                    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');

                    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('learning-goals', JSON.stringify(goals));
        }
    }, [goals]);

    const handleCreateGoal = () => {
        if (!title.trim() || !targetDate) return;

        const newGoal: Goal = {
            id: Date.now().toString(),
            title,
            description,
            targetDate: new Date(targetDate),
            progress: 0,
            milestones: milestones
                .filter(m => m.trim())
                .map((m, i) => ({
                    id: `${Date.now()}-${i}`,
                    title: m,
                    isCompleted: false
                })),
            category,
            priority,
            isCompleted: false,
            createdAt: new Date()
        };

        setGoals([newGoal, ...goals]);
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setTargetDate('');
        setCategory('course');
        setPriority('medium');
        setMilestones(['']);
        setIsCreating(false);
        setEditingGoal(null);
    };

    const handleToggleMilestone = (goalId: string, milestoneId: string) => {
        setGoals(goals.map(goal => {
            if (goal.id !== goalId) return goal;

            const updatedMilestones = goal.milestones.map(m =>
                m.id === milestoneId ? { ...m, isCompleted: !m.isCompleted } : m
            );

            const completedCount = updatedMilestones.filter(m => m.isCompleted).length;
            const progress = (completedCount / updatedMilestones.length) * 100;
            const isCompleted = progress === 100;

            return {
                ...goal,
                milestones: updatedMilestones,
                progress,
                isCompleted
            };
        }));
    };

    const handleDeleteGoal = (goalId: string) => {
        setGoals(goals.filter(g => g.id !== goalId));
    };

    const addMilestone = () => {
        setMilestones([...milestones, '']);
    };

    const updateMilestone = (index: number, value: string) => {
        const updated = [...milestones];
        updated[index] = value;
        setMilestones(updated);
    };

    const removeMilestone = (index: number) => {
        setMilestones(milestones.filter((_, i) => i !== index));
    };

    const getDaysRemaining = (targetDate: Date) => {
        const now = new Date();
        const diff = targetDate.getTime() - now.getTime();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return days;
    };

    const getPriorityColor = (priority: Goal['priority']) => {
        switch (priority) {
            case 'high': return 'text-red-600 bg-red-500/10 border-red-500/20';
            case 'medium': return 'text-yellow-600 bg-yellow-500/10 border-yellow-500/20';
            case 'low': return 'text-green-600 bg-green-500/10 border-green-500/20';
        }
    };

    const getCategoryIcon = (category: Goal['category']) => {
        switch (category) {
            case 'course': return '📚';
            case 'skill': return '⚡';
            case 'project': return '🚀';
            case 'certification': return '🏆';
        }
    };

    const filteredGoals = goals.filter(goal => {
        if (filterCategory !== 'all' && goal.category !== filterCategory) return false;
        if (filterStatus === 'completed' && !goal.isCompleted) return false;
        if (filterStatus === 'active' && goal.isCompleted) return false;
        return true;
    });

    const activeGoals = goals.filter(g => !g.isCompleted).length;
    const completedGoals = goals.filter(g => g.isCompleted).length;
    const totalProgress = goals.length > 0
        ? goals.reduce((sum, g) => sum + g.progress, 0) / goals.length
        : 0;

    return (
        <div className={cn('space-y-6', className)}>
            {/* Header Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Active Goals</p>
                            <p className="text-2xl font-bold">{activeGoals}</p>
                        </div>
                        <Target className="h-8 w-8 text-blue-600" />
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Completed</p>
                            <p className="text-2xl font-bold">{completedGoals}</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Overall Progress</p>
                            <p className="text-2xl font-bold">{Math.round(totalProgress)}%</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                </Card>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Target className="h-6 w-6" />
                        Learning Goals
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Set and track your learning objectives
                    </p>
                </div>
                {!isCreating && (
                    <Button onClick={() => setIsCreating(true)} className="gap-2">
                        <Plus className="h-4 w-4" />
                        New Goal
                    </Button>
                )}
            </div>

            {/* Create Goal Form */}
            <AnimatePresence>
                {isCreating && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <Card className="p-6">
                            <h3 className="mb-4 font-semibold">Create New Goal</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Goal Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g., Complete Solana Fundamentals Course"
                                        className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe your goal..."
                                        className="w-full min-h-[80px] resize-none rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">Category</label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value as Goal['category'])}
                                            className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                        >
                                            <option value="course">Course</option>
                                            <option value="skill">Skill</option>
                                            <option value="project">Project</option>
                                            <option value="certification">Certification</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">Priority</label>
                                        <select
                                            value={priority}
                                            onChange={(e) => setPriority(e.target.value as Goal['priority'])}
                                            className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">Target Date</label>
                                        <input
                                            type="date"
                                            value={targetDate}
                                            onChange={(e) => setTargetDate(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">Milestones</label>
                                    <div className="space-y-2">
                                        {milestones.map((milestone, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={milestone}
                                                    onChange={(e) => updateMilestone(index, e.target.value)}
                                                    placeholder={`Milestone ${index + 1}`}
                                                    className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                                />
                                                {milestones.length > 1 && (
                                                    <Button
                                                        onClick={() => removeMilestone(index)}
                                                        variant="ghost"
                                                        size="sm"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                        <Button
                                            onClick={addMilestone}
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Milestone
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-2">
                                <Button
                                    onClick={handleCreateGoal}
                                    disabled={!title.trim() || !targetDate}
                                >
                                    Create Goal
                                </Button>
                                <Button onClick={resetForm} variant="outline">
                                    Cancel
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Filters */}
            {goals.length > 0 && (
                <Card className="p-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium">Filter:</span>
                        <Button
                            variant={filterStatus === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('all')}
                        >
                            All
                        </Button>
                        <Button
                            variant={filterStatus === 'active' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('active')}
                        >
                            Active
                        </Button>
                        <Button
                            variant={filterStatus === 'completed' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('completed')}
                        >
                            Completed
                        </Button>
                        <div className="mx-2 h-6 w-px bg-border" />
                        <Button
                            variant={filterCategory === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterCategory('all')}
                        >
                            All Categories
                        </Button>
                        <Button
                            variant={filterCategory === 'course' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterCategory('course')}
                        >
                            📚 Courses
                        </Button>
                        <Button
                            variant={filterCategory === 'skill' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterCategory('skill')}
                        >
                            ⚡ Skills
                        </Button>
                        <Button
                            variant={filterCategory === 'project' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterCategory('project')}
                        >
                            🚀 Projects
                        </Button>
                    </div>
                </Card>
            )}

            {/* Goals List */}
            <div className="space-y-4">
                {filteredGoals.length === 0 ? (
                    <Card className="p-12 text-center">
                        <Target className="mx-auto h-16 w-16 text-muted-foreground/50" />
                        <h3 className="mt-4 text-lg font-semibold">No Goals Yet</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Create your first learning goal to start tracking your progress
                        </p>
                        <Button onClick={() => setIsCreating(true)} className="mt-4">
                            Create Goal
                        </Button>
                    </Card>
                ) : (
                    filteredGoals.map((goal) => {
                        const daysRemaining = getDaysRemaining(goal.targetDate);
                        const isOverdue = daysRemaining < 0;

                        return (
                            <Card key={goal.id} className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        {/* Goal Header */}
                                        <div className="mb-3 flex items-center gap-2 flex-wrap">
                                            <span className="text-2xl">{getCategoryIcon(goal.category)}</span>
                                            <h3 className="text-lg font-semibold">{goal.title}</h3>
                                            {goal.isCompleted && (
                                                <Badge className="bg-green-500">
                                                    <CheckCircle className="mr-1 h-3 w-3" />
                                                    Completed
                                                </Badge>
                                            )}
                                            <Badge
                                                variant="outline"
                                                className={getPriorityColor(goal.priority)}
                                            >
                                                <Flag className="mr-1 h-3 w-3" />
                                                {goal.priority}
                                            </Badge>
                                        </div>

                                        {goal.description && (
                                            <p className="mb-4 text-sm text-muted-foreground">
                                                {goal.description}
                                            </p>
                                        )}

                                        {/* Progress */}
                                        <div className="mb-4">
                                            <div className="mb-2 flex items-center justify-between text-sm">
                                                <span className="font-medium">Progress</span>
                                                <span className="text-muted-foreground">
                                                    {Math.round(goal.progress)}%
                                                </span>
                                            </div>
                                            <ProgressBar value={goal.progress} />
                                        </div>

                                        {/* Milestones */}
                                        {goal.milestones.length > 0 && (
                                            <div className="space-y-2">
                                                {goal.milestones.map((milestone) => (
                                                    <label
                                                        key={milestone.id}
                                                        className="flex items-center gap-3 cursor-pointer group"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={milestone.isCompleted}
                                                            onChange={() => handleToggleMilestone(goal.id, milestone.id)}
                                                            className="h-4 w-4 rounded border-gray-300"
                                                        />
                                                        <span className={cn(
                                                            "text-sm group-hover:text-primary transition-colors",
                                                            milestone.isCompleted && "line-through text-muted-foreground"
                                                        )}>
                                                            {milestone.title}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {isOverdue ? (
                                                    <span className="text-red-600 font-medium">
                                                        Overdue by {Math.abs(daysRemaining)} days
                                                    </span>
                                                ) : goal.isCompleted ? (
                                                    <span className="text-green-600">Completed</span>
                                                ) : (
                                                    <span>{daysRemaining} days remaining</span>
                                                )}
                                            </span>
                                            <span>
                                                {goal.milestones.filter(m => m.isCompleted).length}/{goal.milestones.length} milestones
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <Button
                                        onClick={() => handleDeleteGoal(goal.id)}
                                        variant="ghost"
                                        size="sm"
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>
        </div>
    );
}
