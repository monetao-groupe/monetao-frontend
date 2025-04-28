'use client';

import { useState, useRef, useEffect } from 'react';

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStock: (stock: {
    symbol: string;
    name: string;
    price: number;
    quantity: number;
    totalAmount: number;
    date: string;
  }) => void;
}

const mockStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { symbol: 'V', name: 'Visa Inc.' },
  { symbol: 'WMT', name: 'Walmart Inc.' },
];

export default function AddStockModal({ isOpen, onClose, onAddStock }: AddStockModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<{ symbol: string; name: string } | null>(null);
  const [price, setPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const resetForm = () => {
    setSearchTerm('');
    setSelectedStock(null);
    setPrice('');
    setQuantity('');
    setDate(new Date().toISOString().split('T')[0]);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const filteredStocks = mockStocks.filter(stock => 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockSelect = (stock: { symbol: string; name: string }) => {
    setSelectedStock(stock);
    setSearchTerm(stock.name);
    setShowDropdown(false);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and one decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow whole numbers
    if (/^\d*$/.test(value)) {
      setQuantity(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStock || !price || !quantity) return;

    const priceNum = parseFloat(price);
    const quantityNum = parseInt(quantity);

    if (priceNum <= 0 || quantityNum <= 0) {
      return;
    }

    const totalAmount = priceNum * quantityNum;
    onAddStock({
      symbol: selectedStock.symbol,
      name: selectedStock.name,
      price: priceNum,
      quantity: quantityNum,
      totalAmount,
      date,
    });
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Add New Stock</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Stock Selection */}
          <div ref={dropdownRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                placeholder="Search for a stock..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                  if (!e.target.value) {
                    setSelectedStock(null);
                  }
                }}
                onFocus={() => setShowDropdown(true)}
              />
              {selectedStock && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-sm font-medium text-black">{selectedStock.symbol}</span>
                </div>
              )}
            </div>
            {showDropdown && searchTerm && (
              <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                <div className="max-h-40 overflow-y-auto">
                  {filteredStocks.length > 0 ? (
                    filteredStocks.map((stock) => (
                      <div
                        key={stock.symbol}
                        className={`px-3 py-2 hover:bg-blue-50 cursor-pointer ${
                          selectedStock?.symbol === stock.symbol ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => handleStockSelect(stock)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-black">{stock.name}</div>
                            <div className="text-sm text-black">{stock.symbol}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-black text-center">
                      No stocks found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Purchase Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purchase Price ($)
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={price}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              required
              min="0.01"
              step="0.01"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              required
              min="1"
            />
          </div>

          {/* Purchase Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purchase Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          {/* Total Amount (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Amount
            </label>
            <input
              type="text"
              value={price && quantity ? `$${(parseFloat(price) * parseFloat(quantity)).toFixed(2)}` : ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-medium text-black"
              readOnly
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Add Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 