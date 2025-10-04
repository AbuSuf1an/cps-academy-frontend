import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';

/**
 * Get the session on the server side
 */
export async function getSessionServer(): Promise<Session | null> {
  return await getServerSession(authOptions);
}

/**
 * Get the authenticated user's session or redirect to login
 */
export async function requireAuth(): Promise<Session> {
  const session = await getSessionServer();
  
  if (!session) {
    redirect('/login');
  }
  
  return session;
}

/**
 * Check if user has required role
 */
export function hasRole(session: Session | null, allowedRoles: string[]): boolean {
  if (!session?.role) {
    return false;
  }
  
  return allowedRoles.includes(session.role);
}

/**
 * Middleware to check if user has required roles
 * Use this to wrap server actions or API routes
 */
export function withRole(allowedRoles: string[]) {
  return async function <T extends any[], R>(
    action: (...args: T) => Promise<R>
  ) {
    return async (...args: T): Promise<R> => {
      const session = await requireAuth();
      
      if (!hasRole(session, allowedRoles)) {
        throw new Error(`Access denied. Required roles: ${allowedRoles.join(', ')}`);
      }
      
      return action(...args);
    };
  };
}

/**
 * Get the current user's profile role
 */
export async function getCurrentUserRole(): Promise<string | null> {
  const session = await getSessionServer();
  return session?.role || null;
}

/**
 * Check if current user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSessionServer();
  return !!session;
}

/**
 * Check if current user has admin role
 */
export async function isAdmin(): Promise<boolean> {
  const session = await getSessionServer();
  return hasRole(session, ['Developer', 'SocialMediaManager']);
}

/**
 * Check if current user is a student
 */
export async function isStudent(): Promise<boolean> {
  const session = await getSessionServer();
  return hasRole(session, ['Student']);
}

/**
 * Get user's enrolled courses from session
 */
export async function getEnrolledCourses() {
  const session = await getSessionServer();
  return session?.profile?.enrolledCourses || [];
}

/**
 * Role-based access control helper for server components/actions
 */
export const roleGuards = {
  // Only developers and social media managers
  admin: withRole(['Developer', 'SocialMediaManager']),
  
  // Only students
  student: withRole(['Student']),
  
  // Students and above (excluding NormalUser)
  enrolled: withRole(['Student', 'SocialMediaManager', 'Developer']),
  
  // All authenticated users
  authenticated: withRole(['NormalUser', 'Student', 'SocialMediaManager', 'Developer']),
  
  // Only developers
  developer: withRole(['Developer']),
};