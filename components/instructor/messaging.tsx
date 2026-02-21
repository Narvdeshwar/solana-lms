'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, Search, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message, Instructor } from '@/types/instructor';

interface MessagingProps {
    instructors: Instructor[];
    className?: string;
}

export function Messaging({ instructors, className }: MessagingProps) {
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedConversation) return;

        const message: Message = {
            id: `msg-${Date.now()}`,
            senderId: 'current-user',
            receiverId: selectedConversation,
            content: newMessage,
            isRead: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        setMessages([...messages, message]);
        setNewMessage('');
    };

    const filteredInstructors = instructors.filter((instructor) =>
        instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={cn('grid md:grid-cols-3 gap-6', className)}>
            <Card className="p-4 md:col-span-1">
                <div className="mb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search instructors..."
                            className="w-full pl-9 pr-3 py-2 border rounded-lg"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    {filteredInstructors.map((instructor) => (
                        <button
                            key={instructor.id}
                            onClick={() => setSelectedConversation(instructor.id)}
                            className={cn(
                                'w-full p-3 rounded-lg text-left transition-colors',
                                selectedConversation === instructor.id
                                    ? 'bg-primary/10 border border-primary'
                                    : 'hover:bg-muted border border-transparent'
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-semibold">
                                    {instructor.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium truncate">{instructor.name}</div>
                                    <div className="text-xs text-muted-foreground truncate">
                                        {instructor.title}
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </Card>

            <Card className="p-6 md:col-span-2 flex flex-col h-[600px]">
                {selectedConversation ? (
                    <>
                        <div className="flex items-center justify-between pb-4 border-b mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-semibold">
                                    {instructors.find((i) => i.id === selectedConversation)?.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold">
                                        {instructors.find((i) => i.id === selectedConversation)?.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {instructors.find((i) => i.id === selectedConversation)?.title}
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                            {messages
                                .filter(
                                    (msg) =>
                                        msg.senderId === selectedConversation ||
                                        msg.receiverId === selectedConversation
                                )
                                .map((message) => (
                                    <div
                                        key={message.id}
                                        className={cn(
                                            'flex',
                                            message.senderId === 'current-user'
                                                ? 'justify-end'
                                                : 'justify-start'
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                'max-w-[70%] rounded-lg p-3',
                                                message.senderId === 'current-user'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted'
                                            )}
                                        >
                                            <p className="text-sm">{message.content}</p>
                                            <p className="text-xs opacity-70 mt-1">
                                                {message.createdAt.toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                <Paperclip className="h-4 w-4" />
                            </Button>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Type your message..."
                                className="flex-1 px-3 py-2 border rounded-lg"
                            />
                            <Button onClick={handleSendMessage}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                        Select an instructor to start messaging
                    </div>
                )}
            </Card>
        </div>
    );
}
