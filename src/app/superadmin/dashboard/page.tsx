
'use client';

import { BarChart, PieChart, FreelancerChart } from "@/components/dashboard/custom-charts";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Globe, Briefcase, AreaChart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const kpiData = [
  { title: "Productivity", value: 85, icon: AreaChart, change: "+20.1%", changeType: "increase", subtext: "vs last month", postfix: "%", color: "text-purple-500 shadow-purple-500/50", link: "/superadmin/productivity" },
  { title: "Staff Management", value: 18, icon: Users, change: "+2", changeType: "increase", subtext: "vs last month", color: "text-sky-500 shadow-sky-500/50", link: "/superadmin/users/staff" },
  { title: "Source", value: 100, icon: Globe, change: "+10", changeType: "increase", subtext: "new sources", prefix: "", color: "text-amber-500 shadow-amber-500/50", link: "/superadmin/marketing" },
  { title: "Freelancers", value: 7, icon: Briefcase, change: "+3", changeType: "increase", subtext: "vs last month", color: "text-rose-500 shadow-rose-500/50", link: "/superadmin/users/admin" },
];

export default function SuperAdminDashboardPage() {
  return (
    <div className="space-y-6">
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Link href={kpi.link} key={index}>
            <Card className="shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300 bg-card">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                    <div className={cn("text-primary", kpi.color)}>
                        <kpi.icon className="h-8 w-8" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{kpi.title}</p>
                    <p className="text-lg font-bold text-muted-foreground">
                        <AnimatedCounter from={0} to={kpi.value} prefix={kpi.prefix} postfix={kpi.postfix} />
                    </p>
                </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm bg-card text-card-foreground">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Productivity</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>
        <Card className="shadow-sm bg-card text-card-foreground">
          <CardHeader className="flex flex-row justify-between items-center">
             <CardTitle>Staff Management</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart type="staff" />
          </CardContent>
        </Card>
        <Card className="shadow-sm bg-card text-card-foreground">
           <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Source</CardTitle>
          </CardHeader>
          <CardContent>
           <PieChart type="source" />
          </CardContent>
        </Card>
        <Card className="shadow-sm bg-card text-card-foreground">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Freelancer Chart</CardTitle>
            </CardHeader>
           <CardContent>
             <FreelancerChart />
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
