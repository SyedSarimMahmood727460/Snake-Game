'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/play', label: 'Play' },
    { path: '/settings', label: 'Settings' },
    { path: '/leaderboard', label: 'Leaderboard' },
  ];
  
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-2xl font-bold">🐍 Snake Game</h1>
          <nav className="flex gap-6">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                href={path}
                className={`hover:text-green-200 transition-colors ${
                  pathname === path ? 'text-green-200 font-semibold' : ''
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};