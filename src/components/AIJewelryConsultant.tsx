import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, RefreshCw, MessageSquare, Shield, HelpCircle, User } from 'lucide-react';
import { ChatMessage } from '../types';

export default function AIJewelryConsultant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Assalamu Alaikum! Welcome to the Patiala Jewellers Royal AI Design Advisor. I can help you find the perfect wedding jewelry, compare gold purity configurations, calculate estimated weights, or outline custom designs suited to your preferences. What kind of magnificent ornaments can I assist you with today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Send message to our server-side proxy endpoint
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, history: messages })
      });

      if (!response.ok) {
        throw new Error('Could not fetch advice from advisor');
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || "I apologize, my creative gears are experiencing a minor delay. Please try again in a moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: "I apologize, but I am unable to connect to the royal palace at this moment. Please check your internet connection or try again later.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: "History cleared. Assalamu Alaikum! I am ready to advise you on your jewelry queries. What can I design for you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const presetQuestions = [
    { label: 'Suggest an engagement ring design under Rs. 250,000.', icon: '💍' },
    { label: 'What bridal jewelry complements a maroon velvet bridal Lehengha?', icon: '👸' },
    { label: 'I have 6 Tolas of gold. What custom jewelry can you craft for me?', icon: '📐' },
    { label: 'How is a custom bridal order pricing calculated?', icon: '📈' }
  ];

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto flex flex-col h-[80vh] bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950/20 to-stone-900 border-b border-amber-500/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-400/35 animate-pulse">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
                Royal Jewelry Advisor
              </h3>
              <p className="text-[10px] text-stone-400 font-mono tracking-widest uppercase">
                Powered by Gemini AI • Patiala Showroom
              </p>
            </div>
          </div>
          
          <button
            onClick={handleClearHistory}
            className="text-stone-400 hover:text-amber-400 p-2 rounded-xl hover:bg-stone-800/40 transition-colors flex items-center gap-1 text-xs cursor-pointer"
            title="Reset Advisor Conversation"
          >
            <RefreshCw className="w-4 h-4" /> Reset
          </button>
        </div>

        {/* Message Panel Area */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-950/40 select-text">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar Icon */}
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-stone-900 border-stone-800 text-stone-300'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-amber-400" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-md leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-amber-500 text-stone-950 font-medium rounded-tr-none'
                  : 'bg-stone-900 text-stone-200 border border-stone-850 rounded-tl-none'
              }`}>
                {msg.text}
                <span className={`block text-[8px] mt-1.5 font-mono text-right ${
                  msg.sender === 'user' ? 'text-stone-800' : 'text-stone-500'
                }`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              </div>
              <div className="bg-stone-900 text-stone-400 rounded-2xl rounded-tl-none px-4 py-3 text-xs sm:text-sm border border-stone-850 shadow-md">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce delay-150" />
                  <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce delay-300" />
                  <span className="text-[10px] font-mono tracking-widest uppercase ml-1">Drafting customized advice...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Suggestions Block */}
        {messages.length === 1 && (
          <div className="p-4 bg-stone-950 border-t border-stone-850 space-y-2">
            <span className="text-[9px] uppercase font-mono tracking-widest text-stone-500 flex items-center gap-1.5 pl-1">
              <HelpCircle className="w-3.5 h-3.5" /> Frequent Design Inquiries
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.label)}
                  className="bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/30 p-2.5 rounded-xl text-left text-stone-300 hover:text-amber-200 text-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-sm">{q.icon}</span>
                  <span className="line-clamp-1">{q.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar Form */}
        <div className="p-4 bg-stone-900 border-t border-stone-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about custom gold weight, bridal matching, diamond clarity..."
              disabled={isLoading}
              className="flex-grow bg-stone-950 border border-stone-850 hover:border-amber-500/30 focus:border-amber-400 focus:outline-none text-stone-100 text-xs sm:text-sm p-3 rounded-xl transition-all font-sans"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-amber-500 hover:bg-amber-400 disabled:bg-stone-800 text-stone-950 disabled:text-stone-500 p-3 rounded-xl font-semibold transition-all flex items-center justify-center cursor-pointer"
              id="send-message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <p className="text-[9px] text-stone-600 font-mono text-center mt-2 flex items-center justify-center gap-1 uppercase">
            <Shield className="w-3 h-3 text-stone-600" /> Consultations are virtual. Pure gold testing & orders final on store visit.
          </p>
        </div>
      </div>
    </div>
  );
}
