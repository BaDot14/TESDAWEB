'use client';

import { Activity } from './mock-data';
import { StatusCards } from './status-cards';
import { ActivityHistory } from './activity-history';
import { TrainingCenter } from '../training-center/mock-data';
import { mockTrainers } from './mock-data';

interface DashboardTabProps {
  centers: TrainingCenter[];
  activities: Activity[];
  onClearHistory: () => void;
}

export function DashboardTab({ centers, activities, onClearHistory }: DashboardTabProps) {
  const activeTrainingCenters = centers.filter((center) => center.status === 'active').length;
  const totalPrograms = centers.reduce((total, center) => total + center.programs.length, 0);

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
      />

      <ActivityHistory activities={activities} onClearHistory={onClearHistory} />
    </div>
  );
}
