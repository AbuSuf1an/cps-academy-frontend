'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  SkipBack, 
  SkipForward, 
  CheckCircle2,
  Circle,
  ArrowLeft,
  BookOpen,
  Clock,
  User,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RequireRole from '@/components/auth/RequireRole';

interface Topic {
  id: number;
  title: string;
  description?: string;
  isWatched: boolean;
}

interface Class {
  id: number;
  title: string;
  description?: string;
  videoUrl: string;
  videoType: 'mp4' | 'youtube' | 'vimeo';
  duration?: string;
  topics: Topic[];
}

interface Module {
  id: number;
  title: string;
  classes: { id: number; title: string; slug: string }[];
}

interface Course {
  id: number;
  title: string;
  slug: string;
  description?: string;
  modules: Module[];
}

interface CourseProgress {
  [classId: string]: {
    isWatched: boolean;
    watchedTopics: number[];
    lastWatchedAt: string;
  };
}

export default function VideoPlayerPage() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [currentClass, setCurrentClass] = useState<Class | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState<CourseProgress>({});
  const [watchedTopics, setWatchedTopics] = useState<number[]>([]);
  const [isClassWatched, setIsClassWatched] = useState(false);

  const courseSlug = params.slug as string;
  const moduleId = parseInt(params.moduleId as string);
  const classId = parseInt(params.classId as string);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch course data
        const courseResponse = await fetch(`/api/courses/${courseSlug}`);
        if (courseResponse.ok) {
          const courseData = await courseResponse.json();
          setCourse(courseData);

          // Find current class
          const currentModule = courseData.modules?.find((m: Module) => m.id === moduleId);
          const classData = currentModule?.classes?.find((c: any) => c.id === classId);
          
          if (classData) {
            // Mock class data with topics
            const mockClass: Class = {
              ...classData,
              videoUrl: classData.videoUrl || 'https://sample-videos.com/zip/10/mp4/720/big_buck_bunny_720p_1mb.mp4',
              videoType: classData.videoType || 'mp4',
              duration: classData.duration || '10:30',
              topics: [
                { id: 1, title: 'Introduction', description: 'Course overview and objectives', isWatched: false },
                { id: 2, title: 'Setting up the Environment', description: 'Installing required tools', isWatched: false },
                { id: 3, title: 'Basic Concepts', description: 'Understanding fundamental principles', isWatched: false },
                { id: 4, title: 'Practical Examples', description: 'Hands-on coding exercises', isWatched: false },
                { id: 5, title: 'Best Practices', description: 'Industry standards and conventions', isWatched: false },
                { id: 6, title: 'Summary', description: 'Key takeaways and next steps', isWatched: false }
              ]
            };
            setCurrentClass(mockClass);
          }
        }

        // Check enrollment status
        if (session?.role === 'Student') {
          // Mock enrollment check
          setIsEnrolled(true);
          
          // Load progress from localStorage (MVP approach)
          const savedProgress = localStorage.getItem(`course-progress-${courseSlug}`);
          if (savedProgress) {
            const progressData = JSON.parse(savedProgress);
            setProgress(progressData);
            
            // Set current class state
            const classProgress = progressData[classId.toString()];
            if (classProgress) {
              setWatchedTopics(classProgress.watchedTopics || []);
              setIsClassWatched(classProgress.isWatched || false);
            }
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setLoading(false);
      }
    };

    if (courseSlug && moduleId && classId) {
      fetchCourseData();
    }
  }, [courseSlug, moduleId, classId, session]);

  const saveProgress = (newProgress: CourseProgress) => {
    localStorage.setItem(`course-progress-${courseSlug}`, JSON.stringify(newProgress));
    setProgress(newProgress);
  };

  const toggleTopicWatched = (topicId: number) => {
    const newWatchedTopics = watchedTopics.includes(topicId)
      ? watchedTopics.filter(id => id !== topicId)
      : [...watchedTopics, topicId];
    
    setWatchedTopics(newWatchedTopics);
    
    const newProgress = {
      ...progress,
      [classId.toString()]: {
        isWatched: isClassWatched,
        watchedTopics: newWatchedTopics,
        lastWatchedAt: new Date().toISOString()
      }
    };
    
    saveProgress(newProgress);
  };

  const markClassAsWatched = () => {
    const newIsWatched = !isClassWatched;
    setIsClassWatched(newIsWatched);
    
    const newProgress = {
      ...progress,
      [classId.toString()]: {
        isWatched: newIsWatched,
        watchedTopics: watchedTopics,
        lastWatchedAt: new Date().toISOString()
      }
    };
    
    saveProgress(newProgress);
  };

  const getVideoEmbed = (videoUrl: string, videoType: string) => {
    switch (videoType) {
      case 'youtube':
        const youtubeId = videoUrl.includes('youtube.com/watch?v=') 
          ? videoUrl.split('v=')[1]?.split('&')[0]
          : videoUrl.split('youtu.be/')[1]?.split('?')[0];
        return (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      
      case 'vimeo':
        const vimeoId = videoUrl.split('vimeo.com/')[1]?.split('?')[0];
        return (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}`}
            className="w-full h-full rounded-lg"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        );
      
      default:
        return (
          <video
            controls
            className="w-full h-full rounded-lg bg-black"
            src={videoUrl}
          >
            Your browser does not support the video tag.
          </video>
        );
    }
  };

  const getCurrentModuleClasses = () => {
    const currentModule = course?.modules?.find(m => m.id === moduleId);
    return currentModule?.classes || [];
  };

  const getAdjacentClass = (direction: 'previous' | 'next') => {
    const classes = getCurrentModuleClasses();
    const currentIndex = classes.findIndex(c => c.id === classId);
    
    if (direction === 'previous' && currentIndex > 0) {
      return classes[currentIndex - 1];
    } else if (direction === 'next' && currentIndex < classes.length - 1) {
      return classes[currentIndex + 1];
    }
    
    return null;
  };

  const navigateToClass = (targetClass: { id: number; slug: string }) => {
    router.push(`/student/courses/${courseSlug}/${moduleId}/${targetClass.id}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course || !currentClass) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Class Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The requested class could not be found or you don&apos;t have access to it.
            </p>
            <Button asChild>
              <Link href="/student">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check access control
  if (session?.role !== 'Student' && session?.role !== 'Developer') {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-8">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground mb-4">
              You need to be a student to access course videos.
            </p>
            <Button asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isEnrolled && session?.role !== 'Developer') {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-8">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Enrollment Required</h2>
            <p className="text-muted-foreground mb-4">
              You need to be enrolled in this course to access the video content.
            </p>
            <Button asChild>
              <Link href={`/courses/${courseSlug}`}>View Course Details</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const previousClass = getAdjacentClass('previous');
  const nextClass = getAdjacentClass('next');

  return (
    <RequireRole allowedRoles={['Student', 'Developer']}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <Link href="/student" className="hover:text-foreground">
              Dashboard
            </Link>
            <span>/</span>
            <Link href={`/courses/${courseSlug}`} className="hover:text-foreground">
              {course.title}
            </Link>
            <span>/</span>
            <span className="text-foreground">{currentClass.title}</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{currentClass.title}</h1>
            <Button variant="outline" asChild>
              <Link href={`/courses/${courseSlug}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Course
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  {getVideoEmbed(currentClass.videoUrl, currentClass.videoType)}
                </div>
              </CardContent>
            </Card>

            {/* Video Info */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{currentClass.title}</span>
                      {isClassWatched && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                    </CardTitle>
                    {currentClass.duration && (
                      <CardDescription className="flex items-center space-x-1 mt-1">
                        <Clock className="h-4 w-4" />
                        <span>{currentClass.duration}</span>
                      </CardDescription>
                    )}
                  </div>
                  <Button
                    onClick={markClassAsWatched}
                    variant={isClassWatched ? "default" : "outline"}
                    className="flex items-center space-x-2"
                  >
                    {isClassWatched ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                    <span>{isClassWatched ? 'Watched' : 'Mark as Watched'}</span>
                  </Button>
                </div>
              </CardHeader>
              {currentClass.description && (
                <CardContent>
                  <p className="text-muted-foreground">{currentClass.description}</p>
                </CardContent>
              )}
            </Card>

            {/* Navigation */}
            <Card>
              <CardHeader>
                <CardTitle>Class Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    disabled={!previousClass}
                    onClick={() => previousClass && navigateToClass(previousClass)}
                    className="flex items-center space-x-2"
                  >
                    <SkipBack className="h-4 w-4" />
                    <span>Previous Class</span>
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Class {getCurrentModuleClasses().findIndex(c => c.id === classId) + 1} of {getCurrentModuleClasses().length}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    disabled={!nextClass}
                    onClick={() => nextClass && navigateToClass(nextClass)}
                    className="flex items-center space-x-2"
                  >
                    <span>Next Class</span>
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Topics Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Topics</span>
                </CardTitle>
                <CardDescription>
                  Track your progress through each topic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentClass.topics.map((topic, index) => (
                    <div key={topic.id} className="group">
                      <div 
                        className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => toggleTopicWatched(topic.id)}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {watchedTopics.includes(topic.id) ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {index + 1}
                            </Badge>
                            <h4 className={`font-medium text-sm leading-tight ${
                              watchedTopics.includes(topic.id) 
                                ? 'text-green-700 line-through' 
                                : 'text-foreground'
                            }`}>
                              {topic.title}
                            </h4>
                          </div>
                          {topic.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {topic.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Progress Summary */}
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress:</span>
                    <span className="font-medium">
                      {watchedTopics.length}/{currentClass.topics.length} topics
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(watchedTopics.length / currentClass.topics.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                  {watchedTopics.length === currentClass.topics.length && (
                    <p className="text-xs text-green-600 mt-2 flex items-center">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      All topics completed!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RequireRole>
  );
}