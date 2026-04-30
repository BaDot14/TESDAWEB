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
      <DialogContent
        className="w-225 max-w-[95vw] max-h-[80vh] overflow-y-auto"
        style={{ width: '900px', maxWidth: '95vw' }}
      >
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
        <div className="max-h-[calc(80vh-120px)] overflow-y-auto pr-4">
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
