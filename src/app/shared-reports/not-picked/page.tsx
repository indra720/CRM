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

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Phone,
  MessageSquare,
  ArrowUpDown,
  Search,
  ArrowLeft,
  History,
  RefreshCcw,
  Clock,
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';

// Lead type
type Lead = {
  id: number;
  name: string;
  call: string;
  status: string;
  history: {
    status: string;
    date: string;
    time: string;
  }[];
};

// Sample data
const mockLeads: Lead[] = [
  {
    id: 13,
    name: 'Arjun Rao',
    call: '9876543222',
    status: 'Not Picked',
    history: [
      { status: 'New', date: '01 Nov 2025', time: '10:00 AM' },
      { status: 'Contacted', date: '02 Nov 2025', time: '01:30 PM' },
      { status: 'Not Picked', date: '03 Nov 2025', time: '11:15 AM' },
    ],
  },
  {
    id: 14,
    name: 'Zara Khan',
    call: '9876543223',
    status: 'Not Picked',
    history: [
      { status: 'New', date: '29 Oct 2025', time: '09:40 AM' },
      { status: 'Interested', date: '30 Oct 2025', time: '02:00 PM' },
      { status: 'Visit', date: '31 Oct 2025', time: '03:30 PM' },
    ],
  },
];

const NotPickedLeadsPage = () => {
  const [data] = useState(mockLeads);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // React Table columns
  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
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
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
          {row.getValue('status')}
        </span>
      ),
    },
    {
      id: 'history',
      header: 'History',
      cell: () => (
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100"
          onClick={() => setShowHistory(true)}
        >
          <History className="h-5 w-5 text-gray-600" />
        </Button>
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

  const handleRefresh = () => window.location.reload();

  // Combined filtered history
  const allHistories = data
    .flatMap((lead) =>
      lead.history.map((item) => ({
        ...item,
        name: lead.name,
        call: lead.call,
      }))
    )
    .filter(
      (h) =>
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Not Picked Leads</h1>

        <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/superadmin/users/admin">
                  <Button variant="outline" className="p-2 h-10 w-10 rounded-sm bg-white hover:bg-gray-100">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-gray-800 text-white px-2 py-1 text-xs rounded-md">
                Back
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
      </div>

      {/* Main Table */}
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
                            className="pl-10 w-[140px] md:w-full"
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
      {/* History Card - Only Orange Themed */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <Card className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-xl">
              <CardHeader className="bg-orange-400 text-white flex justify-between items-center p-4 rounded-t-xl">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5" /> All Leads History
                </h2>
              


              </CardHeader>
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

              <CardContent className="p-5 max-h-[60vh] overflow-y-scroll scrollbar-hide space-y-3 bg-white/95">
                {allHistories.length === 0 ? (
                  <p className="text-center text-gray-500 italic">
                    No matching history found.
                  </p>
                ) : (
                  allHistories.map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 border border-gray-300 rounded-lg hover:bg-orange-100 bg-white/95 hover:shadow-md transition"
                    >
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm font-medium text-gray-500">{item.status}</p>
                      <p className="text-xs text-gray-500">
                        {item.date} • {item.time}
                      </p>
                    </motion.div>
                  ))
                )}
              </CardContent>

              

              <div className="p-4 border-t flex justify-end bg-orange-50">
                <Button
                  onClick={() => setShowHistory(false)}
                  variant="outline"
                  className="border-orange-500 text-black hover:bg-orange-100"
                >
                  Close
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotPickedLeadsPage;
