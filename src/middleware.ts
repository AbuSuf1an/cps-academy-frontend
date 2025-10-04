import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define role-based route permissions
const PROTECTED_ROUTES = {
  '/dashboard': ['NormalUser', 'Student', 'SocialMediaManager', 'Developer'], // Any authenticated user
  '/student': ['Student', 'Developer'], // Students and Developers
  '/manager': ['SocialMediaManager', 'Developer'], // Social Media Managers and Developers
  '/dev': ['Developer'], // Only Developers
} as const;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the current path needs protection
  const matchedRoute = Object.keys(PROTECTED_ROUTES).find(route => 
    pathname.startsWith(route)
  );

  if (!matchedRoute) {
    return NextResponse.next();
  }

  // Get the user's session token
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check if user has required role
  const allowedRoles = PROTECTED_ROUTES[matchedRoute as keyof typeof PROTECTED_ROUTES];
  const userRole = token.role as string || 'NormalUser';

  if (!allowedRoles.includes(userRole as any)) {
    // Redirect to appropriate dashboard based on user role
    let redirectPath = '/dashboard';
    
    switch (userRole) {
      case 'Student':
        redirectPath = '/student';
        break;
      case 'SocialMediaManager':
        redirectPath = '/manager';
        break;
      case 'Developer':
        redirectPath = '/dev';
        break;
      default:
        redirectPath = '/dashboard';
    }

    // If they're trying to access their own dashboard but don't have permission,
    // redirect to main dashboard
    if (pathname.startsWith(redirectPath)) {
      redirectPath = '/dashboard';
    }

    const unauthorizedUrl = new URL(redirectPath, request.url);
    unauthorizedUrl.searchParams.set('error', 'unauthorized');
    return NextResponse.redirect(unauthorizedUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/student/:path*',
    '/manager/:path*', 
    '/dev/:path*'
  ]
};