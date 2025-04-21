'use client';

import { useState } from 'react';

// Mock data - replace with real data from your API
const mockEvents = [
  {
    id: 1,
    date: '2024-04-25',
    type: 'earnings',
    company: 'Apple Inc.',
    ticker: 'AAPL',
    time: 'After Market Close',
  },
  {
    id: 2,
    date: '2024-04-26',
    type: 'dividend',
    company: 'Microsoft',
    ticker: 'MSFT',
    amount: '$0.75',
  },
  {
    id: 3,
    date: '2024-04-27',
    type: 'insider',
    company: 'Tesla',
    ticker: 'TSLA',
    action: 'Sale',
    person: 'Elon Musk',
    shares: '10,000',
  },
];

const eventTypes = {
  earnings: {
    label: 'Earnings',
    color: 'bg-blue-100 text-blue-600',
  },
  dividend: {
    label: 'Dividend',
    color: 'bg-green-100 text-green-600',
  },
  insider: {
    label: 'Insider',
    color: 'bg-purple-100 text-purple-600',
  },
};

export default function FinancialCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h3 className="font-medium text-gray-900">
          {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {mockEvents.map((event) => (
          <div
            key={event.id}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      eventTypes[event.type as keyof typeof eventTypes].color
                    }`}
                  >
                    {eventTypes[event.type as keyof typeof eventTypes].label}
                  </span>
                  <span className="text-sm text-gray-500">{event.date}</span>
                </div>
                <h3 className="font-medium text-gray-900 mt-2">
                  {event.company} ({event.ticker})
                </h3>
                {event.type === 'earnings' && (
                  <p className="text-sm text-gray-600">{event.time}</p>
                )}
                {event.type === 'dividend' && (
                  <p className="text-sm text-gray-600">Amount: {event.amount}</p>
                )}
                {event.type === 'insider' && (
                  <p className="text-sm text-gray-600">
                    {event.person} - {event.action} of {event.shares} shares
                  </p>
                )}
              </div>
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 