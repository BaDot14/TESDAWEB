'use client';

import { StatusCards } from './status-cards';
import { ActivityHistory } from './activity-history';

export function DashboardTab() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of TESDA system performance and activities
        </p>
      </div>

      <StatusCards />

      <ActivityHistory />
    </div>
  );
}
