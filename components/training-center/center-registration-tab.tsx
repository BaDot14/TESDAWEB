'use client';

import { useState } from 'react';
import { CentersList } from './centers-list';
import { CenterModal } from './center-modal';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCenter, setEditingCenter] = useState<TrainingCenter | null>(null);

  const handleAddCenter = (newCenter: TrainingCenter) => {
    onAddCenter(newCenter);
  };

  const handleEditCenter = (updatedCenter: TrainingCenter) => {
    onUpdateCenter(updatedCenter);
  };

  const handleDeleteCenter = (id: string) => {
    onDeleteCenter(id);
  };

  const handleToggleStatus = (center: TrainingCenter) => {
    const nextStatus = center.status === 'active' ? 'inactive' : 'active';
    onUpdateCenter({ ...center, status: nextStatus });
  };

  const handleOpenEditModal = (center: TrainingCenter) => {
    setEditingCenter(center);
    setIsModalOpen(true);
  };

  const handleOpenViewModal = (center: TrainingCenter) => {
    onViewCenter?.(center.id);
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
        onView={handleOpenViewModal}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteCenter}
        onToggleStatus={handleToggleStatus}
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
