'use client';

import { useMemo, useState } from 'react';
import { Activity } from './mock-data';
import { StatusCards } from './status-cards';
import { ActivityHistory } from './activity-history';
import { DashboardInsightsModal } from './dashboard-insights-modal';
import { TrainingCenter } from '../training-center/mock-data';
import { mockTrainers } from './mock-data';

interface DashboardTabProps {
  centers: TrainingCenter[];
  activities: Activity[];
}

export function DashboardTab({ centers, activities }: DashboardTabProps) {
  const [insightKind, setInsightKind] = useState<'active-centers' | 'total-programs' | 'total-trainers' | null>(null);

  const activeTrainingCenters = centers.filter((center) => center.status === 'active').length;
  const totalPrograms = centers.reduce((total, center) => total + center.programs.length, 0);
  const activeCenters = useMemo(() => centers.filter((center) => center.status === 'active'), [centers]);
  const programRows = useMemo(
    () =>
      centers.flatMap((center) =>
        center.programs.map((program) => ({
          centerName: center.name,
          centerCity: center.city,
          program,
        })),
      ),
    [centers],
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of TESDA system performance and activities
        </p>
      </div>

      <StatusCards
        activeTrainingCenters={activeTrainingCenters}
        totalPrograms={totalPrograms}
        totalTrainers={mockTrainers.length}
        onCardClick={setInsightKind}
      />

      <ActivityHistory activities={activities} />

      <DashboardInsightsModal
        isOpen={insightKind !== null}
        kind={insightKind}
        centers={activeCenters}
        programs={programRows}
        trainers={mockTrainers}
        onClose={() => setInsightKind(null)}
      />
    </div>
  );
}
