import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2, Sparkles, Phone } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export const AiSupportChat: React.FC = () => {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting message on first mount or language change
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 0) {
        return [
          {
            id: '1',
            sender: 'ai',
            text: t.aiChatGreeting,
            timestamp: new Date()
          }
        ];
      }
      // If first message is greeting, update it to active language
      if (prev[0] && prev[0].id === '1' && prev[0].sender === 'ai') {
        const updated = [...prev];
        updated[0] = { ...updated[0], text: t.aiChatGreeting };
        return updated;
      }
      return prev;
    });
  }, [t.aiChatGreeting, lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsgText = inputText.trim();
    setInputText('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userMsgText,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: lang,
          messages: updatedMessages.map(m => ({
            sender: m.sender,
            text: m.text
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to communicate with AI support.');
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || "I'm sorry, I couldn't generate a response at this time.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `⚠️ Error: ${error.message || 'Could not connect to dispatch server. Please call (312) 385-9229.'}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-2xl bg-[#faf9f5] shadow-2xl border border-emerald-900/10 flex flex-col overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="bg-emerald-900 text-[#faf9f5] px-4 py-3.5 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="bg-emerald-700 p-1.5 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-emerald-100" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-emerald-900 rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  {t.aiChatTitle}
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                </h3>
                <p className="text-[11px] text-emerald-300">{t.aiChatSub}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-emerald-300 hover:text-white p-1 rounded-lg hover:bg-emerald-800 transition"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick contact bar */}
          <div className="bg-emerald-950 px-3 py-1.5 text-[11px] text-emerald-200 flex items-center justify-between border-b border-emerald-800/50">
            <span>Instant Cook County Quotes</span>
            <a href="tel:+13123859229" className="flex items-center gap-1 text-emerald-400 hover:text-white font-bold transition underline">
              <Phone className="w-3 h-3" /> (312) 385-9229
            </a>
          </div>

          {/* Messages Area */}
          <div className="h-80 sm:h-96 overflow-y-auto p-4 space-y-3 bg-[#f3f1e9]/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-emerald-700 text-white rounded-br-xs'
                      : 'bg-white text-[#122119] border border-[#e9e7df] rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[9px] text-[#5e6c62] mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start">
                <div className="bg-white text-[#122119] border border-[#e9e7df] rounded-2xl rounded-bl-xs px-3.5 py-2.5 text-xs shadow-xs flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                  <span className="text-[#5e6c62] italic">Matt's AI is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#e9e7df] flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.aiChatPlace}
              className="flex-1 px-3 py-2 bg-[#f3f1e9] border border-[#e9e7df] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50 text-[#122119] placeholder-[#5e6c62]"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white p-2 sm:px-3 sm:py-2 rounded-xl transition flex items-center justify-center shadow-xs cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border border-emerald-500/30"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-emerald-700 rounded-full animate-pulse"></span>
        </div>
        <span className="font-bold text-sm pr-1">{t.aiChatToggle}</span>
      </button>
    </div>
  );
};
