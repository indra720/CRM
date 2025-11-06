"use client";

import React, { useState } from "react";
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
} from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Phone,
  MessageSquare,
  Search as SearchIcon,
  ArrowLeft,
  PlusCircle,
  User,
  Flag,
  Mail,
  MoreVertical,
  Eye,
  History,
  RefreshCcw,
  Check,
  ChevronDown,
  Clock,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DetailsDialog } from "@/components/details-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

// ---------------------- Mock Data ----------------------
type Lead = {
  id: number;
  name: string;
  call: string;
  status: string;
  email?: string;
};

const mockLeads: Lead[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    call: "9876543210",
    status: "New",
    email: "aarav@example.com",
  },
  {
    id: 2,
    name: "Saanvi Patel",
    call: "9876543211",
    status: "Contacted",
    email: "saanvi@example.com",
  },
  {
    id: 3,
    name: "Vihaan Singh",
    call: "9876543212",
    status: "Interested",
    email: "vihaan@example.com",
  },
  {
    id: 4,
    name: "Myra Reddy",
    call: "9876543213",
    status: "Not Interested",
    email: "myra@example.com",
  },
  {
    id: 5,
    name: "Kabir Verma",
    call: "9876543214",
    status: "New",
    email: "kabir@example.com",
  },
  {
    id: 6,
    name: "Diya Gupta",
    call: "9876543215",
    status: "Remaining",
    email: "diya@example.com",
  },
  {
    id: 7,
    name: "Ishaan Kumar",
    call: "9876543216",
    status: "New",
    email: "ishaan@example.com",
  },
  {
    id: 8,
    name: "Advika Joshi",
    call: "9876543217",
    status: "Not Interested",
    email: "advika@example.com",
  },
  {
    id: 9,
    name: "Reyansh Mehra",
    call: "9876543218",
    status: "Interested",
    email: "reyansh@example.com",
  },
  {
    id: 10,
    name: "Ananya Desai",
    call: "9876543219",
    status: "New",
    email: "ananya@example.com",
  },
];

// ---------------------- History mock ----------------------
type HistoryEntry = {
  id: number;
  name: string;
  oldStatus: string;
  newStatus: string;
  date: string;
  time: string;
  bsUploaded?: boolean;
  kycUploaded?: boolean;
  bsNotes?: string;
  kycNotes?: string;
};

const mockHistoryData: HistoryEntry[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    oldStatus: "New",
    newStatus: "Contacted",
    date: "01 Nov 2025",
    time: "10:30 AM",
    bsUploaded: true,
    kycUploaded: false,
    bsNotes: "Bank statement received (Aug-Oct)",
    kycNotes: "",
  },
  {
    id: 2,
    name: "Saanvi Patel",
    oldStatus: "Interested",
    newStatus: "Visit",
    date: "31 Oct 2025",
    time: "03:45 PM",
    bsUploaded: false,
    kycUploaded: true,
    bsNotes: "",
    kycNotes: "Aadhar verified",
  },
  {
    id: 3,
    name: "Vihaan Singh",
    oldStatus: "Contacted",
    newStatus: "Not Interested",
    date: "30 Oct 2025",
    time: "11:15 AM",
    bsUploaded: false,
    kycUploaded: false,
    bsNotes: "",
    kycNotes: "",
  },
  {
    id: 4,
    name: "Anaya Mehta",
    oldStatus: "Visit",
    newStatus: "Negotiation",
    date: "29 Oct 2025",
    time: "09:45 AM",
    bsUploaded: true,
    kycUploaded: true,
    bsNotes: "Verified income",
    kycNotes: "PAN validated",
  },
  {
    id: 5,
    name: "Reyansh Gupta",
    oldStatus: "New",
    newStatus: "Interested",
    date: "28 Oct 2025",
    time: "01:30 PM",
    bsUploaded: false,
    kycUploaded: false,
    bsNotes: "",
    kycNotes: "",
  },
  {
    id: 6,
    name: "Aditi Verma",
    oldStatus: "Negotiation",
    newStatus: "Converted",
    date: "27 Oct 2025",
    time: "04:50 PM",
    bsUploaded: true,
    kycUploaded: true,
    bsNotes: "Final documents received",
    kycNotes: "KYC completed",
  },
  {
    id: 7,
    name: "Kabir Malhotra",
    oldStatus: "Interested",
    newStatus: "Follow Up",
    date: "26 Oct 2025",
    time: "02:20 PM",
    bsUploaded: false,
    kycUploaded: false,
    bsNotes: "",
    kycNotes: "",
  },
  {
    id: 8,
    name: "Mira Bansal",
    oldStatus: "Visit",
    newStatus: "Negotiation",
    date: "25 Oct 2025",
    time: "11:10 AM",
    bsUploaded: true,
    kycUploaded: true,
    bsNotes: "Salary slips uploaded",
    kycNotes: "Aadhar validated",
  },
  {
    id: 9,
    name: "Devansh Nair",
    oldStatus: "Contacted",
    newStatus: "Visit",
    date: "24 Oct 2025",
    time: "05:00 PM",
    bsUploaded: false,
    kycUploaded: true,
    bsNotes: "",
    kycNotes: "KYC approved",
  },
  {
    id: 10,
    name: "Ira Khanna",
    oldStatus: "Negotiation",
    newStatus: "Not Interested",
    date: "23 Oct 2025",
    time: "09:00 AM",
    bsUploaded: false,
    kycUploaded: false,
    bsNotes: "",
    kycNotes: "",
  },
];

