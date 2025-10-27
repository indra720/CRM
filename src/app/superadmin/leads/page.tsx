
'use client';

import React from 'react';
import { KanbanBoard } from '@/components/leads/kanban-board';

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Leads Kanban</h1>
      <KanbanBoard />
    </div>
  );
}
