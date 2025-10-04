'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  BookOpen, 
  Play, 
  Clock, 
  CheckCircle2,
  Star,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RequireRole from '@/components/auth/RequireRole';

interface EnrolledCourse {
  id: number;
  title: string;
  slug: string;
  level: string;
  progress: number;
  lastWatched?: string;
  totalLessons: number;
  completedLessons: number;
  estimatedTimeLeft: string;
}

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        // Mock data for enrolled courses
        setEnrolledCourses([
          {
            id: 1,
            title: 'JavaScript Fundamentals',
            slug: 'javascript-fundamentals',
            level: 'Beginner',
            progress: 35,
            lastWatched: '2 hours ago',
            totalLessons: 20,
            completedLessons: 7,
            estimatedTimeLeft: '8h 30m'
          },
          {
            id: 2,
            title: 'React Essentials',
            slug: 'react-essentials',
            level: 'Intermediate',
            progress: 60,
            lastWatched: '1 day ago',
            totalLessons: 15,
            completedLessons: 9,
            estimatedTimeLeft: '4h 15m'
          },
          {
            id: 3,
            title: 'Node.js Backend Development',
            slug: 'nodejs-backend',
            level: 'Advanced',
            progress: 10,
            lastWatched: '3 days ago',
            totalLessons: 25,
            completedLessons: 2,
            estimatedTimeLeft: '15h 45m'
          }
        ]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const completedCourses = enrolledCourses.filter(course => course.progress === 100);
  const inProgressCourses = enrolledCourses.filter(course => course.progress > 0 && course.progress < 100);
  const notStartedCourses = enrolledCourses.filter(course => course.progress === 0);

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  return (
    <RequireRole allowedRoles={['Student', 'Developer']}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Learning</h1>
          <p className="text-muted-foreground">
            Track your progress and continue your learning journey
          </p>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrolledCourses.length}</div>
              <p className="text-xs text-muted-foreground">Active enrollments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCourses.length}</div>
              <p className="text-xs text-muted-foreground">Courses finished</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCourses.length}</div>
              <p className="text-xs text-muted-foreground">Currently learning</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47h</div>
              <p className="text-xs text-muted-foreground">Time invested</p>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning */}
        {inProgressCourses.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>
                Pick up where you left off
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inProgressCourses.slice(0, 2).map((course) => (
                  <div key={course.id} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-12 bg-primary/10 rounded flex items-center justify-center">
                        <Play className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{course.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary">{course.level}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {course.completedLessons}/{course.totalLessons} lessons
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{course.progress}% complete</span>
                          <span>{course.estimatedTimeLeft} left</span>
                        </div>
                      </div>
                    </div>
                    <Button asChild>
                      <Link href={`/courses/${course.slug}`}>
                        <Play className="h-4 w-4 mr-2" />
                        Continue
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Enrolled Courses */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>
                  All your enrolled courses
                </CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link href="/courses">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse More
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-16 h-12 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : enrolledCourses.length > 0 ? (
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center">
                        {course.progress === 100 ? (
                          <CheckCircle2 className="h-6 w-6 text-green-500" />
                        ) : (
                          <BookOpen className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{course.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary">{course.level}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {course.completedLessons}/{course.totalLessons} lessons
                        </span>
                        {course.lastWatched && (
                          <span className="text-sm text-muted-foreground">• Last watched {course.lastWatched}</span>
                        )}
                      </div>
                      {course.progress > 0 && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground mt-1 block">
                            {course.progress}% complete
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {course.progress === 100 && (
                        <Star className="h-4 w-4 text-yellow-500" />
                      )}
                      <Button size="sm" asChild>
                        <Link href={`/courses/${course.slug}`}>
                          {course.progress > 0 ? 'Continue' : 'Start'}
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No courses enrolled yet</h3>
                <p className="text-muted-foreground mb-4">
                  Explore our course library to start your learning journey
                </p>
                <Button asChild>
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </RequireRole>
  );
}