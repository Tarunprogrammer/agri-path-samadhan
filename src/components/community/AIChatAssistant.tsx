import { useState, useRef, useEffect } from 'react';
import { MessageCircle, ChevronRight, Sparkles, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAIChat } from '@/hooks/useAIChat';
import { useLanguage } from '@/contexts/LanguageContext';

const AIChatAssistant = () => {
  const { t } = useLanguage();
  const [chatInput, setChatInput] = useState('');
  const { messages, isLoading, error, sendMessage, clearMessages } = useAIChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (chatInput.trim() && !isLoading) {
      sendMessage(chatInput);
      setChatInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "Best crops for summer season?",
    "How to prevent pest attacks?",
    "Tell me about PM-KISAN scheme",
  ];

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="p-4 gradient-hero flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-primary-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            {t('community.askAI')}
          </h3>
          <p className="text-sm text-primary-foreground/80">Your Digital Krushi Mitra</p>
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearMessages}
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div className="p-4">
        <div className="h-64 bg-secondary rounded-xl p-4 mb-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-4">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="mb-4">Start a conversation with your AI farming assistant</p>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setChatInput(question);
                      sendMessage(question);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-lg bg-background hover:bg-primary/10 text-foreground text-xs transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background text-foreground border border-border'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="bg-background text-muted-foreground border border-border rounded-xl px-3 py-2 text-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {error && (
          <div className="mb-3 p-2 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-xs">
            {error}
          </div>
        )}

        <div className="flex gap-2">
          <Input
            placeholder="Ask about farming..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button
            variant="default"
            size="icon"
            onClick={handleSend}
            disabled={isLoading || !chatInput.trim()}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChatAssistant;
