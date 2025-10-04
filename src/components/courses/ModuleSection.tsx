'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Lock, Clock, FileText } from 'lucide-react';
import Link from 'next/link';

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

interface ModuleSectionProps {
  module: Module;
  courseSlug: string;
  isEnrolled: boolean;
}

interface ClassItemProps {
  classItem: Class;
  courseSlug: string;
  moduleOrder: number;
  isEnrolled: boolean;
}

function ClassItem({ classItem, courseSlug, moduleOrder, isEnrolled }: ClassItemProps) {
  const { data: session } = useSession();
  const isStudent = session?.role === 'Student';
  
  // Can access if: free preview OR (student AND enrolled)
  const canAccess = classItem.isFreePreview || (isStudent && isEnrolled);
  
  const topicsCount = classItem.topics?.length || 0;

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold">{classItem.title}</h4>
              {classItem.isFreePreview && (
                <Badge variant="secondary">Free Preview</Badge>
              )}
            </div>
            
            {classItem.description && (
              <p className="text-sm text-muted-foreground mb-2">
                {classItem.description}
              </p>
            )}
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {classItem.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{classItem.duration}</span>
                </div>
              )}
              
              {topicsCount > 0 && (
                <div className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  <span>{topicsCount} topics</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="ml-4">
            {canAccess ? (
              <Button asChild size="sm">
                <Link href={`/courses/${courseSlug}/modules/${moduleOrder}/classes/${classItem.order}`}>
                  <Play className="h-4 w-4 mr-2" />
                  Play
                </Link>
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {!session ? 'Login required' : 'Enrollment required'}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ModuleSection({ module, courseSlug, isEnrolled }: ModuleSectionProps) {
  const sortedClasses = module.classes?.sort((a, b) => a.order - b.order) || [];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
            {module.order}
          </span>
          {module.title}
        </CardTitle>
        {module.description && (
          <p className="text-muted-foreground">{module.description}</p>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          {sortedClasses.map((classItem) => (
            <ClassItem
              key={classItem.id}
              classItem={classItem}
              courseSlug={courseSlug}
              moduleOrder={module.order}
              isEnrolled={isEnrolled}
            />
          ))}
          
          {sortedClasses.length === 0 && (
            <p className="text-muted-foreground text-center py-4">
              No classes available in this module
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}