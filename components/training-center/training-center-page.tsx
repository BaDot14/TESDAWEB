'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { TrainingCenter, CenterProgram } from './mock-data';
import { ProgramForm } from './program-form';
import { ProgramDetails } from './program-details';
import { CenterForm } from './center-form';

interface TrainingCenterPageProps {
  center: TrainingCenter;
  onAddProgram: (centerId: string, program: CenterProgram) => void;
  onUpdateProgram?: (centerId: string, program: CenterProgram) => void;
  onDeleteProgram?: (centerId: string, programId: string) => void;
  onUpdateCenter: (center: TrainingCenter) => void;
  onDeleteCenter: (centerId: string) => void;
  onBack?: () => void;
}

export function TrainingCenterPage({
  center,
  onAddProgram,
  onUpdateProgram,
  onDeleteProgram,
  onUpdateCenter,
  onDeleteCenter,
  onBack,
}: TrainingCenterPageProps) {
  const [isEditingCenter, setIsEditingCenter] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<CenterProgram | null>(null);
  const [editingProgram, setEditingProgram] = useState<CenterProgram | null>(null);
  const [isAddingProgram, setIsAddingProgram] = useState(false);

  const handleAddProgram = (program: CenterProgram) => {
    onAddProgram(center.id, program);
    setIsAddingProgram(false);
  };

  const handleUpdateProgram = (program: CenterProgram) => {
    onUpdateProgram?.(center.id, program);
    setEditingProgram(null);
    setSelectedProgram(null);
  };

  const handleDeleteProgram = (programId: string) => {
    if (confirm('Are you sure you want to delete this program?')) {
      onDeleteProgram?.(center.id, programId);
      setSelectedProgram(null);
    }
  };

  const handleUpdateCenter = (updatedCenter: TrainingCenter) => {
    onUpdateCenter(updatedCenter);
    setIsEditingCenter(false);
  };

  const handleDeleteCenter = () => {
    if (confirm('Are you sure you want to delete this training center?')) {
      onDeleteCenter(center.id);
      onBack?.();
    }
  };

  // Show editing program form
  if (editingProgram) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setEditingProgram(null);
              setSelectedProgram(null);
            }}
            className="rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Program</h1>
          <p className="text-muted-foreground mt-1">Update the registered program information.</p>
        </div>
        <ProgramForm
          program={editingProgram}
          onSubmit={handleUpdateProgram}
          onCancel={() => {
            setEditingProgram(null);
            setSelectedProgram(null);
          }}
        />
      </div>
    );
  }

  // Show viewing program details
  if (selectedProgram) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedProgram(null)}
            className="rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Program Information</h1>
          <p className="text-muted-foreground mt-1">View the registered program details below.</p>
        </div>
        <ProgramDetails
          program={selectedProgram}
          onEdit={() => setEditingProgram(selectedProgram)}
          onDelete={() => handleDeleteProgram(selectedProgram.id)}
        />
      </div>
    );
  }

  // Show adding program form
  if (isAddingProgram) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddingProgram(false)}
            className="rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add Program</h1>
          <p className="text-muted-foreground mt-1">Fill in the registered program information.</p>
        </div>
        <ProgramForm
          onSubmit={handleAddProgram}
          onCancel={() => setIsAddingProgram(false)}
        />
      </div>
    );
  }

  // Show editing center form
  if (isEditingCenter) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditingCenter(false)}
            className="rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Training Center</h1>
          <p className="text-muted-foreground mt-1">Update the training center information.</p>
        </div>
        <CenterForm
          center={center}
          onSubmit={handleUpdateCenter}
          onCancel={() => setIsEditingCenter(false)}
        />
      </div>
    );
  }

  // Show center details and programs list
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="rounded-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Center Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{center.name}</h1>
        <p className="text-muted-foreground mt-1">
          View the center details and manage registered programs.
        </p>
      </div>

      {/* Center Details */}
      <div className="space-y-3 text-sm">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
          <span className="w-40 text-muted-foreground font-medium">Municipality/City:</span>
          <span className="text-foreground">{center.city}</span>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
          <span className="w-40 text-muted-foreground font-medium">Region:</span>
          <span className="text-foreground">{center.district}</span>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
          <span className="w-40 text-muted-foreground font-medium">Institution Type:</span>
          <span className="text-foreground">{center.type}</span>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
          <span className="w-40 text-muted-foreground font-medium">Subtype:</span>
          <span className="text-foreground">{center.classification}</span>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start">
          <span className="w-40 text-muted-foreground font-medium">Contact:</span>
          <span className="text-foreground">
            <span className="block">{center.phone}</span>
            <span className="block text-xs text-muted-foreground">{center.email}</span>
            {center.website ? (
              <span className="block text-xs text-muted-foreground">{center.website}</span>
            ) : null}
          </span>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
          <span className="w-40 text-muted-foreground font-medium">Status:</span>
          <span className="text-foreground capitalize">{center.status}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          className="rounded-lg"
          onClick={() => setIsEditingCenter(true)}
        >
          Edit
        </Button>
        <Button
          variant="outline"
          className="rounded-lg text-red-600 hover:bg-red-50 hover:text-red-600"
          onClick={handleDeleteCenter}
        >
          Delete
        </Button>
      </div>

      <Separator className="my-6" />

      {/* Program Offers Section */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold">Program Offers</h3>
          <p className="text-sm text-muted-foreground">
            All registered program details displayed below.
          </p>
        </div>
        <Button
          onClick={() => setIsAddingProgram(true)}
          className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          Add Program
        </Button>
      </div>

      {center.programs.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Program Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Hours</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Registration Number
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Date Issued</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Validity Date
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Trainer</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">CTPR Number</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Issuance Type
                </th>
                <th className="px-4 py-3 text-center font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {center.programs.map((program, index) => (
                <tr
                  key={program.id}
                  className={`border-b hover:bg-blue-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{program.name}</td>
                  <td className="px-4 py-3 text-foreground">{program.type}</td>
                  <td className="px-4 py-3 text-foreground">{program.numberOfHours}</td>
                  <td className="px-4 py-3 text-foreground">{program.programRegistrationNumber}</td>
                  <td className="px-4 py-3 text-foreground">{program.dateIssued}</td>
                  <td className="px-4 py-3 text-foreground">{program.validityDate}</td>
                  <td className="px-4 py-3 text-foreground">
                    {program.trainers.join(', ')}
                  </td>
                  <td className="px-4 py-3 text-foreground">{program.ctprSerialNumber}</td>
                  <td className="px-4 py-3 text-foreground">{program.issuanceType}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg"
                        onClick={() => setSelectedProgram(program)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg text-red-600 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDeleteProgram(program.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No programs registered yet.
        </div>
      )}
    </div>
  );
}
