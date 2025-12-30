
import React, { useState } from 'react';
import { askStudyBuddy } from '../services/geminiService';
import { Send, MessageCircle, X } from 'lucide-react';

interface AIConsultantProps {
  courseContext?: string;
}

const AIConsultant: React.FC<AIConsultantProps> = ({ courseContext = "General Studies" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hoot hoot! I'm DuoVU. Need help with your lectures or assignments? Ask away!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const botResponse = await askStudyBuddy(userMsg, courseContext);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse || "I missed that! Try again?" }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-16 h-16 bg-[#58CC02] rounded-full shadow-2xl duo-button border-b-[#46A302] flex items-center justify-center text-white z-50 hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-28 md:right-8 md:w-96 md:h-[600px] bg-white md:rounded-3xl shadow-2xl flex flex-col z-[60] border-2 border-gray-200 overflow-hidden animate-in slide-in-from-bottom duration-300">
          <div className="p-4 bg-[#58CC02] text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#58CC02] font-black">VU</span>
              </div>
              <span className="font-black text-lg">DuoVU Helper</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X className="w-6 h-6" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl font-bold ${
                  m.role === 'user' 
                    ? 'bg-[#1CB0F6] text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none border-2 border-gray-200'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-4 rounded-2xl animate-pulse font-black text-gray-400">...</div>
              </div>
            )}
          </div>

          <div className="p-4 border-t-2 border-gray-100 bg-gray-50 flex space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 p-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#58CC02] font-bold"
            />
            <button 
              onClick={handleSend}
              className="p-3 bg-[#58CC02] text-white rounded-xl duo-button border-b-[#46A302]"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIConsultant;
