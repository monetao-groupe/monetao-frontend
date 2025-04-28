'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-white hover:text-blue-100 transition-colors duration-200">
            Monetao
          </Link>
        </div>
      </div>
    </header>
  );
} 