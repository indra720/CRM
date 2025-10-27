
'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pencil,
  PlusCircle,
  Users,
  Check,
  Phone,
  MapPin,
  Eye,
  Mail,
  Lock,
  Calendar,
  Filter,
  MoreVertical,
  ArrowLeft,
  XCircle,
  Clock,
  Briefcase,
  User,
  CreditCard,
  Fingerprint,
  FileText,
  GraduationCap,
  Landmark,
  Hash,
  Wallet,
  Building2,
  ArrowRight,
  FileUp,
  DollarSign,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const mockUsers = [
  {
    id: 1,
    name: 'staff',
    teamLeader: 'teamlead',
    mobile: '9632587410',
    created_date: '2025-10-11T12:00:00.000Z',
    self_user: { user_active: true },
    email: 'staff1@example.com',
    password: 'password123',
    dob: '1995-01-01',
    address: '789 Staff St, Worktown',
    city: 'Worktown',
    state: 'Gujarat',
    pincode: '987654',
    degree: 'B.Com',
    pancard: 'STAFF1234F',
    aadharCard: '567890123456',
    bank_name: 'Axis Bank',
    account_number: '5678901234',
    ifsc_code: 'UTIB000000',
    upi_id: 'staff1@upi',
    salary: '30000',
    referralCode: 'STAFF123',
  },
   {
    id: 2,
    name: 'staff2',
    teamLeader: 'teamlead',
    mobile: '9876543211',
    created_date: '2025-10-12T12:00:00.000Z',
    self_user: { user_active: false },
    email: 'staff2@example.com',
    password: 'password456',
    dob: '1998-05-15',
    address: '101 Staff Ave, Jobville',
    city: 'Jobville',
    state: 'Maharashtra',
    pincode: '456789',
    degree: 'B.A',
    pancard: 'STAFF5678K',
    aadharCard: '678901234567',
    bank_name: 'ICICI Bank',
    account_number: '6789012345',
    ifsc_code: 'ICIC000000',
    upi_id: 'staff2@upi',
    salary: '35000',
    referralCode: 'STAFF456',
  },
];

const kpiCounts = {
    total_leads: 15,
    total_visit: 2,
    interested: 2,
    not_interested: 2,
    other_location: 1,
    not_picked: 2,
    total_earning: "0.00"
};


const kpiData = [
    { title: "Total Leads", valueKey: "total_leads", icon: Users, color: "text-rose-500", link: "/staff/reports/total-leads" },
    { title: "Total Visit", valueKey: "total_visit", icon: Eye, color: "text-green-500", link: "/staff/reports/visit" },
    { title: "Interested", valueKey: "interested", icon: Check, color: "text-teal-500", link: "/staff/reports/interested" },
    { title: "Not Interested", valueKey: "not_interested", icon: XCircle, color: "text-red-500", link: "/staff/reports/not-interested" },
    { title: "Other Location", valueKey: "other_location", icon: MapPin, color: "text-orange-500", link: "/staff/reports/other-location" },
    { title: "Not Picked", valueKey: "not_picked", icon: Phone, color: "text-slate-500", link: "/staff/reports/not-picked" },
    { title: "Total Earning", valueKey: "total_earning", icon: DollarSign, color: "text-yellow-500" },
];

const initialFormData = {
    id: null,
    name: "",
    email: "",
    password: "",
    mobile: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    degree: "",
    pancard: "",
    aadharCard: "",
    bank_name: "",
    account_number: "",
    ifsc_code: "",
    upi_id: "",
    salary: "",
    referralCode: "",
    teamLeader: "",
    admin: "",
};


const KpiCard = ({ title, value, icon, color, link }: { title: string, value: string | number, icon: React.ElementType, color: string, link?: string }) => {
  const cardContent = (
     <Card className="shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-3 flex flex-col items-center justify-center text-center">
        <div className={`text-3xl ${color} mb-1`}>
          {React.createElement(icon, { className: "h-6 w-6" })}
        </div>
        <div className="font-semibold text-foreground text-sm">{title}</div>
        <div className="text-muted-foreground text-xs mt-1">{value}</div>
      </CardContent>
    </Card>
  );

  if (link) {
    return <Link href={link}>{cardContent}</Link>;
  }

  return cardContent;
};

const InputField = ({ id, label, name, type = 'text', placeholder, icon: Icon, value, onChange, required, children, disabled }: {
    id: string;
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    icon?: React.ElementType;
    value: string | number;
    onChange: (e: any) => void;
    required?: boolean;
    children?: React.ReactElement;
    disabled?: boolean;
}) => {
    const inputElement = children ? 
        React.cloneElement(children, { id, name, value, onChange, required, placeholder, disabled }) :
        <Input type={type} id={id} name={name} value={value as string} onChange={onChange} required={required} placeholder={placeholder} className="pl-10 pr-4 h-11" disabled={disabled} />;

    return (
        <div className="relative flex flex-col space-y-2">
            <Label htmlFor={id} className="text-sm font-medium text-muted-foreground">{label}</Label>
            <div className="relative">
                {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />}
                {inputElement}
            </div>
        </div>
    );
};

