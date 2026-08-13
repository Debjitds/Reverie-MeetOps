import { useState, useRef, useEffect, useMemo } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/db/supabase';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { translate } = useLanguage();

  // Translated UI strings
  const [uiStrings, setUiStrings] = useState({
    header: 'MEETOPS AI ASSISTANT',
    welcome: "Hi! I'm MeetOps AI. I can help you book rooms, check availability, and manage your bookings.",
    try: 'Try: "Book me a room for 5 people tomorrow at 2PM"',
    placeholder: 'Type your message...',
    error: 'Sorry, I encountered an error. Please try again.',
    sendError: 'Failed to send message. Please try again.',
    noResponse: 'Sorry, I could not process your request.',
  });

  useEffect(() => {
    const translateUi = async () => {
      const translated = await Promise.all([
        translate('MEETOPS AI ASSISTANT'),
        translate("Hi! I'm MeetOps AI. I can help you book rooms, check availability, and manage your bookings."),
        translate('Try: "Book me a room for 5 people tomorrow at 2PM"'),
        translate('Type your message...'),
        translate('Sorry, I encountered an error. Please try again.'),
        translate('Failed to send message. Please try again.'),
        translate('Sorry, I could not process your request.'),
      ]);

      setUiStrings({
        header: translated[0],
        welcome: translated[1],
        try: translated[2],
        placeholder: translated[3],
        error: translated[4],
        sendError: translated[5],
        noResponse: translated[6],
      });
    };

    if (isOpen) {
      translateUi();
    }
  }, [isOpen, translate]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !user) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for API
      const history = messages.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: {
          message: userMessage.content,
          history,
          userId: user.id,
        },
      });

      if (error) {
        console.error('Chat function error:', error);
        let assistantErrorText = uiStrings.error;
        
        // Try to extract more detail from the error
        try {
          const contextText = await error.context?.text();
          if (contextText) {
            const parsed = JSON.parse(contextText);
            if (parsed.error) {
              assistantErrorText = `${uiStrings.error}\n\nDetails: ${parsed.error}`;
            }
          }
        } catch (e) {
          console.error('Failed to parse error context:', e);
        }

        const errorMessage: Message = {
          role: 'assistant',
          content: assistantErrorText,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        return;
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || uiStrings.noResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Show action result if any
      if (data.actionResult) {
        if (data.actionResult.success) {
          toast.success(data.actionResult.message);
        } else {
          toast.error(data.actionResult.message);
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast.error(uiStrings.sendError);
      
      const errorMessage: Message = {
        role: 'assistant',
        content: uiStrings.error,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!user) return null;

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-foreground border-3 border-black hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[500px] sm:h-[600px] bg-white border-3 border-black hard-shadow flex flex-col max-h-[calc(100vh-8rem)]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b-3 border-black bg-primary">
            <h3 className="font-bold uppercase tracking-wide text-foreground">
              {uiStrings.header}
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-black/10 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">
                  {uiStrings.welcome}
                </p>
                <p className="text-xs mt-2">
                  {uiStrings.try}
                </p>
              </div>
            )}

            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 border-2 border-black ${
                      message.role === 'user'
                        ? 'bg-primary text-foreground'
                        : 'bg-white text-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 border-2 border-black bg-white">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t-3 border-black bg-muted/30">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={uiStrings.placeholder}
                disabled={isLoading}
                className="flex-1 border-2 border-black"
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="px-4 border-3 border-black"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
