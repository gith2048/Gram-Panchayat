import { ApplicationStatus } from '@/types';
import { cn } from '@/lib/utils';
import { Clock, CheckCircle2, XCircle, Eye, Award } from 'lucide-react';

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

const statusConfig: Record<ApplicationStatus, { label: string; className: string; icon: typeof Clock }> = {
  pending: {
    label: 'Pending',
    className: 'status-pending',
    icon: Clock,
  },
  under_review: {
    label: 'Under Review',
    className: 'status-review',
    icon: Eye,
  },
  approved: {
    label: 'Approved',
    className: 'status-approved',
    icon: CheckCircle2,
  },
  rejected: {
    label: 'Rejected',
    className: 'status-rejected',
    icon: XCircle,
  },
  completed: {
    label: 'Completed',
    className: 'status-completed',
    icon: Award,
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={cn('status-badge', config.className, className)}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
}
