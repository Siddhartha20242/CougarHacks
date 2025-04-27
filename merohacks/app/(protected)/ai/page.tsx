"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Send, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const GroqChatPage = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll into view on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Initial greeting, now specific to the topic
    useEffect(() => {
        const initialMessage: Message = {
            role: 'assistant',
            content: "Hello, I'm here to provide information and support related to drugs, alcohol, and suicide prevention. How can I assist you today?",
        };
        setMessages([initialMessage]);
    }, []);

    const sendMessage = useCallback(async () => {
        if (!input.trim()) return;
        const userMessage = { role: 'user' as const, content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/groq-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'API error');
            }
            const { response } = await res.json();

            //  Check for keywords and tailor the response.  This is the core change.
            const lowerCaseInput = input.toLowerCase();
            let aiResponse = response; // Default to the raw API response

            if (
                lowerCaseInput.includes('suicide') ||
                lowerCaseInput.includes('kill myself') ||
                lowerCaseInput.includes('want to die')
            ) {
                aiResponse =
                    "If you're having thoughts of harming yourself, please know that you're not alone and there's help available. You can call or text 988 in the US and Canada to reach the Suicide & Crisis Lifeline. In the UK, you can call 111.  These services are free, confidential, and available 24/7.";
            } else if (
                lowerCaseInput.includes('drugs') ||
                lowerCaseInput.includes('alcohol') ||
                lowerCaseInput.includes('addiction') ||
                lowerCaseInput.includes('substance abuse')
            ) {
                aiResponse =
                    "I can provide information about drug and alcohol addiction, treatment options, and support resources.  For immediate help, you can call the SAMHSA National Helpline at 1-800-662-HELP (4357).";
            } else if (lowerCaseInput.includes('help')) {
                 aiResponse = "I can help provide information on various topics related to mental health. Please let me know what you'd like assistance with."
            }
            else {
                aiResponse = response
            }
            setMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
        } catch (err: any) {
            setError(err.message);
            setMessages(newMessages);
        } finally {
            setLoading(false);
        }
    }, [input, messages]);

    return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto p-4 flex-grow flex flex-col">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
                    Groq Chat Support
                </h1>
                <div className="flex-grow overflow-y-auto space-y-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={cn('flex w-full', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                            <div className={cn(
                                'rounded-xl px-4 py-2 max-w-[70%] shadow-md',
                                msg.role === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                            )}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex">
                            <div className="rounded-xl px-4 py-2 animate-pulse bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 max-w-[50%]">
                                Typing...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                {error && (
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-red-500">
                                <AlertTriangle className="h-5 w-5" /> Error
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-red-500">{error}</p>
                        </CardContent>
                    </Card>
                )}
                <div className="mt-4 flex gap-2">
                    <Input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                        placeholder="Type your message…"
                        disabled={loading}
                        className="flex-1"
                    />
                    <Button onClick={sendMessage} disabled={loading}>
                        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending…</> : <Send className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" onClick={() => {
                        setMessages([{ role: 'assistant', content: "Hello! How can I help you today?" }]);
                        setInput('');
                        setError(null);
                    }} disabled={loading}>
                        <XCircle className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default GroqChatPage;
