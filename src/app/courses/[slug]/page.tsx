'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { strapiApi } from '@/lib/api';
import { FlattenedCourse, transformers, CourseResponse } from '@/lib/types';
import { 
  BookOpen, 
  Clock, 
  Users, 
  ArrowLeft, 
  Star, 
  Play, 
  Lock,
  CheckCircle2,
  AlertCircle 
} from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: session } = useSession();
  
  const [course, setCourse] = useState<FlattenedCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await strapiApi.getCourseBySlug(slug);
        if (!response) {
          throw new Error('Course not found');
        }
        
        const courseData = response.data as CourseResponse;
        const transformedCourse = transformers.course(courseData.data);
        setCourse(transformedCourse);
        
        // Mock enrollment check - replace with actual logic
        if (session?.role === 'Student') {
          // For demo purposes, assume some courses are enrolled
          setIsEnrolled(['complete-web-development-bootcamp', 'advanced-react-patterns'].includes(slug));
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch course');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCourse();
    }
  }, [slug, session]);

  const handleEnroll = async () => {
    // TODO: Implement enrollment logic
    console.log('Enrolling in course:', course?.id);
    setIsEnrolled(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-8 w-96 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="aspect-video w-full rounded-lg mb-6" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div>
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              {error === 'Course not found' ? 'Course Not Found' : 'Error Loading Course'}
            </h2>
            <p className="text-muted-foreground mb-4">
              {error || 'Unable to load course details'}
            </p>
            <Button asChild>
              <Link href="/courses">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Courses
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sortedModules = course.modules.sort((a, b) => a.orderIndex - b.orderIndex);
  const totalClasses = course.modules.reduce((total, module) => total + module.classes.length, 0);
  const freePreviewCount = course.modules.reduce((total, module) => {
    return total + module.classes.filter(classItem => classItem.isFreePreview).length;
  }, 0);

  const thumbnailUrl = course.thumbnail?.url 
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${course.thumbnail.url}`
    : '/placeholder-course.jpg';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link 
          href="/courses" 
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Courses
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Course Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{course.level}</Badge>
              {freePreviewCount > 0 && (
                <Badge className="bg-green-500 text-white">
                  <Play className="h-3 w-3 mr-1" />
                  {freePreviewCount} Free Preview{freePreviewCount > 1 ? 's' : ''}
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{course.modules.length} modules</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{totalClasses} classes</span>
              </div>
              
              {course.estimatedDuration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.estimatedDuration}</span>
                </div>
              )}
            </div>
          </div>

          {/* Course Image */}
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={thumbnailUrl}
              alt={course.thumbnail?.alternativeText || course.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>

          {/* Course Description */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About This Course</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </CardContent>
          </Card>

          {/* Course Modules */}
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedModules.map((module, moduleIndex) => (
                  <div key={module.id} className="border rounded-lg">
                    <div className="p-4 bg-muted/50">
                      <h3 className="font-semibold">
                        Module {moduleIndex + 1}: {module.title}
                      </h3>
                      {module.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {module.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="divide-y">
                      {module.classes
                        .sort((a, b) => a.orderIndex - b.orderIndex)
                        .map((classItem, classIndex) => (
                          <div key={classItem.id} className="p-4 flex items-center justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                                {classIndex + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{classItem.title}</h4>
                                {classItem.description && (
                                  <p className="text-sm text-muted-foreground">
                                    {classItem.description}
                                  </p>
                                )}
                                <div className="flex items-center gap-2 mt-1">
                                  {classItem.duration && (
                                    <span className="text-xs text-muted-foreground flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {classItem.duration}
                                    </span>
                                  )}
                                  {classItem.topics.length > 0 && (
                                    <span className="text-xs text-muted-foreground">
                                      {classItem.topics.length} topics
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {classItem.isFreePreview ? (
                                <Button size="sm" variant="outline" asChild>
                                  <Link href={`/student/courses/${course.slug}/${module.id}/${classItem.id}`}>
                                    <Play className="h-4 w-4 mr-2" />
                                    Preview
                                  </Link>
                                </Button>
                              ) : isEnrolled ? (
                                <Button size="sm" asChild>
                                  <Link href={`/student/courses/${course.slug}/${module.id}/${classItem.id}`}>
                                    <Play className="h-4 w-4 mr-2" />
                                    Watch
                                  </Link>
                                </Button>
                              ) : (
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Lock className="h-4 w-4 mr-1" />
                                  Locked — Login or Enroll
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                {course.price !== undefined ? (
                  <div className="text-3xl font-bold">
                    {course.price === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <>
                        {course.discountPrice ? (
                          <>
                            <span className="text-muted-foreground line-through text-xl mr-2">
                              ${course.price}
                            </span>
                            <span>${course.discountPrice}</span>
                          </>
                        ) : (
                          <span>${course.price}</span>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-primary">Coming Soon</div>
                )}
              </div>

              {session ? (
                isEnrolled ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center text-green-600 font-medium">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Enrolled
                    </div>
                    <Button size="lg" className="w-full" asChild>
                      <Link href={`/student/courses/${course.slug}/${sortedModules[0]?.id}/${sortedModules[0]?.classes[0]?.id}`}>
                        Continue Learning
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <Button size="lg" className="w-full" onClick={handleEnroll}>
                    {course.price === 0 ? 'Enroll for Free' : 'Enroll Now'}
                  </Button>
                )
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Sign in to enroll in this course
                  </p>
                  <Button size="lg" className="w-full" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                </div>
              )}

              {freePreviewCount > 0 && !isEnrolled && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200 text-center">
                    <Play className="h-4 w-4 inline mr-1" />
                    {freePreviewCount} free preview{freePreviewCount > 1 ? 's' : ''} available
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t space-y-4">
                <h4 className="font-semibold">This course includes:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-primary" />
                    {course.modules.length} comprehensive modules
                  </li>
                  <li className="flex items-center">
                    <Play className="h-4 w-4 mr-2 text-primary" />
                    {totalClasses} video lessons
                  </li>
                  {course.estimatedDuration && (
                    <li className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      {course.estimatedDuration} of content
                    </li>
                  )}
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-primary" />
                    Lifetime access
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}