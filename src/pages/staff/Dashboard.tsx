import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { StatsCard } from '@/components/common/StatsCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { MOCK_SERVICES, MOCK_APPLICATIONS, APPLICATION_STATUSES } from '@/data/mockData';
import { ApplicationStatus } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  Search,
  Filter,
  Eye,
  Edit,
  XCircle,
  Users
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function StaffDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<typeof MOCK_APPLICATIONS[0] | null>(null);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('pending');
  const [remarks, setRemarks] = useState('');

  const totalApplications = MOCK_APPLICATIONS.length;
  const pendingCount = MOCK_APPLICATIONS.filter(a => a.status === 'pending').length;
  const reviewCount = MOCK_APPLICATIONS.filter(a => a.status === 'under_review').length;
  const approvedCount = MOCK_APPLICATIONS.filter(a => a.status === 'approved').length;

  const filteredApplications = MOCK_APPLICATIONS.filter(app => {
    const service = MOCK_SERVICES.find(s => s.id === app.serviceId);
    const matchesSearch = service?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = () => {
    toast({
      title: 'Status Updated',
      description: `Application status changed to ${newStatus.replace('_', ' ')}.`,
    });
    setSelectedApplication(null);
    setNewStatus('pending');
    setRemarks('');
  };

  return (
    <Layout>
      <div className="bg-muted/30 min-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Staff Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome, {user?.name}! Manage and process citizen applications.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Total Applications"
              value={totalApplications}
              icon={FileText}
              variant="primary"
            />
            <StatsCard
              title="Pending Review"
              value={pendingCount}
              icon={Clock}
              variant="warning"
            />
            <StatsCard
              title="Under Review"
              value={reviewCount}
              icon={Eye}
              variant="accent"
            />
            <StatsCard
              title="Approved"
              value={approvedCount}
              icon={CheckCircle2}
              variant="success"
            />
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by service or application ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {APPLICATION_STATUSES.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Applications Table */}
          <Card>
            <CardHeader>
              <CardTitle>Applications Queue</CardTitle>
              <CardDescription>
                Review and process citizen applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Service</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Applicant</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((application) => {
                      const service = MOCK_SERVICES.find(s => s.id === application.serviceId);
                      return (
                        <tr key={application.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4 text-sm font-medium">#{application.id}</td>
                          <td className="py-3 px-4 text-sm">{service?.title}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              Citizen
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {new Date(application.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <StatusBadge status={application.status} />
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedApplication(application);
                                setNewStatus(application.status);
                                setRemarks(application.remarks);
                              }}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Review
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {filteredApplications.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No applications found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Update Status Dialog */}
      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Review Application</DialogTitle>
            <DialogDescription>
              Update the status and add remarks for application #{selectedApplication?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Service</p>
                <p className="font-semibold text-foreground">
                  {MOCK_SERVICES.find(s => s.id === selectedApplication.serviceId)?.title}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Update Status</Label>
                <Select value={newStatus} onValueChange={(value: ApplicationStatus) => setNewStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {APPLICATION_STATUSES.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Remarks / Comments</Label>
                <Textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Add any remarks or comments..."
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedApplication(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