const ReviewDetailItem = ({ label, value }: { label: string, value: string | undefined | null }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value || 'N/A'}</p>
    </div>
);

const UserDetailsDialog = ({ user, open, onOpenChange }: { user: any, open: boolean, onOpenChange: (open: boolean) => void }) => {
    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-card shadow-2xl rounded-2xl p-0">
                <DialogHeader className="p-6 pb-4 text-center">
                    <DialogTitle className="text-xl">Staff Full Details</DialogTitle>
                </DialogHeader>
                <div className="p-6 pt-0 grid grid-cols-1 gap-5 max-h-[60vh] overflow-y-auto">
                    <ReviewDetailItem label="Name" value={user.name} />
                    <ReviewDetailItem label="Mobile No" value={user.mobile} />
                    <ReviewDetailItem label="Team Leader" value={user.teamLeader} />
                    <ReviewDetailItem label="Created Date" value={new Date(user.created_date).toLocaleDateString()} />
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Active Status</p>
                      <Switch
                        id={`active-status-modal-${user.id}`}
                        checked={user.self_user?.user_active}
                        disabled
                      />
                    </div>
                </div>
                <DialogFooter className="p-4 border-t bg-muted/50 rounded-b-2xl flex-row justify-end gap-2">
                    <DialogClose asChild>
                        <Button type="button" variant="outline" className="w-full text-foreground hover:bg-primary hover:text-primary-foreground">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function StaffManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [formData, setFormData] = useState<any>(initialFormData);
  const [editingUser, setEditingUser] = useState<any>(null);

  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const { toast } = useToast();


  const handleAddFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
        const target = e.target as HTMLInputElement;
        setFormData({ ...formData, [name]: target.files ? target.files[0] : null });
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleAddFormSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const handleOpenAddForm = () => {
    setFormData(initialFormData);
    setActiveTab("personal");
    setIsAddFormOpen(true);
  }

  const handleOpenEditForm = (user: any) => {
    setEditingUser({ ...user });
    setIsEditFormOpen(true);
  }

  const handleOpenDetailsView = (user: any) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  }
  
  const handleCloseAddForm = () => {
    setIsAddFormOpen(false);
    setFormData(initialFormData);
  }
  
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {...formData, id: Date.now(), created_date: new Date().toISOString(), self_user: { user_active: true }};
    setUsers([...users, newUser]);
    toast({
        title: "Staff Added!",
        description: `${formData.name} has been added successfully.`,
        className: 'bg-green-500 text-white'
    });
    handleCloseAddForm();
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };
  
    const handleEditSelectChange = (name: string, value: string) => {
    setEditingUser({ ...editingUser, [name]: value });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    toast({
        title: "Staff Updated!",
        description: `${editingUser.name} has been updated successfully.`,
        className: 'bg-green-500 text-white'
    });
    setIsEditFormOpen(false);
    setEditingUser(null);
  };


  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const handleToggle = async (id: number, isActive: boolean) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setUsers(users.map(u => u.id === id ? {...u, self_user: {...u.self_user, user_active: isActive}} : u));
       toast({
        title: 'Status Updated',
        description: `User status changed to ${isActive ? 'Active' : 'Inactive'}.`,
        className: 'bg-blue-500 text-white'
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to update user status.',
        variant: 'destructive',
      });
    }
  };

  const filteredUsers = users.filter((u) =>
    Object.values(u).some(
      (val) =>
        val &&
        val.toString().toLowerCase().includes(search.trim().toLowerCase())
    )
  );
  
  const tabAnimation = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  };

  return (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Staff Users</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {kpiData.map((card, index) => (
                <KpiCard 
                  key={index} 
                  title={card.title} 
                  value={kpiCounts[card.valueKey as keyof typeof kpiCounts]}
                  icon={card.icon}
                  color={card.color}
                  link={card.link}
                />
            ))}
        </div>

      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <CardTitle>Staff List</CardTitle>
                <CardDescription className="hidden sm:block">View and manage staff users.</CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative">
                <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 sm:flex-initial lg:w-64 pl-10"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button size="icon" className="sm:hidden" onClick={handleOpenAddForm}>
              <PlusCircle className="h-4 w-4" />
               <span className="sr-only">Add Staff</span>
            </Button>
            <Button className="hidden sm:flex" onClick={handleOpenAddForm}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add new staff
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-base md:text-sm">SR. NO</TableHead>
                  <TableHead className="text-base md:text-sm">Name</TableHead>
                  <TableHead className="hidden sm:table-cell text-base md:text-sm">Team Lead</TableHead>
                  <TableHead className="hidden md:table-cell text-base md:text-sm">Mobile No</TableHead>
                  <TableHead className="hidden lg:table-cell text-base md:text-sm">Created Date</TableHead>
                  <TableHead className="text-base md:text-sm">Leads</TableHead>
                  <TableHead className="text-base md:text-sm">Active/Non-Active</TableHead>
                  <TableHead className="text-base md:text-sm">Earn</TableHead>
                  <TableHead className="text-base md:text-sm">Incentives</TableHead>
                  <TableHead className="text-right text-base md:text-sm">Edit Now</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-base md:text-sm">{index + 1}</TableCell>
                    <TableCell className="font-medium text-base md:text-sm">{user.name}</TableCell>
                    <TableCell className="hidden sm:table-cell text-base md:text-sm">{user.teamLeader}</TableCell>
                    <TableCell className="hidden md:table-cell text-base md:text-sm">{user.mobile}</TableCell>
                    <TableCell className="hidden lg:table-cell text-base md:text-sm">
                      {new Date(user.created_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Link href="/staff/leads/staff">
                        <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700">
                            <Eye className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">View</span>
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell className="text-base md:text-sm">
                      <Switch
                        checked={user.self_user?.user_active}
                        onCheckedChange={(checked) =>
                          handleToggle(user.id, checked)
                        }
                      />
                    </TableCell>
                    <TableCell>
                       <Link href="/staff/users/staff/earn">
                        <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700">
                           <Eye className="h-4 w-4 sm:mr-2" />
                          <span className="hidden sm:inline">Earn</span>
                        </Button>
                      </Link>
                    </TableCell>
                     <TableCell>
                       <Link href="/staff/users/staff/incentives">
                        <Button variant="outline" size="sm">Incentives</Button>
                        </Link>
                    </TableCell>
                    <TableCell className="text-right text-base md:text-sm">
                       <div className="flex items-center justify-end gap-2">
                            <div className="hidden sm:flex items-center gap-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                             <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleOpenEditForm(user)}
                                                className="h-8 w-8"
                                            >
                                                <Pencil className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent><p>Edit</p></TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                          

                        <div className="sm:hidden">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                               <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                               <DropdownMenuItem onClick={() => handleOpenEditForm(user)}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenDetailsView(user)}>
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center">
                      No matching records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

    <Dialog open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] p-0 rounded-2xl shadow-2xl flex flex-col">
            <DialogHeader className="p-6 pb-4 border-b flex-shrink-0">
                <DialogTitle className="text-xl font-bold">Add New Staff</DialogTitle>
                <DialogDescription>
                    Fill in the details below.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className="flex-1 flex flex-col min-h-0">
                <div className="px-6 pt-4 flex gap-4">
                    <Select onValueChange={(value) => handleAddFormSelectChange("admin", value)} name="admin" defaultValue={formData.admin}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Admin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin1">Admin User 1</SelectItem>
                            <SelectItem value="admin2">Admin User 2</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => handleAddFormSelectChange("teamLeader", value)} name="teamLeader" defaultValue={formData.teamLeader}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Team-Leader" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="teamlead">teamlead</SelectItem>
                            <SelectItem value="teamlead2">teamlead2</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
                  <div className="px-6 pt-4 flex-shrink-0">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="personal">Personal Details</TabsTrigger>
                        <TabsTrigger value="account">Account Details</TabsTrigger>
                    </TabsList>
                  </div>
                 <div className="p-6 overflow-y-auto flex-1 relative hide-scrollbar">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={tabAnimation.initial}
                        animate={tabAnimation.animate}
                        exit={tabAnimation.exit}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                      >
                        {activeTab === 'personal' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                              <InputField id="name" label="Name" name="name" placeholder="John Doe" icon={User} value={formData.name} onChange={handleAddFormChange} required />
                              <InputField id="email" label="E-Mail Address" name="email" type="email" placeholder="you@example.com" icon={Mail} value={formData.email} onChange={handleAddFormChange} required />
                              <InputField id="password" label="Password" name="password" type="password" placeholder="••••••••" icon={Lock} value={formData.password} onChange={handleAddFormChange} required />
                               <InputField id="teamLeader" label="Team Leader" name="teamLeader" value={formData.teamLeader} onChange={handleAddFormChange}>
                                <Select onValueChange={(value) => handleAddFormSelectChange("teamLeader", value)} name="teamLeader" defaultValue={formData.teamLeader}>
                                    <SelectTrigger className="pl-10 pr-4 h-11">
                                    <SelectValue placeholder="Select Team Leader" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="teamlead">teamlead</SelectItem>
                                    <SelectItem value="teamlead2">teamlead2</SelectItem>
                                    </SelectContent>
                                </Select>
                              </InputField>
                              <InputField id="dob" label="Date of Birth" name="dob" type="date" icon={Calendar} value={formData.dob} onChange={handleAddFormChange} />
                              <InputField id="pancard" label="Pan Card" name="pancard" placeholder="ABCDE1234F" icon={CreditCard} value={formData.pancard} onChange={handleAddFormChange} />
                              <InputField id="aadharCard" label="Aadhar Card" name="aadharCard" placeholder="1234 5678 9012" icon={Fingerprint} value={formData.aadharCard} onChange={handleAddFormChange} />
                              <InputField id="degree" label="Degree" name="degree" placeholder="B.Tech, M.Sc" icon={GraduationCap} value={formData.degree} onChange={handleAddFormChange} />
                              <InputField id="city" label="City" name="city" placeholder="e.g. Mumbai" icon={Building2} value={formData.city} onChange={handleAddFormChange} />
                              <InputField id="state" label="State" name="state" value={formData.state} onChange={handleAddFormChange}>
                                <Select onValueChange={(value) => handleAddFormSelectChange("state", value)} name="state" defaultValue={formData.state}>
                                    <SelectTrigger className="pl-10 pr-4 h-11">
                                    <SelectValue placeholder="Select State" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                                    <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                                    <SelectItem value="Gujarat">Gujarat</SelectItem>
                                    </SelectContent>
                                </Select>
                              </InputField>
                              <InputField id="mobile" label="Mobile" name="mobile" type="tel" placeholder="9876543210" icon={Phone} value={formData.mobile} onChange={handleAddFormChange} required />
                              <InputField id="salary" label="Salary" name="salary" placeholder="e.g. 50000" icon={Wallet} value={formData.salary} onChange={handleAddFormChange} />
                          </div>
                        )}
                        {activeTab === 'account' && (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                              <InputField id="account_number" label="Account Number" name="account_number" placeholder="Your account number" icon={Wallet} value={formData.account_number} onChange={handleAddFormChange} />
                              <InputField id="upi_id" label="Add UPI" name="upi_id" placeholder="yourname@upi" icon={Briefcase} value={formData.upi_id} onChange={handleAddFormChange} />
                              <InputField id="bank_name" label="Bank Name" name="bank_name" placeholder="e.g. State Bank of India" icon={Landmark} value={formData.bank_name} onChange={handleAddFormChange} />
                              <InputField id="ifsc_code" label="IFSC Code" name="ifsc_code" placeholder="SBIN0001234" icon={Hash} value={formData.ifsc_code} onChange={handleAddFormChange} />
                              <InputField id="pincode" label="Pincode" name="pincode" placeholder="e.g. 110001" icon={MapPin} value={formData.pincode} onChange={handleAddFormChange} />
                              <div className="md:col-span-2">
                                <InputField id="address" label="Address" name="address" value={formData.address} onChange={handleAddFormChange}>
                                   <Textarea className="pl-10 pr-4 min-h-[80px]" placeholder="Enter full address" />
                                </InputField>
                              </div>
                           </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                <DialogFooter className="p-6 pt-4 border-t bg-muted/50 flex justify-between w-full flex-shrink-0">
                  {activeTab === 'personal' ? (
                      <div></div>
                    ) : (
                      <Button type="button" variant="outline" onClick={() => setActiveTab('personal')}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                    )}
                    {activeTab === 'personal' ? (
                      <Button type="button" onClick={() => setActiveTab('account')}>
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button type="submit">Save Staff</Button>
                    )}
                </DialogFooter>
              </Tabs>
            </form>
        </DialogContent>
    </Dialog>

    {editingUser && (
      <Dialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Staff</DialogTitle>
            <DialogDescription>
              Update the details for {editingUser.name}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input id="edit-name" name="name" value={editingUser.name} onChange={handleEditFormChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input id="edit-email" name="email" type="email" value={editingUser.email} onChange={handleEditFormChange} required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="edit-mobile">Mobile</Label>
              <Input id="edit-mobile" name="mobile" value={editingUser.mobile} onChange={handleEditFormChange} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="edit-teamLeader">Team Leader</Label>
                <Select onValueChange={(value) => handleEditSelectChange("teamLeader", value)} name="teamLeader" defaultValue={editingUser.teamLeader}>
                    <SelectTrigger id="edit-teamLeader">
                        <SelectValue placeholder="Select Team Leader" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="teamlead">teamlead</SelectItem>
                        <SelectItem value="teamlead2">teamlead2</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-password">New Password (optional)</Label>
              <Input id="edit-password" name="password" type="password" placeholder="Leave blank to keep current password" onChange={handleEditFormChange} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditFormOpen(false)}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )}
      
      {selectedUser && (
        <UserDetailsDialog 
            user={selectedUser} 
            open={isDetailsOpen} 
            onOpenChange={setIsDetailsOpen}
        />
      )}
    </div>
  );
};
