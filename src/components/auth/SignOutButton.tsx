'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function SignOutButton() {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <Button variant='outline' size='sm' onClick={handleSignOut}>
      <LogOut className='mr-2 h-4 w-4' />
      Sign Out
    </Button>
  );
}