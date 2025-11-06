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
import {
  Phone,
  MessageSquare,
  ArrowUpDown,
  Search,
  ArrowLeft,
  RefreshCcw,
  MoreVertical,
  Eye,
  User,
  Flag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DetailsDialog } from '@/components/details-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

type Lead = {
  id: number;
  name: string;
  call: string;
  status: string;
};

const mockLeads: Lead[] = [
  { id: 2, name: 'Saanvi Patel', call: '9876543211', status: 'Remaining' },
  { id: 6, name: 'Diya Gupta', call: '9876543215', status: 'Remaining' },
];

const RemainingLeadsPage = () => {
  const [data] = useState(mockLeads);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
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
        <a
          href={`tel:${row.getValue('call')}`}
          className="inline-block hover:scale-110 transition-transform"
        >
          <Phone className="h-5 w-5 text-blue-500" />
        </a>
      ),
    },
    {
      accessorKey: 'whatsapp',
      header: 'Whatsapp',
      cell: ({ row }) => (
        <a
          href={`https://wa.me/${row.getValue('call')}?text=Hello%20${row.original.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block hover:scale-110 transition-transform"
        >
          <MessageSquare className="h-6 w-6 text-green-500" />
        </a>
      ),
      meta: { className: 'hidden md:table-cell' },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="capitalize">{row.getValue('status')}</div>,
      meta: { className: 'hidden md:table-cell' },
    },
    {
      id: 'more',
      header: '',
      cell: ({ row }) => (
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setSelectedLead(row.original);
                  setIsDetailsOpen(true);
                }}
              >
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters },
  });

  // 🔁 Refresh Function
  const handleRefresh = () => {
    table.getColumn('name')?.setFilterValue('');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 🔹 Header Section */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        {/* Hide title on very small screens */}
        <h1 className="text-2xl font-medium hidden sm:block">Remaining Leads</h1>

        {/* Back Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/superadmin/users/admin">
                <Button
                  variant="outline"
                  className="group p-2 h-10 w-10 rounded-sm shadow-sm bg-white hover:bg-gray-100 hover:text-black transition-all duration-300"
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

      {/* 🔍 Search + Refresh Section */}
      <div className="grid gap-4">
        <Card className="overflow-hidden shadow-md">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center  gap-2 mb-4">
              {/* Search Input */}
              <div className="relative w-full max-w-sm flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                  onChange={(e) =>
                    table.getColumn('name')?.setFilterValue(e.target.value)
                  }
                  className="pl-10 w-[180px] md:w-full"
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

                {/* 🔁 Refresh Button */}
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

            {/* 🧾 Table Section */}
            <div className="overflow-x-auto">
              <Table className="min-w-[700px]">
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className={header.column.columnDef.meta?.className}
                        >
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
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className={cell.column.columnDef.meta?.className}
                          >
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
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink isActive>
                      {table.getState().pagination.pageIndex + 1}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 🧾 Details Dialog */}
      {selectedLead && (
        <DetailsDialog
          title="Lead Details"
          description={`Full details for ${selectedLead.name}.`}
          details={[
            { label: 'Name', value: selectedLead.name, icon: User },
            { label: 'Mobile', value: selectedLead.call, icon: Phone },
            { label: 'Status', value: selectedLead.status, icon: Flag },
          ]}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      )}
    </div>
  );
};

export default RemainingLeadsPage;
