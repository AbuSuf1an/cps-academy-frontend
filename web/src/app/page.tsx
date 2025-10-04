import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Code, Users, Award, ArrowRight, Play } from 'lucide-react';

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-accent/5'>
      {/* Navigation */}
      <nav className='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
              <Code className='w-5 h-5 text-primary-foreground' />
            </div>
            <span className='text-xl font-bold'>CPS Academy</span>
          </div>
          <div className='flex items-center space-x-4'>
            <Button variant='ghost'>Courses</Button>
            <Button variant='ghost'>About</Button>
            <Button>Sign In</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='container mx-auto px-4 py-20 text-center'>
        <div className='max-w-4xl mx-auto'>
          <Badge variant='secondary' className='mb-4'>
            🚀 New: Advanced React Course Available
          </Badge>
          <h1 className='text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
            Master Programming
            <br />
            <span className='text-foreground'>From Zero to Hero</span>
          </h1>
          <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Learn programming with industry experts. Build real projects, get
            hands-on experience, and launch your career in tech.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button size='lg' className='text-lg px-8'>
              Start Learning Free
              <ArrowRight className='ml-2 w-5 h-5' />
            </Button>
            <Button size='lg' variant='outline' className='text-lg px-8'>
              <Play className='mr-2 w-5 h-5' />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='container mx-auto px-4 py-20'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold mb-4'>Why Choose CPS Academy?</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            We provide the best learning experience with modern tools and expert
            guidance.
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          <Card className='text-center'>
            <CardHeader>
              <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4'>
                <BookOpen className='w-6 h-6 text-primary' />
              </div>
              <CardTitle>Comprehensive Courses</CardTitle>
              <CardDescription>
                Learn from beginner to advanced levels with structured
                curriculum
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className='text-center'>
            <CardHeader>
              <div className='w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4'>
                <Code className='w-6 h-6 text-accent' />
              </div>
              <CardTitle>Hands-on Projects</CardTitle>
              <CardDescription>
                Build real-world applications and add them to your portfolio
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className='text-center'>
            <CardHeader>
              <div className='w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4'>
                <Users className='w-6 h-6 text-success' />
              </div>
              <CardTitle>Expert Mentors</CardTitle>
              <CardDescription>
                Learn from industry professionals with years of experience
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className='bg-muted/50 py-20'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-4 gap-8 text-center'>
            <div>
              <div className='text-4xl font-bold text-primary mb-2'>10K+</div>
              <div className='text-muted-foreground'>Students Enrolled</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-primary mb-2'>50+</div>
              <div className='text-muted-foreground'>Courses Available</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-primary mb-2'>95%</div>
              <div className='text-muted-foreground'>Success Rate</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-primary mb-2'>24/7</div>
              <div className='text-muted-foreground'>Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='container mx-auto px-4 py-20 text-center'>
        <div className='max-w-2xl mx-auto'>
          <Award className='w-16 h-16 text-primary mx-auto mb-6' />
          <h2 className='text-3xl font-bold mb-4'>
            Ready to Start Your Journey?
          </h2>
          <p className='text-muted-foreground mb-8'>
            Join thousands of students who have transformed their careers with
            our courses.
          </p>
          <Button size='lg' className='text-lg px-8'>
            Get Started Today
            <ArrowRight className='ml-2 w-5 h-5' />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t bg-muted/30'>
        <div className='container mx-auto px-4 py-8'>
          <div className='text-center text-muted-foreground'>
            <p>&copy; 2025 CPS Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
