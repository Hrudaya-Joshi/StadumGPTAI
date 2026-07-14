'use client';

import { motion } from 'framer-motion';
import {
  ChartColumnBig,
  Users,
  DollarSign,
  Clock,
  ShieldAlert,
  Zap,
  Trash2,
  TrendingUp,
  Activity,
  AlertTriangle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { PageHeader, StatCard, GlassCard } from '@/components/dashboard/shared';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  analyticsData,
  visitorTrendData,
  crowdTrendData,
  energyUsageData,
  wasteCollectionData,
  recentActivities,
} from '@/lib/dummy-data';

const activityTypeMap: Record<
  string,
  { label: string; className: string }
> = {
  alert: { label: 'Alert', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
  volunteer: { label: 'Volunteer', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  crowd: { label: 'Crowd', className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  resolved: { label: 'Resolved', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
  transport: { label: 'Transport', className: 'bg-accent/20 text-accent border-accent/30' },
  food: { label: 'Food', className: 'bg-warning/20 text-warning border-warning/30' },
  accessibility: { label: 'Accessibility', className: 'bg-primary/20 text-primary border-primary/30' },
  energy: { label: 'Energy', className: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
};

const tooltipStyle = {
  background: 'rgba(15,15,25,0.9)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
};

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description="FIFA World Cup 2026 — MetLife Stadium operations overview"
        icon={ChartColumnBig}
      >
        <Badge variant="outline" className="glass gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Live
        </Badge>
      </PageHeader>

      {/* Stat Cards — 7 KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <StatCard title="Visitors" value={analyticsData.visitors.toLocaleString()} icon={Users} color="primary" delay={0} />
        <StatCard title="Crowd Density" value={`${analyticsData.crowdDensity}%`} icon={Activity} color="warning" delay={0.05} />
        <StatCard title="Revenue" value={`$${(analyticsData.revenue / 1_000_000).toFixed(2)}M`} icon={DollarSign} color="success" delay={0.1} />
        <StatCard title="Queue Length" value={`${analyticsData.queueLength} min`} icon={Clock} color="accent" delay={0.15} />
        <StatCard title="Security Alerts" value={analyticsData.securityAlerts} icon={ShieldAlert} color="destructive" delay={0.2} />
        <StatCard title="Energy Usage" value={`${analyticsData.energyUsage.toLocaleString()} kWh`} icon={Zap} color="warning" delay={0.25} />
        <StatCard title="Waste Collected" value={`${analyticsData.wasteCollected} kg`} icon={Trash2} color="accent" delay={0.3} />
      </div>

      {/* Visitor Inflow (Area) + Crowd Density Trend (Line) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard delay={0.35}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Visitor Inflow</h3>
            </div>
            <span className="text-sm text-muted-foreground">Live</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={visitorTrendData}>
              <defs>
                <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#visitorGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard delay={0.4}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-warning" />
              <h3 className="font-semibold">Crowd Density Trend</h3>
            </div>
            <span className="text-sm text-muted-foreground">Last 4 hrs</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={crowdTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="density" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Energy Usage (Bar) + Waste Collection (Bar) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard delay={0.45}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-warning" />
              <h3 className="font-semibold">Energy Usage</h3>
            </div>
            <span className="text-sm text-muted-foreground">kWh</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={energyUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="usage" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard delay={0.5}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-accent" />
              <h3 className="font-semibold">Waste Collection by Zone</h3>
            </div>
            <span className="text-sm text-muted-foreground">kg</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={wasteCollectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="zone" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="collected" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="recycled" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Recent Activities */}
      <GlassCard delay={0.55}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Recent Activities</h3>
          </div>
          <span className="text-sm text-muted-foreground">{recentActivities.length} events</span>
        </div>
        <div className="space-y-2">
          {recentActivities.map((act, i) => {
            const typeInfo = activityTypeMap[act.type] ?? activityTypeMap.alert;
            return (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.04 }}
                className="flex items-center justify-between gap-4 p-3 rounded-xl glass glass-hover"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shrink-0', typeInfo.className)}>
                    {typeInfo.label}
                  </span>
                  <span className="text-sm truncate">{act.action}</span>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{act.time}</span>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
