import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';

export function CTA() {
  return (
    <section className='py-20 sm:py-32'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-4xl'>
          <Card className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 border-2'>
            <CardContent className='p-8 sm:p-12 text-center'>
              {/* Background Pattern */}
              <div className='absolute inset-0 -z-10'>
                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <div className='h-[400px] w-[400px] rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-3xl' />
                </div>
              </div>

              {/* Badge */}
              <Badge variant='secondary' className='mb-6 px-4 py-2'>
                <Star className='mr-2 h-4 w-4' />
                Limited Time Offer
              </Badge>

              {/* Headline */}
              <h2 className='mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>
                Ready to Start Your
                <br />
                <span className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
                  Coding Journey?
                </span>
              </h2>

              {/* Subheadline */}
              <p className='mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl'>
                Join thousands of students who have transformed their careers with
                our courses. Start your free trial today and get access to all
                premium content.
              </p>

              {/* Features List */}
              <div className='mx-auto mb-8 max-w-md'>
                <div className='space-y-3 text-left'>
                  <div className='flex items-center gap-3'>
                    <CheckCircle className='h-5 w-5 text-success flex-shrink-0' />
                    <span className='text-sm'>7-day free trial</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <CheckCircle className='h-5 w-5 text-success flex-shrink-0' />
                    <span className='text-sm'>Access to all courses</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <CheckCircle className='h-5 w-5 text-success flex-shrink-0' />
                    <span className='text-sm'>Certificate upon completion</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <CheckCircle className='h-5 w-5 text-success flex-shrink-0' />
                    <span className='text-sm'>24/7 community support</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
                <Button size='lg' className='text-lg px-8' asChild>
                  <a href='/auth/signup'>
                    Start Free Trial
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </a>
                </Button>
                <Button size='lg' variant='outline' className='text-lg px-8' asChild>
                  <a href='/courses'>
                    Browse Courses
                  </a>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className='mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <div className='flex -space-x-2'>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className='h-6 w-6 rounded-full bg-gradient-to-r from-primary to-accent border-2 border-background'
                      />
                    ))}
                  </div>
                  <span>Join 10,000+ students</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                  <span>4.9/5 average rating</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
