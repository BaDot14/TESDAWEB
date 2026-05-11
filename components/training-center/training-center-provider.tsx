'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TrainingCenter, CenterProgram, createMockTrainingCenterState } from './mock-data';
import { Activity } from '@/components/dashboard/mock-data';

interface TrainingCenterContextType {
  centers: TrainingCenter[];
  activities: Activity[];
  addCenter: (center: TrainingCenter) => void;
  updateCenter: (center: TrainingCenter) => void;
  deleteCenter: (id: string) => void;
  addProgram: (centerId: string, program: CenterProgram) => void;
  updateProgram: (centerId: string, program: CenterProgram) => void;
  deleteProgram: (centerId: string, programId: string) => void;
  clearHistory: () => void;
}

const TrainingCenterContext = createContext<TrainingCenterContextType | undefined>(undefined);

export function TrainingCenterProvider({ children }: { children: ReactNode }) {
  const [initialState] = useState(() => createMockTrainingCenterState());
  const [centers, setCenters] = useState<TrainingCenter[]>(initialState.centers);
  const [activities, setActivities] = useState<Activity[]>(initialState.activities);

  const addCenter = (center: TrainingCenter) => {
    setCenters((current) => [...current, { ...center, id: `center-${Date.now()}`, programs: center.programs || [] }]);
  };

  const updateCenter = (updatedCenter: TrainingCenter) => {
    setCenters((current) => current.map((center) => (center.id === updatedCenter.id ? updatedCenter : center)));
  };

  const deleteCenter = (id: string) => {
    setCenters((current) => current.filter((center) => center.id !== id));
  };

  const addProgram = (centerId: string, program: CenterProgram) => {
    setCenters((current) =>
      current.map((center) =>
        center.id === centerId
          ? {
              ...center,
              programs: [
                ...center.programs,
                {
                  ...program,
                  id: `program-${Date.now()}`,
                  history: program.history || [],
                },
              ],
            }
          : center,
      ),
    );

    const center = centers.find((item) => item.id === centerId);
    if (center) {
      setActivities((current) => [
        {
          id: `activity-${Date.now()}`,
          user: 'Admin',
          description: `Added ${program.name} to ${center.name}`,
          type: 'program_updated',
          timestamp: new Date(),
        },
        ...current,
      ]);
    }
  };

  const updateProgram = (centerId: string, updatedProgram: CenterProgram) => {
    setCenters((current) =>
      current.map((center) =>
        center.id === centerId
          ? {
              ...center,
              programs: center.programs.map((program) => {
                if (program.id !== updatedProgram.id) {
                  return program;
                }

                const timestamp = new Date().toISOString();
                const historyEntry = {
                  id: `history-${Date.now()}`,
                  timestamp,
                  action: updatedProgram.issuanceType === 'Reissuance' ? 'renewed' : 'edited',
                  snapshot: {
                    name: program.name,
                    type: program.type,
                    numberOfHours: program.numberOfHours,
                    programRegistrationNumber: program.programRegistrationNumber,
                    dateIssued: program.dateIssued,
                    validityDate: program.validityDate,
                    trainers: program.trainers,
                    ctprSerialNumber: program.ctprSerialNumber,
                    trainerCertification: program.trainerCertification,
                    issuanceType: program.issuanceType,
                  },
                };

                const nextHistory = [historyEntry, ...(program.history || [])];

                return {
                  ...updatedProgram,
                  history: nextHistory,
                  lastEditedAt: timestamp,
                  lastRenewedAt:
                    updatedProgram.issuanceType === 'Reissuance'
                      ? timestamp
                      : program.lastRenewedAt,
                };
              }),
            }
          : center,
      ),
    );

    const center = centers.find((item) => item.id === centerId);
    if (center) {
      setActivities((current) => [
        {
          id: `activity-${Date.now()}`,
          user: 'Admin',
          description: `Updated ${updatedProgram.name} in ${center.name}`,
          type: 'program_updated',
          timestamp: new Date(),
        },
        ...current,
      ]);
    }
  };

  const deleteProgram = (centerId: string, programId: string) => {
    setCenters((current) =>
      current.map((center) =>
        center.id === centerId
          ? { ...center, programs: center.programs.filter((program) => program.id !== programId) }
          : center,
      ),
    );
  };

  const clearHistory = () => {
    setActivities([]);
  };

  return (
    <TrainingCenterContext.Provider
      value={{
        centers,
        activities,
        addCenter,
        updateCenter,
        deleteCenter,
        addProgram,
        updateProgram,
        deleteProgram,
        clearHistory,
      }}
    >
      {children}
    </TrainingCenterContext.Provider>
  );
}

export function useTrainingCenter() {
  const context = useContext(TrainingCenterContext);
  if (context === undefined) {
    throw new Error('useTrainingCenter must be used within TrainingCenterProvider');
  }
  return context;
}
