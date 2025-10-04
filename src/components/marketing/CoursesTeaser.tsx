import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, Users, Star, ArrowRight, Play } from 'lucide-react';

// Mock data - in real app, this would come from Strapi
const featuredCourses = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    description: 'Master HTML, CSS, JavaScript, React, Node.js and build real-world projects.',
    level: 'Beginner',
    duration: '12 weeks',
    students: '2,500+',
    rating: 4.9,
    thumbnail: '/api/placeholder/400/300',
    isFreePreview: true,
  },
  {
    id: 2,
    title: 'Advanced React Patterns',
    description: 'Deep dive into advanced React concepts, performance optimization, and modern patterns.',
    level: 'Advanced',
    duration: '8 weeks',
    students: '1,200+',
    rating: 4.8,
    thumbnail: '/api/placeholder/400/300',
    isFreePreview: true,
  },
  {
    id: 3,
    title: 'Full-Stack JavaScript Mastery',
    description: 'Build complete applications with modern JavaScript frameworks and backend technologies.',
    level: 'Intermediate',
    duration: '16 weeks',
    students: '3,100+',
    rating: 4.9,
    thumbnail: '/api/placeholder/400/300',
    isFreePreview: false,
  },
];

function CourseCard({ course }: { course: typeof featuredCourses[0] }) {
  return (
    <Card className='group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1'>
      <div className='relative'>
        <div className='aspect-video bg-gradient-to-br from-primary/20 to-accent/20' />
        {course.isFreePreview && (
          <Badge className='absolute left-4 top-4 bg-success text-success-foreground'>
            Free Preview
          </Badge>
        )}
        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
          <Button size='sm' variant='secondary' className='shadow-lg'>
            <Play className='mr-2 h-4 w-4' />
            Preview
          </Button>
        </div>
      </div>
      
      <CardHeader>
        <div className='flex items-center justify-between mb-2'>
          <Badge variant={course.level === 'Beginner' ? 'secondary' : course.level === 'Intermediate' ? 'default' : 'destructive'}>
            {course.level}
          </Badge>
          <div className='flex items-center gap-1 text-sm text-muted-foreground'>
            <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
            <span>{course.rating}</span>
          </div>
        </div>
        <CardTitle className='line-clamp-2'>{course.title}</CardTitle>
        <CardDescription className='line-clamp-3'>
          {course.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className='flex items-center justify-between text-sm text-muted-foreground mb-4'>
          <div className='flex items-center gap-1'>
            <Clock className='h-4 w-4' />
            <span>{course.duration}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Users className='h-4 w-4' />
            <span>{course.students}</span>
          </div>
        </div>
        
        <Button className='w-full' variant={course.isFreePreview ? 'default' : 'outline'}>
          {course.isFreePreview ? 'Start Free Preview' : 'Learn More'}
          <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </CardContent>
    </Card>
  );
}

function CourseCardSkeleton() {
  return (
    <Card className='overflow-hidden'>
      <Skeleton className='aspect-video w-full' />
      <CardHeader>
        <div className='flex items-center justify-between mb-2'>
          <Skeleton className='h-6 w-20' />
          <Skeleton className='h-4 w-12' />
        </div>
        <Skeleton className='h-6 w-full mb-2' />
        <Skeleton className='h-4 w-3/4' />
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-between mb-4'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-4 w-20' />
        </div>
        <Skeleton className='h-10 w-full' />
      </CardContent>
    </Card>
  );
}

export function CoursesTeaser() {
  return (
    <section className='py-20 sm:py-32 bg-muted/30'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='mx-auto max-w-2xl text-center mb-16'>
          <h2 className='mb-4 text-3xl font-bold tracking-tight sm:text-4xl'>
            Featured Courses
          </h2>
          <p className='text-lg text-muted-foreground'>
            Start your journey with our most popular courses. All courses include
            hands-on projects and lifetime access.
          </p>
        </div>

        {/* Courses Grid */}
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12'>
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* CTA */}
        <div className='text-center'>
          <Button size='lg' variant='outline' className='text-lg px-8' asChild>
            <a href='/courses'>
              View All Courses
              <ArrowRight className='ml-2 h-5 w-5' />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
