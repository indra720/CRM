'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Phone, MessageSquare, Calendar, FileDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

const mockLeads = [
    { id: 1, name: 'Aarav Sharma', staff: 'Rohan', status: 'New', call: '9876543210', updated_date: 'Oct. 16, 2025, 7:07 a.m.'},
    { id: 2, name: 'Saanvi Patel', staff: 'Anjali', status: 'Contacted', call: '9876543211', updated_date: 'Oct. 16, 2025, 7:03 a.m.' },
    { id: 3, name: 'Vihaan Singh', staff: 'Rohan', status: 'Interested', call: '9876543212', updated_date: 'Oct. 11, 2025, 8:57 a.m.' },
    { id: 4, name: 'Myra Reddy', staff: 'Anjali', status: 'Lost', call: '9876543213', updated_date: 'Oct. 11, 2025, 7:06 a.m.' },
];

export default function StaffLeadsPage() {
    const router = useRouter();

    const handleTypeNavChange = (value: string) => {
        if (!value) return;
        router.push(value);
    }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Staff Leads</h1>

       <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-6">
             <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                    <Label htmlFor="start_date">Start Date</Label>
                    <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="start_date" name="start_date" type="date" placeholder="mm/dd/yyyy" className="pl-10" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="end_date">End Date</Label>
                    <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="end_date" name="end_date" type="date" placeholder="mm/dd/yyyy" className="pl-10" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select name="status">
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Leads">Leads</SelectItem>
                            <SelectItem value="Intrested">Intrested</SelectItem>
                            <SelectItem value="Not Interested">Not Interested</SelectItem>
                            <SelectItem value="Other Location">Other Location</SelectItem>
                            <SelectItem value="Not Picked">Not Picked</SelectItem>
                            <SelectItem value="Lost">Lost</SelectItem>
                            <SelectItem value="Visit">Visit</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit" className="w-full md:w-auto self-end">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export
                </Button>
            </form>
        </CardContent>
      </Card>


      <Card className="shadow-lg rounded-2xl">
         <CardHeader>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                    placeholder="Search leads..."
                    className="pl-10"
                    />
                </div>
                 <div className="w-full sm:w-auto">
                     <Select onValueChange={handleTypeNavChange}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="/admin/reports/interested">Interested</SelectItem>
                            <SelectItem value="/admin/reports/not-interested">Not Interested</SelectItem>
                            <SelectItem value="/admin/reports/other-location">Other Location</SelectItem>
                            <SelectItem value="/admin/reports/total-leads">Lost</SelectItem>
                            <SelectItem value="/admin/reports/visit">Visit</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.N.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Staff</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Call</TableHead>
                  <TableHead className="text-center">Whatsapp</TableHead>
                  <TableHead>Date & Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLeads.map((lead, index) => (
                  <TableRow key={lead.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.staff}</TableCell>
                    <TableCell>
                      <Badge variant={lead.status === 'Interested' ? 'default' : 'secondary'}>{lead.status}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                       <Button variant="ghost" size="icon" asChild>
                         <a href={`tel:${lead.call}`}><Phone className="h-4 w-4 text-blue-500" /></a>
                       </Button>
                    </TableCell>
                    <TableCell className="text-center">
                        <Button variant="ghost" size="icon" asChild>
                            <a href={`https://wa.me/91${lead.call}?text=Hello%20${lead.name}`} target="_blank" rel="noopener noreferrer">
                                <MessageSquare className="h-5 w-5 text-green-500" />
                            </a>
                        </Button>
                    </TableCell>
                    <TableCell>{lead.updated_date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Pagination>
        <PaginationContent>
            <PaginationItem>
            <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationNext href="#" />
            </PaginationItem>
        </PaginationContent>
        </Pagination>
    </div>
  );
}
