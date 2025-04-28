'use client';

import { useState } from 'react';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const handleDateSelect = (day: number) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="p-6 bg-gray-50">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">{formatMonthYear(currentDate)}</h1>
          <div className="flex space-x-2">
            <button 
              onClick={handlePrevMonth}
              className="p-2 bg-white rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNextMonth}
              className="p-2 bg-white rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <button 
          onClick={handleToday}
          className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Today
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
          <div className="grid grid-cols-7 gap-1">
            {/* Week Days */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {Array.from({ length: 42 }, (_, i) => {
              const day = i - startingDay + 1;
              const isCurrentMonth = day > 0 && day <= daysInMonth;
              const today = new Date();
              const isToday = isCurrentMonth && isSameDay(
                new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
                today
              );
              const isSelected = selectedDate && isCurrentMonth && isSameDay(
                new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
                selectedDate
              );
              
              return (
                <div
                  key={i}
                  onClick={() => isCurrentMonth && handleDateSelect(day)}
                  className={`p-1 h-14 border rounded-lg cursor-pointer flex flex-col ${
                    isCurrentMonth
                      ? 'border-gray-200 hover:border-blue-500'
                      : 'border-gray-100 text-gray-400'
                  } ${isToday ? 'bg-blue-50 border-blue-500' : ''} ${
                    isSelected ? 'bg-blue-100 border-blue-500' : ''
                  }`}
                >
                  <span className={`text-xs ${
                    isToday ? 'font-bold text-blue-600' : 
                    isSelected ? 'font-bold text-blue-600' : 
                    'text-gray-700'
                  }`}>
                    {isCurrentMonth ? day : ''}
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    {isCurrentMonth && day === 15 && (
                      <div className="text-[10px] bg-red-100 text-red-600 rounded px-1 truncate">
                        Earnings
                      </div>
                    )}
                    {isCurrentMonth && day === 20 && (
                      <div className="text-[10px] bg-green-100 text-green-600 rounded px-1 truncate">
                        Dividend
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Info */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedDate 
              ? selectedDate.toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
              : 'Select a date to view details'}
          </h2>
          <div className="space-y-4">
            {selectedDate ? (
              <>
                {selectedDate.getDate() === 15 && (
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-red-600 font-medium">15</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">AAPL Earnings Report</h3>
                      <p className="text-xs text-gray-500">Q4 2023 Earnings Release</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm text-gray-900">2:00 PM EST</p>
                      <p className="text-xs text-gray-500">Conference Call</p>
                    </div>
                  </div>
                )}
                {selectedDate.getDate() === 20 && (
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-medium">20</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">MSFT Dividend Payment</h3>
                      <p className="text-xs text-gray-500">Quarterly Dividend</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm text-gray-900">9:00 AM EST</p>
                      <p className="text-xs text-gray-500">$0.68 per share</p>
                    </div>
                  </div>
                )}
                {selectedDate.getDate() !== 15 && selectedDate.getDate() !== 20 && (
                  <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">No events scheduled for this date</p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Select a date to view its events</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 font-medium">15</span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">AAPL Earnings Report</h3>
              <p className="text-xs text-gray-500">Q4 2023 Earnings Release</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-sm text-gray-900">2:00 PM EST</p>
              <p className="text-xs text-gray-500">Conference Call</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-medium">20</span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">MSFT Dividend Payment</h3>
              <p className="text-xs text-gray-500">Quarterly Dividend</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-sm text-gray-900">9:00 AM EST</p>
              <p className="text-xs text-gray-500">$0.68 per share</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 