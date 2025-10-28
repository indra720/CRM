'use client';

import React, { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Phone, MessageSquare, ArrowUpDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Lead = {
  id: number;
  name: string;
  call: string;
  status: string;
};

const mockLeads: Lead[] = [
    { id: 1, name: 'Aarav Sharma', call: '9876543210', status: 'New' },
    { id: 2, name: 'Saanvi Patel', call: '9876543211', status: 'Contacted' },
    { id: 3, name: 'Vihaan Singh', call: '9876543212', status: 'Interested' },
    { id: 4, name: 'Myra Reddy', call: '9876543213', status: 'Lost' },
    { id: 5, name: 'Kabir Verma', call: '9876543214', status: 'New' },
    { id: 6, name: 'Diya Gupta', call: '9876543215', status: 'Contacted' },
    { id: 7, name: 'Ishaan Kumar', call: '9876543216', status: 'New' },
    { id: 8, name: 'Advika Joshi', call: '9876543217', status: 'Lost' },
    { id: 9, name: 'Reyansh Mehra', call: '9876543218', status: 'Interested' },
    { id: 10, name: 'Ananya Desai', call: '9876543219', status: 'New' },
];

export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'call',
    header: 'Call',
    cell: ({ row }) => (
      <a href={`tel:${row.getValue('call')}`} className="inline-block hover:scale-110 transition-transform">
        <Phone className="h-5 w-5 text-blue-500" />
      </a>
    ),
  },
  {
    accessorKey: 'whatsapp',
    header: 'Whatsapp',
    cell: ({ row }) => (
      
        <a href={"https://wa.me/" + row.getValue('call') + "?text=" + encodeURIComponent('Hello ' + row.original.name)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block hover:scale-110 transition-transform"
      >
        <MessageSquare className="h-6 w-6 text-green-500" />
      </a>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('status')}</div>,
  },
];


const UploadLeadsPage = () => {
  const [data] = useState(mockLeads);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">View Uploaded Leads</h1>
        
        <div className="grid gap-4">
          {/* ✅ EXACT STRUCTURE FROM DOCUMENT 4 */}
          <Card className="overflow-hidden">
            <CardContent className="p-2 md:p-6 md:pt-0">
              
              {/* Search Bar - Above Table */}
              <div className="flex items-center justify-between mb-4 px-2 pt-4 md:px-0">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search leads..."
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                      table.getColumn('name')?.setFilterValue(event.target.value)
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              {/* ✅ SCROLLABLE TABLE - EXACT SAME AS DOCUMENT 4 */}
<div className="w-full rounded-md border overflow-x-auto">
                        <Table className="min-w-[400px]">
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                                                                            <TableHead key={header.id} className="text-center px-1">                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && 'selected'}
                        >
                          {row.getVisibleCells().map((cell) => (
                                                                            <TableCell key={cell.id} className="text-center px-1">                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t">
                <div className="flex flex-col items-center space-y-2 py-4">
                    <div className="text-sm text-muted-foreground">
                        Showing {table.getRowModel().rows.length} of {data.length} entries
                    </div>
                    <div className="space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => table.previousPage()}
                                                disabled={!table.getCanPreviousPage()}
                                                className={!table.getCanPreviousPage() ? '' : 'bg-orange-500 hover:bg-orange-600 text-white'}
                                            >
                                                Previous
                                            </Button>                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className={!table.getCanNextPage() ? '' : 'bg-orange-500 hover:bg-orange-600 text-white'}
                        >
                            Next
                        </Button>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
    </div>
  );
};

export default UploadLeadsPage;