'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { MainLayout } from '@/components/layout/main-layout';
import { DashboardTab } from '@/components/dashboard/dashboard-tab';
import { CenterRegistrationTab } from '@/components/training-center/center-registration-tab';
import { CenterDetailView } from '@/components/training-center/center-detail-view';
import { Activity } from '@/components/dashboard/mock-data';
import { CenterProgram, TrainingCenter, createMockTrainingCenterState } from '@/components/training-center/mock-data';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewingCenterId = searchParams.get('viewCenter');

  const [activeTab, setActiveTab] = useState<'dashboard' | 'training-center'>('dashboard');
  const [initialState] = useState(() => createMockTrainingCenterState());
  const [centers, setCenters] = useState<TrainingCenter[]>(initialState.centers);
  const [activities, setActivities] = useState<Activity[]>(initialState.activities);

  const handleAddCenter = (center: TrainingCenter) => {
    setCenters((current) => [...current, { ...center, id: `center-${Date.now()}`, programs: center.programs || [] }]);
  };

  const handleUpdateCenter = (updatedCenter: TrainingCenter) => {
    setCenters((current) => current.map((center) => (center.id === updatedCenter.id ? updatedCenter : center)));
  };

  const handleDeleteCenter = (id: string) => {
    setCenters((current) => current.filter((center) => center.id !== id));
  };

  const handleAddProgram = (centerId: string, program: CenterProgram) => {
    setCenters((current) =>
      current.map((center) =>
        center.id === centerId
          ? { ...center, programs: [...center.programs, { ...program, id: `program-${Date.now()}` }] }
          : center,
      ),
    );

    const center = centers.find((item) => item.id === centerId);

    if (center) {
      setActivities((current) => [
        {
          id: `activity-${Date.now()}`,
          user: 'Admin',
          description: `Added ${program.name} to ${center.name}`,
          type: 'program_updated',
          timestamp: new Date(),
        },
        ...current,
      ]);
    }
  };

  const handleUpdateProgram = (centerId: string, updatedProgram: CenterProgram) => {
    setCenters((current) =>
      current.map((center) =>
        center.id === centerId
          ? {
              ...center,
              programs: center.programs.map((p) => (p.id === updatedProgram.id ? updatedProgram : p)),
            }
          : center,
      ),
    );

    const center = centers.find((item) => item.id === centerId);

    if (center) {
      setActivities((current) => [
        {
          id: `activity-${Date.now()}`,
          user: 'Admin',
          description: `Updated ${updatedProgram.name} in ${center.name}`,
          type: 'program_updated',
          timestamp: new Date(),
        },
        ...current,
      ]);
    }
  };

  const handleViewCenter = (centerId: string) => {
    router.push(`/?viewCenter=${centerId}`);
    setActiveTab('training-center');
  };

  const viewingCenter = viewingCenterId ? centers.find((c) => c.id === viewingCenterId) : null;

  return (
    <>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <MainLayout>
        {viewingCenter ? (
          <CenterDetailView
            center={viewingCenter}
            onAddProgram={handleAddProgram}
            onUpdateProgram={handleUpdateProgram}
            onBack={() => router.push('/?viewCenter=')}
          />
        ) : (
          <>
            <div className={activeTab === 'dashboard' ? 'block' : 'hidden'}>
              <DashboardTab centers={centers} activities={activities} />
            </div>
            <div className={activeTab === 'training-center' ? 'block' : 'hidden'}>
              <CenterRegistrationTab
                centers={centers}
                onAddCenter={handleAddCenter}
                onUpdateCenter={handleUpdateCenter}
                onDeleteCenter={handleDeleteCenter}
                onAddProgram={handleAddProgram}
                onUpdateProgram={handleUpdateProgram}
                onViewCenter={handleViewCenter}
              />
            </div>
          </>
        )}
      </MainLayout>
    </>
  );
}
