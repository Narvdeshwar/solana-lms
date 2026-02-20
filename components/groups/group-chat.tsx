'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types/group';

interface GroupChatProps {
    groupId: string;
    messages: ChatMessage[];
    onSendMessage: (content: string) => void;
    currentUserId: string;
    className?: string;
}

export function GroupChat({
    groupId,
    messages,
    onSendMessage,
    currentUserId,
    className
}: GroupChatProps) {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        onSendMessage(newMessage.trim());
        setNewMessage('');
    };

    const getTimeAgo = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - new Date(date).getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        return 'Just now';
    };

    return (
        <Card className={cn('flex flex-col h-[600px]', className)}>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-center">
                        <div>
                            <p className="text-muted-foreground">No messages yet</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Be the first to say something!
                            </p>
                        </div>
                    </div>
                ) : (
                    messages.map((message) => {
                        const isCurrentUser = message.senderId === currentUserId;
                        return (
                            <div
                                key={message.id}
                                className={cn(
                                    'flex',
                                    isCurrentUser ? 'justify-end' : 'justify-start'
                                )}
                            >
                                <div
                                    className={cn(
                                        'max-w-[70%] rounded-lg p-3',
                                        isCurrentUser
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted'
                                    )}
                                >
                                    {!isCurrentUser && (
                                        <p className="text-xs font-semibold mb-1">
                                            {message.senderName}
                                        </p>
                                    )}
                                    <p className="text-sm whitespace-pre-wrap break-words">
                                        {message.content}
                                    </p>
                                    <p
                                        className={cn(
                                            'text-xs mt-1',
                                            isCurrentUser
                                                ? 'text-primary-foreground/70'
                                                : 'text-muted-foreground'
                                        )}
                                    >
                                        {getTimeAgo(message.createdAt)}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <Button type="submit" size="sm" disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </Card>
    );
}
