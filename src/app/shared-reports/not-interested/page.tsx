'use client';

import React, { useMemo, useState } from 'react';
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

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Search as SearchIcon,
  ArrowLeft,
  History,
  MoreVertical,
  Eye,
  User,
  Flag,
  RotateCcw,
  RefreshCcw,
  Search,
  Check,
  ChevronDown,
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
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

// helper imports (adjust path if your project keeps them elsewhere)
// import { useToast } from '@/components/ui/use-toast'; // shadcn-style toast hook (common pattern)
import { cn } from '@/lib/utils'; // classnames helper
import { useToast } from '@/hooks/use-toast';

type HistoryEntry = {
  id: number;
  leadId: number;
  leadName: string;
  date: string; // '01 Nov 2025'
  time?: string; // optional
  activity: string; // Called, Message, Email, Visit, etc.
  note: string;
  statusAfter?: string; // optional status snapshot
};

type Lead = {
  id: number;
  name: string;
  call: string;
  status: string;
  email?: string;
  history?: HistoryEntry[];
};

// ---------------------- Mock data (replace with real data as needed) ----------------------
const mockLeads: Lead[] = [
  {
    id: 1,
    name: 'Aarav Sharma',
    call: '9876543210',
    status: 'New',
    email: 'aarav@example.com',
    history: [
      { id: 1, leadId: 1, leadName: 'Aarav Sharma', date: '01 Nov 2025', time: '10:30 AM', activity: 'Called', note: 'Left voicemail', statusAfter: 'New' },
      { id: 2, leadId: 1, leadName: 'Aarav Sharma', date: '03 Nov 2025', time: '02:15 PM', activity: 'Message Sent', note: 'Sent brochure on WhatsApp', statusAfter: 'Contacted' },
    ],
  },
  {
    id: 2,
    name: 'Saanvi Patel',
    call: '9876543211',
    status: 'Contacted',
    email: 'saanvi@example.com',
    history: [
      { id: 3, leadId: 2, leadName: 'Saanvi Patel', date: '31 Oct 2025', time: '03:45 PM', activity: 'Visited', note: 'Visited branch — interested in demo', statusAfter: 'Visit' },
      { id: 4, leadId: 2, leadName: 'Saanvi Patel', date: '02 Nov 2025', time: '11:00 AM', activity: 'Follow Up', note: 'Provided additional documents', statusAfter: 'Contacted' },
    ],
  },
  {
    id: 3,
    name: 'Vihaan Singh',
    call: '9876543212',
    status: 'Interested',
    email: 'vihaan@example.com',
    history: [
      { id: 5, leadId: 3, leadName: 'Vihaan Singh', date: '30 Oct 2025', time: '11:15 AM', activity: 'Called', note: 'Asked for discount', statusAfter: 'Interested' },
    ],
  },
  {
    id: 4,
    name: 'Myra Reddy',
    call: '9876543213',
    status: 'Not Interested',
    email: 'myra@example.com',
    history: [
      { id: 6, leadId: 4, leadName: 'Myra Reddy', date: '01 Nov 2025', time: '09:10 AM', activity: 'Called', note: 'Spoke — marked as Not Interested', statusAfter: 'Not Interested' },
      { id: 7, leadId: 4, leadName: 'Myra Reddy', date: '28 Oct 2025', time: '04:05 PM', activity: 'Message Sent', note: 'Follow-up message on WhatsApp', statusAfter: 'Contacted' },
      { id: 8, leadId: 4, leadName: 'Myra Reddy', date: '20 Oct 2025', time: '02:30 PM', activity: 'Email Sent', note: 'Introductory email sent', statusAfter: 'New' },
    ],
  },
  {
    id: 5,
    name: 'Kabir Verma',
    call: '9876543214',
    status: 'New',
    email: 'kabir@example.com',
    history: [{ id: 9, leadId: 5, leadName: 'Kabir Verma', date: '27 Oct 2025', time: '01:05 PM', activity: 'Called', note: 'Left voicemail', statusAfter: 'New' }],
  },
  {
    id: 6,
    name: 'Diya Gupta',
    call: '9876543215',
    status: 'Remaining',
    email: 'diya@example.com',
    history: [{ id: 10, leadId: 6, leadName: 'Diya Gupta', date: '26 Oct 2025', time: '04:50 PM', activity: 'Called', note: 'Requested callback next week', statusAfter: 'Remaining' }],
  },
  {
    id: 7,
    name: 'Ishaan Kumar',
    call: '9876543216',
    status: 'New',
    email: 'ishaan@example.com',
    history: [{ id: 11, leadId: 7, leadName: 'Ishaan Kumar', date: '24 Oct 2025', time: '05:00 PM', activity: 'Message Sent', note: 'Intro message with brochure', statusAfter: 'New' }],
  },
  {
    id: 8,
    name: 'Advika Joshi',
    call: '9876543217',
    status: 'Not Interested',
    email: 'advika@example.com',
    history: [
      { id: 12, leadId: 8, leadName: 'Advika Joshi', date: '29 Oct 2025', time: '02:20 PM', activity: 'Called', note: 'Client asked for callback next month', statusAfter: 'Not Interested' },
      { id: 13, leadId: 8, leadName: 'Advika Joshi', date: '25 Oct 2025', time: '11:10 AM', activity: 'Message Sent', note: 'Sent brochure on WhatsApp', statusAfter: 'Contacted' },
    ],
  },
  {
    id: 9,
    name: 'Reyansh Mehra',
    call: '9876543218',
    status: 'Interested',
    email: 'reyansh@example.com',
    history: [{ id: 14, leadId: 9, leadName: 'Reyansh Mehra', date: '24 Oct 2025', time: '11:10 AM', activity: 'Visited', note: 'Visited — liked demo', statusAfter: 'Visit' }],
  },
  {
    id: 10,
    name: 'Ananya Desai',
    call: '9876543219',
    status: 'New',
    email: 'ananya@example.com',
    history: [{ id: 15, leadId: 10, leadName: 'Ananya Desai', date: '23 Oct 2025', time: '09:00 AM', activity: 'Called', note: 'Asked for timeline', statusAfter: 'New' }],
  },
];

