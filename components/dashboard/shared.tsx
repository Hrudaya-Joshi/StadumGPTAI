'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export function PageHeader({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description?: string;
  icon?: any;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl glass glow">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </motion.div>
  );
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  color = 'primary',
  delay = 0,
}: {
  title: string;
  value: string | number;
  icon: any;
  trend?: string;
  trendUp?: boolean;
  color?: 'primary' | 'accent' | 'warning' | 'destructive' | 'success';
  delay?: number;
}) {
  const colorMap = {
    primary: 'text-primary',
    accent: 'text-accent',
    warning: 'text-warning',
    destructive: 'text-destructive',
    success: 'text-success',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="glass glass-hover p-5 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
            {trend && (
              <p
                className={cn(
                  'text-xs mt-2 flex items-center gap-1',
                  trendUp ? 'text-success' : 'text-destructive'
                )}
              >
                {trendUp ? '↑' : '↓'} {trend}
              </p>
            )}
          </div>
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-xl glass',
              colorMap[color]
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function GlassCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className={cn('glass glass-hover p-5', className)}>{children}</Card>
    </motion.div>
  );
}

export function RiskBadge({ level }: { level: string }) {
  const map: Record<string, { label: string; className: string }> = {
    safe: { label: 'Safe', className: 'bg-success/20 text-success border-success/30' },
    caution: { label: 'Caution', className: 'bg-warning/20 text-warning border-warning/30' },
    warning: { label: 'Warning', className: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    critical: { label: 'Critical', className: 'bg-destructive/20 text-destructive border-destructive/30' },
    low: { label: 'Low', className: 'bg-success/20 text-success border-success/30' },
    moderate: { label: 'Moderate', className: 'bg-warning/20 text-warning border-warning/30' },
    high: { label: 'High', className: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  };
  const item = map[level] || map.safe;
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', item.className)}>
      {item.label}
    </span>
  );
}
