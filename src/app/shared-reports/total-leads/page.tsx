
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

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Phone, MessageSquare, ArrowUpDown, Search, ArrowLeft, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, History, PlusCircle, User, Flag, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';


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
    { id: 4, name: 'Myra Reddy', call: '9876543213', status: 'Not Interested' },
    { id: 5, name: 'Kabir Verma', call: '9876543214', status: 'New' },
    { id: 6, name: 'Diya Gupta', call: '9876543215', status: 'Remaining' },
    { id: 7, name: 'Ishaan Kumar', call: '9876543216', status: 'New' },
    { id: 8, name: 'Advika Joshi', call: '9876543217', status: 'Not Interested' },
    { id: 9, name: 'Reyansh Mehra', call: '9876543218', status: 'Interested' },
    { id: 10, name: 'Ananya Desai', call: '9876543219', status: 'New' },
    { id: 11, name: 'Aryan Mehta', call: '9876543220', status: 'Visit' },
    { id: 12, name: 'Kiara Sen', call: '9876543221', status: 'Visit' },
    { id: 13, name: 'Arjun Rao', call: '9876543222', status: 'Not Picked' },
    { id: 14, name: 'Zara Khan', call: '9876543223', status: 'Not Picked' },
    { id: 15, name: 'Samaira Iyer', call: '9876543224', status: 'Other Location' },
];

export const columns: ColumnDef<Lead>[] = [
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
        href={`https://wa.me/91${row.original.call}?text=Hello%20${row.original.name}`}
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
    header: 'Change Status',
    cell: ({ row }) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">{row.getValue('status')} ▼</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {["New", "Contacted", "Interested", "Not Interested", "Lost", "Visit"].map(option => (
                <DropdownMenuItem key={option} onSelect={() => console.log(`Changed to ${option}`)}>
                    {option}
                </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    id: 'history',
    header: 'History',
    cell: ({ row }) => (
      <Button variant="ghost" size="icon">
        <History className="h-5 w-5 text-muted-foreground" />
      </Button>
    ),
  }
];


const TotalLeadsPage = () => {
  const [data, setData] = useState(mockLeads);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [addLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    status: "",
    mobile: "",
    email: "",
    description: "",
  });

  const statuses = [
    "Leads",
    "Interested",
    "Not Interested",
    "Other Location",
    "Not Picked",
    "Lost",
    "Visit",
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "mobile" && value.length > 10) return;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFormSelectChange = (value: string) => {
    setFormData({ ...formData, status: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    const newLead: Lead = { ...formData, id: Date.now(), call: formData.mobile };
    setData(prev => [...prev, newLead]);
    toast({
        title: "Lead Added!",
        description: `${formData.name} has been successfully added.`,
        className: 'bg-green-500 text-white'
    });
    // Reset form
    setFormData({
        name: "",
        status: "",
        mobile: "",
        email: "",
        description: "",
    });
    setAddLeadModalOpen(false);
  };

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
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      }
    },
  });

  return (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold">Leads</h1>
        <div className="grid gap-4">
            <Card className="overflow-hidden">
                <CardContent className="p-2 md:p-6 md:pt-0">
                    <div className="flex flex-col sm:flex-row gap-4 my-4">
                        <div className="flex items-center gap-2">
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
                        <Button onClick={() => setAddLeadModalOpen(true)}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Lead
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <Table className="min-w-[700px]">
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
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
                                                <TableCell key={cell.id}>
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
                    <div className="p-4 border-t">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink isActive>
                                        {table.getState().pagination.pageIndex + 1}
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardContent>
            </Card>
        </div>

        <Dialog open={addLeadModalOpen} onOpenChange={setAddLeadModalOpen}>
            <DialogContent className="w-[95vw] sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Create a New Lead</DialogTitle>
                <DialogDescription>Fill out the form below to add a new lead to the system.</DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleFormSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-4"
                >
                    <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium"><User className="w-4 h-4" /> Name</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        maxLength={30}
                        required
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="h-11"
                    />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="status" className="flex items-center gap-2 text-sm font-medium"><Flag className="w-4 h-4" /> Status</Label>
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
                    <Label htmlFor="mobile" className="flex items-center gap-2 text-sm font-medium"><Phone className="w-4 h-4" /> Mobile</Label>
                    <Input
                        type="number"
                        id="mobile"
                        name="mobile"
                        placeholder="e.g. 9876543210"
                        required
                        value={formData.mobile}
                        onChange={handleFormChange}
                        className="h-11"
                    />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium"><Mail className="w-4 h-4" /> Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="e.g. john.doe@example.com"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="h-11"
                    />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium"><MessageSquare className="w-4 h-4" /> Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="Add any relevant notes or details here..."
                        rows={4}
                        value={formData.description}
                        onChange={handleFormChange}
                        className="resize-none"
                    />
                    </div>
                    <DialogFooter className="md:col-span-2">
                        <Button variant="outline" onClick={() => setAddLeadModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Add Lead</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  );
};

export default TotalLeadsPage;

  