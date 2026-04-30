'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CenterProgram } from './mock-data';

interface ProgramModalProps {
  isOpen: boolean;
  mode: 'create' | 'view' | 'edit';
  program?: CenterProgram | null;
  onClose: () => void;
  onSubmit?: (program: CenterProgram) => void;
}

const defaultProgramValues = (): CenterProgram => ({
  id: `program-${Date.now()}`,
  name: '',
  type: 'WTR',
  numberOfHours: '',
  programRegistrationNumber: '',
  dateIssued: '',
  validityDate: '',
  trainer: '',
  ctprSerialNumber: '',
  issuanceType: 'New Issuance',
});

export function ProgramModal({
  isOpen,
  mode,
  program,
  onClose,
  onSubmit,
}: ProgramModalProps) {
  const { register, handleSubmit, reset } = useForm<CenterProgram>({
    defaultValues: program || defaultProgramValues(),
  });

  useEffect(() => {
    reset(program || defaultProgramValues());
  }, [program, reset, isOpen]);

  const handleFormSubmit = (data: CenterProgram) => {
    onSubmit?.({
      ...data,
      id: program?.id || `program-${Date.now()}`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'view'
              ? 'Program Information'
              : mode === 'edit'
              ? 'Edit Program'
              : 'Add Program'}
          </DialogTitle>

          <DialogDescription>
            {mode === 'view'
              ? 'View the registered program details below.'
              : mode === 'edit'
              ? 'Update the registered program information.'
              : 'Fill in the registered program information.'}
          </DialogDescription>
        </DialogHeader>

        {mode === 'view' && program ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['Registered Program', program.name],
              ['Type', program.type],
              ['Number of Hours', program.numberOfHours],
              ['Program Registration Number', program.programRegistrationNumber],
              ['Date Issued', program.dateIssued],
              ['Validity Date', program.validityDate],
              ['Trainer', program.trainer],
              ['CTPR Serial Number', program.ctprSerialNumber],
              ['Issuance Type', program.issuanceType],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border p-4 bg-slate-50"
              >
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {label}
                </p>
                <p className="mt-1 font-medium text-foreground">
                  {value}
                </p>
              </div>
            ))}
          </div>
        ) : mode === 'create' || mode === 'edit' ? (
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-5"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">
                  Registered Program
                </label>
                <Input
                  {...register('name', { required: true })}
                  placeholder="Enter program name"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Type
                </label>
                <select
                  {...register('type', { required: true })}
                  className="w-full h-10 rounded-lg border border-input bg-transparent px-3 py-2 text-base"
                >
                  <option value="WTR">WTR</option>
                  <option value="NTR">NTR</option>
                  <option value="MTP">MTP</option>
                  <option value="COC">COC</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Number of Hours
                </label>
                <Input
                  {...register('numberOfHours', { required: true })}
                  placeholder="120"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Program Registration Number
                </label>
                <Input
                  {...register('programRegistrationNumber', {
                    required: true,
                  })}
                  placeholder="PRN-1001"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Date Issued
                </label>
                <Input
                  type="date"
                  {...register('dateIssued', { required: true })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Validity Date
                </label>
                <Input
                  type="date"
                  {...register('validityDate', { required: true })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Trainer
                </label>
                <Input
                  {...register('trainer', { required: true })}
                  placeholder="Trainer name"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  CTPR Serial Number
                </label>
                <Input
                  {...register('ctprSerialNumber', { required: true })}
                  placeholder="CTPR-2001"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  New Issuance/Reissuance
                </label>
                <select
                  {...register('issuanceType', { required: true })}
                  className="w-full h-10 rounded-lg border border-input bg-transparent px-3 py-2 text-base"
                >
                  <option value="New Issuance">New Issuance</option>
                  <option value="Reissuance">Reissuance</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t pt-5">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="rounded-lg"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Program
              </Button>
            </div>
          </form>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}