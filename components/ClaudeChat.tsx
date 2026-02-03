import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ClaudeChatProps {
  lang: Language;
}

const REQUEST_TIMEOUT_MS = 25000;

export const ClaudeChat: React.FC<ClaudeChatProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: lang === 'pt' 
        ? 'Olá! Sou o assistente virtual do Lucas Lima. Como posso ajudá-lo hoje?'
        : 'Hello! I\'m Lucas Lima\'s virtual assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[lang].chat;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller
      ? window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
      : null;

    try {
      // Chamada para API backend que usa a API key do Claude
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      };

      if (controller) {
        requestOptions.signal = controller.signal;
      }

      const response = await fetch('/api/claude-chat', requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content || t.error
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error:', error);
      
      // Mensagens de erro mais específicas
      let errorMessage = t.error;
      const normalizedMessage =
        typeof error?.message === 'string' ? error.message.toLowerCase() : '';
      
      if (error?.name === 'AbortError' || normalizedMessage.includes('stalled') || normalizedMessage.includes('timeout')) {
        errorMessage = t.timeout;
      } else if (error.message?.includes('API key not configured')) {
        errorMessage = '⚠️ API Key não configurada. Configure a variável ANTHROPIC_API_KEY no Vercel.';
      } else if (error.message?.includes('authentication')) {
        errorMessage = '⚠️ Erro de autenticação. Verifique sua API Key no Vercel.';
      } else if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        errorMessage = '⚠️ Erro de conexão. Verifique se a API route está configurada corretamente.';
      } else if (error.message) {
        errorMessage = `⚠️ Erro: ${error.message}`;
      }
      
      const errorMsg: Message = {
        role: 'assistant',
        content: errorMessage
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Botão Flutuante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 bg-black text-white rounded-full p-4 shadow-lg hover:bg-gray-800 transition-all duration-300 hover:scale-110"
          aria-label={t.open}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-96 h-[600px] bg-white shadow-2xl rounded-lg flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-black text-white p-4 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-bold text-sm uppercase tracking-wider">{t.title}</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:opacity-70 transition-opacity"
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-black'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.placeholder}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-black resize-none"
                rows={2}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={t.send}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">{t.disclaimer}</p>
          </div>
        </div>
      )}
    </>
  );
};
