import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Star } from 'lucide-react';

export function Hero() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 py-20 sm:py-32'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-4xl text-center'>
          {/* Badge */}
          <Badge variant='secondary' className='mb-6 px-4 py-2'>
            <Star className='mr-2 h-4 w-4' />
            🚀 New: Advanced React Course Available
          </Badge>

          {/* Headline */}
          <h1 className='mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
            Master Programming
            <br />
            <span className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
              From Zero to Hero
            </span>
          </h1>

          {/* Subheadline */}
          <p className='mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl'>
            Learn programming with industry experts. Build real projects, get
            hands-on experience, and launch your career in tech with our
            comprehensive courses.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
            <Button size='lg' className='text-lg px-8' asChild>
              <a href='/auth/signup'>
                Start Learning Free
                <ArrowRight className='ml-2 h-5 w-5' />
              </a>
            </Button>
            <Button size='lg' variant='outline' className='text-lg px-8' asChild>
              <a href='#demo'>
                <Play className='mr-2 h-5 w-5' />
                Watch Demo
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className='mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <div className='flex -space-x-2'>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className='h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent border-2 border-background'
                  />
                ))}
              </div>
              <span>Join 10,000+ students</span>
            </div>
            <div className='flex items-center gap-2'>
              <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
              <span>4.9/5 average rating</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='h-2 w-2 rounded-full bg-success' />
              <span>95% completion rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div className='h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl' />
        </div>
      </div>
    </section>
  );
}
