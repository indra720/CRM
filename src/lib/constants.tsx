
import {
  LayoutGrid,
  Users,
  FilePlus,
  AreaChart,
  FolderKanban,
  FileBarChart,
  TrendingUp,
  Clock,
  Presentation,
  MessageCircle,
  Linkedin,
  Facebook,
  Globe,
  Eye,
  Check,
  XCircle,
  MapPin,
  Phone,
  FileUp,
  DollarSign,
} from 'lucide-react';

export const SIDENAV_ITEMS = [
  {
    title: 'User',
    path: '/admin/users',
    icon: <Users className="h-5 w-5" />,
    submenu: true,
    subMenuItems: [
      { title: 'Team Leader', path: '/admin/users/team-leader' },
      { title: 'Staff', path: '/admin/users/staff' },
    ],
  },
   {
    title: 'Productivity',
    path: '/admin/productivity',
    icon: <AreaChart className="h-5 w-5" />,
    submenu: true,
    subMenuItems: [
        { title: 'Team Leader', path: '/admin/productivity/team-leader' },
        { title: 'Staff', path: '/admin/productivity/staff' },
        { title: 'Associates', path: '/admin/productivity/associates' },
    ],
  },
  {
    title: 'Leads Report',
    path: '/admin/reports',
    icon: <FileBarChart className="h-5 w-5" />,
    submenu: true,
    subMenuItems: [
        { title: 'Leads', path: '/admin/reports/total-leads' },
        { title: 'Interested', path: '/admin/reports/interested' },
        { title: 'Not Interested', path: '/admin/reports/not-interested' },
        { title: 'Visit', path: '/admin/reports/visit' },
        { title: 'Not Picked', path: '/admin/reports/not-picked' },
        { title: 'Other Location', path: '/admin/reports/other-location' },
    ],
  },
  {
    title: 'Marketing',
    path: '/admin/marketing', 
    icon: <TrendingUp className="h-5 w-5" />,
    submenu: true,
    subMenuItems: [
        { title: 'WhatsApp', path: '/admin/marketing/whatsapp', icon: <MessageCircle className='h-4 w-4' /> },
        { title: 'Google', path: '/admin/marketing/google', icon: <Globe className='h-4 w-4' /> },
        { title: 'Facebook', path: '/admin/marketing/facebook', icon: <Facebook className='h-4 w-4' /> },
        { title: 'LinkedIn', path: '/admin/marketing/linkedin', icon: <Linkedin className='h-4 w-4' /> },
    ],
  },
  {
    title: 'Time Sheet',
    path: '/admin/timesheet',
    icon: <Clock className="h-5 w-5" />,
  },
];

export const SUPERADMIN_SIDENAV_ITEMS = [
  {
    title: 'Dashboard',
    path: '/superadmin/dashboard',
    icon: <LayoutGrid className="h-5 w-5" />,
  },
  {
    title: 'User',
    path: '/superadmin/users',
    icon: <Users className="h-5 w-5" />,
    submenu: true,
    subMenuItems: [
      { title: 'Admin', path: '/superadmin/users/admin' },
      { title: 'Team Leader', path: '/superadmin/users/team-leader' },
      { title: 'Staff', path: '/superadmin/users/staff' },
      { title: 'Associates', path: '/superadmin/users/associates' },
      { title: 'IT Staff', path: '/superadmin/users/it-staff' },
    ],
  },
   {
    title: 'Productivity',
    path: '/superadmin/productivity',
    icon: <AreaChart className="h-5 w-5" />,
    submenu: true,
    subMenuItems: [
        { title: 'Team Leader', path: '/superadmin/productivity/team-leader' },
        { title: 'Staff', path: '/superadmin/productivity/staff' },
        { title: 'Associates', path: '/superadmin/productivity/associates' },
    ],
  },
  {
    title: 'Leads Report',
    path: '/superadmin/reports',
    icon: <FileBarChart className="h-5 w-5" />,
    submenu: true,
    subMenuItems: [
        { title: 'Leads', path: '/superadmin/reports/total-leads' },
        { title: 'Interested', path: '/superadmin/reports/interested' },
        { title: 'Not Interested', path: '/superadmin/reports/not-interested' },
        { title: 'Visit', path: '/superadmin/reports/visit' },
        { title: 'Not Picked', path: '/superadmin/reports/not-picked' },
        { title: 'Other Location', path: '/superadmin/reports/other-location' },
    ],
  },
  {
    title: 'Marketing',
    path: '/superadmin/marketing', 
    icon: <TrendingUp className="h-5 w-5" />,
    submenu: true,
    subMenuItems: [
        { title: 'WhatsApp', path: '/superadmin/marketing/whatsapp', icon: <MessageCircle className='h-4 w-4' /> },
        { title: 'Google', path: '/superadmin/marketing/google', icon: <Globe className='h-4 w-4' /> },
        { title: 'Facebook', path: '/superadmin/marketing/facebook', icon: <Facebook className='h-4 w-4' /> },
        { title: 'LinkedIn', path: '/superadmin/marketing/linkedin', icon: <Linkedin className='h-4 w-4' /> },
    ],
  },
  {
    title: 'Time Sheet',
    path: '/superadmin/timesheet',
    icon: <Clock className="h-5 w-5" />,
  },
  {
    title: 'Project',
    path: '/superadmin/project',
    icon: <Presentation className="h-5 w-5" />,
  },
  {
    title: 'Add Sell',
    path: '/superadmin/add-sell',
    icon: <FilePlus className="h-5 w-5" />,
  },
];


