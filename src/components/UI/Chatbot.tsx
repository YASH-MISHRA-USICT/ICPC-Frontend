import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { apiService } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function Chatbot(): JSX.Element {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!user) return <></>;

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;
    const userQuestion = inputText.trim();
    setInputText('');
    addMessage(userQuestion, true);
    try {
      setIsLoading(true);
      const response = await apiService.chatbot(userQuestion);
      if (response.success && response.data?.answer) {
        addMessage(response.data.answer, false);
      } else {
        addMessage('Sorry, I encountered an error. Please try again.', false);
      }
    } catch (error) {
      addMessage('Sorry, I\'m having trouble connecting. Please try again later.', false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-xl hover:scale-110 transition-transform"
        aria-label="Open chatbot"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-[350px] max-w-[95vw] h-[500px] max-h-[90vh] flex flex-col rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
      style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-purple-700 text-white p-4 rounded-t-3xl flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5" />
          <span className="font-semibold tracking-wide">Innoverse Assistant</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200 transition-colors"
          aria-label="Close chatbot"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-transparent">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-300 py-8">
            <Bot className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p className="text-base font-medium">Hi! I'm your Innoverse assistant.</p>
            <p className="text-xs mt-1">Ask me about tracks, tasks, or anything else!</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} items-end`}
          >
            {!message.isUser && (
              <div className="flex-shrink-0 mr-2">
                <Bot className="w-7 h-7 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 rounded-full p-1 shadow" />
              </div>
            )}
            <div
              className={`px-4 py-2 rounded-2xl shadow-md text-base break-words transition-all duration-200 ${
                message.isUser
                  ? 'bg-blue-600 text-white rounded-br-md'
                  : 'bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 rounded-bl-md border border-gray-200 dark:border-gray-700'
              }`}
              style={{
                maxWidth: '80%',
                wordBreak: 'break-word',
                animation: 'fadeIn 0.2s',
              }}
            >
              <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</div>
            </div>
            {message.isUser && (
              <div className="flex-shrink-0 ml-2">
                <User className="w-7 h-7 text-blue-600 bg-white rounded-full p-1 shadow" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start items-end">
            <div className="bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md max-w-[80%]">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-b-3xl">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-gray-100 text-base shadow-sm"
            disabled={isLoading}
            style={{ backdropFilter: 'blur(4px)' }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}