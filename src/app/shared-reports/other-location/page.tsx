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
  History,
  MoreVertical,
  Eye,
  User,
  Flag,
  RefreshCcw,
  X,
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';

type Lead = {
  id: number;
  name: string;
  call: string;
  status: string;
};

// Mock data
const mockLeads: Lead[] = [
  { id: 1, name: 'Aarav Sharma', call: '9876543210', status: 'Other Location' },
  { id: 2, name: 'Rohan Singh', call: '9876543222', status: 'Other Location' },
  { id: 3, name: 'Isha Verma', call: '9876543233', status: 'Other Location' },
  { id: 4, name: 'Ananya Joshi', call: '9876543244', status: 'Other Location' },
  { id: 5, name: 'Raj Mehta', call: '9876543255', status: 'Other Location' },
];

const OtherLocationLeadsPage = () => {
  const [data] = useState(mockLeads);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Table Columns
  const columns: ColumnDef<Lead>[] = [
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
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="capitalize">{row.getValue('status')}</div>,
      meta: { className: 'hidden md:table-cell' },
    },
    {
      id: 'history',
      header: 'History',
      cell: () => (
        <Button variant="ghost" size="icon" onClick={() => setShowHistory(true)}>
          <History className="h-5 w-5 text-muted-foreground" />
        </Button>
      ),
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
    state: {
      sorting,
      columnFilters,
    },
  });

  // Filtered "Other Location" data for History
  const filteredHistory = data.filter(
    (lead) =>
      lead.status.toLowerCase() === 'other location' &&
      (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  function handleRefresh(event:React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="flex flex-col gap-6 relative">
      {/* Header Section */}
      <div className="flex items-center md:flex-row flex-row-reverse md:justify-between justify-end w-full gap-3">
        <h1 className="md:text-2xl text-xl font-medium">Other Location Leads</h1>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/superadmin/users/admin">
                <Button variant="outline" className="group flex items-center gap-2 p-2 rounded-md shadow-sm bg-white hover:bg-gray-100 hover:text-black transition-all duration-300">
                  <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-gray-800 text-white px-2 py-1 text-xs rounded-md shadow-md">
              Back
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Table Section */}
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

      {/* Details Dialog */}
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

      {/* 🕘 History Popup Card */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
          >
            <Card className="w-full max-w-2xl h-[520px] bg-white/95 rounded-2xl shadow-2xl border border-blue-200 relative overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b bg-gradient-to-r from-orange-400 to-orange-500 text-white flex justify-between items-center">
                <h2 className="text-lg font-semibold tracking-wide">📜 Other Location History</h2>
                <Button variant="ghost" className="text-white hover:bg-white/20" onClick={() => setShowHistory(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Search */}
              <div className="relative p-4">
                <Search className="absolute left-6 top-7 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name or status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Scrollable Records */}
              <ScrollArea className="h-[370px] px-4 pb-4 scrollbar-hide">
                <CardContent className="space-y-3">
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((record) => (
                      <motion.div
                        key={record.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-gradient-to-r from-blue-50 to-orange-50 hover:from-orange-200 hover:to-orange-100 rounded-xl shadow-md border border-gray-200 transition-all duration-300 flex justify-between items-center"
                      >
                        <div>
                          <p className="font-semibold text-gray-800">{record.name}</p>
                          <p className="text-sm text-gray-600">{record.status}</p>
                        </div>
                        <div className="text-right text-xs text-gray-500">
                          <p>05 Nov 2025</p>
                          <p>11:00 AM</p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-400 mt-20">
                      No matching records found.
                    </motion.p>
                  )}
                </CardContent>
              </ScrollArea>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default OtherLocationLeadsPage;
