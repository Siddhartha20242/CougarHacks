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
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: "Hello, I'm here to provide information and support related to drugs, alcohol, and suicide prevention. How can I assist you today?",
    }]);
  }, []);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text) return;

    const userMessage = { role: 'user' as const, content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/groq-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'API error');
      }

      const { response } = await res.json();
      const lc = text.toLowerCase();
      let aiResponse = response;

      // simple keyword overrides
      if (lc.includes('suicide') || lc.includes('kill myself') || lc.includes('want to die')) {
        aiResponse =
          "It sounds like you're going through a difficult time. Please know there's support available. You can call or text 988 in the US and Canada to reach the Suicide & Crisis Lifeline. In the UK, you can call 111. These services are free, confidential, and available 24/7.";
      } else if (lc.includes('drugs') || lc.includes('alcohol') || lc.includes('addiction') || lc.includes('substance abuse')) {
        aiResponse =
          "If you're concerned about substance use, there's help available. You can call the SAMHSA National Helpline at 1-800-662-HELP (4357) for confidential support and treatment options.";
      } else if (lc.includes('help')) {
        aiResponse = "I'm here to help. Please tell me more about what you're looking for.";
      }

      setMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
    } catch (err: any) {
      setError(err.message);
      setMessages(newMessages);
    } finally {
      setLoading(false);
    }
  }, [input, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: "Hello! How can I help you today?",
    }]);
    setInput('');
    setError(null);
  };

  const suggestedQuestions = [
    "What are the signs of addiction?",
    "Where can I find support for anxiety?",
    "How can I help a friend who is struggling?",
    "Tell me more about the 988 lifeline.",
    "What are the different types of therapy?",
    "Can you provide resources for drug rehabilitation?",
    "How can I cope with stress?",
    "What is mindfulness?",
    "Are there any online support groups?",
    "What should I do in a crisis?",
    "Another question?",
    "And yet another one?",
    "This is a really long suggestion to test the scrolling.",
    "One more for good measure.",
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <div className="p-6">
        <Card className="bg-black border-gray-700 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-center">
              Groq Chat Support
            </CardTitle>
            <p className="text-sm text-center text-gray-400">
              Get information and support. This is an AI and not a substitute for professional help.
            </p>
          </CardHeader>
        </Card>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-6 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'flex w-full',
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div className={cn(
              'rounded-md px-4 py-2 max-w-[80%] shadow-sm',
              msg.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-white'
            )}>
              <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-md px-4 py-2 animate-pulse bg-gray-800 max-w-[50%]">
              <p className="text-sm">
                Typing
                <span className="animate-ping inline-block ml-1 w-2 h-2 rounded-full bg-blue-500 opacity-75" />
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error */}
      {error && (
        <Card className="m-6 bg-black border border-red-700 text-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Input bar */}
      <div className="sticky bottom-0 bg-black px-6 py-4 flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message…"
          disabled={loading}
          className="flex-1 bg-gray-900 text-white rounded-lg focus-visible:ring-blue-500"
        />
        <Button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white rounded-lg"
        >
          {loading
            ? (<><Loader2 className="h-4 w-4 animate-spin mr-2" />Sending…</>)
            : (<Send className="h-4 w-4" />)}
        </Button>
        <Button
          variant="outline"
          onClick={clearChat}
          disabled={loading}
          className="border-gray-700 text-white rounded-lg"
        >
          <XCircle className="h-4 w-4" /> Clear
        </Button>
      </div>

      {/* Suggestions bar */}
      <div
        ref={suggestionsRef}
        className="bg-black px-6 py-4 flex space-x-2 overflow-x-auto border-t border-gray-700"
      >
        {suggestedQuestions.map((q, idx) => (
          <Button
            key={idx}
            variant="secondary"
            size="sm"
            className="whitespace-nowrap text-white rounded-full"
            onClick={() => handleSuggestionClick(q)}
          >
            {q}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GroqChatPage;
