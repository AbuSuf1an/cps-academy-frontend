'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import CourseCard from '@/components/courses/CourseCard';
import { strapiApi } from '@/lib/api';
import { FlattenedCourse, transformers, CoursesResponse } from '@/lib/types';

export default function CoursesPage() {
  const [courses, setCourses] = useState<FlattenedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await strapiApi.getCourses();
        const coursesData = response.data as CoursesResponse;
        
        // Transform Strapi data to flattened structure
        const transformedCourses = coursesData.data.map(transformers.course);
        setCourses(transformedCourses);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Error Loading Courses</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">All Courses</h1>
        <p className="text-lg text-muted-foreground">
          Discover our comprehensive collection of courses designed to enhance your skills
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No Courses Available</h2>
          <p className="text-muted-foreground">
            Check back later for new courses, or contact us for more information.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}