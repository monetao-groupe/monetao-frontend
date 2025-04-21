import PortfolioChart from '@/components/PortfolioChart';
import PortfolioBreakdown from '@/components/PortfolioBreakdown';
import NewsFeed from '@/components/NewsFeed';
import FinancialCalendar from '@/components/FinancialCalendar';
import AIChat from '@/components/AIChat';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Monetao</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Portfolio Chart */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance</h2>
              <PortfolioChart />
            </div>

            {/* News Feed */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Market News</h2>
              <NewsFeed />
            </div>

            {/* Financial Calendar */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Financial Calendar</h2>
              <FinancialCalendar />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Portfolio Breakdown */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Breakdown</h2>
              <PortfolioBreakdown />
            </div>

            {/* AI Assistant */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Assistant</h2>
              <AIChat />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
