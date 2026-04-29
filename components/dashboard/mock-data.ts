export type Activity = {
  id: string;
  user: string;
  description: string;
  type: 'user_registered' | 'center_approved' | 'program_updated' | 'document_submitted';
  timestamp: Date;
};

export const mockActivities: Activity[] = [];