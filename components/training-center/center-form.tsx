'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrainingCenter } from './mock-data';

interface CenterFormProps {
  onSubmit: (center: TrainingCenter) => void;
  initialData?: TrainingCenter;
  isEditing?: boolean;
}

export function CenterForm({ onSubmit, initialData, isEditing = false }: CenterFormProps) {
  const { register, handleSubmit, reset, watch, setValue } = useForm<TrainingCenter>({
    defaultValues: initialData || {
      id: `center-${Date.now()}`,
      name: '',
      city: '',
      district: 'Region XI',
      type: '',
      classification: '',
      address: '',
      phone: '',
      contact: '',
      email: '',
      website: '',
      programs: [],
      latitude: '',
      longitude: '',
    },
  });

  const selectedType = watch('type');
  const hasInitializedSubtype = useRef(false);

  useEffect(() => {
    if (!hasInitializedSubtype.current) {
      hasInitializedSubtype.current = true;
      return;
    }

    setValue('classification', '');
  }, [selectedType, setValue]);

  const handleFormSubmit = (data: TrainingCenter) => {
    onSubmit(data);
    if (!isEditing) {
      reset();
    }
  };

  const municipalities = [
    'Bansalan',
    'Digos City',
    'Hagonoy',
    'Kiblawan',
    'Magsaysay',
    'Malalag',
    'Matanao',
    'Padada',
    'Santa Cruz',
    'Sulop',
  ];

  const privateInstitutionTypes = ['Enterprise/Company', 'HEIs', 'NGO/Foundation', 'TVIs'];

  const publicInstitutionTypes = [
    'DepEd Supv.',
    'GOCC/GFI',
    'LCU',
    'LGU',
    'NGA',
    'Specialized training center',
    'SUCs',
    'TTI(PTC)',
    'TTI(RTC)',
    'TTI(SCHOOL)',
  ];

  const institutionTypes = ['Private', 'Public'];

  const classifications =
    selectedType === 'Private'
      ? privateInstitutionTypes
      : selectedType === 'Public'
        ? publicInstitutionTypes
        : [];


  return (
    <Card className="rounded-3xl">
      <CardHeader className="border-b">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src="/tesda-logo.png"
            alt="TESDA Logo"
            width={60}
            height={60}
            className="object-contain"
          />
          <CardTitle>Training Center Registration</CardTitle>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className="pt-6 space-y-6">
          {/* Municipality/City */}
          <div>
            <label className="text-sm font-medium mb-2 block">Municipality/City</label>
            <select
              {...register('city', { required: true })}
              className="w-full h-9 rounded-lg border border-input bg-transparent px-3 py-1 text-base"
            >
              <option value="">Select Municipality/City</option>
              {municipalities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Region */}
          <div>
            <label className="text-sm font-medium mb-2 block">Region</label>
            <Input
              {...register('district', { required: true })}
              value="Region XI"
              readOnly
              className="rounded-lg bg-gray-50"
            />
          </div>

          {/* Type of Institution */}
          <div>
            <label className="text-sm font-medium mb-2 block">Type of Institution</label>
            <select
              {...register('type', { required: true })}
              className="w-full h-9 rounded-lg border border-input bg-transparent px-3 py-1 text-base"
            >
              <option value="">Select Type of Institution</option>
              {institutionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Classification */}
          <div>
            <label className="text-sm font-medium mb-2 block">Institution Subtype</label>
            <select
              {...register('classification', { required: true })}
              className="w-full h-9 rounded-lg border border-input bg-transparent px-3 py-1 text-base"
              disabled={!selectedType}
            >
              <option value="">Select Subtype</option>
              {classifications.map((classification) => (
                <option key={classification} value={classification}>
                  {classification}
                </option>
              ))}
            </select>
          </div>

          {/* Name of Provider */}
          <div>
            <label className="text-sm font-medium mb-2 block">Name of Provider</label>
            <Input
              {...register('name', { required: true })}
              placeholder="Enter provider name"
              className="rounded-lg"
            />
          </div>

          {/* Formerly Name */}
          <div>
            <label className="text-sm font-medium mb-2 block">Formerly Name</label>
            <Input
              {...register('website')}
              placeholder="Enter former name (if applicable)"
              className="rounded-lg"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium mb-2 block">Address</label>
            <Input
              {...register('address', { required: true })}
              placeholder="Enter full address"
              className="rounded-lg"
            />
          </div>

          {/* Telephone # */}
          <div>
            <label className="text-sm font-medium mb-2 block">Telephone #</label>
            <Input
              {...register('phone', { required: true })}
              placeholder="+63-..."
              className="rounded-lg"
            />
          </div>

          {/* Focal Person */}
          <div>
            <label className="text-sm font-medium mb-2 block">Focal Person</label>
            <Input
              {...register('contact', { required: true })}
              placeholder="Enter focal person name"
              className="rounded-lg"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="text-sm font-medium mb-2 block">Email Address</label>
            <Input
              type="email"
              {...register('email', { required: true })}
              placeholder="center@tesda.gov.ph"
              className="rounded-lg"
            />
          </div>

          {/* Website */}
          <div>
            <label className="text-sm font-medium mb-2 block">Website</label>
            <Input
              {...register('website')}
              placeholder="www.center.tesda.ph"
              className="rounded-lg"
            />
          </div>

          {/* Geo Map */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-semibold mb-4">Geo Map (Latitude, Longitude)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Latitude</label>
                <Input
                  {...register('latitude')}
                  placeholder="14.5995"
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Longitude</label>
                <Input
                  {...register('longitude')}
                  placeholder="120.9842"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              className="rounded-lg"
            >
              {isEditing ? 'Cancel' : 'Reset'}
            </Button>
            <Button
              type="submit"
              className="rounded-lg"
              style={{ backgroundColor: 'var(--tesda-primary)', color: 'white' }}
            >
              {isEditing ? 'Update Center' : 'Create'}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
