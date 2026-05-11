'use client';

import { useState } from 'react';
import { CentersList } from './centers-list';
import { AddCenterPage } from './add-center-page';
import { CenterProgram, TrainingCenter } from './mock-data';
import { Button } from '@/components/ui/button';

interface CenterRegistrationTabProps {
  centers: TrainingCenter[];
  onAddCenter: (center: TrainingCenter) => void;
  onUpdateCenter: (center: TrainingCenter) => void;
  onDeleteCenter: (id: string) => void;
  onAddProgram: (centerId: string, program: CenterProgram) => void;
  onUpdateProgram?: (centerId: string, program: CenterProgram) => void;
  onViewCenter?: (centerId: string) => void;
}

export function CenterRegistrationTab({
  centers,
  onAddCenter,
  onUpdateCenter,
  onDeleteCenter,
  onAddProgram,
  onUpdateProgram,
  onViewCenter,
}: CenterRegistrationTabProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isAddingCenter, setIsAddingCenter] = useState(false);

  const handleAddCenter = (newCenter: TrainingCenter) => {
    onAddCenter(newCenter);
  };

  const handleDeleteCenter = (id: string) => {
    onDeleteCenter(id);
  };

  const handleToggleStatus = (center: TrainingCenter) => {
    const nextStatus = center.status === 'active' ? 'inactive' : 'active';
    onUpdateCenter({ ...center, status: nextStatus });
  };

  const handleOpenViewPage = (center: TrainingCenter) => {
    onViewCenter?.(center.id);
  };

  // Show add center page
  if (isAddingCenter) {
    return (
      <AddCenterPage
        onSubmit={(center) => {
          handleAddCenter(center);
          setIsAddingCenter(false);
        }}
        onCancel={() => setIsAddingCenter(false)}
      />
    );
  }

  // Show centers list
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Training Center Registration</h1>
          <p className="text-muted-foreground mt-1">
            Add and manage training center information.
          </p>
        </div>
        <Button
          onClick={() => setIsAddingCenter(true)}
          className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium md:w-auto w-full"
        >
          Add New Center
        </Button>
      </div>

      {/* Centers List */}
      <CentersList
        centers={centers}
        onView={handleOpenViewPage}
        onDelete={handleDeleteCenter}
        onToggleStatus={handleToggleStatus}
        filter={filter}
        onFilterChange={setFilter}
      />
    </div>
  );
}
