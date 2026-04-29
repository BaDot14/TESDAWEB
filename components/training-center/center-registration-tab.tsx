'use client';

import { useState } from 'react';
import { CentersList } from './centers-list';
import { CenterModal } from './center-modal';
import { TrainingCenter, generateMockCenters } from './mock-data';
import { Button } from '@/components/ui/button';

export function CenterRegistrationTab() {
  const [centers, setCenters] = useState<TrainingCenter[]>(generateMockCenters());
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCenter, setEditingCenter] = useState<TrainingCenter | null>(null);

  const handleAddCenter = (newCenter: TrainingCenter) => {
    setCenters([...centers, { ...newCenter, id: `center-${Date.now()}` }]);
  };

  const handleEditCenter = (updatedCenter: TrainingCenter) => {
    setCenters(centers.map((c) => (c.id === updatedCenter.id ? updatedCenter : c)));
  };

  const handleDeleteCenter = (id: string) => {
    setCenters(centers.filter((c) => c.id !== id));
  };

  const handleOpenEditModal = (center: TrainingCenter) => {
    setEditingCenter(center);
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setEditingCenter(null);
    setIsModalOpen(true);
  };

  const handleSubmitModal = (center: TrainingCenter) => {
    if (editingCenter) {
      handleEditCenter(center);
    } else {
      handleAddCenter(center);
    }
    setEditingCenter(null);
  };

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
          onClick={handleOpenAddModal}
          className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium md:w-auto w-full"
        >
          Add New Center
        </Button>
      </div>

      {/* Centers List */}
      <CentersList
        centers={centers}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteCenter}
        filter={filter}
        onFilterChange={setFilter}
      />

      {/* Modal for Add/Edit */}
      <CenterModal
        isOpen={isModalOpen}
        center={editingCenter}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCenter(null);
        }}
        onSubmit={handleSubmitModal}
      />
    </div>
  );
}
