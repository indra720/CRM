'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StaffReportsIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/staff/reports/reports-index'); // Redirect to the generic reports index
  }, [router]);

  return null; // Or a loading spinner
}
