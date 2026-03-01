import React from 'react';
import { Home, Search, Bookmark, ShoppingBag, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../utils/cn';

export function BottomNav() {
  const navItems = [
    { to: '/', icon: Home, label: 'Beranda' },
    { to: '/search', icon: Search, label: 'Cari' },
    { to: '/saved', icon: Bookmark, label: 'Simpan' },
    { to: '/shopping', icon: ShoppingBag, label: 'Belanja' },
    { to: '/profile', icon: User, label: 'Profil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center w-full h-full space-y-1 text-xs font-medium transition-colors',
                  isActive ? 'text-orange-600' : 'text-stone-500 hover:text-stone-900'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={cn('w-6 h-6', isActive && 'fill-orange-100')} strokeWidth={isActive ? 2.5 : 2} />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
