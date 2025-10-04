// Application routes configuration
export const routes = {
  // Public routes
  home: '/',
  about: '/about',
  courses: '/courses',
  courseDetail: (slug: string) => `/courses/${slug}`,

  // Auth routes
  signin: '/auth/signin',
  signup: '/auth/signup',
  signout: '/auth/signout',

  // Protected routes
  dashboard: '/dashboard',
  profile: '/profile',
  settings: '/settings',

  // Student routes
  student: {
    dashboard: '/student/dashboard',
    courses: '/student/courses',
    course: (slug: string) => `/student/courses/${slug}`,
    module: (courseSlug: string, moduleId: string) =>
      `/student/courses/${courseSlug}/modules/${moduleId}`,
    class: (courseSlug: string, moduleId: string, classId: string) =>
      `/student/courses/${courseSlug}/modules/${moduleId}/classes/${classId}`,
  },

  // Social Media Manager routes
  smManager: {
    dashboard: '/sm-manager/dashboard',
    courses: '/sm-manager/courses',
    stats: '/sm-manager/stats',
    banners: '/sm-manager/banners',
  },

  // Developer routes
  developer: {
    dashboard: '/developer/dashboard',
    system: '/developer/system',
    flags: '/developer/flags',
    logs: '/developer/logs',
  },

  // API routes
  api: {
    auth: {
      login: '/api/auth/login',
      register: '/api/auth/register',
      me: '/api/auth/me',
    },
    courses: '/api/courses',
    course: (slug: string) => `/api/courses/${slug}`,
    modules: (courseId: string) => `/api/courses/${courseId}/modules`,
    classes: (moduleId: string) => `/api/modules/${moduleId}/classes`,
    topics: (classId: string) => `/api/classes/${classId}/topics`,
    stats: '/api/stats',
  },
} as const;

export type RouteKeys = keyof typeof routes;
