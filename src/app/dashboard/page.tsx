'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  BookOpen, 
  Play, 
  User, 
  Users, 
  TrendingUp, 
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RequireRole from '@/components/auth/RequireRole';

interface Course {
  id: number;
  title: string;
  slug: string;
  level: string;
}

interface Stats {
  totalCourses: number;
  enrolledCourses: number;
  completedCourses: number;
  totalStudyTime: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);
  const [continueWatching, setContinueWatching] = useState<Course[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalCourses: 0,
    enrolledCourses: 0,
    completedCourses: 0,
    totalStudyTime: '0h'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recent courses
        const coursesResponse = await fetch('/api/courses?limit=5&sort=createdAt:desc');
        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json();
          setRecentCourses(coursesData.data || []);
        }

        // Fetch stats
        const statsResponse = await fetch('/api/courses/stats');
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }

        // Mock continue watching data for students
        if (session?.role === 'Student') {
          setContinueWatching([
            { id: 1, title: 'JavaScript Fundamentals', slug: 'javascript-fundamentals', level: 'Beginner' },
            { id: 2, title: 'React Essentials', slug: 'react-essentials', level: 'Intermediate' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.role]);

  const getRoleSpecificActions = () => {
    const userRole = session?.role || 'NormalUser';
    
    switch (userRole) {
      case 'Student':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button asChild>
              <Link href="/student">
                <BookOpen className="mr-2 h-4 w-4" />
                My Learning
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/courses">
                <Play className="mr-2 h-4 w-4" />
                Browse Courses
              </Link>
            </Button>
          </div>
        );
      case 'SocialMediaManager':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button asChild>
              <Link href="/manager">
                <TrendingUp className="mr-2 h-4 w-4" />
                Manager Dashboard
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/courses">
                <BookOpen className="mr-2 h-4 w-4" />
                Course Library
              </Link>
            </Button>
          </div>
        );
      case 'Developer':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild>
              <Link href="/dev">
                <User className="mr-2 h-4 w-4" />
                Dev Dashboard
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/student">
                <BookOpen className="mr-2 h-4 w-4" />
                Student View
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/manager">
                <TrendingUp className="mr-2 h-4 w-4" />
                Manager View
              </Link>
            </Button>
          </div>
        );
      default:
        return (
          <Button asChild>
            <Link href="/courses">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Courses
            </Link>
          </Button>
        );
    }
  };

  return (
    <RequireRole allowedRoles={['NormalUser', 'Student', 'SocialMediaManager', 'Developer']}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {session?.user?.name || 'User'}!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s your learning overview and quick actions.
          </p>
          <div className="mt-4">
            <Badge variant="outline">
              <User className="mr-1 h-3 w-3" />
              {session?.role || 'NormalUser'}
            </Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Access your role-specific features
            </CardDescription>
          </CardHeader>
          <CardContent>
            {getRoleSpecificActions()}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
              <p className="text-xs text-muted-foreground">Available in library</p>
            </CardContent>
          </Card>

          {session?.role === 'Student' && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Enrolled</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.enrolledCourses}</div>
                  <p className="text-xs text-muted-foreground">Active enrollments</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completedCourses}</div>
                  <p className="text-xs text-muted-foreground">Courses finished</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalStudyTime}</div>
                  <p className="text-xs text-muted-foreground">Total watched</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Courses</CardTitle>
              <CardDescription>
                Latest courses added to the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-16 h-12 bg-gray-200 rounded animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentCourses.length > 0 ? (
                <div className="space-y-3">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="flex items-center space-x-3">
                      <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium line-clamp-1">{course.title}</p>
                        <Badge variant="secondary" className="text-xs">
                          {course.level}
                        </Badge>
                      </div>
                      <Button size="sm" asChild>
                        <Link href={`/courses/${course.slug}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No courses available yet
                </p>
              )}
            </CardContent>
          </Card>

          {/* Continue Watching */}
          {session?.role === 'Student' && (
            <Card>
              <CardHeader>
                <CardTitle>Continue Watching</CardTitle>
                <CardDescription>
                  Pick up where you left off
                </CardDescription>
              </CardHeader>
              <CardContent>
                {continueWatching.length > 0 ? (
                  <div className="space-y-3">
                    {continueWatching.map((course) => (
                      <div key={course.id} className="flex items-center space-x-3">
                        <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center">
                          <Play className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium line-clamp-1">{course.title}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '35%' }}></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">35% complete</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/courses/${course.slug}`}>
                            <Play className="h-4 w-4 mr-1" />
                            Continue
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    No courses in progress yet
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </RequireRole>
  );
}