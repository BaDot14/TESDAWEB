import type { Activity } from '../dashboard/mock-data';

export interface ProgramSnapshot {
  name: string;
  type: 'WTR' | 'NTR' | 'MTP' | 'COC' | '';
  numberOfHours: string;
  programRegistrationNumber: string;
  dateIssued: string;
  validityDate: string;
  trainers: string[];
  ctprSerialNumber: string;
  trainerCertification: string;
  issuanceType: 'New Issuance' | 'Reissuance' | '';
}

export interface ProgramHistoryEntry {
  id: string;
  timestamp: string;
  action: 'edited' | 'renewed';
  snapshot: ProgramSnapshot;
}

export interface CenterProgram extends ProgramSnapshot {
  id: string;
  history?: ProgramHistoryEntry[];
  lastEditedAt?: string;
  lastRenewedAt?: string;
}

export interface TrainingCenter {
  id: string;
  name: string;
  city: string;
  district: string;
  type: string;
  classification: string;
  address: string;
  phone: string;
  contact: string;
  email: string;
  website?: string;
  status: 'active' | 'inactive';
  programs: CenterProgram[];
  latitude?: string;
  longitude?: string;
}

const createProgram = (
  index: number,
  overrides: Partial<CenterProgram> = {},
): CenterProgram => ({
  id: `program-${index}`,
  name: 'Registered Program',
  type: 'WTR',
  numberOfHours: '80',
  programRegistrationNumber: `PRN-${1000 + index}`,
  dateIssued: '2026-04-01',
  validityDate: '2029-04-01',
  trainers: [`Trainer ${index + 1}`],
  ctprSerialNumber: `CTPR-${2000 + index}`,
  issuanceType: 'New Issuance',
  trainerCertification: `Certification ${index + 1}`,
  history: [],
  ...overrides,
});

export function generateMockCenters(): TrainingCenter[] {
  return [
    {
      id: 'center-1',
      name: 'Bansalan Skills Training Center',
      city: 'Bansalan',
      district: 'Region XI',
      type: 'Private',
      classification: 'Enterprise/Company',
      address: 'Barangay Poblacion, Bansalan, Davao del Sur',
      phone: '+63-917-111-0001',
      contact: 'Maria Santos',
      email: 'bansalan@tesda.gov.ph',
      website: 'www.bansalanskills.tesda.ph',
      status: 'active',
      programs: [
        createProgram(1, { name: 'Welding NC I', type: 'WTR', numberOfHours: '120' }),
        createProgram(2, { name: 'Electrical Installation NC II', type: 'NTR', numberOfHours: '160' }),
      ],
      latitude: '6.7852',
      longitude: '125.2159',
    },
    {
      id: 'center-2',
      name: 'Digos City Public Training Center',
      city: 'Digos City',
      district: 'Region XI',
      type: 'Public',
      classification: 'LGU',
      address: 'Digos City, Davao del Sur',
      phone: '+63-917-111-0002',
      contact: 'Jose Reyes',
      email: 'digos@tesda.gov.ph',
      website: 'www.digostraining.tesda.ph',
      status: 'active',
      programs: [createProgram(3, { name: 'Food and Beverage Services NC II', type: 'COC', numberOfHours: '240' })],
      latitude: '6.7513',
      longitude: '125.3572',
    },
    {
      id: 'center-3',
      name: 'Hagonoy Learning Institute',
      city: 'Hagonoy',
      district: 'Region XI',
      type: 'Public',
      classification: 'SUCs',
      address: 'Hagonoy, Davao del Sur',
      phone: '+63-917-111-0003',
      contact: 'Ana Villanueva',
      email: 'hagonoy@tesda.gov.ph',
      website: 'www.hagonoylearning.tesda.ph',
      status: 'inactive',
      programs: [createProgram(4, { name: 'Housekeeping NC II', type: 'NTR', numberOfHours: '140' })],
      latitude: '6.6374',
      longitude: '125.2878',
    },
    {
      id: 'center-4',
      name: 'Kiblawan ICT Academy',
      city: 'Kiblawan',
      district: 'Region XI',
      type: 'Private',
      classification: 'HEIs',
      address: 'Kiblawan, Davao del Sur',
      phone: '+63-917-111-0004',
      contact: 'Ramon Diaz',
      email: 'kiblawan@tesda.gov.ph',
      website: 'www.kiblawanict.tesda.ph',
      status: 'active',
      programs: [createProgram(5, { name: 'Web Development NC III', type: 'MTP', numberOfHours: '200' })],
      latitude: '6.6189',
      longitude: '125.2387',
    },
    {
      id: 'center-5',
      name: 'Padada Agro Training Center',
      city: 'Padada',
      district: 'Region XI',
      type: 'Public',
      classification: 'TTI(RTC)',
      address: 'Padada, Davao del Sur',
      phone: '+63-917-111-0005',
      contact: 'Elena Cruz',
      email: 'padada@tesda.gov.ph',
      website: 'www.padadaagro.tesda.ph',
      status: 'active',
      programs: [createProgram(6, { name: 'Agricultural Crops Production NC II', type: 'WTR', numberOfHours: '180' })],
      latitude: '6.6370',
      longitude: '125.3450',
    },
    {
      id: 'center-6',
      name: 'Santa Cruz Hospitality Center',
      city: 'Santa Cruz',
      district: 'Region XI',
      type: 'Private',
      classification: 'TVIs',
      address: 'Santa Cruz, Davao del Sur',
      phone: '+63-917-111-0006',
      contact: 'Grace Flores',
      email: 'santacruz@tesda.gov.ph',
      website: 'www.santacruzhospitality.tesda.ph',
      status: 'inactive',
      programs: [createProgram(7, { name: 'Food and Beverage Services NC II', type: 'COC', numberOfHours: '160' })],
      latitude: '6.8593',
      longitude: '125.4115',
    },
  ];
}

export function createMockTrainingCenterState() {
  const centers = generateMockCenters();

  const activities: Activity[] = centers.flatMap((center, centerIndex) =>
    center.programs.map((program, programIndex) => ({
      id: `activity-${center.id}-${program.id}`,
      user: 'System',
      description: `Added ${program.name} to ${center.name}`,
      type: 'program_updated',
      timestamp: new Date(2026, 3, 30, 8 + centerIndex, programIndex * 10),
    })),
  );

  return { centers, activities };
}
