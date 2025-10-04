import { Button } from '@/components/ui/button';
import { Code, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className='min-h-screen bg-background'>
      {/* Sticky Navigation */}
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
                href='/courses'
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
              >
                Courses
              </Link>
              <Link
                href='/about'
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
              >
                About
              </Link>
              <Link
                href='/contact'
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
              >
                Contact
              </Link>
              <Button variant='ghost' size='sm' asChild>
                <Link href='/auth/signin'>Sign In</Link>
              </Button>
              <Button size='sm' asChild>
                <Link href='/auth/signup'>Get Started</Link>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant='ghost'
              size='sm'
              className='md:hidden'
              onClick={toggleMenu}
              aria-label='Toggle menu'
            >
              {isMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className='md:hidden border-t'>
              <nav className='flex flex-col space-y-2 py-4'>
                <Link
                  href='/courses'
                  className='px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
                  onClick={toggleMenu}
                >
                  Courses
                </Link>
                <Link
                  href='/about'
                  className='px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
                  onClick={toggleMenu}
                >
                  About
                </Link>
                <Link
                  href='/contact'
                  className='px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
                <div className='flex flex-col space-y-2 px-3 pt-2'>
                  <Button variant='ghost' size='sm' asChild>
                    <Link href='/auth/signin' onClick={toggleMenu}>
                      Sign In
                    </Link>
                  </Button>
                  <Button size='sm' asChild>
                    <Link href='/auth/signup' onClick={toggleMenu}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1'>{children}</main>
    </div>
  );
}
