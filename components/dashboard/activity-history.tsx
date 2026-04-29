'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockActivities, Activity } from './mock-data';
import { X, Search } from 'lucide-react';

export function ActivityHistory() {
  const [activities] = useState<Activity[]>(mockActivities);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) =>
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activities, searchTerm]);

  const activityIcons: Record<Activity['type'], string> = {
    user_registered: '👤',
    center_approved: '✓',
    program_updated: '📋',
    document_submitted: '📄',
  };

  const clearSearch = () => setSearchTerm('');

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className="rounded-3xl">
      <CardHeader className="border-b">
        <div className="flex flex-col gap-4">
          <CardTitle>Activity History</CardTitle>

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by user or activity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {searchTerm && (
              <Button
                variant="outline"
                size="icon"
                onClick={clearSearch}
                className="rounded-lg"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="max-h-96 overflow-y-auto space-y-3 mt-6">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-4 py-3 border-b last:border-b-0 hover:bg-gray-50 px-2 rounded transition-colors"
              >
                <div className="text-2xl flex-shrink-0">
                  {activityIcons[activity.type]}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">
                    {activity.user}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.description}
                  </p>
                </div>

                <div className="text-xs text-muted-foreground flex-shrink-0 text-right">
                  {formatTime(activity.timestamp)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No activities found matching "{searchTerm}"
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}