import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Sou o Volpi AI, seu assistente especialista em consórcios. Como posso ajudar você a planejar seu próximo patrimônio hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, { role: 'user', content: userMessage }].map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: "Você é o assistente virtual da Volpi Consultoria. Seu nome é Volpi AI. Você é um especialista sofisticado em consórcios de imóveis, veículos e investimentos de alto padrão. Seja profissional, elegante, educado e prestativo. Use o português do Brasil. Seu objetivo é tirar dúvidas sobre o funcionamento do consórcio, parcelas, lances e contemplação. Sempre mencione que Felipe Volpi é o consultor responsável para análises detalhadas.",
          temperature: 0.7,
        },
      });

      const aiText = response.text || "Desculpe, tive um problema ao processar sua resposta. Tente novamente.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Estou passando por uma manutenção momentânea. Que tal falar diretamente com o Felipe Volpi pelo WhatsApp?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-6 bg-bordeaux-950/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-bordeaux-900 border border-gold-500/30 w-full max-w-2xl h-[80vh] rounded-sm shadow-2xl flex flex-col relative">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gold-500/20 rounded-full">
              <Sparkles className="text-gold-500" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-serif font-black text-white uppercase tracking-tight">Volpi AI</h3>
              <p className="text-[9px] text-gold-500 font-black uppercase tracking-[0.2em]">Assistente Especialista</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-gold-500 text-bordeaux-950' : 'bg-white/10 text-gold-500'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-sm text-sm leading-relaxed ${msg.role === 'user' ? 'bg-gold-500 text-bordeaux-950 font-bold' : 'bg-white/5 text-white/80 border border-white/10'}`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-white/10 text-gold-500 flex items-center justify-center animate-pulse">
                    <Bot size={16} />
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gold-500/50 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gold-500/50 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-gold-500/50 rounded-full animate-bounce delay-150"></div>
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-white/5">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pergunte algo sobre consórcios..."
              className="w-full bg-bordeaux-950 border border-white/10 rounded-sm py-4 pl-4 pr-16 text-white text-sm outline-none focus:border-gold-500 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 px-4 bg-gold-500 text-bordeaux-950 rounded-sm disabled:opacity-50 hover:bg-gold-400 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};