'use client';

import PortfolioChart from '@/components/PortfolioChart';
import PortfolioBreakdown from '@/components/PortfolioBreakdown';
import NewsFeed from '@/components/NewsFeed';
import FinancialCalendar from '@/components/FinancialCalendar';
import AIChat from '@/components/AIChat';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Portfolio Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Portfolio Overview</h2>
            <PortfolioChart timeRange="1M" />
          </div>

          {/* Portfolio Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Portfolio Breakdown</h2>
            <PortfolioBreakdown />
          </div>

          {/* News Feed */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Market News</h2>
            <NewsFeed />
          </div>

          {/* Financial Calendar */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Calendar</h2>
            <FinancialCalendar />
          </div>

          {/* AI Assistant */}
          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Assistant</h2>
            <AIChat />
          </div>
        </div>
      </div>
    </div>
  );
}
