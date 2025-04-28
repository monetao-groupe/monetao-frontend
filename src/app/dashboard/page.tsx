'use client';

import { useState } from 'react';
import PortfolioChart from '@/components/PortfolioChart';
import PortfolioBreakdown from '@/components/PortfolioBreakdown';

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('1M');

  return (
    <div className="p-6">
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Portfolio Performance</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setTimeRange('1W')}
                className={`px-3 py-1 rounded-md text-sm ${
                  timeRange === '1W' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                1W
              </button>
              <button
                onClick={() => setTimeRange('1M')}
                className={`px-3 py-1 rounded-md text-sm ${
                  timeRange === '1M' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                1M
              </button>
              <button
                onClick={() => setTimeRange('1Y')}
                className={`px-3 py-1 rounded-md text-sm ${
                  timeRange === '1Y' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                1Y
              </button>
            </div>
          </div>
          <PortfolioChart timeRange={timeRange} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Breakdown</h2>
          <PortfolioBreakdown />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Bought AAPL</p>
                <p className="text-xs text-gray-500">10 shares at $175.00</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Sold MSFT</p>
                <p className="text-xs text-gray-500">5 shares at $320.00</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
} 