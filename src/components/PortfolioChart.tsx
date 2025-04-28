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
  AreaSeries,
  AreaData,
} from 'lightweight-charts';

const timeframes = ['1D', '1W', '1M', '6M', '1Y', 'All'];

const generateDailyData = () => {
  const data = [];
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-06-30');
  let currentValue = 10000;
  let totalInvested = 10000;
  let trend = 0.1;
  let lastInvestmentDate = new Date(startDate);
  
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    trend += (Math.random() - 0.4) * 0.1;
    trend = Math.max(Math.min(trend, 0.3), 0.05);
    
    const dailyChange = (Math.random() * 2 - 0.5) / 100 + trend / 100;
    currentValue = currentValue * (1 + dailyChange);
    
    if (date.getDate() <= 5 && date.getDate() > 1 && 
        (date.getMonth() !== lastInvestmentDate.getMonth() || 
         date.getFullYear() !== lastInvestmentDate.getFullYear())) {
      const investmentAmount = 1000;
      totalInvested += investmentAmount;
      lastInvestmentDate = new Date(date);
      
      if (currentValue < totalInvested * 1.05) {
        currentValue = totalInvested * (1.05 + Math.random() * 0.05);
      }
    }
    
    currentValue = Math.max(currentValue, totalInvested * 1.02);
    
    const high = currentValue * (1 + Math.random() * 0.005);
    const low = currentValue * (1 - Math.random() * 0.005);
    
    const timestamp = Math.floor(date.getTime() / 1000) as UTCTimestamp;
    
    data.push({
      time: timestamp,
      open: currentValue,
      high: high,
      low: low,
      close: currentValue,
      volume: Math.floor(10000 + Math.random() * 5000),
      totalInvested: totalInvested
    });
  }
  
  return data;
};

const mockData = generateDailyData();

interface PortfolioChartProps {
  timeRange: string;
}

export default function PortfolioChart({ timeRange }: PortfolioChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const chartRef = useRef<IChartApi | null>(null);
  const portfolioSeriesRef = useRef<ISeriesApi<'Area'> | null>(null);
  const investedSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const [currentValue, setCurrentValue] = useState<number>(0);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartContainerRef.current.innerHTML = '';

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#0a0a0a' },
        textColor: '#ededed',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0)' },
        horzLines: { color: 'rgba(255, 255, 255, 0)' },
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        scaleMargins: {
          top: 0.2,
          bottom: 0.2,
        },
        mode: 1,
        autoScale: true,
        alignLabels: true,
        borderVisible: false,
        ticksVisible: false,
        minimumWidth: 80,
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time: number) => {
          const date = new Date(time * 1000);
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        },
        fixLeftEdge: true,
        fixRightEdge: true,
        minBarSpacing: 0.5,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    const portfolioSeries = chart.addSeries(AreaSeries, {
      lineColor: '#3b82f6',
      lineWidth: 2,
      lastValueVisible: false,
      title: '',
      visible: true,
      priceLineVisible: true,
      priceLineColor: 'rgba(255, 255, 255, 0.1)',
      priceLineWidth: 1,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 6,
      crosshairMarkerBorderColor: '#3b82f6',
      crosshairMarkerBackgroundColor: '#0a0a0a',
      topColor: 'rgba(59, 130, 246, 0.4)',
      bottomColor: 'rgba(59, 130, 246, 0.0)',
      priceFormat: {
        type: 'price',
        precision: 0,
        minMove: 1,
      },
    });

    const investedSeries = chart.addSeries(LineSeries, {
      color: '#a3a3a3',
      lineWidth: 2,
      lastValueVisible: false,
      title: '',
      visible: true,
      priceLineVisible: true,
      priceLineColor: 'rgba(255, 255, 255, 0.1)',
      priceLineWidth: 1,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 6,
      crosshairMarkerBorderColor: '#a3a3a3',
      crosshairMarkerBackgroundColor: '#0a0a0a',
      lineStyle: 2,
    });

    portfolioSeries.setData(mockData.map(d => ({
      time: d.time as Time,
      value: d.close,
    })) as LineData[]);

    investedSeries.setData(mockData.map(d => ({
      time: d.time as Time,
      value: d.totalInvested,
    })) as LineData[]);

    const lastDataPoint = mockData[mockData.length - 1];
    setCurrentValue(lastDataPoint.close);

    chartRef.current = chart;
    portfolioSeriesRef.current = portfolioSeries as ISeriesApi<'Area'>;
    investedSeriesRef.current = investedSeries as ISeriesApi<'Line'>;

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
    <div className="w-full bg-[#0a0a0a] rounded-lg shadow-sm p-4">
      <div className="flex flex-col space-y-3">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <h2 className="text-sm font-medium text-[#a3a3a3]">Portfolio Value</h2>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-[#ededed] font-mono tracking-tight">
                  ${currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-sm text-[#2BB970] font-bold">+12.5%</span>
              </div>
            </div>
            <div className="flex space-x-1">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-2 py-0.5 text-xs rounded-full transition-colors duration-200 ${
                    selectedTimeframe === timeframe
                      ? 'bg-[#3b82f6] text-white shadow-sm'
                      : 'bg-[#171717] text-[#a3a3a3] hover:bg-[#262626]'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div ref={chartContainerRef} className="h-[300px] w-full" />
          
          {!chartRef.current && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] bg-opacity-80">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b82f6]"></div>
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-6 mt-1">
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]"></div>
            <span className="text-xs text-[#a3a3a3]">Portfolio Value</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#a3a3a3]"></div>
            <span className="text-xs text-[#a3a3a3]">Total Invested</span>
          </div>
        </div>
      </div>
    </div>
  );
}
