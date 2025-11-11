'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, PlusCircle, MinusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TeamLeader {
  id: number;
  name: string;
  total_calls: number;
  interested: number;
  not_interested: number;
  other_location: number;
  lost: number;
  visit: number;
}

const ProductivityTeamLeaderPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rawData, setRawData] = useState<TeamLeader[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  // Simulate data fetch
  const fetchData = () => {
    const mockData: TeamLeader[] = [
      {
        id: 1,
        name: 'teamlead',
        total_calls: 0,
        interested: 0,
        not_interested: 0,
        other_location: 0,
        lost: 0,
        visit: 0,
      },
      {
        id: 2,
        name: 'Pooja Mehta',
        total_calls: 550,
        interested: 150,
        not_interested: 80,
        other_location: 20,
        lost: 30,
        visit: 70,
      },
      {
        id: 3,
        name: 'Anita Das',
        total_calls: 480,
        interested: 130,
        not_interested: 70,
        other_location: 15,
        lost: 25,
        visit: 60,
      },
    ];
    setRawData(mockData);
  };

  // Fetch data only when dates are valid
  useEffect(() => {
    if ((startDate && endDate && startDate <= endDate) || (!startDate && !endDate)) {
      fetchData();
    }
  }, [startDate, endDate]);

  // Calculate percentages dynamically
  const data = useMemo(() => {
    return rawData.map((row) => ({
      ...row,
      interested_percentage:
        row.total_calls > 0 ? Math.round((row.interested / row.total_calls) * 100) : 0,
      visit_percentage:
        row.total_calls > 0 ? Math.round((row.visit / row.total_calls) * 100) : 0,
    }));
  }, [rawData]);

  // Calculate totals
  const total = useMemo(() => {
    return data.reduce(
      (acc, row) => {
        acc.calls += row.total_calls;
        acc.interested += row.interested;
        acc.not_interested += row.not_interested;
        acc.other_location += row.other_location;
        acc.lost += row.lost;
        acc.visit += row.visit;
        return acc;
      },
      {
        calls: 0,
        interested: 0,
        not_interested: 0,
        other_location: 0,
        lost: 0,
        visit: 0,
      }
    );
  }, [data]);

  const totalInterestedPct = total.calls > 0 ? Math.round((total.interested / total.calls) * 100) : 0;
  const totalVisitPct = total.calls > 0 ? Math.round((total.visit / total.calls) * 100) : 0;

  const toggleExpanded = (id: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const isDateInvalid = startDate && endDate && startDate > endDate;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <h1 className="text-2xl font-medium tracking-tight">Productivity Index</h1>

      {/* Date Filter Card */}
      <Card className="shadow-lg rounded-2xl">
  <CardContent className="p-6">
    <div
      className="
        grid grid-cols-1
        md:grid-cols-2
        gap-6
        transition-all duration-300
      "
    >
      {/* Start Date */}
      <div
        className="
          space-y-2
          bg-gradient-to-b from-white to-gray-50
          rounded-xl
          border border-gray-100
          p-4
          shadow-sm
          hover:shadow-md
          transition
          duration-300
        "
      >
        <Label
          htmlFor='start-date'
          className='text-sm font-medium text-gray-700'
        >
          Start Date
        </Label>
        <div className='relative'>
          <Input
            id='start-date'
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='
              pl-10
              rounded-lg
              border-gray-200
              focus:ring-2 focus:ring-primary/40
              focus:border-primary
              transition
            '
          />
          <Calendar
            className='
              absolute left-3 top-1/2 -translate-y-1/2
              h-4 w-4 text-muted-foreground
            '
          />
        </div>
      </div>

      {/* End Date */}
      <div
        className="
          space-y-2
          bg-gradient-to-b from-white to-gray-50
          rounded-xl
          border border-gray-100
          p-4
          shadow-sm
          hover:shadow-md
          transition
          duration-300
        "
      >
        <Label
          htmlFor='end-date'
          className='text-sm font-medium text-gray-700'
        >
          End Date
        </Label>
        <div className='relative'>
          <Input
            id='end-date'
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='
              pl-10
              rounded-lg
              border-gray-200
              focus:ring-2 focus:ring-primary/40
              focus:border-primary
              transition
            '
          />
          <Calendar
            className='
              absolute left-3 top-1/2 -translate-y-1/2
              h-4 w-4 text-muted-foreground
            '
          />
        </div>
      </div>
    </div>
  </CardContent>
</Card>

      {/* Productivity Table */}
      <Card className="shadow-lg rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="w-full min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">SN</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-center">Total Calls</TableHead>
                  <TableHead className="text-center">Interested</TableHead>
                  <TableHead className="text-center">Not Interested</TableHead>
                  <TableHead className="text-center">Other Location</TableHead>
                  <TableHead className="text-center">Lost</TableHead>
                  <TableHead className="text-center">Visit</TableHead>
                  <TableHead className="text-center">Int %</TableHead>
                  <TableHead className="text-center">Visit %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center text-muted-foreground">
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((row, i) => (
                    <React.Fragment key={row.id}>
                      {/* Main Row */}
                      <TableRow className="hover:bg-muted/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center">
                            <span className="hidden lg:inline">{i + 1}</span>
                            <button
                              className="ml-2 inline-flex lg:hidden"
                              onClick={() => toggleExpanded(row.id)}
                            >
                              {expandedRows.has(row.id) ? (
                                <MinusCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <PlusCircle className="h-5 w-5 text-green-600" />
                              )}
                            </button>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{row.name}</TableCell>
                        <TableCell className="text-center">{row.total_calls}</TableCell>
                        <TableCell className="text-center text-blue-600 font-medium">
                          {row.interested}
                        </TableCell>
                        <TableCell className="text-center text-red-500">
                          {row.not_interested}
                        </TableCell>
                        <TableCell className="text-center">{row.other_location}</TableCell>
                        <TableCell className="text-center">{row.lost}</TableCell>
                        <TableCell className="text-center text-green-600 font-medium">
                          {row.visit}
                        </TableCell>
                        <TableCell className="text-center font-semibold text-blue-600">
                          {row.interested_percentage}%
                        </TableCell>
                        <TableCell className="text-center font-semibold text-green-600">
                          {row.visit_percentage}%
                        </TableCell>
                      </TableRow>

                      {/* Expanded Row */}
                      {expandedRows.has(row.id) && (
                        <TableRow>
                          <TableCell colSpan={10} className="p-0 border-t-0">
                            <div className="px-4 py-6 md:px-8 md:py-7 bg-gradient-to-b from-muted/60 to-muted/30 rounded-xl mx-2 md:mx-4 my-3 shadow-inner">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                <div className="space-y-4">
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium">Name</p>
                                    <p className="font-semibold">{row.name}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium">Total Calls</p>
                                    <p className="font-semibold">{row.total_calls}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium">Interested</p>
                                    <p className="font-semibold text-blue-600">{row.interested}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium">Visit</p>
                                    <p className="font-semibold text-green-600">{row.visit}</p>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium">Not Interested</p>
                                    <p className="font-semibold text-red-500">{row.not_interested}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium">Other Location</p>
                                    <p className="font-semibold">{row.other_location}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium">Lost</p>
                                    <p className="font-semibold">{row.lost}</p>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs text-muted-foreground font-medium">Int %</p>
                                    <p className="font-bold text-blue-600">{row.interested_percentage}%</p>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs text-muted-foreground font-medium">Visit %</p>
                                    <p className="font-bold text-green-600">{row.visit_percentage}%</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                )}
              </TableBody>
              <TableFooter>
                <TableRow className="bg-muted/50 font-bold text-foreground">
                  <TableCell colSpan={2} className="text-left">
                    Total
                  </TableCell>
                  <TableCell className="text-center">{total.calls}</TableCell>
                  <TableCell className="text-center text-blue-600">{total.interested}</TableCell>
                  <TableCell className="text-center text-red-500">{total.not_interested}</TableCell>
                  <TableCell className="text-center">{total.other_location}</TableCell>
                  <TableCell className="text-center">{total.lost}</TableCell>
                  <TableCell className="text-center text-green-600">{total.visit}</TableCell>
                  <TableCell className="text-center text-blue-600">{totalInterestedPct}%</TableCell>
                  <TableCell className="text-center text-green-600">{totalVisitPct}%</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductivityTeamLeaderPage;