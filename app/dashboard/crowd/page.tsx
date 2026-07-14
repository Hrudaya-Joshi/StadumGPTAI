'use client';

import { motion } from 'framer-motion';
import {
  Users,
  AlertTriangle,
  Gauge,
  Clock,
  Activity,
  Layers,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { PageHeader, StatCard, GlassCard, RiskBadge } from '@/components/dashboard/shared';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { crowdZones, crowdTrendData, queueTrendData } from '@/lib/dummy-data';

const highRiskCount = crowdZones.filter((z) => z.risk !== 'safe').length;
const avgDensity = Math.round(crowdZones.reduce((s, z) => s + z.density, 0) / crowdZones.length);
const avgWaitTime = Math.round(crowdZones.reduce((s, z) => s + z.queueTime, 0) / crowdZones.length);

function densityColor(density: number): string {
  if (density >= 85) return 'bg-red-500';
  if (density >= 70) return 'bg-orange-500';
  if (density >= 40) return 'bg-yellow-500';
  return 'bg-green-500';
}

function densityText(density: number): string {
  if (density >= 85) return 'text-red-400';
  if (density >= 70) return 'text-orange-400';
  if (density >= 40) return 'text-yellow-400';
  return 'text-green-400';
}

const gates = [
  { key: 'gate_a', name: 'Gate A', color: '#3b82f6' },
  { key: 'gate_b', name: 'Gate B', color: '#8b5cf6' },
  { key: 'gate_c', name: 'Gate C', color: '#ec4899' },
  { key: 'gate_d', name: 'Gate D', color: '#f59e0b' },
];

export default function CrowdPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Crowd Intelligence"
        description="Real-time crowd density, queue analytics & zone monitoring"
        icon={Users}
      >
        <Badge variant="outline" className="glass gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Live
        </Badge>
      </PageHeader>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Zones"
          value={crowdZones.length}
          icon={Layers}
          color="primary"
          delay={0}
        />
        <StatCard
          title="High Risk"
          value={highRiskCount}
          icon={AlertTriangle}
          color="destructive"
          trend="Needs attention"
          trendUp={false}
          delay={0.05}
        />
        <StatCard
          title="Avg Density"
          value={`${avgDensity}%`}
          icon={Gauge}
          color="warning"
          delay={0.1}
        />
        <StatCard
          title="Avg Wait Time"
          value={`${avgWaitTime} min`}
          icon={Clock}
          color="accent"
          delay={0.15}
        />
      </div>

      {/* Heatmap + Crowd Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard delay={0.2} className="bg-grid">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Crowd Density Heatmap</h3>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {crowdZones.map((zone, i) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.04 }}
                className="group relative aspect-square rounded-lg glass flex items-center justify-center cursor-pointer"
                title={`${zone.name} — ${zone.density}%`}
              >
                <div
                  className={`absolute inset-1 rounded-md ${densityColor(zone.density)} opacity-70 group-hover:opacity-100 transition-opacity`}
                />
                <span className="relative text-xs font-bold text-white">
                  {zone.density}%
                </span>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-green-500" /> Safe</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-yellow-500" /> Moderate</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-orange-500" /> High</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-red-500" /> Critical</span>
          </div>
        </GlassCard>

        <GlassCard delay={0.25}>
          <div className="flex items-center gap-2 mb-4">
            <Gauge className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Crowd Density Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={crowdTrendData}>
              <defs>
                <linearGradient id="densityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: 'rgba(15,15,25,0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="density"
                stroke="hsl(var(--primary))"
                fill="url(#densityGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Queue Trend */}
      <GlassCard delay={0.3}>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Queue Wait Times by Gate</h3>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={queueTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" fontSize={12} />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: 'rgba(15,15,25,0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
            />
            {gates.map((g) => (
              <Bar
                key={g.key}
                dataKey={g.key}
                stackId="queues"
                fill={g.color}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
          {gates.map((g) => (
            <span key={g.key} className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded" style={{ background: g.color }} />
              {g.name}
            </span>
          ))}
        </div>
      </GlassCard>

      {/* Zone List */}
      <GlassCard delay={0.35}>
        <div className="flex items-center gap-2 mb-4">
          <Layers className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Zone Details</h3>
        </div>
        <div className="space-y-3">
          {crowdZones.map((zone, i) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-xl glass glass-hover"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium truncate">{zone.name}</span>
                  <RiskBadge level={zone.risk} />
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={zone.density} className="flex-1 h-2" />
                  <span className={`text-xs font-bold w-10 text-right ${densityText(zone.density)}`}>
                    {zone.density}%
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0 w-16 justify-end">
                <Clock className="h-3.5 w-3.5" />
                {zone.queueTime}m
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
