'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CenterForm } from './center-form';
import { TrainingCenter } from './mock-data';

interface CenterModalProps {
  isOpen: boolean;
  center: TrainingCenter | null;
  onClose: () => void;
  onSubmit: (center: TrainingCenter) => void;
}

export function CenterModal({ isOpen, center, onClose, onSubmit }: CenterModalProps) {
  const handleSubmit = (data: TrainingCenter) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 sm:p-10">
        <DialogHeader>
          <DialogTitle>
            {center ? 'Edit Training Center' : 'Add New Training Center'}
          </DialogTitle>
          <DialogDescription>
            {center
              ? 'Update the training center details below'
              : 'Fill in the information for the new training center'}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[calc(90vh-160px)] overflow-y-auto pr-2">
          <CenterForm
            onSubmit={handleSubmit}
            initialData={center || undefined}
            isEditing={!!center}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
