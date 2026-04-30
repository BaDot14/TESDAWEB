'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TrainingCenter, CenterProgram } from './mock-data';
import { ProgramModal } from './program-modal';
import { ArrowLeft } from 'lucide-react';

interface CenterDetailViewProps {
  center: TrainingCenter;
  onAddProgram: (centerId: string, program: CenterProgram) => void;
  onUpdateProgram?: (centerId: string, program: CenterProgram) => void;
  onBack?: () => void;
}

export function CenterDetailView({
  center,
  onAddProgram,
  onUpdateProgram,
  onBack,
}: CenterDetailViewProps) {
  const [isAddProgramOpen, setIsAddProgramOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<CenterProgram | null>(null);

  const handleAddProgram = (program: CenterProgram) => {
    onAddProgram(center.id, program);
    setIsAddProgramOpen(false);
  };

  const handleEditProgram = (program: CenterProgram) => {
    setEditingProgram(program);
  };

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

      {/* Center Details Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border p-4 bg-slate-50">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Municipality/City</p>
          <p className="mt-1 font-medium">{center.city}</p>
        </div>
        <div className="rounded-xl border p-4 bg-slate-50">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Region</p>
          <p className="mt-1 font-medium">{center.district}</p>
        </div>
        <div className="rounded-xl border p-4 bg-slate-50">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Institution Type</p>
          <p className="mt-1 font-medium">{center.type}</p>
        </div>
        <div className="rounded-xl border p-4 bg-slate-50">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Subtype</p>
          <p className="mt-1 font-medium">{center.classification}</p>
        </div>
        <div className="rounded-xl border p-4 bg-slate-50">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Contact</p>
          <div className="mt-1">
            <p className="font-medium">{center.phone}</p>
            <p className="text-xs text-muted-foreground">{center.email}</p>
            {center.website ? (
              <p className="text-xs text-muted-foreground">{center.website}</p>
            ) : null}
          </div>
        </div>
        <div className="rounded-xl border p-4 bg-slate-50">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Status</p>
          <p className="mt-1 font-medium capitalize">{center.status}</p>
        </div>
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
          onClick={() => setIsAddProgramOpen(true)}
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
                  <td className="px-4 py-3 text-foreground">{program.trainer}</td>
                  <td className="px-4 py-3 text-foreground">{program.ctprSerialNumber}</td>
                  <td className="px-4 py-3 text-foreground">{program.issuanceType}</td>
                  <td className="px-4 py-3 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg"
                      onClick={() => handleEditProgram(program)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
          No programs added yet.
        </div>
      )}

      {/* Program Modals */}
      <ProgramModal
        isOpen={isAddProgramOpen}
        mode="create"
        onClose={() => setIsAddProgramOpen(false)}
        onSubmit={handleAddProgram}
      />

      <ProgramModal
        isOpen={!!editingProgram}
        mode="edit"
        program={editingProgram}
        onClose={() => setEditingProgram(null)}
        onSubmit={(program) => {
          if (editingProgram && onUpdateProgram) {
            onUpdateProgram(center.id, program);
          }
          setEditingProgram(null);
        }}
      />
    </div>
  );
}
