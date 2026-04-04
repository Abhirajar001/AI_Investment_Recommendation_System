import { Send, Bot, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../../types';

export function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'ai',
      text: 'Hello! I\'m your AI Investment Assistant. How can I help you today?',
      time: '10:30 AM'
    },
    {
      type: 'user',
      text: 'Which stocks are good for low risk investment?',
      time: '10:31 AM'
    },
    {
      type: 'ai',
      text: 'For low-risk investments, I recommend considering blue-chip stocks and index funds. Here are some options:\n\n1. **Apple (AAPL)** - Stable tech giant with consistent growth\n2. **Microsoft (MSFT)** - Strong fundamentals and dividend payer\n3. **Vanguard S&P 500 ETF (VOO)** - Diversified exposure to 500 large companies\n4. **Johnson & Johnson (JNJ)** - Defensive healthcare stock\n\nWould you like more details on any of these?',
      time: '10:31 AM'
    },
    {
      type: 'user',
      text: 'Tell me more about Vanguard S&P 500 ETF',
      time: '10:32 AM'
    },
    {
      type: 'ai',
      text: 'Great choice! The Vanguard S&P 500 ETF (VOO) is an excellent low-risk option:\n\n**Key Features:**\n• Expense Ratio: 0.03% (very low)\n• Tracks the S&P 500 Index\n• Diversified across 500 large US companies\n• Historical average return: ~10% annually\n\n**Why it\'s low-risk:**\n✓ Broad diversification reduces individual stock risk\n✓ Backed by established companies\n✓ Long-term growth potential\n\nCurrent price: $420.15\nRecommended allocation: 20-30% of portfolio\n\nWould you like me to add this to your watchlist?',
      time: '10:32 AM'
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const suggestedQuestions = [
    'What is my risk profile?',
    'Show me trending stocks today',
    'Explain market volatility',
    'Best mutual funds for beginners',
  ];

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, {
        type: 'user',
        text: inputValue,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }]);
      setInputValue('');
      
      // Clear previous timeout if it exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Simulate AI response with cleanup
      timeoutRef.current = setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'ai',
          text: 'I understand your question. Let me analyze that for you...',
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1000);
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 overflow-auto flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">AI Investment Assistant</h2>
              <p className="text-gray-500 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Online - Ready to help
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div key={`message-${index}-${message.time}`} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-2xl ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-br from-purple-500 to-purple-600'
                }`}>
                  {message.type === 'user' ? <User className="text-white" size={20} /> : <Bot className="text-white" size={20} />}
                </div>
                
                {/* Message Bubble */}
                <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-5 py-3 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                      : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                  }`}>
                    <p className="whitespace-pre-line text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 px-2">{message.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="bg-white border-t border-gray-200 px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-600 mb-3">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                onClick={() => setInputValue(question)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about investments..."
              className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-full focus:border-blue-600 focus:outline-none transition-colors"
            />
            <button
              onClick={handleSend}
              className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            AI responses are for informational purposes only and should not be considered as financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
