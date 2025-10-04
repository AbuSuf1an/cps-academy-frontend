'use client';

import { Button } from '@/components/ui/button';
import { Code, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
              <Code className='h-5 w-5 text-primary-foreground' />
            </div>
            <span className='text-xl font-bold'>CPS Academy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-6'>
            <Link
              href='#features'
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              Features
            </Link>
            <Link
              href='#courses'
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              Courses
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
              <Button variant='ghost' size='sm' asChild>
                <Link href='/auth/signin'>Sign In</Link>
              </Button>
              <Button size='sm' asChild>
                <Link href='/auth/signup'>Get Started</Link>
              </Button>
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
                href='#features'
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2'
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href='#courses'
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2'
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
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
                <Button variant='ghost' size='sm' className='justify-start' asChild>
                  <Link href='/auth/signin'>Sign In</Link>
                </Button>
                <Button size='sm' className='justify-start' asChild>
                  <Link href='/auth/signup'>Get Started</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}