// ---------------------- Component ----------------------
const NotInterestedLeadsPage: React.FC = () => {
  // table & state
  const [data, setData] = useState<Lead[]>(mockLeads);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // history dialog state + search term for history
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [historySearch, setHistorySearch] = useState('');

  const { toast } = useToast(); // use toast for notifications (adjust if your project uses different hook)

  const columns: ColumnDef<Lead>[] = [
    {
      id: 'sn',
      header: 'S.N.',
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: 'name',
      header: 'Name',
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
      id: 'whatsapp',
      header: 'Whatsapp',
      cell: ({ row }) => (
        <a
          href={`https://wa.me/${row.original.call}?text=Hello%20${encodeURIComponent(row.original.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block hover:scale-110 transition-transform"
        >
          <MessageSquare className="h-6 w-6 text-green-500" />
        </a>
      ),
      meta: {
        className: 'hidden md:table-cell',
      },
    },

    // --------- REPLACED Status with full Change Status dropdown (color-coded + updates state) ----------
    {
      id: 'status',
      header: 'Change Status',
      cell: ({ row }) => {
        // local per-cell state (fine for UX; main table state updated below)
        const [isOpen, setIsOpen] = useState(false);
        const [selectedStatus, setSelectedStatus] = useState(row.original.status);

        // Status options with tailwind color classes (bg, text, border)
        const statuses = [
          { label: 'New', color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { label: 'Contacted', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
          { label: 'Interested', color: 'bg-green-50 text-green-700 border-green-200' },
          { label: 'Visit', color: 'bg-purple-50 text-purple-700 border-purple-200' },
          { label: 'Not Interested', color: 'bg-red-50 text-red-700 border-red-200' },
          { label: 'Remaining', color: 'bg-gray-50 text-gray-700 border-gray-200' },
        ];

        const handleStatusChange = (option: { label: string; color: string }) => {
          setSelectedStatus(option.label);
          setIsOpen(false);

          // Update main data list
          setData((prev) =>
            prev.map((lead) =>
              lead.id === row.original.id ? { ...lead, status: option.label } : lead
            )
          );

          // Toast notification
          toast({
            title: 'Status updated',
            description: `${row.original.name} → ${option.label}`,
          });
        };

        const currentColor =
          statuses.find((s) => s.label === selectedStatus)?.color ||
          'bg-gray-50 text-gray-700 border-gray-200';

        return (
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  'h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm font-medium rounded-xl border transition-all duration-300 ease-in-out shadow-sm hover:shadow-md  items-center justify-center gap-1 group capitalize',
                  currentColor
                )}
              >
                <span className="truncate max-w-[90px] sm:max-w-[120px]">{selectedStatus}</span>
                <ChevronDown
                  size={14}
                  className={cn(
                    'ml-1 transition-transform duration-300 text-gray-500 group-hover:text-current',
                    isOpen && 'rotate-180'
                  )}
                />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              side="top"
              sideOffset={8}
              className="w-44 sm:w-48 rounded-xl border border-gray-100 bg-white/95 backdrop-blur-xl shadow-xl transition-all duration-200 ease-in-out"
            >
              {statuses.map((option) => {
                const isSelected = selectedStatus === option.label;
                return (
                  <DropdownMenuItem
                    key={option.label}
                    onSelect={() => handleStatusChange(option)}
                    className={cn(
                      'flex items-center justify-between px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg cursor-pointer transition-all duration-200',
                      isSelected
                        ? `${option.color} font-semibold`
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && <Check size={16} className="text-current" />}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      meta: {
        className: 'hidden md:table-cell',
      },
    },

    {
      id: 'historyAction',
      header: 'History',
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          {/* History Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsHistoryDialogOpen(true)}
            title="View Combined History"
            className="p-1.5 md:p-2 hover:bg-blue-50 rounded-full transition-all duration-200"
          >
            <History className="h-4 w-4 md:h-5 md:w-5 text-gray-600 hover:text-blue-600 transition-colors" />
          </Button>

          {/* View Details Button - visible on md+ screens */}
          <div className="hidden md:block">
            {/* Uncomment if you want a full 'View Details' on desktop */}
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedLead(row.original);
                setIsDetailsOpen(true);
              }}
              className="text-xs md:text-sm px-2 md:px-3 py-1 md:py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
            >
              <Eye className="mr-1 h-3.5 w-3.5 md:h-4 md:w-4" /> View Details
            </Button> */}
          </div>

          {/* Dropdown Menu - visible on mobile */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-1.5 hover:bg-blue-50 rounded-full transition-all duration-200"
                >
                  <MoreVertical className="h-4 w-4 text-gray-600 hover:text-blue-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 shadow-md">
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedLead(row.original);
                    setIsDetailsOpen(true);
                  }}
                  className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
                >
                  <Eye className="h-4 w-4 text-blue-600" />
                  View Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ),
    },
  ];

  // table instance
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

  // combine all history entries into single array (flattened), used in the combined history card
  const allHistoryEntries: HistoryEntry[] = useMemo(() => {
    const arr: HistoryEntry[] = [];
    data.forEach((lead) => {
      (lead.history || []).forEach((h) => arr.push({ ...h }));
    });
    // sort descending by id (newest first)
    arr.sort((a, b) => b.id - a.id);
    return arr;
  }, [data]);

  // filtered combined history according to historySearch (search across leadName, activity, note, statusAfter, date)
  const filteredCombinedHistory = useMemo(() => {
    const q = historySearch.trim().toLowerCase();
    if (!q) return allHistoryEntries;
    return allHistoryEntries.filter(
      (h) =>
        h.leadName.toLowerCase().includes(q) ||
        h.activity.toLowerCase().includes(q) ||
        h.note.toLowerCase().includes(q) ||
        (h.statusAfter || '').toLowerCase().includes(q) ||
        h.date.toLowerCase().includes(q)
    );
  }, [allHistoryEntries, historySearch]);

  const handleRefresh = () => {
    setData([...mockLeads]);
    table.getColumn('name')?.setFilterValue('');
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between w-full gap-3">
        <div>
          <h1 className="text-2xl font-medium">Leads</h1>
          <p className="text-sm text-gray-500">View leads and combined history</p>
        </div>

        <div className="flex items-center gap-2">
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

          {/* History icon (kept commented out in your original - you can enable if needed) */}
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-2 h-10 w-10 rounded-sm"
                  onClick={() => setIsHistoryDialogOpen(true)}
                >
                  <History className="h-5 w-5 text-gray-700" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-gray-800 text-white px-2 py-1 text-xs rounded-md">
                Combined History
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
        </div>
      </div>

      {/* Search & Table Card */}
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
                  className="pl-10 w-[160px] md:w-full"
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

      {/* ---------------- Combined History Dialog ---------------- */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="w-[95vw] sm:max-w-3xl rounded-xl p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-orange-500" /> All Leads — Combined History
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              View all activities across all leads. Use the search to filter by name, status, activity, note or date.
            </DialogDescription>
          </DialogHeader>

          {/* Search inside history */}
          <div className="mt-2 mb-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search history by name, activity, note, status or date..."
                className="pl-10"
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
              />
            </div>
          </div>

          {/* Combined history list (scrollable) */}
          <div className="max-h-[55vh] overflow-y-scroll scrollbar-hide space-y-3 pr-2">
            {filteredCombinedHistory.length > 0 ? (
              filteredCombinedHistory.map((entry) => (
                <Card key={entry.id} className="shadow-sm rounded-xl border border-gray-100">
                  <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="rounded-full bg-orange-50 p-2 flex items-center justify-center">
                        <User className="h-5 w-5 text-orange-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {entry.leadName} <span className="text-xs text-gray-500">· {entry.date}{entry.time ? ` · ${entry.time}` : ''}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {entry.activity} — {entry.note}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-gray-500">Status</div>
                      <div className="text-sm font-medium text-orange-600">
                        {entry.statusAfter ?? '—'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">No history records found.</div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Details Dialog (for mobile 'more') */}
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

export default NotInterestedLeadsPage;
