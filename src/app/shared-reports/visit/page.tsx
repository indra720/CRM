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
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Phone,
  MessageSquare,
  ArrowUpDown,
  Search,
  RefreshCcw,
  ArrowLeft,
  Eye,
  MoreVertical,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    className?: string;
  }
}

type Lead = {
  id: number;
  name: string;
  call: string;
  status: string;
};

const mockLeads: Lead[] = [
  { id: 11, name: 'Aryan Mehta', call: '9876543220', status: 'Visit' },
  { id: 12, name: 'Kiara Sen', call: '9876543221', status: 'Visit' },
];

const LeadDetailsDialog = ({
  lead,
  open,
  onOpenChange,
}: {
  lead: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lead Details</DialogTitle>
          <DialogDescription>View the details of the selected lead.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={lead.name} className="col-span-3" readOnly />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="call" className="text-right">
              Call
            </Label>
            <Input id="call" value={lead.call} className="col-span-3" readOnly />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Input id="status" value={lead.status} className="col-span-3" readOnly />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const VisitLeadsPage = () => {
  const [data] = useState(mockLeads);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLeadDetails, setSelectedLeadDetails] = useState<any | null>(null);

  const openDetailsModal = (lead: any) => {
    setSelectedLeadDetails(lead);
    setShowDetailsModal(true);
  };

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
              <DropdownMenuItem onClick={() => openDetailsModal(row.original)}>
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

  const handleSearch = () => {
    console.log('Searching:', table.getColumn('name')?.getFilterValue());
  };

  const handleRefresh = () => {
    table.getColumn('name')?.setFilterValue('');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 🔹 Header Section */}
      <div className="flex items-center md:flex-row flex-row-reverse md:justify-between justify-end w-full gap-3">
        <h1 className="md:text-2xl text-xl  font-normal">Visit Leads</h1>
    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Link href="/superadmin/users/admin">
        <Button
          variant="outline"
          className="p-2 h-10 w-10 rounded-sm shadow-sm bg-white hover:bg-gray-100 hover:text-black transition-all duration-300"
        >
          <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
        </Button>
      </Link>
    </TooltipTrigger>

    <TooltipContent side="right" className="bg-gray-800 text-white px-2 py-1 text-xs rounded-md shadow-md">
      Back
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

      </div>

      {/* 🔹 Main Card */}
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

            {/* 📋 Table */}
            <div className="w-full rounded-md border overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className={cn('px-2 py-1 text-center', header.column.columnDef.meta?.className)}
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
                            className={cn('px-2 py-1 text-center', cell.column.columnDef.meta?.className)}
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

      {/* 🔹 Lead Details Modal */}
      {selectedLeadDetails && (
        <LeadDetailsDialog
          lead={selectedLeadDetails}
          open={showDetailsModal}
          onOpenChange={setShowDetailsModal}
        />
      )}
    </div>
  );
};

export default VisitLeadsPage;
