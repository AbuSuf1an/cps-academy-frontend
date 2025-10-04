import { requireAuth, getEnrolledCourses } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, User, GraduationCap, Clock } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await requireAuth();
  const enrolledCourses = await getEnrolledCourses();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'Developer':
        return 'destructive';
      case 'SocialMediaManager':
        return 'secondary';
      case 'Student':
        return 'default';
      default:
        return 'outline';
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-foreground'>Dashboard</h1>
              <p className='text-muted-foreground mt-1'>
                Welcome back, {session.strapiUser?.username || session.user?.name}!
              </p>
            </div>
            <Avatar className='h-12 w-12'>
              {session.profile?.avatar && (
                <AvatarImage
                  src={session.profile.avatar.url}
                  alt={session.profile.displayName}
                />
              )}
              <AvatarFallback>
                {getInitials(session.profile?.displayName || session.user?.name || 'User')}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Profile Card */}
          <Card className='lg:col-span-1'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <User className='h-5 w-5' />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <Avatar className='h-16 w-16'>
                  {session.profile?.avatar && (
                    <AvatarImage
                      src={session.profile.avatar.url}
                      alt={session.profile.displayName}
                    />
                  )}
                  <AvatarFallback className='text-lg'>
                    {getInitials(session.profile?.displayName || session.user?.name || 'User')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='font-semibold'>
                    {session.profile?.displayName || session.user?.name}
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    {session.strapiUser?.email}
                  </p>
                  <Badge variant={getRoleBadgeVariant(session.role || 'NormalUser')} className='mt-1'>
                    {session.role || 'NormalUser'}
                  </Badge>
                </div>
              </div>
              
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Member since:</span>
                  <span>
                    {new Date(session.strapiUser?.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Account status:</span>
                  <Badge variant={session.strapiUser?.confirmed ? 'default' : 'secondary'}>
                    {session.strapiUser?.confirmed ? 'Verified' : 'Unverified'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enrolled Courses */}
          <Card className='lg:col-span-2'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <BookOpen className='h-5 w-5' />
                My Courses
              </CardTitle>
              <CardDescription>
                {enrolledCourses.length > 0
                  ? `You are enrolled in ${enrolledCourses.length} course${enrolledCourses.length > 1 ? 's' : ''}`
                  : 'You are not enrolled in any courses yet'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {enrolledCourses.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {enrolledCourses.map((course: any) => (
                    <Card key={course.id} className='hover:shadow-md transition-shadow'>
                      <CardContent className='pt-4'>
                        <div className='space-y-2'>
                          <div className='flex items-start justify-between'>
                            <h4 className='font-semibold line-clamp-2'>{course.title}</h4>
                            <Badge variant='outline'>{course.level}</Badge>
                          </div>
                          <p className='text-sm text-muted-foreground line-clamp-2'>
                            {course.description?.replace(/<[^>]*>/g, '') || 'No description available'}
                          </p>
                          <div className='flex items-center text-sm text-muted-foreground'>
                            <GraduationCap className='h-4 w-4 mr-1' />
                            <span>{course.modules?.length || 0} modules</span>
                          </div>
                          <Button size='sm' className='w-full' asChild>
                            <Link href={`/courses/${course.slug}`}>
                              Continue Learning
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className='text-center py-8'>
                  <BookOpen className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
                  <h3 className='text-lg font-semibold mb-2'>No courses yet</h3>
                  <p className='text-muted-foreground mb-4'>
                    Start your learning journey by enrolling in a course
                  </p>
                  <Button asChild>
                    <Link href='/courses'>Browse Courses</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className='mt-6'>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <Button variant='outline' className='justify-start' asChild>
                <Link href='/courses'>
                  <BookOpen className='mr-2 h-4 w-4' />
                  Browse All Courses
                </Link>
              </Button>
              <Button variant='outline' className='justify-start' asChild>
                <Link href='/profile'>
                  <User className='mr-2 h-4 w-4' />
                  Edit Profile
                </Link>
              </Button>
              {session.role === 'Student' && (
                <Button variant='outline' className='justify-start' asChild>
                  <Link href='/progress'>
                    <Clock className='mr-2 h-4 w-4' />
                    View Progress
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}