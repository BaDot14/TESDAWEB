'use client';

import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CenterProgram } from './mock-data';

interface ProgramModalProps {
  isOpen: boolean;
  mode: 'create' | 'view' | 'edit';
  program?: CenterProgram | null;
  onClose: () => void;
  onSubmit?: (program: CenterProgram) => void;
  onRequestEdit?: (program: CenterProgram) => void;
  onRequestDelete?: (program: CenterProgram) => void;
}

const defaultProgramValues = (): CenterProgram => ({
  id: `program-${Date.now()}`,
  name: '',
  type: '',
  numberOfHours: '',
  programRegistrationNumber: '',
  dateIssued: '',
  validityDate: '',
  trainers: [''],
  ctprSerialNumber: '',
  issuanceType: '',
  trainerCertification: '',
  history: [],
});

export function ProgramModal({
  isOpen,
  mode,
  program,
  onClose,
  onSubmit,
  onRequestEdit,
  onRequestDelete,
}: ProgramModalProps) {
  const [showHistory, setShowHistory] = useState(false);
  const { register, handleSubmit, reset, control } = useForm<CenterProgram>({
    defaultValues: program || defaultProgramValues(),
  });
  const { fields: trainerFields, append, remove } = useFieldArray({
    control,
    name: 'trainers',
  });

  useEffect(() => {
    const nextValues = program || defaultProgramValues();
    reset({
      ...nextValues,
      trainers: nextValues.trainers?.length ? nextValues.trainers : [''],
    });
    setShowHistory(false);
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
      <DialogContent className="w-[96vw] max-w-[1000px] max-h-[90vh] overflow-y-auto rounded-3xl p-8 sm:p-9">
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
          <div className="space-y-5">
            <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
              <Card className="rounded-2xl border-slate-200 bg-slate-50/70 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="grid gap-3">
                    <div className="rounded-xl border bg-white p-3">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Last Edited
                      </p>
                      <p className="mt-1 font-medium text-foreground">
                        {program.lastEditedAt || 'No edits recorded'}
                      </p>
                    </div>
                    <div className="rounded-xl border bg-white p-3">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Last Renewed
                      </p>
                      <p className="mt-1 font-medium text-foreground">
                        {program.lastRenewedAt || 'No renewals recorded'}
                      </p>
                    </div>
                  </div>
                  {showHistory ? (
                    <div className="space-y-3 border-t pt-4">
                      {program.history && program.history.length > 0 ? (
                        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                          {program.history.map((entry) => (
                            <div key={entry.id} className="rounded-xl border bg-white p-3">
                              <p className="text-xs text-muted-foreground">
                                {entry.action === 'renewed' ? 'Renewed' : 'Edited'} •{' '}
                                {entry.timestamp}
                              </p>
                              <p className="font-medium text-foreground mt-1">
                                {entry.snapshot.name} ({entry.snapshot.type || 'N/A'})
                              </p>
                              <div className="mt-2 grid gap-1 text-xs text-muted-foreground">
                                <span>Hours: {entry.snapshot.numberOfHours}</span>
                                <span>
                                  Registration Number: {entry.snapshot.programRegistrationNumber}
                                </span>
                                <span>Date Issued: {entry.snapshot.dateIssued}</span>
                                <span>Validity Date: {entry.snapshot.validityDate}</span>
                                <span>
                                  Trainer: {entry.snapshot.trainers.join(', ') || 'No trainers'}
                                </span>
                                <span>CTPR Serial: {entry.snapshot.ctprSerialNumber}</span>
                                <span>
                                  Trainer Certification: {entry.snapshot.trainerCertification}
                                </span>
                                <span>Issuance Type: {entry.snapshot.issuanceType}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No history entries available.
                        </p>
                      )}
                    </div>
                  ) : null}
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-slate-200 bg-slate-50/70 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Current Details</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ['Registered Program', program.name],
                      ['Type', program.type],
                      ['Hours', program.numberOfHours],
                      ['Date Issued', program.dateIssued],
                      ['Validity Date', program.validityDate],
                      ['Trainer', program.trainers.join(', ') || '—'],
                      ['CTPR Serial', program.ctprSerialNumber],
                      ['Trainer Certification', program.trainerCertification],
                      ['Issuance Type', program.issuanceType],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-xl border bg-white p-3">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          {label}
                        </p>
                        <p className="mt-1 font-medium text-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                className="rounded-lg"
                onClick={() => setShowHistory((prev) => !prev)}
              >
                {showHistory ? 'Hide History' : 'History'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-lg"
                onClick={() => program && onRequestEdit?.(program)}
              >
                Edit
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-lg text-red-600 hover:bg-red-50 hover:text-red-600"
                onClick={() => program && onRequestDelete?.(program)}
              >
                Delete
              </Button>
            </div>
          </div>
        ) : mode === 'create' || mode === 'edit' ? (
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid gap-6">
              <section className="rounded-2xl border bg-slate-50/70 p-6">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground">Program Info</h4>
                  <p className="text-xs text-muted-foreground">
                    Basic details about the registered program.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="sm:col-span-2 lg:col-span-3 space-y-2">
                    <label className="text-sm font-semibold text-foreground">Registered Program</label>
                    <Input
                      {...register('name', { required: true })}
                      placeholder="Enter program name"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Type</label>
                    <select
                      {...register('type', { required: true })}
                      className="w-full h-10 rounded-lg border border-input bg-white px-3 py-2 text-base"
                    >
                      <option value="" disabled>
                        Select type
                      </option>
                      <option value="WTR">WTR</option>
                      <option value="NTR">NTR</option>
                      <option value="MTP">MTP</option>
                      <option value="COC">COC</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Number of Hours</label>
                    <Input
                      {...register('numberOfHours', { required: true })}
                      placeholder="120"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      Program Registration Number
                    </label>
                    <Input
                      {...register('programRegistrationNumber', {
                        required: true,
                      })}
                      placeholder="PRN-1001"
                      className="bg-white"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border bg-slate-50/70 p-6">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground">Dates</h4>
                  <p className="text-xs text-muted-foreground">Issuance and validity information.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Date Issued</label>
                    <Input
                      type="date"
                      {...register('dateIssued', { required: true })}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Validity Date</label>
                    <Input
                      type="date"
                      {...register('validityDate', { required: true })}
                      className="bg-white"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border bg-slate-50/70 p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Trainers</h4>
                    <p className="text-xs text-muted-foreground">
                      Add one or more trainers for this program.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                    onClick={() => append('')}
                  >
                    Add Trainer
                  </Button>
                </div>
                <div className="mt-4 rounded-xl border bg-white p-3 max-h-56 overflow-y-auto">
                  <div className="space-y-3">
                    {trainerFields.map((field, index) => (
                      <div key={field.id} className="grid grid-cols-[1fr_auto] gap-2">
                        <Input
                          {...register(`trainers.${index}`, { required: true })}
                          placeholder={`Trainer ${index + 1}`}
                          className="bg-white"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-lg h-10"
                          onClick={() => remove(index)}
                          disabled={trainerFields.length === 1}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border bg-slate-50/70 p-6">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground">Certification</h4>
                  <p className="text-xs text-muted-foreground">
                    CTPR and issuance details for this program.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">CTPR Serial Number</label>
                    <Input
                      {...register('ctprSerialNumber', { required: true })}
                      placeholder="CTPR-2001"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      Trainer Certification
                    </label>
                    <Input
                      {...register('trainerCertification', { required: true })}
                      placeholder="Trainer certification"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      New Issuance/Reissuance
                    </label>
                    <select
                      {...register('issuanceType', { required: true })}
                      className="w-full h-10 rounded-lg border border-input bg-white px-3 py-2 text-base"
                    >
                      <option value="" disabled>
                        Select issuance type
                      </option>
                      <option value="New Issuance">New Issuance</option>
                      <option value="Reissuance">Reissuance</option>
                    </select>
                  </div>
                </div>
              </section>
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
