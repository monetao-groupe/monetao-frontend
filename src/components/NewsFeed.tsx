'use client';

import { useState } from 'react';

// Mock data - replace with real data from your API
const mockNews = [
  {
    id: 1,
    title: 'Apple Reports Record Q2 Earnings',
    summary: 'Apple exceeded analyst expectations with strong iPhone sales and services growth. The company reported a 12% increase in revenue.',
    source: 'Bloomberg',
    time: '2h ago',
    importance: 'high',
    keywords: ['earnings', 'iPhone', 'revenue'],
  },
  {
    id: 2,
    title: 'Bitcoin ETF Approval Expected This Week',
    summary: 'Regulators are likely to approve the first spot Bitcoin ETF, potentially opening the door for institutional investment.',
    source: 'CNBC',
    time: '4h ago',
    importance: 'medium',
    keywords: ['crypto', 'ETF', 'regulation'],
  },
  {
    id: 3,
    title: 'Federal Reserve Holds Interest Rates Steady',
    summary: 'The Fed maintained current interest rates, signaling a cautious approach to monetary policy amid economic uncertainty.',
    source: 'Reuters',
    time: '6h ago',
    importance: 'high',
    keywords: ['Fed', 'interest rates', 'economy'],
  },
];

const tabs = ['All', 'Important', 'Watchlist'];

export default function NewsFeed() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 text-sm rounded-full ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* News Items */}
      <div className="space-y-4">
        {mockNews.map((news) => (
          <div
            key={news.id}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{news.title}</h3>
              {news.importance === 'high' && (
                <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">
                  Important
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-2">{news.summary}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{news.source}</span>
              <span>{news.time}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {news.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 