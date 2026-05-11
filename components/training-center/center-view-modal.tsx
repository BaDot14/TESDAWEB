'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { TrainingCenter, CenterProgram } from './mock-data';
import { ProgramModal } from './program-modal';

interface CenterViewModalProps {
  isOpen: boolean;
  center: TrainingCenter | null;
  onClose: () => void;
  onAddProgram: (centerId: string, program: CenterProgram) => void;
  onUpdateProgram?: (centerId: string, program: CenterProgram) => void;
  onDeleteProgram?: (centerId: string, programId: string) => void;
}

export function CenterViewModal({
  isOpen,
  center,
  onClose,
  onAddProgram,
  onUpdateProgram,
  onDeleteProgram,
}: CenterViewModalProps) {
  const [isAddProgramOpen, setIsAddProgramOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<CenterProgram | null>(null);
  const [editingProgram, setEditingProgram] = useState<CenterProgram | null>(null);

  if (!center) {
    return null;
  }

  const handleAddProgram = (program: CenterProgram) => {
    onAddProgram(center.id, program);
    setIsAddProgramOpen(false);
  };

  const handleClose = () => {
    setIsAddProgramOpen(false);
    setSelectedProgram(null);
    setEditingProgram(null);
    onClose();
  };

  const handleEditProgram = (program: CenterProgram) => {
    setEditingProgram(program);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 sm:p-10">
          <DialogHeader>
            <DialogTitle>{center.name}</DialogTitle>
            <DialogDescription>
              View the center details and manage registered programs.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-2xl border bg-slate-50/70 p-5 text-sm divide-y divide-slate-200/60">
            <div className="flex flex-col gap-1 py-3 first:pt-0 sm:flex-row sm:items-center">
              <span className="w-40 text-muted-foreground font-medium">Municipality/City:</span>
              <span className="text-foreground">{center.city}</span>
            </div>
            <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center">
              <span className="w-40 text-muted-foreground font-medium">Region:</span>
              <span className="text-foreground">{center.district}</span>
            </div>
            <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center">
              <span className="w-40 text-muted-foreground font-medium">Institution Type:</span>
              <span className="text-foreground">{center.type}</span>
            </div>
            <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center">
              <span className="w-40 text-muted-foreground font-medium">Subtype:</span>
              <span className="text-foreground">{center.classification}</span>
            </div>
            <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start">
              <span className="w-40 text-muted-foreground font-medium">Contact:</span>
              <span className="text-foreground">
                <span className="block">{center.phone}</span>
                <span className="block text-xs text-muted-foreground">{center.email}</span>
                {center.website ? (
                  <span className="block text-xs text-muted-foreground">{center.website}</span>
                ) : null}
              </span>
            </div>
            <div className="flex flex-col gap-1 py-3 last:pb-0 sm:flex-row sm:items-center">
              <span className="w-40 text-muted-foreground font-medium">Status:</span>
              <span className="text-foreground capitalize">{center.status}</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold">Program Offers</h3>
              <p className="text-sm text-muted-foreground">
                All registered program details displayed below.
              </p>
            </div>
            <Button onClick={() => setIsAddProgramOpen(true)} className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
              Add Program
            </Button>
          </div>

          {center.programs.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Program Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Hours</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Registration Number</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Date Issued</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Validity Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Trainer</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">CTPR Number</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Issuance Type</th>
                    <th className="px-4 py-3 text-center font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {center.programs.map((program, index) => (
                    <tr key={program.id} className={`border-b hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
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
                            onClick={() => onDeleteProgram?.(center.id, program.id)}
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
            <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
              No programs added yet.
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ProgramModal
        isOpen={isAddProgramOpen}
        mode="create"
        onClose={() => setIsAddProgramOpen(false)}
        onSubmit={handleAddProgram}
      />

      <ProgramModal
        isOpen={!!selectedProgram}
        mode="view"
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onRequestEdit={(program) => {
          setSelectedProgram(null);
          handleEditProgram(program);
        }}
        onRequestDelete={(program) => {
          onDeleteProgram?.(center.id, program.id);
          setSelectedProgram(null);
        }}
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
    </>
  );
}
