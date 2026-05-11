'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CenterProgram } from './mock-data';

interface ProgramFormProps {
  program?: CenterProgram | null;
  onSubmit: (program: CenterProgram) => void;
  onCancel: () => void;
  isLoading?: boolean;
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

export function ProgramForm({
  program,
  onSubmit,
  onCancel,
  isLoading,
}: ProgramFormProps) {
  const { register, handleSubmit, reset, control } = useForm<CenterProgram>({
    defaultValues: program || defaultProgramValues(),
  });
  const { fields: trainerFields, append, remove } = useFieldArray({
    control,
    name: 'trainers',
  });

  const handleFormSubmit = (data: CenterProgram) => {
    onSubmit({
      ...data,
      id: program?.id || `program-${Date.now()}`,
    });
  };

  return (
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
          onClick={onCancel}
          className="rounded-lg"
          disabled={isLoading}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Program'}
        </Button>
      </div>
    </form>
  );
}
