import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/common/StatsCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { MOCK_SERVICES, MOCK_APPLICATIONS } from '@/data/mockData';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Plus,
  Eye
} from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();

  // Filter applications for current user (demo: all belong to user id '3')
  const userApplications = MOCK_APPLICATIONS;
  const pendingCount = userApplications.filter(a => a.status === 'pending' || a.status === 'under_review').length;
  const approvedCount = userApplications.filter(a => a.status === 'approved' || a.status === 'completed').length;

  return (
    <Layout>
      <div className="bg-muted/30 min-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Welcome, {user?.name}!
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage your applications and explore government services
                </p>
              </div>
              <Link to="/services">
                <Button variant="accent">
                  <Plus className="w-4 h-4" />
                  Apply for Service
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Total Applications"
              value={userApplications.length}
              icon={FileText}
              variant="primary"
            />
            <StatsCard
              title="Pending"
              value={pendingCount}
              icon={Clock}
              variant="warning"
            />
            <StatsCard
              title="Approved"
              value={approvedCount}
              icon={CheckCircle2}
              variant="success"
            />
            <StatsCard
              title="Available Services"
              value={MOCK_SERVICES.filter(s => s.isActive).length}
              icon={FileText}
              variant="accent"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Applications */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Track your application status</CardDescription>
                  </div>
                  <Link to="/user/applications">
                    <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {userApplications.length > 0 ? (
                    <div className="space-y-4">
                      {userApplications.slice(0, 5).map((application) => {
                        const service = MOCK_SERVICES.find(s => s.id === application.serviceId);
                        return (
                          <div 
                            key={application.id}
                            className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">
                                  {service?.title || 'Unknown Service'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Applied on {new Date(application.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <StatusBadge status={application.status} />
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No applications yet</p>
                      <Link to="/services">
                        <Button variant="link">Browse Services</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/services" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="w-4 h-4" />
                      Apply for New Service
                    </Button>
                  </Link>
                  <Link to="/user/applications" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Eye className="w-4 h-4" />
                      Track Applications
                    </Button>
                  </Link>
                  <Link to="/profile" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4" />
                      Update Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Popular Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {MOCK_SERVICES.slice(0, 4).map((service) => (
                      <Link 
                        key={service.id}
                        to={`/services/${service.id}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-foreground truncate">
                          {service.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
