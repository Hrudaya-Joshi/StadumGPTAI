'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UtensilsCrossed,
  Star,
  Clock,
  MapPin,
  Leaf,
  Flame,
  ThumbsUp,
  Filter,
} from 'lucide-react';
import { PageHeader, GlassCard } from '@/components/dashboard/shared';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { foodSpots } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';
import type { FoodSpot } from '@/types';

type FilterType = 'all' | 'veg' | 'non-veg';

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'veg', label: 'Veg' },
  { key: 'non-veg', label: 'Non-Veg' },
];

// AI recommendation: best rated + shortest wait
const recommended = [...foodSpots].sort(
  (a, b) => b.rating - a.rating || a.waitTime - b.waitTime
)[0];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-3.5 w-3.5',
            i < Math.round(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-muted-foreground/40'
          )}
        />
      ))}
    </div>
  );
}

function FoodSpotCard({ spot, delay }: { spot: FoodSpot; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="glass glass-hover rounded-2xl p-5 h-full flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-bold text-base truncate">{spot.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {spot.cuisine}
            </p>
          </div>
          <Badge
            className={cn(
              'shrink-0 gap-1',
              spot.veg
                ? 'bg-success/20 text-success border-success/30'
                : 'bg-destructive/20 text-destructive border-destructive/30'
            )}
          >
            {spot.veg ? <Leaf className="h-3 w-3" /> : <Flame className="h-3 w-3" />}
            {spot.veg ? 'Veg' : 'Non-Veg'}
          </Badge>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {spot.distance}m
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {spot.waitTime} min
          </span>
          <span className="flex items-center gap-1 font-semibold text-foreground">
            {spot.priceRange}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{spot.rating}</span>
          </div>
          <Stars rating={spot.rating} />
        </div>

        <Button size="sm" variant="outline" className="mt-auto w-full gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          Get Directions
        </Button>
      </div>
    </motion.div>
  );
}

export default function FoodPage() {
  const [active, setActive] = useState<FilterType>('all');

  const filtered = foodSpots.filter((s) =>
    active === 'all' ? true : active === 'veg' ? s.veg : !s.veg
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Food Assistant"
        description="Find the best food spots, wait times & AI recommendations"
        icon={UtensilsCrossed}
      />

      {/* AI Recommendation */}
      <GlassCard delay={0.05} className="bg-grid">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl glass glow shrink-0">
              <ThumbsUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-primary font-semibold">
                AI Recommendation
              </p>
              <h3 className="text-lg font-bold gradient-text">
                {recommended.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {recommended.cuisine}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{recommended.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-bold">{recommended.waitTime}m</span>
              </div>
              <p className="text-xs text-muted-foreground">Wait</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-bold">{recommended.distance}m</span>
              </div>
              <p className="text-xs text-muted-foreground">Distance</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2"
      >
        <Filter className="h-4 w-4 text-muted-foreground" />
        {filters.map((f) => (
          <Button
            key={f.key}
            size="sm"
            variant={active === f.key ? 'default' : 'outline'}
            onClick={() => setActive(f.key)}
            className={cn(active === f.key && 'glow')}
          >
            {f.label}
          </Button>
        ))}
      </motion.div>

      {/* Food Spots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((spot, i) => (
          <FoodSpotCard key={spot.id} spot={spot} delay={0.15 + i * 0.05} />
        ))}
      </div>
    </div>
  );
}
