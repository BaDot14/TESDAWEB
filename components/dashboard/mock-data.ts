export type Activity = {
  id: string;
  user: string;
  description: string;
  type: 'user_registered' | 'center_approved' | 'program_updated' | 'document_submitted';
  timestamp: Date;
};

export type TrainerRecord = {
  id: string;
  name: string;
  centerName: string;
  specialty: string;
  status: 'Active' | 'On Leave';
};

export const mockActivities: Activity[] = [];

export const mockTrainers: TrainerRecord[] = [
  {
    id: 'user-1',
    name: 'Ramon Diaz',
    centerName: 'Kiblawan ICT Academy',
    specialty: 'Web Development NC III',
    status: 'Active',
  },
  {
    id: 'user-2',
    name: 'Maria Santos',
    centerName: 'Bansalan Skills Training Center',
    specialty: 'Welding NC I',
    status: 'Active',
  },
  {
    id: 'user-3',
    name: 'Jose Reyes',
    centerName: 'Digos City Public Training Center',
    specialty: 'Food and Beverage Services NC II',
    status: 'Active',
  },
  {
    id: 'user-4',
    name: 'Ana Villanueva',
    centerName: 'Hagonoy Learning Institute',
    specialty: 'Housekeeping NC II',
    status: 'Active',
  },
  {
    id: 'user-5',
    name: 'Elena Cruz',
    centerName: 'Padada Agro Training Center',
    specialty: 'Agricultural Crops Production NC II',
    status: 'On Leave',
  },
  {
    id: 'user-6',
    name: 'Grace Flores',
    centerName: 'Santa Cruz Hospitality Center',
    specialty: 'Food and Beverage Services NC II',
    status: 'Active',
  },
];