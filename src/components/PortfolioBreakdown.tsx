'use client';

import { useState } from 'react';
import AddStockModal from './AddStockModal';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  quantity?: number;
  totalAmount?: number;
  purchaseDate?: string;
}

const mockStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 175.34, change: 2.5 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 420.72, change: -1.2 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 156.28, change: 0.8 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 185.71, change: 1.5 },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 502.30, change: -0.7 },
];

export default function PortfolioBreakdown() {
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddStock = (newStock: {
    symbol: string;
    name: string;
    price: number;
    quantity: number;
    totalAmount: number;
    date: string;
  }) => {
    setStocks(prev => [...prev, {
      symbol: newStock.symbol,
      name: newStock.name,
      price: newStock.price,
      change: 0, // You might want to fetch this from an API
      quantity: newStock.quantity,
      totalAmount: newStock.totalAmount,
      purchaseDate: newStock.date,
    }]);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Portfolio Breakdown</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Stock
          </button>
          <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Filter
          </button>
        </div>
      </div>

      {/* Stocks List */}
      <div className="space-y-4">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {stock.symbol[0]}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900">{stock.name}</div>
                <div className="text-sm text-gray-500">{stock.symbol}</div>
                {stock.purchaseDate && (
                  <div className="text-xs text-gray-400">
                    Purchased: {new Date(stock.purchaseDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">
                ${stock.price.toLocaleString()}
              </div>
              <div className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stock.change >= 0 ? '+' : ''}{stock.change}%
              </div>
              {stock.quantity && (
                <div className="text-xs text-gray-500">
                  {stock.quantity} shares
                </div>
              )}
              {stock.totalAmount && (
                <div className="text-xs text-gray-500">
                  Total: ${stock.totalAmount.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Stock Modal */}
      <AddStockModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddStock={handleAddStock}
      />
    </div>
  );
} 