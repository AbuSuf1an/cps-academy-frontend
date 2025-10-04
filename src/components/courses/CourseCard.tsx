import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, BookOpen } from 'lucide-react';

interface CourseCardProps {
  course: {
    id: number;
    slug: string;
    title: string;
    description: string;
    level: string;
    duration?: string;
    price?: number;
    thumbnail?: {
      url: string;
      alternativeText?: string;
    };
    modules?: Array<{
      id: number;
      title: string;
      classes?: Array<{
        id: number;
        title: string;
      }>;
    }>;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  const totalClasses = course.modules?.reduce((total, module) => {
    return total + (module.classes?.length || 0);
  }, 0) || 0;

  const thumbnailUrl = course.thumbnail?.url 
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${course.thumbnail.url}`
    : '/placeholder-course.jpg';

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <Link href={`/courses/${course.slug}`}>
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={thumbnailUrl}
            alt={course.thumbnail?.alternativeText || course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {course.level && (
            <Badge 
              className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm"
              variant="default"
            >
              {course.level}
            </Badge>
          )}
        </div>
        
        <CardHeader>
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {course.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              {course.modules && (
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.modules.length} modules</span>
                </div>
              )}
              
              {totalClasses > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{totalClasses} classes</span>
                </div>
              )}
              
              {course.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              )}
            </div>
            
            {course.price !== undefined && (
              <div className="font-semibold text-primary">
                {course.price === 0 ? 'Free' : `$${course.price}`}
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}