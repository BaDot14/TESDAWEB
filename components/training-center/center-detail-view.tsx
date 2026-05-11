'use client';

import { TrainingCenter, CenterProgram } from './mock-data';
import { TrainingCenterPage } from './training-center-page';

interface CenterDetailViewProps {
  center: TrainingCenter;
  onAddProgram: (centerId: string, program: CenterProgram) => void;
  onUpdateProgram?: (centerId: string, program: CenterProgram) => void;
  onDeleteProgram?: (centerId: string, programId: string) => void;
  onUpdateCenter: (center: TrainingCenter) => void;
  onDeleteCenter: (centerId: string) => void;
  onBack?: () => void;
}

export function CenterDetailView({
  center,
  onAddProgram,
  onUpdateProgram,
  onDeleteProgram,
  onUpdateCenter,
  onDeleteCenter,
  onBack,
}: CenterDetailViewProps) {
  // This component now simply wraps the page-based view
  return (
    <TrainingCenterPage
      center={center}
      onAddProgram={onAddProgram}
      onUpdateProgram={onUpdateProgram}
      onDeleteProgram={onDeleteProgram}
      onUpdateCenter={onUpdateCenter}
      onDeleteCenter={onDeleteCenter}
      onBack={onBack}
    />
  );
}
