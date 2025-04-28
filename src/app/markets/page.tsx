'use client';

export default function <MarketsPage>() {
  return (
    <div className="p-6">
      {/* Market Indices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm text-gray-500">S&P 500</h3>
          <p className="text-2xl font-bold text-gray-900">4,567.89</p>
          <p className="text-sm text-green-600">+1.2%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm text-gray-500">NASDAQ</h3>
          <p className="text-2xl font-bold text-gray-900">14,256.34</p>
          <p className="text-sm text-green-600">+0.8%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm text-gray-500">Dow Jones</h3>
          <p className="text-2xl font-bold text-gray-900">34,567.89</p>
          <p className="text-sm text-green-600">+0.5%</p>
        </div>
      </div>

      {/* Top Movers */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Movers</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-medium">AAPL</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Apple Inc.</p>
                <p className="text-xs text-gray-500">Technology</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">$175.34</p>
              <p className="text-sm text-green-600">+5.2%</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 font-medium">TSLA</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Tesla Inc.</p>
                <p className="text-xs text-gray-500">Automotive</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">$245.67</p>
              <p className="text-sm text-red-600">-2.1%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Market News */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Market News</h2>
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-sm font-medium text-gray-900">Tech Stocks Rally as AI Boom Continues</h3>
            <p className="text-sm text-gray-500 mt-1">Major tech companies report strong earnings driven by AI investments...</p>
            <span className="text-xs text-gray-400">2 hours ago</span>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-sm font-medium text-gray-900">Federal Reserve Holds Interest Rates Steady</h3>
            <p className="text-sm text-gray-500 mt-1">Central bank maintains current rates amid stable inflation...</p>
            <span className="text-xs text-gray-400">4 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
} 