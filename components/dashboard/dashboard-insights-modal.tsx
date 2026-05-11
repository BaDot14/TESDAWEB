'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TrainerRecord } from './mock-data';
import { CenterProgram, TrainingCenter } from '../training-center/mock-data';

type DashboardInsightKind = 'active-centers' | 'total-programs' | 'total-trainers';

interface DashboardInsightsModalProps {
  isOpen: boolean;
  kind: DashboardInsightKind | null;
  centers: TrainingCenter[];
  programs: Array<{ centerName: string; centerCity: string; program: CenterProgram }>;
  trainers: TrainerRecord[];
  onClose: () => void;
}

export function DashboardInsightsModal({
  isOpen,
  kind,
  centers,
  programs,
  trainers,
  onClose,
}: DashboardInsightsModalProps) {
  const titleMap: Record<DashboardInsightKind, string> = {
    'active-centers': 'Active Training Centers',
    'total-programs': 'Total Programs',
    'total-trainers': 'Total Trainers',
  };

  const descriptionMap: Record<DashboardInsightKind, string> = {
    'active-centers': 'Centers currently marked as active.',
    'total-programs': 'Registered programs across all training centers.',
    'total-trainers': 'Trainer records and their assigned centers.',
  };

  const renderContent = () => {
    if (!kind) {
      return null;
    }

    if (kind === 'active-centers') {
      return (
        <div className="space-y-3">
          {centers.length > 0 ? (
            centers.map((center) => (
              <div key={center.id} className="rounded-xl border p-4 bg-slate-50">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground">{center.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {center.city} • {center.classification}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Programs: {center.programs.length}
                    </p>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {center.type}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
              No active training centers found.
            </div>
          )}
        </div>
      );
    }

    if (kind === 'total-programs') {
      return (
        <div className="space-y-3">
          {programs.length > 0 ? (
            programs.map(({ centerName, centerCity, program }) => (
              <div key={program.id} className="rounded-xl border p-4 bg-slate-50">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground">{program.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {centerName} • {centerCity}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {program.type} • {program.numberOfHours} hours • {program.trainers.join(', ')}
                    </p>
                  </div>
                  <Badge variant="outline">{program.issuanceType}</Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
              No programs registered yet.
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {trainers.length > 0 ? (
          trainers.map((trainer) => (
            <div key={trainer.id} className="rounded-xl border p-4 bg-slate-50">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground">{trainer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {trainer.centerName}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {trainer.specialty}
                  </p>
                </div>
                <Badge variant={trainer.status === 'Active' ? 'default' : 'secondary'}>
                  {trainer.status}
                </Badge>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
            No trainers found.
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 sm:p-10">
        <DialogHeader>
          <DialogTitle>{kind ? titleMap[kind] : 'Dashboard Details'}</DialogTitle>
          <DialogDescription>{kind ? descriptionMap[kind] : 'Dashboard data.'}</DialogDescription>
        </DialogHeader>

        <Separator />

        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
