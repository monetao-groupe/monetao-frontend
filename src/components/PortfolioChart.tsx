'use client';

import { useEffect, useRef, useState } from 'react';
import {
  createChart,
  ColorType,
  UTCTimestamp,
  CandlestickSeries,
  HistogramSeries,
  IChartApi,
  ISeriesApi,
  LineSeriesOptions,
  HistogramSeriesOptions,
  LineData,
  HistogramData,
  Time,
  SeriesOptionsCommon,
  LineSeries,
} from 'lightweight-charts';

const timeframes = ['1D', '1W', '1M', '6M', '1Y', 'All'];

const mockData = [
  { time: '2024-01-01', open: 100, high: 105, low: 98, close: 102, volume: 1000 },
  { time: '2024-01-02', open: 102, high: 108, low: 101, close: 106, volume: 1200 },
  { time: '2024-01-03', open: 106, high: 110, low: 104, close: 108, volume: 1500 },
  { time: '2024-01-04', open: 108, high: 112, low: 106, close: 110, volume: 1300 },
  { time: '2024-01-05', open: 110, high: 115, low: 108, close: 112, volume: 1400 },
];

export default function PortfolioChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const chartRef = useRef<IChartApi | null>(null);
  const lineSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Clear any previous content
    chartContainerRef.current.innerHTML = '';

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'white' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    // Create line series
    const lineSeries = chart.addSeries(LineSeries, {
      color: '#26a69a',
      lineWidth: 2,
      lastValueVisible: true,
      title: 'Portfolio Value',
      visible: true,
      priceLineVisible: true,
    });

    // Set the data
    lineSeries.setData(mockData.map(d => ({
      time: d.time as Time,
      value: d.close,
    })) as LineData[]);

    // Store references
    chartRef.current = chart;
    lineSeriesRef.current = lineSeries as ISeriesApi<'Line'>;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [selectedTimeframe]);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Portfolio Performance</h2>
          <div className="flex space-x-2">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                  selectedTimeframe === timeframe
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Container */}
        <div className="relative">
          <div ref={chartContainerRef} className="h-[400px] w-full" />
          
          {/* Loading State */}
          {!chartRef.current && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#26a69a]"></div>
            <span className="text-gray-600">Portfolio Value</span>
          </div>
        </div>
      </div>
    </div>
  );
}
