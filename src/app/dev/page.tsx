'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  Code2, 
  Database, 
  Server, 
  Settings,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Activity,
  Users,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RequireRole from '@/components/auth/RequireRole';

interface SystemStatus {
  service: string;
  status: 'healthy' | 'warning' | 'error';
  uptime: string;
  lastCheck: string;
  description: string;
}

interface FeatureFlag {
  name: string;
  key: string;
  enabled: boolean;
  description: string;
  environment: 'development' | 'staging' | 'production';
}

export default function DeveloperDashboard() {
  const { data: session } = useSession();
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([]);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSystemData = async () => {
      try {
        // Mock system status data
        setSystemStatus([
          {
            service: 'Frontend (Next.js)',
            status: 'healthy',
            uptime: '99.9%',
            lastCheck: '2 minutes ago',
            description: 'Web application running smoothly'
          },
          {
            service: 'Backend API (Strapi)',
            status: 'healthy',
            uptime: '99.8%',
            lastCheck: '1 minute ago',
            description: 'Content management system operational'
          },
          {
            service: 'Database (PostgreSQL)',
            status: 'healthy',
            uptime: '99.95%',
            lastCheck: '30 seconds ago',
            description: 'Database performance optimal'
          },
          {
            service: 'Authentication (NextAuth)',
            status: 'warning',
            uptime: '98.5%',
            lastCheck: '5 minutes ago',
            description: 'Increased response times detected'
          },
          {
            service: 'File Storage',
            status: 'healthy',
            uptime: '99.7%',
            lastCheck: '1 minute ago',
            description: 'Media files accessible'
          }
        ]);

        // Mock feature flags
        setFeatureFlags([
          {
            name: 'New Course Player',
            key: 'new_course_player',
            enabled: true,
            description: 'Enhanced video player with better controls',
            environment: 'development'
          },
          {
            name: 'AI Course Recommendations',
            key: 'ai_recommendations',
            enabled: false,
            description: 'Machine learning-based course suggestions',
            environment: 'development'
          },
          {
            name: 'Advanced Analytics',
            key: 'advanced_analytics',
            enabled: true,
            description: 'Detailed learning progress tracking',
            environment: 'staging'
          },
          {
            name: 'Social Features',
            key: 'social_features',
            enabled: false,
            description: 'Student discussion forums and peer interaction',
            environment: 'development'
          },
          {
            name: 'Mobile App API',
            key: 'mobile_api',
            enabled: true,
            description: 'REST API endpoints for mobile application',
            environment: 'production'
          }
        ]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching system data:', error);
        setLoading(false);
      }
    };

    fetchSystemData();
  }, []);

  const getStatusIcon = (status: SystemStatus['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: SystemStatus['status']) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getEnvironmentColor = (env: FeatureFlag['environment']) => {
    switch (env) {
      case 'production':
        return 'bg-green-100 text-green-800';
      case 'staging':
        return 'bg-yellow-100 text-yellow-800';
      case 'development':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const healthyServices = systemStatus.filter(s => s.status === 'healthy').length;
  const warningServices = systemStatus.filter(s => s.status === 'warning').length;
  const errorServices = systemStatus.filter(s => s.status === 'error').length;
  const enabledFlags = featureFlags.filter(f => f.enabled).length;

  return (
    <RequireRole allowedRoles={['Developer']}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Developer Dashboard</h1>
          <p className="text-muted-foreground">
            System monitoring, feature flags, and development tools
          </p>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Healthy Services</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{healthyServices}</div>
              <p className="text-xs text-muted-foreground">Running normally</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Warnings</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{warningServices}</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{errorServices}</div>
              <p className="text-xs text-muted-foreground">Require fixes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Flags</CardTitle>
              <Zap className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{enabledFlags}</div>
              <p className="text-xs text-muted-foreground">Features enabled</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 mr-2" />
                System Status
              </CardTitle>
              <CardDescription>
                Real-time monitoring of all services
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {systemStatus.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(service.status)}
                        <div>
                          <h4 className="font-medium">{service.service}</h4>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(service.status)}>
                          {service.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Uptime: {service.uptime}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {service.lastCheck}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Feature Flags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Feature Flags
              </CardTitle>
              <CardDescription>
                Toggle experimental features and configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {featureFlags.map((flag, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{flag.name}</h4>
                          <Badge className={getEnvironmentColor(flag.environment)}>
                            {flag.environment}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{flag.description}</p>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                          {flag.key}
                        </code>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-12 h-6 rounded-full relative transition-colors ${
                          flag.enabled ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                            flag.enabled ? 'translate-x-6' : 'translate-x-0.5'
                          }`}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Environment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Developer Tools</CardTitle>
              <CardDescription>
                Quick access to development utilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto p-4" asChild>
                  <Link href="/student">
                    <div className="text-center">
                      <Users className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-sm">Student View</div>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto p-4" asChild>
                  <Link href="/manager">
                    <div className="text-center">
                      <Activity className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-sm">Manager View</div>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto p-4">
                  <div className="text-center">
                    <Database className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm">Database</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4">
                  <div className="text-center">
                    <Code2 className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm">API Docs</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Environment Info</CardTitle>
              <CardDescription>
                Current deployment and configuration details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm font-medium">Environment:</span>
                  <Badge className="bg-blue-100 text-blue-800">Development</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm font-medium">Version:</span>
                  <code className="text-sm">v1.2.3</code>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm font-medium">Build:</span>
                  <code className="text-sm">#142</code>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm font-medium">Last Deploy:</span>
                  <span className="text-sm">2 hours ago</span>
                </div>
                <div className="mt-4 pt-3 border-t">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>All systems secured with JWT authentication</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                    <Globe className="h-4 w-4" />
                    <span>CORS configured for localhost:3000</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RequireRole>
  );
}