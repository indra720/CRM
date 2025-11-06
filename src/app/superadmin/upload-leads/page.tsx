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

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Phone, MessageSquare, ArrowUpDown, Search, RefreshCcw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
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
      <a
        href={'https://wa.me/' + row.getValue('call') + '?text=' + encodeURIComponent('Hello ' + row.original.name)}
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
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
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

  const handleRefresh = () => {
    table.getColumn('name')?.setFilterValue('');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ✅ Title + Back Button */}
      <div className="flex items-center md:flex-row flex-row-reverse md:justify-between justify-end w-full gap-3">
        <h1 className="md:text-2xl text-xl font-medium">View Uploaded Leads</h1>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/superadmin/users/admin">
                <Button
                  variant="outline"
                  className="group flex items-center gap-2 p-2 rounded-md shadow-sm bg-white hover:bg-gray-100 hover:text-black transition-all duration-300"
                >
                  <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                
                </Button>
              </Link>
            </TooltipTrigger>

            <TooltipContent
              side="bottom"
              className="bg-gray-800 text-white px-2 py-1 text-xs rounded-md shadow-md"
            >
              Back
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* ✅ Card Section */}
      <div className="grid gap-4">
             <Card className="overflow-hidden shadow-md">
               <CardContent className="p-3 md:p-6">
                 <div className="flex items-center gap-2 mb-4">
                   {/* Search Input */}
                   <div className="relative w-full max-w-sm flex-grow">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input
                       placeholder="Search leads..."
                       value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                       onChange={(e) =>
                         table.getColumn('name')?.setFilterValue(e.target.value)
                       }
                       className="pl-10 w-[170px] md:w-full"
                     />
                   </div>
     
                   {/* Buttons */}
                   <div className="flex items-center gap-2">
                     {/* 🔍 Search Button */}
                     <Button
                       variant="default"
                       size="sm"
                       className="flex items-center gap-1"
                       onClick={() =>
                         console.log('Searching for:', table.getColumn('name')?.getFilterValue())
                       }
                     >
                       <Search className="h-4 w-4" />
                       <span className="hidden sm:inline">Search</span>
                     </Button>
     
                     {/* 🔁 
                     
                     
                     Button */}
                     <Button
                       variant="outline"
                       size="sm"
                       className="flex items-center gap-1"
                       onClick={handleRefresh}
                     >
                       <RefreshCcw className="h-4 w-4" />
                       <span className="hidden sm:inline">Refresh</span>
                     </Button>
                   </div>
                 </div>

            {/* 📋 Scrollable Table */}
            <div className="w-full rounded-md border overflow-x-auto">
              <Table className="min-w-[400px]">
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="text-center px-1">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="text-center px-1">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

            {/* 🔢 Pagination */}
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
                    className={
                      !table.getCanPreviousPage()
                        ? ''
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    }
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className={
                      !table.getCanNextPage()
                        ? ''
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    }
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
