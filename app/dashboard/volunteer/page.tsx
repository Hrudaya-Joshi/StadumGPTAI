'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  HandHeart,
  Navigation,
  ShieldAlert,
  Search,
  Languages,
  MapPin,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  ListTodo,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHeader, StatCard, GlassCard } from '@/components/dashboard/shared';
import { volunteerTasks } from '@/lib/dummy-data';
import type { VolunteerTask } from '@/types';
import { cn } from '@/lib/utils';

const TYPE_FILTERS = [
  { key: 'all', label: 'All', icon: ListTodo },
  { key: 'navigation', label: 'Navigation', icon: Navigation },
  { key: 'emergency', label: 'Emergency', icon: ShieldAlert },
  { key: 'lost-found', label: 'Lost & Found', icon: Search },
  { key: 'translation', label: 'Translation', icon: Languages },
] as const;

const TYPE_ICONS: Record<VolunteerTask['type'], typeof Navigation> = {
  navigation: Navigation,
  emergency: ShieldAlert,
  'lost-found': Search,
  translation: Languages,
};

const PRIORITY_STYLES: Record<VolunteerTask['priority'], string> = {
  high: 'bg-red-500/20 text-red-400 border-red-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  low: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const STATUS_STYLES: Record<VolunteerTask['status'], string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const STATUS_ICONS: Record<VolunteerTask['status'], typeof Circle> = {
  pending: Circle,
  'in-progress': AlertCircle,
  completed: CheckCircle2,
};

export default function VolunteerDashboardPage() {
  const [tasks, setTasks] = useState<VolunteerTask[]>(volunteerTasks);
  const [filter, setFilter] = useState<string>('all');

  const counts = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  const filtered = filter === 'all' ? tasks : tasks.filter((t) => t.type === filter);

  const updateStatus = (id: string, status: VolunteerTask['status']) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const handleAccept = (task: VolunteerTask) => {
    updateStatus(task.id, 'in-progress');
    toast.success(`Accepted: ${task.title}`, { description: task.location });
  };

  const handleComplete = (task: VolunteerTask) => {
    updateStatus(task.id, 'completed');
    toast.success(`Completed: ${task.title}`, { description: 'Task marked as done' });
  };

  return (
    <div className="min-h-screen bg-grid p-6 space-y-6">
      <PageHeader title="Volunteer Dashboard" icon={HandHeart} />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Tasks" value={counts.total} icon={ListTodo} color="primary" delay={0} />
        <StatCard title="Pending" value={counts.pending} icon={Circle} color="warning" delay={0.05} />
        <StatCard title="In Progress" value={counts.inProgress} icon={AlertCircle} color="accent" delay={0.1} />
        <StatCard title="Completed" value={counts.completed} icon={CheckCircle2} color="success" delay={0.15} />
      </div>

      {/* Filter bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center gap-2"
      >
        {TYPE_FILTERS.map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            size="sm"
            variant={filter === key ? 'default' : 'outline'}
            onClick={() => setFilter(key)}
            className={cn('gap-2', filter === key && 'glow')}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </motion.div>

      {/* Task list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <GlassCard className="text-center text-muted-foreground">No tasks in this category.</GlassCard>
        )}
        {filtered.map((task, idx) => {
          const TypeIcon = TYPE_ICONS[task.type];
          const StatusIcon = STATUS_ICONS[task.status];
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + idx * 0.05 }}
            >
              <GlassCard className="p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg glass">
                      <TypeIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{task.title}</h3>
                        <Badge variant="outline" className={PRIORITY_STYLES[task.priority]}>
                          {task.priority}
                        </Badge>
                        <Badge variant="outline" className={STATUS_STYLES[task.status]}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {task.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {task.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {task.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {task.status === 'pending' && (
                      <Button size="sm" onClick={() => handleAccept(task)} className="glow">
                        Accept
                      </Button>
                    )}
                    {task.status === 'in-progress' && (
                      <Button size="sm" variant="default" onClick={() => handleComplete(task)}>
                        Complete
                      </Button>
                    )}
                    {task.status === 'completed' && (
                      <Button size="sm" variant="outline" disabled>
                        Done
                      </Button>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
