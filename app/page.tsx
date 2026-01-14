'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      // Token exists, go to dashboard
      router.push('/dashboard');
    } else {
      // No token, go to login
      router.push('/login');
    }
  }, [router]);

  return null; // This component doesn't render anything
}