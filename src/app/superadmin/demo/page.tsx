'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function SuperAdminDemoPage() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/dashboard/super-user/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-lg">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-lg text-red-500">Error: {error}</div>;
  }

  if (!dashboardData) {
    return <div className="text-center py-8 text-lg">No data available.</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Super Admin Demo Page</h1>
      <p className="text-muted-foreground">Displaying data fetched from `http://127.0.0.1:8000/accounts/dashboard/super-user/`</p>

      <Card>
        <CardHeader>
          <CardTitle>User Statistics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium">Total Users:</p>
            <p className="text-2xl font-bold">{dashboardData.total_users}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Logged In Users:</p>
            <p className="text-2xl font-bold">{dashboardData.logged_in_users}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Logged Out Users:</p>
            <p className="text-2xl font-bold">{dashboardData.logged_out_users}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lead Data Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dashboardData.data_points.map((point: any, index: number) => (
              <div key={index} className="border p-3 rounded-lg">
                <p className="text-sm font-medium">{point.label}:</p>
                <p className="text-xl font-bold">{point.y}</p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium">Total Upload Leads:</p>
              <p className="text-xl font-bold">{dashboardData.total_upload_leads}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Assign Leads:</p>
              <p className="text-xl font-bold">{dashboardData.total_assign_leads}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Interested:</p>
              <p className="text-xl font-bold">{dashboardData.total_interested}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Not Interested:</p>
              <p className="text-xl font-bold">{dashboardData.total_not_interested}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Other Location:</p>
              <p className="text-xl font-bold">{dashboardData.total_other_location}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Not Picked:</p>
              <p className="text-xl font-bold">{dashboardData.total_not_picked}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Lost:</p>
              <p className="text-xl font-bold">{dashboardData.total_lost}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Visits:</p>
              <p className="text-xl font-bold">{dashboardData.total_visits}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Raw User Data (First 3 Users)</CardTitle>
        </CardHeader>
        <CardContent>
          {dashboardData.users && dashboardData.users.slice(0, 3).map((user: any) => (
            <div key={user.id} className="border p-3 rounded-lg mb-2">
              <p className="text-sm font-medium">ID: {user.id}</p>
              <p className="text-sm font-medium">Name: {user.name || user.user.name || 'N/A'}</p>
              <p className="text-sm font-medium">Email: {user.email || user.user.email || 'N/A'}</p>
              <p className="text-sm font-medium">Mobile: {user.mobile || user.user.mobile || 'N/A'}</p>
              <p className="text-sm font-medium">Role: {user.user.is_admin ? 'Admin' : user.user.is_team_leader ? 'Team Leader' : user.user.is_staff_new ? 'Staff' : 'User'}</p>
            </div>
          ))}
          {dashboardData.users && dashboardData.users.length > 3 && (
            <p className="text-sm text-muted-foreground mt-2">...and {dashboardData.users.length - 3} more users.</p>
          )}
          {!dashboardData.users || dashboardData.users.length === 0 && (
            <p className="text-sm text-muted-foreground">No user data available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
