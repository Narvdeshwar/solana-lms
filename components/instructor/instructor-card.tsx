'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Users, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Instructor } from '@/types/instructor';

interface InstructorCardProps {
    instructor: Instructor;
    onMessage?: (instructorId: string) => void;
    onBookOfficeHours?: (instructorId: string) => void;
    className?: string;
}

export function InstructorCard({
    instructor,
    onMessage,
    onBookOfficeHours,
    className
}: InstructorCardProps) {
    return (
        <Card className={cn('p-6 hover:shadow-lg transition-shadow', className)}>
            <div className="flex gap-4">
                <div className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold">
                        {instructor.name.charAt(0)}
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1">{instructor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{instructor.title}</p>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {instructor.bio}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {instructor.expertise.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                            </Badge>
                        ))}
                        {instructor.expertise.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                                +{instructor.expertise.length - 3}
                            </Badge>
                        )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">{instructor.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                                {instructor.totalStudents}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                                {instructor.responseTime}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {onMessage && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onMessage(instructor.id)}
                            >
                                Message
                            </Button>
                        )}
                        {onBookOfficeHours && (
                            <Button
                                size="sm"
                                onClick={() => onBookOfficeHours(instructor.id)}
                            >
                                Book Office Hours
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
