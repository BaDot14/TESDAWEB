'use client';

import Image from 'next/image';
import { BarChart3, Building2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeTab: 'dashboard' | 'training-center';
  onTabChange: (tab: 'dashboard' | 'training-center') => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
    },
    {
      id: 'training-center',
      label: 'Training Centers',
      icon: Building2,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo / Branding */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Image
              src="/tesda-logo.png"
              alt="TESDA Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
/>
          <div>
            <h1 className="text-white font-bold text-lg">TESDA</h1>
            <p className="text-white/60 text-xs">Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id as 'dashboard' | 'training-center');
                setIsMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/10">
        <p className="text-white/50 text-xs text-center">
          © 2024 TESDA Management System
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white/10 hover:bg-white/20 text-white"
        >
          {isMobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 w-64 h-screen text-white border-r border-white/10"
        style={{
          background: 'linear-gradient(180deg, #5b64ff, #4855d8)',
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 w-64 h-screen text-white transform transition-transform z-40 md:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(180deg, #5b64ff, #4855d8)',
        }}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
