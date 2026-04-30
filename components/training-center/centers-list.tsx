'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrainingCenter } from './mock-data';
import { Edit2, Eye, Trash2, CheckCircle, XCircle, Search } from 'lucide-react';

interface CentersListProps {
  centers: TrainingCenter[];
  onView: (center: TrainingCenter) => void;
  onEdit: (center: TrainingCenter) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (center: TrainingCenter) => void;
  filter: 'all' | 'active' | 'inactive';
  onFilterChange: (filter: 'all' | 'active' | 'inactive') => void;
}

export function CentersList({
  centers,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
  filter,
  onFilterChange,
}: CentersListProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCenters = centers.filter((center) => {
    const matchesFilter = filter === 'all' || center.status === filter;
    const matchesSearch =
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.classification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.programs.some(
        (program) =>
          program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          program.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          program.trainer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          program.programRegistrationNumber.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    return matchesFilter && matchesSearch;
  });
  const sortedCenters = [...filteredCenters].reverse();

  const handleViewCenter = (center: TrainingCenter) => {
    onView(center);
  };

  return (
    <Card className="rounded-3xl">
      <CardHeader className="border-b">
        <div className="flex flex-col gap-4">
          <CardTitle>Training Centers</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Show:</span>
              <select
                value={filter}
                onChange={(e) => onFilterChange(e.target.value as 'all' | 'active' | 'inactive')}
                className="px-3 py-2 border border-input rounded-lg text-sm font-medium text-foreground bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search training centers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-lg"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Center
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Region
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Focal Person
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCenters.length > 0 ? (
                sortedCenters.map((center) => (
                  <tr
                    key={center.id}
                    className="border-b hover:bg-blue-50 transition-colors cursor-pointer"
                    onClick={() => handleViewCenter(center)}
                  >
                    <td className="px-6 py-4 font-medium text-foreground">
                      <div>
                        <p className="font-semibold">{center.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {center.classification}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Programs: {center.programs.length}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground">{center.district}</td>
                    <td className="px-6 py-4 text-foreground">{center.contact}</td>
                    <td className="px-6 py-4">
                      <div className="text-foreground">
                        <p className="text-sm">{center.phone}</p>
                        <p className="text-xs text-muted-foreground">{center.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {center.status === 'active' ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-green-600 font-medium text-sm capitalize">
                              {center.status}
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-600" />
                            <span className="text-red-600 font-medium text-sm capitalize">
                              {center.status}
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewCenter(center);
                          }}
                          className="rounded-lg h-8 w-8 hover:bg-blue-100"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleStatus(center);
                          }}
                          className={`rounded-lg h-8 px-3 text-xs font-semibold ${
                            center.status === 'active'
                              ? 'text-red-600 hover:bg-red-100'
                              : 'text-green-600 hover:bg-green-100'
                          }`}
                        >
                          {center.status === 'active' ? 'Inactive' : 'Active'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(center);
                          }}
                          className="rounded-lg h-8 w-8 hover:bg-blue-100"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(center.id);
                          }}
                          className="rounded-lg h-8 w-8 hover:bg-red-100 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No training centers registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
