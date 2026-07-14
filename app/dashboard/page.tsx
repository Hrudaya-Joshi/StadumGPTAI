'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  Users,
  Clock,
  Cloud,
  Trophy,
  Bus,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Activity,
} from 'lucide-react';
import { PageHeader, StatCard, GlassCard, RiskBadge } from '@/components/dashboard/shared';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  stadiumInfo,
  currentMatch,
  crowdZones,
  transportOptions,
} from '@/lib/dummy-data';
import Link from 'next/link';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { visitorTrendData } from '@/lib/dummy-data';

export default function DashboardHome() {
  const highRiskZones = crowdZones.filter((z) => z.risk !== 'safe');
  const fastestTransport = transportOptions[0];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description={`Live operations — ${stadiumInfo.name}, ${stadiumInfo.city}`}
        icon={Activity}
      >
        <Link href="/dashboard/ai-assistant">
          <Button className="gap-2">
            Ask AI <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </PageHeader>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Current Stadium"
          value={stadiumInfo.name}
          icon={MapPin}
          color="primary"
          delay={0}
        />
        <StatCard
          title="Crowd Density"
          value={`${Math.round((stadiumInfo.currentAttendance / stadiumInfo.capacity) * 100)}%`}
          icon={Users}
          trend="12% vs last hour"
          trendUp={false}
          color="warning"
          delay={0.05}
        />
        <StatCard
          title="Avg Queue Time"
          value="8 min"
          icon={Clock}
          trend="3 min faster"
          trendUp
          color="accent"
          delay={0.1}
        />
        <StatCard
          title="Weather"
          value="72°F Clear"
          icon={Cloud}
          color="success"
          delay={0.15}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Upcoming match */}
        <GlassCard delay={0.2}>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-warning" />
            <h3 className="font-semibold">Upcoming Match</h3>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl glass text-2xl font-bold">
                🇧🇷
              </div>
              <p className="text-sm mt-2 font-medium">Brazil</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">{currentMatch.time}</p>
              <p className="text-2xl font-bold text-muted-foreground my-1">VS</p>
              <p className="text-xs text-muted-foreground">{currentMatch.date}</p>
            </div>
            <div className="text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl glass text-2xl font-bold">
                🇦🇷
              </div>
              <p className="text-sm mt-2 font-medium">Argentina</p>
            </div>
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>📍 {currentMatch.stadium}</p>
            <p>⚽ {currentMatch.group}</p>
          </div>
        </GlassCard>

        {/* Visitor trend chart */}
        <GlassCard delay={0.25} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Visitor Inflow</h3>
            </div>
            <span className="text-sm text-muted-foreground">Live</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={visitorTrendData}>
              <defs>
                <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.75rem',
                }}
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#visitorGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transportation status */}
        <GlassCard delay={0.3}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bus className="h-5 w-5 text-accent" />
              <h3 className="font-semibold">Transportation Status</h3>
            </div>
            <Link href="/dashboard/transport">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {transportOptions.slice(0, 4).map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-lg glass">
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.cost} • {t.duration} min</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">ETA {t.eta}m</span>
                  <RiskBadge level={t.crowd} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Risk zones */}
        <GlassCard delay={0.35}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h3 className="font-semibold">Active Alerts</h3>
            </div>
            <Link href="/dashboard/crowd">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {highRiskZones.slice(0, 5).map((z) => (
              <div key={z.id} className="p-3 rounded-lg glass">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">{z.name}</p>
                  <RiskBadge level={z.risk} />
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={z.density} className="h-1.5 flex-1" />
                  <span className="text-xs text-muted-foreground">{z.queueTime}m wait</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
