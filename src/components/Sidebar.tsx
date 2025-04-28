'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navigationItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/portfolio',
    label: 'Portfolio',
    icon: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    href: '/markets',
    label: 'Markets',
    icon: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    href: '/calendar',
    label: 'Calendar',
    icon: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: '/ai-assistant',
    label: 'AI Assistant',
    icon: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

interface QuickStat {
  label: string;
  value: string;
  color?: string;
}

const quickStats: QuickStat[] = [
  { label: 'Total Portfolio Value', value: '$125,000' },
  { label: "Today's Change", value: '+$2,500', color: 'text-green-600' },
  { label: 'Market Status', value: 'Open', color: 'text-green-600' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-4">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Monetao
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="mt-8">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
              isActive(item.href) ? 'bg-gray-100' : ''
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Quick Stats */}
      <div className="mt-8 px-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Quick Stats
        </h3>
        <div className="mt-4 space-y-4">
          {quickStats.map((stat, index) => (
            <div key={index}>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className={`text-lg font-semibold ${stat.color || 'text-gray-900'}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">NE</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Nizar El Khalili</p>
            <p className="text-xs text-gray-500">Premium Member</p>
          </div>
        </div>
      </div>
    </div>
  );
} 