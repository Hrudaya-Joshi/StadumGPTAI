'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Navigation,
  DoorOpen,
  UtensilsCrossed,
  Bath,
  Cross,
  LogOut,
  Car,
  Armchair,
  Accessibility,
  Route,
  Clock,
  MapPin,
} from 'lucide-react';
import { PageHeader, GlassCard } from '@/components/dashboard/shared';
import { Button } from '@/components/ui/button';
import { navPoints } from '@/lib/dummy-data';
import type { NavPoint } from '@/types';
import { cn } from '@/lib/utils';

const TYPE_CONFIG: Record<
  NavPoint['type'],
  { icon: any; color: string; label: string }
> = {
  gate: { icon: DoorOpen, color: 'text-primary', label: 'Gates' },
  food: { icon: UtensilsCrossed, color: 'text-warning', label: 'Food' },
  washroom: { icon: Bath, color: 'text-accent', label: 'Washrooms' },
  medical: { icon: Cross, color: 'text-destructive', label: 'Medical' },
  exit: { icon: LogOut, color: 'text-success', label: 'Exits' },
  parking: { icon: Car, color: 'text-muted-foreground', label: 'Parking' },
  seat: { icon: Armchair, color: 'text-primary', label: 'Seats' },
};

const DOT_COLOR: Record<NavPoint['type'], string> = {
  gate: 'bg-primary',
  food: 'bg-warning',
  washroom: 'bg-accent',
  medical: 'bg-destructive',
  exit: 'bg-success',
  parking: 'bg-muted-foreground',
  seat: 'bg-primary',
};

// Map lat/lng to percentage positions on the stylized stadium map.
const LAT_RANGE = [40.811, 40.814];
const LNG_RANGE = [-74.076, -74.073];
function toPercent(value: number, range: [number, number]) {
  return ((value - range[0]) / (range[1] - range[0])) * 100;
}

export default function NavigationPage() {
  const [activeTypes, setActiveTypes] = useState<Set<NavPoint['type']>>(
    new Set(Object.keys(TYPE_CONFIG) as NavPoint['type'][])
  );
  const [selectedId, setSelectedId] = useState<string | null>(
    navPoints.find((p) => p.type === 'seat')?.id ?? null
  );
  const [accessibility, setAccessibility] = useState(false);

  const toggleType = (type: NavPoint['type']) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const filteredPoints = useMemo(
    () => navPoints.filter((p) => activeTypes.has(p.type)),
    [activeTypes]
  );

  const selected = navPoints.find((p) => p.id === selectedId) ?? null;
  const SelectedIcon = selected ? TYPE_CONFIG[selected.type].icon : MapPin;

  return (
    <div>
      <PageHeader
        title="Stadium Navigation"
        description="Find your way around MetLife Stadium — FIFA World Cup 2026"
        icon={Navigation}
      >
        <Button
          variant={accessibility ? 'default' : 'outline'}
          className="gap-2"
          onClick={() => setAccessibility((a) => !a)}
        >
          <Accessibility className="h-4 w-4" />
          Accessibility Route
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stadium map */}
        <GlassCard className="lg:col-span-2" delay={0.05}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Interactive Stadium Map</h3>
            </div>
            <span className="text-xs text-muted-foreground">
              {filteredPoints.length} points
            </span>
          </div>

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(Object.keys(TYPE_CONFIG) as NavPoint['type'][]).map((type) => {
              const { icon: Icon, color, label } = TYPE_CONFIG[type];
              const active = activeTypes.has(type);
              return (
                <Button
                  key={type}
                  size="sm"
                  variant={active ? 'default' : 'outline'}
                  className={cn('gap-1.5', !active && 'opacity-50')}
                  onClick={() => toggleType(type)}
                >
                  <Icon className={cn('h-3.5 w-3.5', color)} />
                  {label}
                </Button>
              );
            })}
          </div>

          {/* Stylized map */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-grid glass-strong">
            {/* Pitch outline */}
            <div className="absolute inset-[18%] rounded-[40%] border-2 border-primary/20" />
            <div className="absolute left-1/2 top-[18%] bottom-[18%] w-px -translate-x-1/2 bg-primary/10" />

            {/* Markers */}
            {filteredPoints.map((point) => {
              const { icon: Icon, color } = TYPE_CONFIG[point.type];
              const top = toPercent(point.position.lat, [
                LAT_RANGE[0],
                LAT_RANGE[1],
              ]);
              const left = toPercent(point.position.lng, [
                LNG_RANGE[0],
                LNG_RANGE[1],
              ]);
              const isSelected = selectedId === point.id;
              return (
                <button
                  key={point.id}
                  onClick={() => setSelectedId(point.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ top: `${top}%`, left: `${left}%` }}
                  title={point.name}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full border-2 border-background/80 transition-all group-hover:scale-110',
                      DOT_COLOR[point.type],
                      isSelected && 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110'
                    )}
                  >
                    <Icon className={cn('h-4 w-4 text-background')} />
                  </span>
                  {isSelected && (
                    <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md glass-strong px-2 py-0.5 text-[10px] font-medium">
                      {point.name}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </GlassCard>

        {/* Route card */}
        <div className="space-y-6">
          <GlassCard delay={0.1}>
            <div className="flex items-center gap-2 mb-4">
              <Route className="h-5 w-5 text-accent" />
              <h3 className="font-semibold">Shortest Walking Route</h3>
            </div>
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'flex h-11 w-11 items-center justify-center rounded-xl glass',
                      TYPE_CONFIG[selected.type].color
                    )}
                  >
                    <SelectedIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium leading-tight">{selected.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {selected.type}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg glass p-3 text-center">
                    <p className="text-xs text-muted-foreground">Distance</p>
                    <p className="text-lg font-bold">{selected.distance} m</p>
                  </div>
                  <div className="rounded-lg glass p-3 text-center">
                    <p className="text-xs text-muted-foreground">Walk Time</p>
                    <p className="text-lg font-bold">{selected.walkTime} min</p>
                  </div>
                </div>

                {accessibility && (
                  <div className="rounded-lg border border-accent/30 bg-accent/10 p-3 text-sm text-accent-foreground">
                    <p className="flex items-center gap-2 font-medium">
                      <Accessibility className="h-4 w-4" />
                      Wheelchair-Accessible Route
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Uses elevators and ramps. Estimated extra time: ~1 min.
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select a point on the map to view route details.
              </p>
            )}
          </GlassCard>

          {/* Points list */}
          <GlassCard delay={0.15}>
            <div className="flex items-center gap-2 mb-4">
              <Navigation className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Navigation Points</h3>
            </div>
            <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
              {filteredPoints.map((point, i) => {
                const { icon: Icon, color } = TYPE_CONFIG[point.type];
                return (
                  <motion.button
                    key={point.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.02 }}
                    onClick={() => setSelectedId(point.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg glass p-3 text-left glass-hover',
                      selectedId === point.id && 'border-primary/50'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg glass',
                        color
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {point.name}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {point.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{point.distance} m</p>
                      <p className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {point.walkTime} min
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
