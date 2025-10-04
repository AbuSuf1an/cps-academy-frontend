'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  BarChart3,
  Eye,
  Clock,
  Star,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RequireRole from '@/components/auth/RequireRole';

interface CourseAnalytics {
  id: number;
  title: string;
  slug: string;
  level: string;
  enrollments: number;
  completionRate: number;
  avgRating: number;
  totalViews: number;
  createdAt: string;
}

interface Stats {
  totalCourses: number;
  totalStudents: number;
  avgCompletionRate: number;
  totalViews: number;
}

export default function ManagerDashboard() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<CourseAnalytics[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalCourses: 0,
    totalStudents: 0,
    avgCompletionRate: 0,
    totalViews: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock analytics data
        const mockCourses: CourseAnalytics[] = [
          {
            id: 1,
            title: 'JavaScript Fundamentals',
            slug: 'javascript-fundamentals',
            level: 'Beginner',
            enrollments: 245,
            completionRate: 78,
            avgRating: 4.6,
            totalViews: 1250,
            createdAt: '2024-01-15'
          },
          {
            id: 2,
            title: 'React Essentials',
            slug: 'react-essentials',
            level: 'Intermediate',
            enrollments: 189,
            completionRate: 65,
            avgRating: 4.8,
            totalViews: 980,
            createdAt: '2024-02-10'
          },
          {
            id: 3,
            title: 'Node.js Backend Development',
            slug: 'nodejs-backend',
            level: 'Advanced',
            enrollments: 142,
            completionRate: 52,
            avgRating: 4.7,
            totalViews: 750,
            createdAt: '2024-03-05'
          },
          {
            id: 4,
            title: 'Python for Beginners',
            slug: 'python-beginners',
            level: 'Beginner',
            enrollments: 298,
            completionRate: 82,
            avgRating: 4.5,
            totalViews: 1450,
            createdAt: '2024-01-20'
          }
        ];

        setCourses(mockCourses);
        
        // Calculate stats
        const totalEnrollments = mockCourses.reduce((sum, course) => sum + course.enrollments, 0);
        const avgCompletion = mockCourses.reduce((sum, course) => sum + course.completionRate, 0) / mockCourses.length;
        const totalViews = mockCourses.reduce((sum, course) => sum + course.totalViews, 0);

        setStats({
          totalCourses: mockCourses.length,
          totalStudents: totalEnrollments,
          avgCompletionRate: Math.round(avgCompletion),
          totalViews: totalViews
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-3 w-3 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <RequireRole allowedRoles={['SocialMediaManager', 'Developer']}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Manager Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor course performance and engagement analytics
          </p>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
              <p className="text-xs text-muted-foreground">Active courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Enrolled students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgCompletionRate}%</div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Video views</p>
            </CardContent>
          </Card>
        </div>

        {/* Course Performance */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Course Performance</CardTitle>
                <CardDescription>
                  Detailed analytics for each course
                </CardDescription>
              </div>
              <Button variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="w-16 h-12 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-16 h-12 bg-primary/10 rounded flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium">{course.title}</h3>
                            <Badge variant="secondary">{course.level}</Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Enrollments:</span>
                              <div className="font-medium">{course.enrollments}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Completion:</span>
                              <div className={`font-medium ${getCompletionColor(course.completionRate)}`}>
                                {course.completionRate}%
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Rating:</span>
                              <div className="flex items-center space-x-1">
                                <span className="font-medium">{course.avgRating}</span>
                                <div className="flex space-x-1">
                                  {getRatingStars(course.avgRating)}
                                </div>
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Views:</span>
                              <div className="font-medium">{course.totalViews.toLocaleString()}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Created: {new Date(course.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/courses/${course.slug}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Course
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Popular Courses</CardTitle>
              <CardDescription>
                Top performing courses by enrollment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {courses
                  .sort((a, b) => b.enrollments - a.enrollments)
                  .slice(0, 3)
                  .map((course, index) => (
                    <div key={course.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{course.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {course.enrollments} enrollments
                        </p>
                      </div>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Insights</CardTitle>
              <CardDescription>
                Key metrics and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">High Engagement</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Beginner courses show 80%+ completion rates
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-900">Opportunity</span>
                  </div>
                  <p className="text-xs text-yellow-700">
                    Advanced courses need engagement improvements
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Star className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Trending</span>
                  </div>
                  <p className="text-xs text-green-700">
                    JavaScript courses maintain highest ratings
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RequireRole>
  );
}