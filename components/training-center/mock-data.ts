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
  programsOffered: string;
  latitude?: string;
  longitude?: string;
}

export function generateMockCenters(): TrainingCenter[] {
  const centerNames = [
    'Metro Technical Institute',
    'Advanced Skills Center',
    'Provincial Training Hub',
    'Industrial Arts Academy',
    'Hospitality Training Center',
    'ICT Excellence Institute',
  ];

  const cities = ['Manila', 'Cebu', 'Davao', 'Quezon City', 'Caloocan'];
  const districts = ['North', 'South', 'East', 'West', 'Central'];
  const types = ['Government', 'Private', 'NGO'];
  const classifications = ['Level I', 'Level II', 'Level III'];

  const centers: TrainingCenter[] = [];

  for (let i = 0; i < 8; i++) {
    const status = Math.random() > 0.2 ? 'active' : 'inactive';
    centers.push({
      id: `center-${i}`,
      name: centerNames[i % centerNames.length],
      city: cities[Math.floor(Math.random() * cities.length)],
      district: districts[Math.floor(Math.random() * districts.length)],
      type: types[Math.floor(Math.random() * types.length)],
      classification: classifications[Math.floor(Math.random() * classifications.length)],
      address: `${Math.floor(Math.random() * 1000) + 1} Training Street`,
      phone: `+63-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      contact: `Director ${i + 1}`,
      email: `center${i}@tesda.gov.ph`,
      website: `www.center${i}.tesda.ph`,
      status,
      programsOffered: `Welding, Electrical Installation, Cooking, Web Development`,
      latitude: `${(14 + Math.random() * 6).toFixed(4)}`,
      longitude: `${(120 + Math.random() * 6).toFixed(4)}`,
    });
  }

  return centers;
}
