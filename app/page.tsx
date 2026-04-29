'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { MainLayout } from '@/components/layout/main-layout';
import { DashboardTab } from '@/components/dashboard/dashboard-tab';
import { CenterRegistrationTab } from '@/components/training-center/center-registration-tab';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'training-center'>('dashboard');

  return (
    <>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <MainLayout>
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'training-center' && <CenterRegistrationTab />}
      </MainLayout>
    </>
  );
}
