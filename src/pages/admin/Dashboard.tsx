import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/common/StatsCard';
import { MOCK_SERVICES, MOCK_APPLICATIONS } from '@/data/mockData';
import { 
  FileText, 
  Users, 
  CheckCircle2, 
  Clock,
  Plus,
  Settings,
  BarChart3,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const COLORS = ['#f59e0b', '#3b82f6', '#22c55e', '#ef4444', '#6366f1'];

export default function AdminDashboard() {
  const { user } = useAuth();

  const totalServices = MOCK_SERVICES.length;
  const activeServices = MOCK_SERVICES.filter(s => s.isActive).length;
  const totalApplications = MOCK_APPLICATIONS.length;
  const pendingCount = MOCK_APPLICATIONS.filter(a => a.status === 'pending').length;
  const approvedCount = MOCK_APPLICATIONS.filter(a => a.status === 'approved').length;
  const rejectedCount = MOCK_APPLICATIONS.filter(a => a.status === 'rejected').length;

  const statusData = [
    { name: 'Pending', value: pendingCount, color: '#f59e0b' },
    { name: 'Under Review', value: MOCK_APPLICATIONS.filter(a => a.status === 'under_review').length, color: '#3b82f6' },
    { name: 'Approved', value: approvedCount, color: '#22c55e' },
    { name: 'Rejected', value: rejectedCount, color: '#ef4444' },
    { name: 'Completed', value: MOCK_APPLICATIONS.filter(a => a.status === 'completed').length, color: '#6366f1' },
  ];

  const categoryData = MOCK_SERVICES.reduce((acc, service) => {
    const existing = acc.find(item => item.name === service.category);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ name: service.category, count: 1 });
    }
    return acc;
  }, [] as { name: string; count: number }[]);

  return (
    <Layout>
      <div className="bg-muted/30 min-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  Welcome, {user?.name}! Manage Gram Panchayat services and applications.
                </p>
              </div>
              <div className="flex gap-3">
                <Link to="/admin/services">
                  <Button variant="outline">
                    <Settings className="w-4 h-4" />
                    Manage Services
                  </Button>
                </Link>
                <Link to="/admin/services/new">
                  <Button variant="accent">
                    <Plus className="w-4 h-4" />
                    Add Service
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Total Users"
              value="50,000+"
              icon={Users}
              variant="primary"
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Active Services"
              value={activeServices}
              icon={FileText}
              variant="accent"
            />
            <StatsCard
              title="Total Applications"
              value={totalApplications}
              icon={BarChart3}
              variant="success"
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="Pending Review"
              value={pendingCount}
              icon={Clock}
              variant="warning"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Application Status Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Application Status Distribution
                </CardTitle>
                <CardDescription>Overview of all applications by status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {statusData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Services by Category */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Services by Category
                </CardTitle>
                <CardDescription>Distribution of services across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Latest submitted applications</CardDescription>
                  </div>
                  <Link to="/admin/applications">
                    <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {MOCK_APPLICATIONS.slice(0, 5).map((application) => {
                      const service = MOCK_SERVICES.find(s => s.id === application.serviceId);
                      return (
                        <div 
                          key={application.id}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm text-foreground">
                                {service?.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                #{application.id} • {new Date(application.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            application.status === 'pending' ? 'bg-warning/10 text-warning' :
                            application.status === 'approved' ? 'bg-success/10 text-success' :
                            application.status === 'rejected' ? 'bg-destructive/10 text-destructive' :
                            'bg-info/10 text-info'
                          }`}>
                            {application.status.replace('_', ' ')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/admin/services/new" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="w-4 h-4" />
                      Create New Service
                    </Button>
                  </Link>
                  <Link to="/admin/services" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4" />
                      Manage Services
                    </Button>
                  </Link>
                  <Link to="/admin/applications" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4" />
                      View Applications
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Database</span>
                      <span className="flex items-center gap-1 text-success">
                        <CheckCircle2 className="w-4 h-4" />
                        Operational
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Services</span>
                      <span className="flex items-center gap-1 text-success">
                        <CheckCircle2 className="w-4 h-4" />
                        All Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Updated</span>
                      <span className="text-foreground">Just now</span>
                    </div>
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