// ---------------------- HistoryCard (simple) ----------------------
const HistoryCard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState(""); // ✅ add this line
  return (
    <div className="w-full max-w-3xl mx-auto space-y-3 p-0 sm:p-4">
      {/* Search Bar */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
        <Input
          type="text"
          placeholder="Search history by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 w-full border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
        />
      </div>

      {/* History List Container */}
      <div
        className={`${
          mockHistoryData.length > 3 ? "max-h-[60vh] overflow-y-scroll scrollbar-hide " : ""
        } space-y-3 sm:space-y-4 p-0  sm:p-5 rounded-x2 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-inner scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100`}
        
      >
        {mockHistoryData.length > 0 ? (
          mockHistoryData
            .filter((entry) =>
              entry.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((entry) => (
              <Card
                key={entry.id}
                className="shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 rounded-xl hover:scale-[1.01] bg-white"
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-5">
                    {/* Left Section */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="rounded-full bg-orange-100 p-2 sm:p-3 shadow-sm flex items-center justify-center">
                        <History className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                          {entry.name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {entry.date} · {entry.time}
                        </p>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l border-gray-200 sm:pl-4 pt-2 sm:pt-0">
                      <div className="flex sm:block justify-between sm:justify-start items-center sm:items-start gap-1 sm:gap-0">
                        <span className="text-xs text-gray-500">From</span>
                        <span className="text-sm font-medium text-gray-700">
                          {entry.oldStatus}
                        </span>
                      </div>
                      <div className="flex sm:block justify-between sm:justify-start items-center sm:items-start gap-1 sm:gap-0 mt-1 sm:mt-2">
                        <span className="text-xs text-gray-500">To</span>
                        <span className="text-sm font-semibold text-orange-600">
                          {entry.newStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm sm:text-base">
            No history records found.
          </div>
        )}
      </div>
    </div>
  );
};

// ---------------------- HistoryCardList component (used in some dialogs) ----------------------
const HistoryCardList: React.FC<{
  lead?: Lead | null;
  historyForLead?: HistoryEntry[];
}> = ({ lead, historyForLead }) => {
  const list =
    historyForLead && historyForLead.length ? historyForLead : mockHistoryData;

  return (
    <div className="space-y-3">
      {list.map((entry) => (
        <Card
          key={entry.id}
          className="shadow-md border border-gray-100 rounded-lg"
        >
          <CardContent className="p-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-orange-50 p-2">
                  <History className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {lead?.id === entry.id ? lead.name : entry.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {entry.date} · {entry.time}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-500">From</div>
                <div className="text-sm font-medium">{entry.oldStatus}</div>
                <div className="text-xs text-gray-500 mt-1">To</div>
                <div className="text-sm font-semibold text-orange-600">
                  {entry.newStatus}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// ---------------------- Main Component ----------------------
const TotalLeadsPage = () => {
  const [data, setData] = useState<Lead[]>(mockLeads);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [addLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyLead, setHistoryLead] = useState<Lead | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  // form state for add lead
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    mobile: "",
    email: "",
    description: "",
  });

  // search control (input + button)
  const [searchQuery, setSearchQuery] = useState("");

  const statuses = [
    "New",
    "Contacted",
    "Interested",
    "Not Interested",
    "Lost",
    "Visit",
    "Remaining",
  ];

  // ---------------------- Table Columns ----------------------
  const columns: ColumnDef<Lead>[] = [
    {
      id: "sn",
      header: "S.N.",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "call",
      header: "Call",
      cell: ({ row }) => (
        <a
          href={`tel:${row.getValue("call")}`}
          className="inline-block hover:scale-110 transition-transform"
        >
          <Phone className="h-5 w-5 text-blue-500" />
        </a>
      ),
    },
    {
      id: "whatsapp",
      header: "Whatsapp",
      cell: ({ row }) => (
        <a
          href={`https://wa.me/91${
            row.original.call
          }?text=Hello%20${encodeURIComponent(row.original.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block hover:scale-110 transition-transform"
        >
          <MessageSquare className="h-6 w-6 text-green-500" />
        </a>
      ),
      meta: {
        className: "hidden md:table-cell",
      },
    },
    {
      accessorKey: "status",
      header: "Change Status",
      cell: ({ row }) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedStatus, setSelectedStatus] = useState(
          row.original.status
        );

        const handleStatusChange = (option: string) => {
          setSelectedStatus(option);
          setIsOpen(false);
          setData((prev) =>
            prev.map((lead) =>
              lead.id === row.original.id ? { ...lead, status: option } : lead
            )
          );
          toast({
            title: "Status updated",
            description: `${row.original.name} → ${option}`,
            className: "bg-green-500 text-white",
          });
        };

        return (
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-9 px-4 text-sm font-medium rounded-xl border border-orange-300 text-gray-800 bg-white/80",
                  "hover:bg-orange-50 hover:text-orange-600 hover:border-orange-400",
                  "transition-all duration-300 ease-in-out shadow-sm hover:shadow-md flex items-center gap-1 group"
                )}
              >
                {selectedStatus}
                <ChevronDown
                  size={14}
                  className={cn(
                    "ml-1 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              side="top"
              sideOffset={8}
              className="w-48 rounded-xl border border-orange-100 bg-white/95 backdrop-blur-xl shadow-xl transition-all duration-200 ease-in-out"
            >
              {statuses.map((option) => {
                const isSelected = selectedStatus === option;
                return (
                  <DropdownMenuItem
                    key={option}
                    onSelect={() => handleStatusChange(option)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer transition-all duration-200",
                      isSelected
                        ? "bg-orange-100 text-orange-700 font-medium"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    )}
                  >
                    <span>{option}</span>
                    {isSelected && (
                      <Check size={16} className="text-orange-500" />
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      meta: {
        className: "hidden md:table-cell",
      },
    },
    {
      id: "history",
      header: "History",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setHistoryLead(row.original);
            setHistoryOpen(true);
          }}
        >
          <History className="h-5 w-5 text-muted-foreground" />
        </Button>
      ),
      meta: {
        className: "hidden md:table-cell",
      },
    },
    {
      id: "more",
      header: "",
      cell: ({ row }) => (
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
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

  // ---------------------- Table Setup ----------------------
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

  const getHistoryForLead = (lead?: Lead | null) => {
    if (!lead) return [];
    // simple id or name match (mock)
    return mockHistoryData.filter(
      (h) => h.name === lead.name || h.id === lead.id
    );
  };

  // ---------------------- Form Handlers ----------------------
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "mobile" && value.length > 10) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSelectChange = (value: string) => {
    setFormData({ ...formData, status: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: Lead = {
      id: Date.now(),
      name: formData.name,
      call: formData.mobile,
      status: formData.status || "New",
      email: formData.email,
    };
    setData((prev) => [...prev, newLead]);
    toast({
      title: "Lead Added!",
      description: `${formData.name} has been successfully added.`,
      className: "bg-green-500 text-white",
    });
    setFormData({
      name: "",
      status: "",
      mobile: "",
      email: "",
      description: "",
    });
    setAddLeadModalOpen(false);
  };

  // ---------------------- Search (Input + Button) ----------------------
  const handleSearchClick = () => {
    // set table column filter for 'name' column
    table.getColumn("name")?.setFilterValue(searchQuery || undefined);
  };

  // ---------------------- Helpers ----------------------
  const handleRefresh = () => {
    // clear search input, remove column filter and reset data
    setSearchQuery("");
    table.getColumn("name")?.setFilterValue("");
    setData(mockLeads);
  };

  // (Clear button removed as requested)

  // ---------------------- JSX ----------------------
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full gap-3">
        <h1 className="text-2xl font-medium">Leads</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/superadmin/users/admin">
                <Button
                  variant="outline"
                  className="p-2 h-10 w-10 rounded-sm shadow-sm bg-white hover:bg-gray-100 hover:text-black"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-gray-800 text-white px-2 py-1 text-xs rounded-md"
            >
              Back
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Search & Buttons */}
      <div className="grid gap-4">
        <Card className="overflow-hidden shadow-md">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full max-w-sm flex-grow">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search leads by name..."
                    value={searchQuery}
                    onChange={(e) => {
                      const v = e.target.value;
                      setSearchQuery(v);
                      // live filter while typing
                      table.getColumn("name")?.setFilterValue(v || undefined);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearchClick();
                      }
                    }}
                    className="pl-10 w-[170px] md:w-full"
                  />
                </div>

                {/* Search Button */}
                <Button
                  variant="default"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() =>
                    console.log(
                      "Searching for:",
                      table.getColumn("name")?.getFilterValue()
                    )
                  }
                >
                  <Search className="h-4 w-4" />
                  <span className="hidden sm:inline">Search</span>
                </Button>

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

              <Button
                onClick={() => setAddLeadModalOpen(true)}
                className="flex items-center gap-2 md:ml-auto"
              >
                <PlusCircle className="h-4 w-4" /> Add Lead
              </Button>
            </div>

            {/* Table */}
            <div className="w-full rounded-md border overflow-x-auto">
              <Table className="min-w-[400px]">
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
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
                      {table.getState().pagination?.pageIndex + 1 || 1}
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
      {/* 📜 History Dialog */}
      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
        <DialogContent className="w-[95vw] sm:max-w-lg rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Lead History
            </DialogTitle>
            <DialogDescription>
              All status updates and changes are listed below.
            </DialogDescription>
          </DialogHeader>
          <HistoryCard />
          {/* <DialogFooter className="flex justify-center mt-4">
            <Button variant="outline" onClick={() => setHistoryOpen(false)}>
              Close
            </Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>

      {/* Add Lead Dialog */}
      <Dialog open={addLeadModalOpen} onOpenChange={setAddLeadModalOpen}>
        <DialogContent className="w-[95vw] sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Create a New Lead
            </DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new lead.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleFormSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-4"
          >
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <User className="w-4 h-4" /> Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                maxLength={30}
                required
                value={formData.name}
                onChange={handleFormChange}
                placeholder="e.g. John Doe"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="status"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Flag className="w-4 h-4" /> Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={handleFormSelectChange}
                required
              >
                <SelectTrigger id="status" className="h-11">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="mobile"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Phone className="w-4 h-4" /> Mobile
              </Label>
              <Input
                type="number"
                id="mobile"
                name="mobile"
                required
                value={formData.mobile}
                onChange={handleFormChange}
                placeholder="e.g. 9876543210"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Mail className="w-4 h-4" /> Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="e.g. john.doe@example.com"
                className="h-11"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label
                htmlFor="description"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <MessageSquare className="w-4 h-4" /> Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                rows={4}
                placeholder="Add notes or details..."
                className="resize-none"
              />
            </div>

            <DialogFooter className="md:col-span-2 flex justify-center gap-4 pt-4 border-t border-gray-200 mt-2">
              <Button
                variant="outline"
                onClick={() => setAddLeadModalOpen(false)}
                className="h-8 px-6 text-sm rounded-lg border-orange-400 text-black hover:bg-orange-50 transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-8 px-6 text-sm rounded-lg bg-orange-500 text-white hover:bg-orange-600 shadow-md transition-all focus:outline-none"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      {selectedLead && (
        <DetailsDialog
          title="Lead Details"
          description={`Full details for ${selectedLead.name}.`}
          details={[
            { label: "Name", value: selectedLead.name, icon: User },
            { label: "Mobile", value: selectedLead.call, icon: Phone },
            { label: "Status", value: selectedLead.status, icon: Flag },
          ]}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      )}
    </div>
  );
};

export default TotalLeadsPage;
