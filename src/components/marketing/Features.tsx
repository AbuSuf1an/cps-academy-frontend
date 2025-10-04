import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Code, Users, Award, Clock, Globe, Headphones } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Comprehensive Curriculum',
    description: 'Learn from beginner to advanced levels with structured, industry-relevant curriculum designed by experts.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Code,
    title: 'Hands-on Projects',
    description: 'Build real-world applications and add them to your portfolio. Practice with live coding challenges.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Users,
    title: 'Expert Mentors',
    description: 'Learn from industry professionals with years of experience at top tech companies.',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    icon: Award,
    title: 'Industry Certificates',
    description: 'Earn recognized certificates upon completion that boost your career prospects.',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    icon: Clock,
    title: 'Self-Paced Learning',
    description: 'Study at your own pace with lifetime access to course materials and updates.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Get help whenever you need it with our dedicated support team and community forums.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
];

export function Features() {
  return (
    <section className='py-20 sm:py-32'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='mb-4 text-3xl font-bold tracking-tight sm:text-4xl'>
            Why Choose CPS Academy?
          </h2>
          <p className='text-lg text-muted-foreground'>
            We provide the best learning experience with modern tools, expert
            guidance, and proven methodologies.
          </p>
        </div>

        {/* Features Grid */}
        <div className='mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature) => (
            <Card key={feature.title} className='group hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor} mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className='text-xl'>{feature.title}</CardTitle>
                <CardDescription className='text-base leading-relaxed'>
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className='mt-20 rounded-2xl bg-muted/50 p-8 sm:p-12'>
          <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            <div className='text-center'>
              <div className='text-4xl font-bold text-primary mb-2'>10K+</div>
              <div className='text-muted-foreground'>Students Enrolled</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl font-bold text-primary mb-2'>50+</div>
              <div className='text-muted-foreground'>Courses Available</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl font-bold text-primary mb-2'>95%</div>
              <div className='text-muted-foreground'>Success Rate</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl font-bold text-primary mb-2'>24/7</div>
              <div className='text-muted-foreground'>Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
