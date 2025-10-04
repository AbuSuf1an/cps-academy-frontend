import { getSessionServer } from '@/lib/auth';
import { SignOutButton } from '@/components/auth/SignOutButton';
import Link from 'next/link';
import { Home } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getSessionServer();

  return (
    <div className='min-h-screen bg-background'>
      {/* Dashboard Header */}
      <header className='border-b bg-card'>
        <div className='container mx-auto px-4'>
          <div className='flex h-16 items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Link href='/dashboard' className='flex items-center space-x-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
                  <Home className='h-5 w-5 text-primary-foreground' />
                </div>
                <span className='text-xl font-bold'>CPS Academy</span>
              </Link>
              <nav className='hidden md:flex space-x-6'>
                <Link
                  href='/dashboard'
                  className='text-sm font-medium text-muted-foreground hover:text-foreground'
                >
                  Dashboard
                </Link>
                <Link
                  href='/courses'
                  className='text-sm font-medium text-muted-foreground hover:text-foreground'
                >
                  Courses
                </Link>
                {session?.role === 'Student' && (
                  <Link
                    href='/progress'
                    className='text-sm font-medium text-muted-foreground hover:text-foreground'
                  >
                    Progress
                  </Link>
                )}
              </nav>
            </div>
            <div className='flex items-center space-x-4'>
              <span className='text-sm text-muted-foreground'>
                {session?.profile?.displayName || session?.user?.name}
              </span>
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}