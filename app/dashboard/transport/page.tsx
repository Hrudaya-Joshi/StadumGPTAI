'use client';

import { motion } from 'framer-motion';
import {
  Bus,
  Train,
  Car,
  Footprints,
  Bike,
  Navigation,
  Clock,
  DollarSign,
  Zap,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { PageHeader, GlassCard, RiskBadge } from '@/components/dashboard/shared';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { transportOptions } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';

const typeIcon: Record<string, any> = {
  metro: Train,
  bus: Bus,
  taxi: Car,
  rideshare: Bike,
  walking: Footprints,
};

const typeLabel: Record<string, string> = {
  metro: 'Metro',
  bus: 'Bus',
  taxi: 'Taxi',
  rideshare: 'Rideshare',
  walking: 'Walking',
};

const recommended = transportOptions[0];

export default function TransportPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Transportation Assistant"
        description="Smart routing to MetLife Stadium — live ETAs, costs & crowd levels"
        icon={Bus}
      />

      {/* AI Recommendation Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card className="glass-strong p-5 border-primary/30 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl glass glow">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                  AI Recommendation: Fastest Option
                </p>
                <h3 className="text-xl font-bold mt-1 gradient-text">{recommended.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> ETA {recommended.eta} min
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Navigation className="h-4 w-4" /> {recommended.duration} min ride
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4" /> {recommended.cost}
                  </span>
                </div>
              </div>
            </div>
            <Button className="glass glass-hover shrink-0">
              Get Directions <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Transport Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transportOptions.map((option, i) => {
          const Icon = typeIcon[option.type] ?? Bus;
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <Card className="glass glass-hover p-5 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl glass">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {typeLabel[option.type]}
                      </p>
                      <h3 className="font-semibold leading-tight">{option.name}</h3>
                    </div>
                  </div>
                  <RiskBadge level={option.crowd} />
                </div>

                {/* ETA — big number */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-1">Arrives in</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold gradient-text">{option.eta}</span>
                    <span className="text-sm text-muted-foreground">min</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-3 mb-4 mt-auto">
                  <div className="rounded-lg glass p-2.5">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Duration
                    </p>
                    <p className="text-sm font-semibold mt-0.5">{option.duration} min</p>
                  </div>
                  <div className="rounded-lg glass p-2.5">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <DollarSign className="h-3 w-3" /> Cost
                    </p>
                    <p className="text-sm font-semibold mt-0.5">{option.cost}</p>
                  </div>
                </div>

                {/* Action */}
                <Button variant="outline" className="glass glass-hover w-full">
                  <Navigation className="mr-1.5 h-4 w-4" />
                  Get Directions
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
