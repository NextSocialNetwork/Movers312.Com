import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2, Sparkles, Phone, RotateCcw } from 'lucide-react';
import { Language, translations } from '../i18n/translations';
import { getLocalDispatchFallbackResponse } from '../services/localDispatchFallback';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

interface AiSupportChatProps {
  currentLang: Language;
}

const QUICK_QUESTIONS: Record<string, string[]> = {
  en: [
    'What are your Chicago moving rates?',
    'Do you move pianos & heavy items?',
    'Which Chicago neighborhoods do you cover?',
    'How does the $100 Cash App deposit work?',
    'Do you provide building COI insurance?'
  ],
  es: [
    '¿Cuáles son sus tarifas de mudanza?',
    '¿Mueven pianos u objetos pesados?',
    '¿Qué zonas de Chicago cubren?',
    '¿Cómo funciona el depósito de $100?'
  ],
  lt: [
    'Kokie yra perkraustymo tarifai Čikagoje?',
    'Ar pervežate pianinus ir sunkius daiktus?',
    'Kokiose Čikagos dalyse dirbate?',
    'Kaip veikia $100 užstatas?'
  ],
  ru: [
    'Какие у вас тарифы на переезд в Чикаго?',
    'Перевозите ли вы пианино и тяжелые вещи?',
    'Какие районы Чикаго вы обслуживаете?',
    'Как работает депозит $100?'
  ],
  ja: [
    '引越し料金はいくらですか？',
    'ピアノや大型家具も運べますか？',
    '対応しているシカゴのエリアは？',
    '100ドルのデポジットについて教えてください'
  ],
  ar: [
    'ما هي أسعار النقل في شيكاغو؟',
    'هل تقومون بنقل البيانو والأثاث الثقيل؟',
    'ما هي المناطق المشمولة في شيكاغو؟',
    'كيف يتم دفع مبلغ التأمين 100$؟'
  ]
};

// Simple formatter to parse **bold** and • bullets for clean presentation
function formatMessageContent(text: string) {
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    // Process **bold** markers
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <span key={lineIdx} className="block min-h-[1.1rem]">
        {parts.map((part, partIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={partIdx} className="font-bold text-emerald-950">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </span>
    );
  });
}

export const AiSupportChat: React.FC<AiSupportChatProps> = ({ currentLang = 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[currentLang] || translations.en;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: t.aiGreeting,
      timestamp: new Date()
    }
  ]);

  // Update initial greeting if language changes and no user messages exist yet
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].sender === 'ai') {
        return [{ ...prev[0], text: t.aiGreeting }];
      }
      return prev;
    });
  }, [currentLang, t.aiGreeting]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsgText = textToSend.trim();
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
      // Determine the API endpoint URL (handles local dev, Cloud Run, and custom env)
      const envApiUrl = import.meta.env.VITE_API_URL;
      const apiEndpoint = envApiUrl ? `${envApiUrl.replace(/\/$/, '')}/api/chat` : '/api/chat';

      const payload = {
        language: currentLang,
        messages: updatedMessages.map(m => ({
          sender: m.sender,
          text: m.text
        }))
      };

      let replyText: string | null = null;

      try {
        // Use an AbortController with 10s timeout to prevent hanging UI
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.reply === 'string' && data.reply.trim().length > 0) {
            replyText = data.reply;
          }
        } else {
          console.warn('Backend API returned non-200 status:', response.status);
        }
      } catch (fetchErr) {
        console.warn('Network or API fetch failed, activating resilient local dispatch fallback:', fetchErr);
      }

      // If backend was unreachable or returned an empty response, use our local knowledge assistant
      if (!replyText) {
        replyText = getLocalDispatchFallbackResponse({
          query: userMsgText,
          language: currentLang
        });
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error: any) {
      console.error('Chat error:', error);
      // Even in rare unexpected errors, always provide a helpful message
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `Movers312 Live Dispatch is standing by! Our Chicago moving packages start at $360 for 2 movers and truck with $0 travel fees. Please call our 24/7 team directly at (312) 385-9229 or calculate your instant quote on this page.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: t.aiGreeting,
        timestamp: new Date()
      }
    ]);
  };

  const activeQuickQuestions = QUICK_QUESTIONS[currentLang] || QUICK_QUESTIONS.en;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="mb-4 w-84 sm:w-96 rounded-2xl bg-[#faf9f5] shadow-2xl border border-emerald-900/20 flex flex-col overflow-hidden transition-all duration-300 ring-1 ring-black/5">
          {/* Header */}
          <div className="bg-emerald-900 text-[#faf9f5] px-4 py-3 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="bg-emerald-700 p-1.5 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-emerald-100" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-emerald-900 rounded-full animate-pulse"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  {t.aiSupportTitle}
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                </h3>
                <p className="text-[11px] text-emerald-300">{t.aiSupportSubtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart chat"
                className="text-emerald-300 hover:text-white p-1.5 rounded-lg hover:bg-emerald-800 transition cursor-pointer"
                aria-label="Restart chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-emerald-300 hover:text-white p-1.5 rounded-lg hover:bg-emerald-800 transition cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick contact banner */}
          <div className="bg-emerald-950 px-3.5 py-1.5 text-[11px] text-emerald-200 flex items-center justify-between border-b border-emerald-800/50">
            <span className="truncate">{t.instantQuoteBar}</span>
            <a
              href="tel:+13123859229"
              className="flex items-center gap-1 text-emerald-400 hover:text-white font-bold transition underline shrink-0 ml-2"
            >
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
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-emerald-700 text-white rounded-br-xs'
                      : 'bg-white text-[#122119] border border-[#e9e7df] rounded-bl-xs'
                  }`}
                >
                  <div className="leading-relaxed space-y-1">
                    {formatMessageContent(msg.text)}
                  </div>
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
                  <span className="text-[#5e6c62] italic">{t.aiTyping}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Question Chips */}
          <div className="px-3 py-2 bg-emerald-900/5 border-t border-[#e9e7df] overflow-x-auto flex gap-1.5 scrollbar-none">
            {activeQuickQuestions.slice(0, 3).map((question, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendMessage(question)}
                disabled={isLoading}
                className="whitespace-nowrap shrink-0 text-[11px] bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-900/15 hover:border-emerald-600 rounded-full px-2.5 py-1 transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleFormSubmit} className="p-3 bg-white border-t border-[#e9e7df] flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.aiInputPlaceholder}
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
        aria-label="Toggle AI Support Chat"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-emerald-700 rounded-full animate-pulse"></span>
        </div>
        <span className="font-bold text-xs sm:text-sm pr-1">{t.aiSupportTitle}</span>
      </button>
    </div>
  );
};
