'use client';

// Mock data - replace with real data from your API
const mockAssets = [
  {
    name: 'Apple Inc.',
    ticker: 'AAPL',
    allocation: 25,
    price: 175.34,
    change: 1.2,
    value: 25000,
    type: 'stock',
  },
  {
    name: 'Bitcoin',
    ticker: 'BTC',
    allocation: 15,
    price: 65000,
    change: -0.8,
    value: 15000,
    type: 'crypto',
  },
  {
    name: 'SPDR S&P 500',
    ticker: 'SPY',
    allocation: 40,
    price: 520.45,
    change: 0.5,
    value: 40000,
    type: 'etf',
  },
  {
    name: 'Gold',
    ticker: 'XAU',
    allocation: 20,
    price: 2300,
    change: 0.3,
    value: 20000,
    type: 'commodity',
  },
];

export default function PortfolioBreakdown() {
  return (
    <div className="space-y-4">
      {mockAssets.map((asset) => (
        <div
          key={asset.ticker}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">
                {asset.ticker[0]}
              </span>
            </div>
            <div>
              <div className="font-medium text-gray-900">{asset.name}</div>
              <div className="text-sm text-gray-500">{asset.ticker}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium text-gray-900">
              ${asset.price.toLocaleString()}
            </div>
            <div
              className={`text-sm ${
                asset.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {asset.change >= 0 ? '+' : ''}
              {asset.change}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 