export const STAFF_SIDENAV_ITEMS = [
    {
        title: 'Dashboard',
        path: '/staff/dashboard',
        icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
        title: 'Productivity',
        path: '/staff/productivity/staff',
        icon: <AreaChart className="h-5 w-5" />,
    },
    {
      title: 'Incentives',
      path: '/staff/incentives',
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
        title: 'Leads Report',
        path: '/staff/reports',
        icon: <FileBarChart className="h-5 w-5" />,
        submenu: true,
        subMenuItems: [
            { title: 'Leads', path: '/staff/reports/total-leads' },
            { title: 'Interested', path: '/staff/reports/interested' },
            { title: 'Not Interested', path: '/staff/reports/not-interested' },
            { title: 'Visit', path: '/staff/reports/visit' },
            { title: 'Not Picked', path: '/staff/reports/not-picked' },
            { title: 'Other Location', path: '/staff/reports/other-location' },
            { title: 'Today Followups', path: '/staff/reports/today-followups' },
            { title: 'Tomorrow Followups', path: '/staff/reports/tomorrow-followups' },
            { title: 'Pending Followups', path: '/staff/reports/pending-followups' },
        ],
    },
    {
        title: 'Marketing',
        path: '/staff/marketing', 
        icon: <TrendingUp className="h-5 w-5" />,
        submenu: true,
        subMenuItems: [
            { title: 'WhatsApp', path: '/staff/marketing/whatsapp', icon: <MessageCircle className='h-4 w-4' /> },
            { title: 'Google', path: '/staff/marketing/google', icon: <Globe className='h-4 w-4' /> },
            { title: 'Facebook', path: '/staff/marketing/facebook', icon: <Facebook className='h-4 w-4' /> },
            { title: 'LinkedIn', path: '/staff/marketing/linkedin', icon: <Linkedin className='h-4 w-4' /> },
        ],
    },
    {
        title: 'Time Sheet',
        path: '/staff/timesheet',
        icon: <Clock className="h-5 w-5" />,
    },
];

export const TEAM_LEADER_SIDENAV_ITEMS = [
    {
        title: 'Dashboard',
        path: '/team-leader',
        icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
        title: 'Productivity',
        path: '/team-leader/productivity',
        icon: <AreaChart className="h-5 w-5" />,
        submenu: true,
        subMenuItems: [
            { title: 'Staff', path: '/team-leader/productivity/staff' },
            { title: 'Associates', path: '/team-leader/productivity/associates' },
        ],
    },
    {
        title: 'Leads',
        path: '/team-leader/reports/total-leads',
        icon: <FolderKanban className="h-5 w-5" />,
    },
    {
        title: 'Leads Report',
        path: '/team-leader/reports',
        icon: <FileBarChart className="h-5 w-5" />,
        submenu: true,
        subMenuItems: [
            { title: 'Interested', path: '/team-leader/reports/interested' },
            { title: 'Visit', path: '/team-leader/reports/visit' },
        ],
    },
    {
        title: 'Marketing',
        path: '/team-leader/marketing', 
        icon: <TrendingUp className="h-5 w-5" />,
        submenu: true,
        subMenuItems: [
            { title: 'WhatsApp', path: '/team-leader/marketing/whatsapp', icon: <MessageCircle className='h-4 w-4' /> },
            { title: 'Google', path: '/team-leader/marketing/google', icon: <Globe className='h-4 w-4' /> },
            { title: 'Facebook', path: '/team-leader/marketing/facebook', icon: <Facebook className='h-4 w-4' /> },
            { title: 'LinkedIn', path: '/team-leader/marketing/linkedin', icon: <Linkedin className='h-4 w-4' /> },
        ],
    },
    {
        title: 'Time Sheet',
        path: '/team-leader/timesheet',
        icon: <Clock className="h-5 w-5" />,
    },
    {
      title: 'Add Sell',
      path: '/team-leader/add-sell',
      icon: <FilePlus className="h-5 w-5" />,
    },
];

export const STAFF_DASHBOARD_KPI_DATA = [
    { title: "Pending FollowUps", valueKey: "pending_followups", icon: Clock, color: "text-yellow-500", link: "/staff/reports/pending-followups" },
    { title: "Tomorrow FollowUps", valueKey: "tomorrow_followups", icon: Phone, color: "text-blue-500", link: "/staff/reports/tomorrow-followups" },
    { title: "Today FollowUps", valueKey: "today_followups", icon: Phone, color: "text-purple-500", link: "/staff/reports/today-followups" },
    { title: "Upload Leads", valueKey: "upload_leads", icon: FileUp, color: "text-sky-500", link: "/staff/reports/upload-leads" },
    { title: "Remaining Leads", valueKey: "remaining_leads", icon: Users, color: "text-indigo-500", link: "/staff/reports/remaining-leads"},
    { title: "Total Lead", valueKey: "total_lead", icon: Users, color: "text-rose-500", link: "/staff/reports/total-leads" },
    { title: "Total Visits", valueKey: "total_visits", icon: Eye, color: "text-green-500", link: "/staff/reports/visit" },
    { title: "Interested", valueKey: "interested", icon: Check, color: "text-teal-500", link: "/staff/reports/interested" },
    { title: "Not Interested", valueKey: "not_interested", icon: XCircle, color: "text-red-500", link: "/staff/reports/not-interested" },
    { title: "Other Location", valueKey: "other_location", icon: MapPin, color: "text-orange-500", link: "/staff/reports/other-location" },
    { title: "Not Picked", valueKey: "not_picked", icon: Phone, color: "text-slate-500", link: "/staff/reports/not-picked" },
];
