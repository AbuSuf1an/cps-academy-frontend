'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface RequireRoleProps {
  children: ReactNode;
  allowedRoles: string[];
  fallbackMessage?: string;
  showLogin?: boolean;
}

export default function RequireRole({ 
  children, 
  allowedRoles, 
  fallbackMessage,
  showLogin = true 
}: RequireRoleProps) {
  const { data: session, status } = useSession();

  // Show loading state while checking session
  if (status === 'loading') {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Checking authorization...</span>
        </CardContent>
      </Card>
    );
  }

  // Not authenticated
  if (!session) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-yellow-600" />
          </div>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>
            You need to be logged in to access this page.
          </CardDescription>
        </CardHeader>
        {showLogin && (
          <CardContent className="text-center">
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </CardContent>
        )}
      </Card>
    );
  }

  // Check if user has required role
  const userRole = session.role || 'NormalUser';
  const hasRequiredRole = allowedRoles.includes(userRole);

  if (!hasRequiredRole) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            {fallbackMessage || `You need one of the following roles to access this page: ${allowedRoles.join(', ')}`}
          </CardDescription>
          <div className="mt-4 text-sm text-muted-foreground">
            Your current role: <span className="font-medium">{userRole}</span>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <div className="text-xs text-muted-foreground">
              Contact an administrator if you believe this is an error.
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // User has required role, render children
  return <>{children}</>;
}