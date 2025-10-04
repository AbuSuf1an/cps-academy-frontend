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
import ModuleSection from '@/components/courses/ModuleSection';
import { BookOpen, Clock, Users, ArrowLeft, Star } from 'lucide-react';

interface Topic {
  id: number;
  title: string;
  description?: string;
  order: number;
}

interface Class {
  id: number;
  title: string;
  description?: string;
  duration?: string;
  isFreePreview?: boolean;
  order: number;
  topics?: Topic[];
}

interface Module {
  id: number;
  title: string;
  description?: string;
  order: number;
  classes?: Class[];
}

interface Course {
  id: number;
  slug: string;
  title: string;
  description: string;
  level: string;
  duration?: string;
  price?: number;
  rating?: number;
  studentsCount?: number;
  thumbnail?: {
    url: string;
    alternativeText?: string;
  };
  modules?: Module[];
}

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: session } = useSession();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses?slug=${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Course not found');
          }
          throw new Error('Failed to fetch course');
        }
        const data = await response.json();
        setCourse(data.data);
        
        // Check if user is enrolled (you'll need to implement this based on your user profile structure)
        if (session?.profile?.enrolledCourses) {
          const enrolled = session.profile.enrolledCourses.some(
            (enrolledCourse: any) => enrolledCourse.id === data.data.id
          );
          setIsEnrolled(enrolled);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
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
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-6 w-32 mb-6" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="aspect-video w-full rounded-lg mb-6" />
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-2/3 mb-6" />
            
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="mb-6">
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/courses" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">
            {error === 'Course not found' ? 'Course Not Found' : 'Error Loading Course'}
          </h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  const thumbnailUrl = course.thumbnail?.url 
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${course.thumbnail.url}`
    : '/placeholder-course.jpg';

  const sortedModules = course.modules?.sort((a, b) => a.order - b.order) || [];
  const totalClasses = sortedModules.reduce((total, module) => {
    return total + (module.classes?.length || 0);
  }, 0);

  const isStudent = session?.role === 'Student';
  const canEnroll = !isEnrolled && (course.price === 0 || course.price === undefined);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/courses" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Courses
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Course Header */}
          <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
            <Image
              src={thumbnailUrl}
              alt={course.thumbnail?.alternativeText || course.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{course.level}</Badge>
              {course.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-muted-foreground">{course.description}</p>
          </div>

          {/* Course Stats */}
          <div className="flex items-center gap-6 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{sortedModules.length} modules</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{totalClasses} classes</span>
            </div>
            
            {course.duration && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
            )}
            
            {course.studentsCount && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{course.studentsCount} students</span>
              </div>
            )}
          </div>

          {/* Course Modules */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Course Content</h2>
            
            {sortedModules.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No modules available for this course</p>
                </CardContent>
              </Card>
            ) : (
              sortedModules.map((module) => (
                <ModuleSection
                  key={module.id}
                  module={module}
                  courseSlug={course.slug}
                  isEnrolled={isEnrolled}
                />
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>
                {course.price === 0 || course.price === undefined ? 'Free Course' : `$${course.price}`}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {isEnrolled ? (
                  <div className="text-center">
                    <Badge variant="default" className="mb-4">Enrolled</Badge>
                    <p className="text-sm text-muted-foreground">
                      You have access to all course content
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {!session ? (
                      <div className="space-y-2">
                        <Button asChild className="w-full">
                          <Link href="/login">Login to Access</Link>
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                          Login to enroll in this course
                        </p>
                      </div>
                    ) : isStudent ? (
                      canEnroll ? (
                        <div className="space-y-2">
                          <Button onClick={handleEnroll} className="w-full">
                            Enroll Now
                          </Button>
                          <p className="text-xs text-center text-muted-foreground">
                            Free enrollment available
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Button disabled className="w-full">
                            Coming Soon
                          </Button>
                          <p className="text-xs text-center text-muted-foreground">
                            Paid enrollment not yet available
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="space-y-2">
                        <Button disabled className="w-full">
                          Student Access Only
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                          Course access is limited to Student role
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-4 border-t space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Modules:</span>
                    <span>{sortedModules.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Classes:</span>
                    <span>{totalClasses}</span>
                  </div>
                  {course.duration && (
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{course.duration}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Level:</span>
                    <span>{course.level}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}