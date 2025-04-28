'use client';

import PortfolioChart from '@/components/PortfolioChart';
import PortfolioBreakdown from '@/components/PortfolioBreakdown';

export default function PortfolioPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Portfolio</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Portfolio Chart */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance</h2>
            <PortfolioChart timeRange="1M" />
          </div>

          {/* Portfolio Breakdown */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Breakdown</h2>
            <PortfolioBreakdown />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
            <div className="space-y-4">
              <p className="text-gray-500">No recent transactions</p>
            </div>
          </div>

          {/* Asset Allocation */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h2>
            <div className="space-y-4">
              <p className="text-gray-500">Asset allocation data will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 