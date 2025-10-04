import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Code, Mail, Twitter, Github, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  Product: [
    { name: 'Courses', href: '/courses' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Features', href: '/features' },
    { name: 'API', href: '/api' },
  ],
  Company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  Resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Tutorials', href: '/tutorials' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
  ],
};

const socialLinks = [
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'GitHub', href: '#', icon: Github },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'YouTube', href: '#', icon: Youtube },
];

export function Footer() {
  return (
    <footer className='border-t bg-background'>
      <div className='container mx-auto px-4 py-12'>
        {/* Main Footer Content */}
        <div className='grid gap-8 lg:grid-cols-12'>
          {/* Brand Section */}
          <div className='lg:col-span-4'>
            <Link href='/' className='flex items-center space-x-2 mb-4'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
                <Code className='h-5 w-5 text-primary-foreground' />
              </div>
              <span className='text-xl font-bold'>CPS Academy</span>
            </Link>
            <p className='text-muted-foreground mb-6 max-w-sm'>
              Master programming skills with our comprehensive courses. Learn from
              industry experts and build real-world projects.
            </p>
            
            {/* Newsletter Signup */}
            <div className='space-y-4'>
              <h3 className='text-sm font-semibold'>Stay updated</h3>
              <div className='flex gap-2'>
                <Input
                  type='email'
                  placeholder='Enter your email'
                  className='flex-1'
                />
                <Button size='sm'>
                  <Mail className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className='lg:col-span-8'>
            <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h3 className='text-sm font-semibold mb-4'>{category}</h3>
                  <ul className='space-y-3'>
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-12 border-t pt-8'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='text-sm text-muted-foreground'>
              © 2024 CPS Academy. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className='flex items-center gap-4'>
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant='ghost'
                  size='sm'
                  asChild
                  className='text-muted-foreground hover:text-foreground'
                >
                  <a href={social.href} aria-label={social.name}>
                    <social.icon className='h-4 w-4' />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
