'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Instructor, OfficeHours, Booking } from '@/types/instructor';

interface OfficeHoursBookingProps {
    instructor: Instructor;
    className?: string;
}

export function OfficeHoursBooking({ instructor, className }: OfficeHoursBookingProps) {
    const [selectedSlot, setSelectedSlot] = useState<OfficeHours | null>(null);
    const [topic, setTopic] = useState('');
    const [notes, setNotes] = useState('');
    const [bookings, setBookings] = useState<Booking[]>([]);

    const handleBooking = () => {
        if (!selectedSlot) return;

        const newBooking: Booking = {
            id: `booking-${Date.now()}`,
            studentId: 'current-user',
            instructorId: instructor.id,
            officeHoursId: selectedSlot.id,
            date: new Date(),
            startTime: selectedSlot.startTime,
            endTime: selectedSlot.endTime,
            topic,
            notes,
            status: 'pending',
            createdAt: new Date()
        };

        setBookings([...bookings, newBooking]);
        setSelectedSlot(null);
        setTopic('');
        setNotes('');
    };

    return (
        <div className={cn('space-y-6', className)}>
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Book Office Hours</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium mb-3">Available Slots</h4>
                        <div className="space-y-2">
                            {instructor.availability.map((slot) => {
                                const isAvailable = slot.bookedSlots < slot.maxSlots;
                                return (
                                    <button
                                        key={slot.id}
                                        onClick={() => isAvailable && setSelectedSlot(slot)}
                                        className={cn(
                                            'w-full p-3 rounded-lg border text-left transition-colors',
                                            selectedSlot?.id === slot.id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border hover:border-primary/50',
                                            !isAvailable && 'opacity-50 cursor-not-allowed'
                                        )}
                                        disabled={!isAvailable}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium">{slot.day}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {slot.startTime} - {slot.endTime}
                                                </div>
                                            </div>
                                            <Badge variant={isAvailable ? 'default' : 'secondary'}>
                                                {slot.bookedSlots}/{slot.maxSlots}
                                            </Badge>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-3">Booking Details</h4>
                        {selectedSlot ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">
                                        Topic
                                    </label>
                                    <input
                                        type="text"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        placeholder="What would you like to discuss?"
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">
                                        Additional Notes
                                    </label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Any specific questions or context..."
                                        rows={4}
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                                <Button onClick={handleBooking} className="w-full">
                                    Confirm Booking
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                Select a time slot to continue
                            </div>
                        )}
                    </div>
                </div>
            </Card>

            {bookings.length > 0 && (
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Your Bookings</h3>
                    <div className="space-y-3">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="p-4 border rounded-lg flex items-center justify-between"
                            >
                                <div className="flex-1">
                                    <div className="font-medium">{booking.topic}</div>
                                    <div className="text-sm text-muted-foreground flex items-center gap-4 mt-1">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {booking.date.toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {booking.startTime} - {booking.endTime}
                                        </span>
                                    </div>
                                </div>
                                <Badge>{booking.status}</Badge>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
}
