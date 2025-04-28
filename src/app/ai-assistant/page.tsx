'use client';

import { useState } from 'react';

export default function AIAssistantPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m your AI financial assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date().toISOString(),
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: message,
        sender: 'user',
        timestamp: new Date().toISOString(),
      },
    ]);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: 'I\'m analyzing your request. Here\'s what I found...',
          sender: 'ai',
          timestamp: new Date().toISOString(),
        },
      ]);
    }, 1000);

    setMessage('');
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">AI Assistant</h1>

        {/* Chat Container */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="h-[400px] overflow-y-auto mb-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything about your portfolio..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </form>
        </div>

        {/* Suggested Questions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Suggested Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setMessage('What\'s my portfolio performance this month?')}
              className="p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100"
            >
              <p className="text-sm font-medium text-gray-900">Portfolio Performance</p>
              <p className="text-xs text-gray-500">Get insights about your portfolio's performance</p>
            </button>
            <button
              onClick={() => setMessage('What are the best stocks to buy right now?')}
              className="p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100"
            >
              <p className="text-sm font-medium text-gray-900">Stock Recommendations</p>
              <p className="text-xs text-gray-500">Get personalized stock recommendations</p>
            </button>
            <button
              onClick={() => setMessage('How can I diversify my portfolio?')}
              className="p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100"
            >
              <p className="text-sm font-medium text-gray-900">Portfolio Diversification</p>
              <p className="text-xs text-gray-500">Learn how to better diversify your investments</p>
            </button>
            <button
              onClick={() => setMessage('What are the upcoming earnings reports?')}
              className="p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100"
            >
              <p className="text-sm font-medium text-gray-900">Earnings Calendar</p>
              <p className="text-xs text-gray-500">Check upcoming earnings reports</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 