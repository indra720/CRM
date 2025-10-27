'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminReportsIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/reports/reports-index'); // Redirect to the generic reports index
  }, [router]);

  return null; // Or a loading spinner
}
