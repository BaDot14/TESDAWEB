'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { TrainingCenter } from './mock-data';
import { CenterForm } from './center-form';

interface AddCenterPageProps {
  onSubmit: (center: TrainingCenter) => void;
  onCancel: () => void;
}

export function AddCenterPage({ onSubmit, onCancel }: AddCenterPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          className="rounded-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-foreground">Add Training Center</h1>
        <p className="text-muted-foreground mt-1">
          Fill in the training center information.
        </p>
      </div>

      <CenterForm
        onSubmit={(center) => {
          onSubmit(center);
          onCancel();
        }}
        onCancel={onCancel}
      />
    </div>
  );
}
