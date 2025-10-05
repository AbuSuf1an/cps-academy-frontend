'use client';

import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { SignOutButton } from '@/components/auth/SignOutButton';
import Image from 'next/image';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2'>
            <Image
              src='/logo.png'
              alt='CPS Academy logo'
              width={475}
              height={76}
              quality={100}
              priority
              className='h-9 w-auto'
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-6'>
            <Link
              href='/courses'
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              Courses
            </Link>
            <Link
              href='#features'
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              Features
            </Link>
            <Link
              href='#pricing'
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              Pricing
            </Link>
            <Link
              href='#about'
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              About
            </Link>
            <div className='flex items-center space-x-2'>
              {status === 'loading' ? (
                <div className='w-20 h-8 bg-gray-200 animate-pulse rounded'></div>
              ) : session ? (
                <>
                  <Button variant='ghost' size='sm' asChild>
                    <Link href='/dashboard'>
                      <User className='mr-2 h-4 w-4' />
                      Dashboard
                    </Link>
                  </Button>
                  <SignOutButton />
                </>
              ) : (
                <>
                  <Button variant='ghost' size='sm' asChild>
                    <Link href='/login'>Sign In</Link>
                  </Button>
                  <Button size='sm' asChild>
                    <Link href='/register'>Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className='md:hidden flex items-center justify-center p-2 rounded-md'
            aria-label='Toggle menu'
          >
            {isMenuOpen ? (
              <X className='h-5 w-5' />
            ) : (
              <Menu className='h-5 w-5' />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='md:hidden border-t py-4'>
            <nav className='flex flex-col space-y-3'>
              <Link
                href='/courses'
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2'
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                href='#features'
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2'
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href='#pricing'
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2'
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href='#about'
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2'
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className='flex flex-col space-y-2 px-3 pt-2'>
                {session ? (
                  <>
                    <Button variant='ghost' size='sm' className='justify-start' asChild>
                      <Link href='/dashboard' onClick={() => setIsMenuOpen(false)}>
                        <User className='mr-2 h-4 w-4' />
                        Dashboard
                      </Link>
                    </Button>
                    <div onClick={() => setIsMenuOpen(false)}>
                      <SignOutButton />
                    </div>
                  </>
                ) : (
                  <>
                    <Button variant='ghost' size='sm' className='justify-start' asChild>
                      <Link href='/login' onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                    </Button>
                    <Button size='sm' className='justify-start' asChild>
                      <Link href='/register' onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
