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
}

export function CenterViewModal({ isOpen, center, onClose, onAddProgram }: CenterViewModalProps) {
  const [isAddProgramOpen, setIsAddProgramOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<CenterProgram | null>(null);

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
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent
          className="w-225 max-w-[95vw] max-h-[90vh] overflow-y-auto"
          style={{ width: '900px', maxWidth: '95vw' }}
        >
          <DialogHeader>
            <DialogTitle>{center.name}</DialogTitle>
            <DialogDescription>
              View the center details and manage registered programs.
            </DialogDescription>
          </DialogHeader>

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

          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold">Program Offers</h3>
              <p className="text-sm text-muted-foreground">
                Add a registered program and view only the program summary below.
              </p>
            </div>
            <Button onClick={() => setIsAddProgramOpen(true)} className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
              Add Program
            </Button>
          </div>

          <div className="space-y-3">
            {center.programs.length > 0 ? (
              center.programs.map((program) => (
                <div
                  key={program.id}
                  className="flex items-center justify-between gap-4 rounded-xl border p-4 hover:bg-blue-50 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-foreground">{program.name}</p>
                    <p className="text-sm text-muted-foreground">{program.type}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-lg"
                    onClick={() => setSelectedProgram(program)}
                  >
                    View
                  </Button>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
                No programs added yet.
              </div>
            )}
          </div>
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
      />
    </>
  );
}
