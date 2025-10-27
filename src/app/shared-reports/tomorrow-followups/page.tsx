'use client';

import React, { useEffect, useState } from 'react';
// Force re-save for DialogClose error
import {
  Card,
  CardContent,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2, Phone, MessageSquare, History, Calendar, FileDown, ArrowLeft, Eye, User, Briefcase, Users, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// Mock data to replicate the API response structure from the provided code.
const mockLeadsData = {
    results: [
        { id: 1, name: 'Aarav Sharma', assigned_to: { name: 'Rohan' }, team_leader: { name: 'Priya' }, call: '9876543210', follow_up_date: '2024-08-15', follow_up_time: '14:30' },
        { id: 2, name: 'Saanvi Patel', assigned_to: { name: 'Anjali' }, team_leader: { name: 'Priya' }, call: '9876543211', follow_up_date: '2024-08-16', follow_up_time: '11:00' },
        { id: 3, name: 'Vihaan Singh', assigned_to: { name: 'Rohan' }, team_leader: { name: 'Priya' }, call: '9876543212', follow_up_date: null, updated_date: '2024-07-20' },
        { id: 4, name: 'Myra Reddy', assigned_to: { name: 'Anjali' }, team_leader: { name: 'Priya' }, call: '9876543213', follow_up_date: '2024-08-18', follow_up_time: '16:00' },
        { id: 5, name: 'Kabir Verma', assigned_to: { name: 'Rohan' }, team_leader: { name: 'Priya' }, call: '9876543214', follow_up_date: '2024-08-19', follow_up_time: '10:00' },
        { id: 6, name: 'Diya Gupta', assigned_to: { name: 'Anjali' }, team_leader: { name: 'Priya' }, call: '9876543215', follow_up_date: '2024-08-20', follow_up_time: '15:00' },
        { id: 7, name: 'Ishaan Kumar', assigned_to: { name: 'Rohan' }, team_leader: { name: 'Priya' }, call: '9876543216', follow_up_date: '2024-08-21', follow_up_time: '12:30' },
        { id: 8, name: 'Advika Joshi', assigned_to: { name: 'Anjali' }, team_leader: { name: 'Priya' }, call: '9876543217', follow_up_date: '2024-08-22', follow_up_time: '17:00' },
        { id: 9, name: 'Reyansh Mehra', assigned_to: { name: 'Rohan' }, team_leader: { name: 'Priya' }, call: '9876543218', follow_up_date: '2024-08-23', follow_up_time: '09:30' },
        { id: 10, name: 'Ananya Desai', assigned_to: { name: 'Anjali' }, team_leader: { name: 'Priya' }, call: '9876543219', follow_up_date: '2024-08-24', follow_up_time: '18:00' },
    ],
    page: 1,
    total_pages: 5,
};

const mockSingleLead = {
    id: 1,
    name: 'Aarav Sharma',
    status: 'Intrested',
    message: 'Client asked for a demo next week.',
    follow_up_date: '2024-08-15',
    follow_up_time: '14:30',
    call: '9876543210',
    assigned_to: { name: 'Rohan' },
    team_leader: { name: 'Priya' },
};


const ReviewDetailItem = ({ label, value, icon: Icon }: { label: string, value: string | undefined | null, icon?: React.ElementType }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 border-b border-border-200 last:border-b-0 hover:bg-accent/50 transition-colors duration-200">
        <p className="text-sm font-medium text-muted-foreground flex items-center sm:w-1/2">
            {Icon && <Icon className="h-4 w-4 mr-2 text-primary" />}
            {label}
        </p>
        <p className="font-semibold text-foreground sm:w-1/2 sm:text-right mt-1 sm:mt-0">{value || 'N/A'}</p>
    </div>
);

const LeadDetailsDialog = ({ lead, open, onOpenChange }: { lead: any, open: boolean, onOpenChange: (open: boolean) => void }) => {
    if (!lead) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] max-w-lg sm:max-w-2xl bg-background shadow-2xl rounded-xl p-4 border border-border overflow-hidden max-h-[90vh] flex flex-col">
                <DialogHeader className="p-6 pb-4 text-center bg-muted/20 border-b border-border flex-shrink-0">
                    <DialogTitle className="text-2xl font-bold text-foreground">Lead Details</DialogTitle>
                    <DialogDescription className="text-muted-foreground">Comprehensive details for <span className="font-semibold">{lead.name}</span>.</DialogDescription>
                </DialogHeader>
                <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
                    <ReviewDetailItem label="Name" value={lead.name} icon={User} />
                    <ReviewDetailItem label="Assigned To" value={lead.assigned_to?.name} icon={Briefcase} />
                    <ReviewDetailItem label="Team Leader" value={lead.team_leader?.name} icon={Users} />
                    <ReviewDetailItem label="Call" value={lead.call} icon={Phone} />
                    <ReviewDetailItem label="Follow Up Date" value={lead.follow_up_date} icon={Calendar} />
                    <ReviewDetailItem label="Follow Up Time" value={lead.follow_up_time} icon={Clock} />
                </div>
                <DialogFooter className="p-4 border-t border-border bg-muted/20 rounded-b-xl flex-row justify-end gap-2 flex-shrink-0">
                    <DialogClose asChild>
                        <Button type="button" variant="default" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function TomorrowFollowupsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [leads, setLeads] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState<any | null>(null);
  const [statusValue, setStatusValue] = useState('Intrested');
  const [messageValue, setMessageValue] = useState('');
  const [followDate, setFollowDate] = useState('');
  const [followTime, setFollowTime] = useState('');
  const { toast } = useToast();

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLeadDetails, setSelectedLeadDetails] = useState<any | null>(null);

  async function fetchLeads() {
    setLoading(true);
    // In a real app, you would fetch from your API.
    // Simulating API call with mock data.
    await new Promise(resolve => setTimeout(resolve, 500));
    setLeads(mockLeadsData.results);
    setTotalPages(mockLeadsData.total_pages);
    setLoading(false);
  }

  useEffect(() => {
    fetchLeads();
  }, [page, search]);

  async function openEditModal(id: number) {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 300));
    const data = mockSingleLead;
    setEditingLead(data);
    setStatusValue(data.status || 'Intrested');
    setMessageValue(data.message || '');
    setFollowDate(data.follow_up_date || '');
    setFollowTime(data.follow_up_time || '');
    setShowModal(true);
  }

  const openDetailsModal = (lead: any) => {
    setSelectedLeadDetails(lead);
    setShowDetailsModal(true);
  };

  async function saveChanges() {
    if (!editingLead) return;

    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 500));

    toast({
        title: "Status Updated",
        description: `Follow-up for ${editingLead.name} has been updated.`,
        className: 'bg-green-500 text-white'
    });
    setShowModal(false);
    fetchLeads(); // Refresh leads
  }

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex items-center justify-between">
        <Link href="/superadmin/users/admin">
            <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <form className="grid grid-cols-2 md:grid-cols-3 gap-4 items-end max-w-3xl">
          <div className="space-y-2">
            <Label htmlFor="start_date">Start Date</Label>
            <Input id="start_date" name="start_date" type="text" placeholder="mm/dd/yyyy" onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => {if (!e.target.value) e.target.type = 'text'}} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end_date">End Date</Label>
            <Input id="end_date" name="end_date" type="text" placeholder="mm/dd/yyyy" onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => {if (!e.target.value) e.target.type = 'text'}} />
          </div>
          <Button type="submit" className="self-end">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
        </form>

        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => { setPage(1); setSearch(e.target.value); }}
              placeholder="Search"
              className="pl-10 w-full"
            />
        </div>
      </div>


      <div className="grid gap-4">
        <Card className="overflow-hidden">
          <CardContent className="p-2 md:p-6 md:pt-0">
            <div className="overflow-x-auto">
              <Table className="min-w-[700px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Staff</TableHead>
                    <TableHead>Team Leader</TableHead>
                    <TableHead>Call</TableHead>
                    <TableHead>Whatsapp</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>History</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                      </TableCell>
                    </TableRow>
                  ) : leads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        No records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    leads.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium text-base md:text-sm">{user.name}</TableCell>
                        <TableCell className="whitespace-nowrap text-base md:text-sm">{user.assigned_to?.name}</TableCell>
                        <TableCell className="whitespace-nowrap text-base md:text-sm">{user.team_leader?.name}</TableCell>
                        <TableCell className="text-base md:text-sm">
                          <a href={`tel:+91${user.call}`}><Phone className="h-4 w-4 text-green-500" /></a>
                        </TableCell>
                        <TableCell className="text-base md:text-sm">
                          <a href={`https://wa.me/+91${user.call}`} target="_blank" rel="noreferrer"><MessageSquare className="h-4 w-4 text-blue-500" /></a>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-base md:text-sm">{user.follow_up_date || 'N/A'}</TableCell>
                        <TableCell className="whitespace-nowrap text-base md:text-sm">{user.follow_up_time || 'N/A'}</TableCell>
                        <TableCell className="text-base md:text-sm">
                          <Link href={`/lead_history/${user.id}`}><History className="h-4 w-4 text-muted-foreground" /></Link>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1 sm:gap-2">
                            <Button variant="outline" size="sm" className="w-full text-center" onClick={() => openEditModal(user.id)}>
                              <span className="hidden lg:inline">Follow Up</span>
                              <span className="inline lg:hidden">F.U.</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 border-t">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} />
                  </PaginationItem>
                  <PaginationItem>
                      <PaginationLink isActive>
                          {page}
                      </PaginationLink>
                  </PaginationItem>
                   <PaginationItem>
                    <PaginationNext onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal} >
        <DialogContent className="w-[95vw] sm:max-w-md p-4 max-h-[90vh] flex flex-col rounded-md">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Leads Update</DialogTitle>
            <DialogDescription>Update the status and follow-up details for this lead.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 p-4 overflow-y-auto flex-1 ">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
               <Select value={statusValue} onValueChange={setStatusValue}>
                <SelectTrigger id="status">
                    <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Intrested">Follow Up</SelectItem>
                    <SelectItem value="Lost">Discard</SelectItem>
                    <SelectItem value="Visit">Visit</SelectItem>
                </SelectContent>
                </Select>
            </div>

            {statusValue === 'Intrested' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="followUpDate">
                    <span className="hidden sm:inline"></span><span className="sm:hidden"></span> Date
                  </Label>
                  <Input id="followUpDate" type="date" value={followDate} onChange={(e) => setFollowDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                   <Label htmlFor="followUpTime">
                    <span className="hidden sm:inline"></span><span className="sm:hidden"></span> Time
                  </Label>
                  <Input id="followUpTime" type="time" value={followTime} onChange={(e) => setFollowTime(e.target.value)} className='p-1' />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" value={messageValue} onChange={(e) => setMessageValue(e.target.value)} placeholder="Enter a message or notes..."/>
            </div>
          </div>
          <DialogFooter className="flex-shrink-0 gap-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={saveChanges}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedLeadDetails && (
        <LeadDetailsDialog
            lead={selectedLeadDetails}
            open={showDetailsModal}
            onOpenChange={setShowDetailsModal}
        />
      )}
    </div>
  );
}