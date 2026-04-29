'use client';

import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="md:ml-64 min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Main content area with padding */}
      <main className="p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
