'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CenterProgram } from './mock-data';

interface ProgramDetailsProps {
  program: CenterProgram;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProgramDetails({ program, onEdit, onDelete }: ProgramDetailsProps) {
  const [showHistory, setShowHistory] = useState(false);

  return (
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
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          type="button"
          variant="outline"
          className="rounded-lg text-red-600 hover:bg-red-50 hover:text-red-600"
          onClick={onDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
