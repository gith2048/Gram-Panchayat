export type UserRole = 'user' | 'staff' | 'admin';

export type ApplicationStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'completed';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  eligibility: string;
  requiredDocuments: string[];
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  userId: string;
  serviceId: string;
  formData: Record<string, string>;
  status: ApplicationStatus;
  remarks: string;
  processedBy?: string;
  createdAt: string;
  updatedAt: string;
  // Joined data
  service?: Service;
  user?: User;
}

export interface LogEntry {
  id: string;
  userId?: string;
  role: UserRole;
  action: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface DashboardStats {
  totalUsers: number;
  totalServices: number;
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  completedApplications: number;
}
