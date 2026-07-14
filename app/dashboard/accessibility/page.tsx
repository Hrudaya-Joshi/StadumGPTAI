'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  Accessibility,
  Eye,
  Mic,
  PersonStanding,
  Headphones,
  Contrast,
  Phone,
  AlertCircle,
} from 'lucide-react';
import { PageHeader, GlassCard } from '@/components/dashboard/shared';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type FeatureKey =
  | 'largeButtons'
  | 'voiceNavigation'
  | 'wheelchairRoutes'
  | 'audioAssistance'
  | 'highContrast';

interface Feature {
  key: FeatureKey;
  title: string;
  description: string;
  icon: typeof Eye;
}

const FEATURES: Feature[] = [
  {
    key: 'largeButtons',
    title: 'Large Buttons',
    description: 'Increase tap target sizes across the app for easier interaction.',
    icon: Eye,
  },
  {
    key: 'voiceNavigation',
    title: 'Voice Navigation',
    description: 'Move through the stadium guide using spoken commands.',
    icon: Mic,
  },
  {
    key: 'wheelchairRoutes',
    title: 'Wheelchair Routes',
    description: 'Prioritize step-free, elevator-accessible paths to your seat.',
    icon: PersonStanding,
  },
  {
    key: 'audioAssistance',
    title: 'Audio Assistance',
    description: 'Spoken descriptions of nearby gates, amenities, and exits.',
    icon: Headphones,
  },
  {
    key: 'highContrast',
    title: 'High Contrast Mode',
    description: 'Boost color contrast and borders for better readability.',
    icon: Contrast,
  },
];

export default function AccessibilityPage() {
  const [toggles, setToggles] = useState<Record<FeatureKey, boolean>>({
    largeButtons: false,
    voiceNavigation: false,
    wheelchairRoutes: false,
    audioAssistance: false,
    highContrast: false,
  });

  function handleToggle(key: FeatureKey, label: string) {
    const next = !toggles[key];
    setToggles((prev) => ({ ...prev, [key]: next }));
    toast.success(`${label} ${next ? 'enabled' : 'disabled'}`);
  }

  function handleEmergency() {
    toast.error('Connecting you to stadium emergency services…', {
      description: 'Stay on the line. Help is on the way.',
    });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Accessibility"
        description="Inclusive tools so every fan can enjoy FIFA World Cup 2026"
        icon={Accessibility}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((feature, i) => {
          const enabled = toggles[feature.key];
          const Icon = feature.icon;
          return (
            <GlassCard key={feature.key} delay={i * 0.05}>
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      'flex h-14 w-14 items-center justify-center rounded-xl glass glow transition-colors',
                      enabled && 'bg-primary/15'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-7 w-7 text-primary transition-transform',
                        enabled && 'scale-110'
                      )}
                    />
                  </div>
                  <Switch
                    id={feature.key}
                    checked={enabled}
                    onCheckedChange={() => handleToggle(feature.key, feature.title)}
                    aria-label={feature.title}
                  />
                </div>

                <div>
                  <Label
                    htmlFor={feature.key}
                    className="text-base font-semibold cursor-pointer"
                  >
                    {feature.title}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </div>

                <div
                  className={cn(
                    'text-xs font-medium flex items-center gap-1.5 transition-colors',
                    enabled ? 'text-success' : 'text-muted-foreground'
                  )}
                >
                  <span
                    className={cn(
                      'h-2 w-2 rounded-full',
                      enabled ? 'bg-success animate-pulse' : 'bg-muted-foreground/40'
                    )}
                  />
                  {enabled ? 'Active' : 'Inactive'}
                </div>
              </div>
            </GlassCard>
          );
        })}

        {/* Emergency Help — visually distinct destructive card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: FEATURES.length * 0.05 }}
        >
          <div className="glass-strong p-5 rounded-xl border-destructive/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-destructive/10 pointer-events-none" />
            <div className="relative flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-destructive/20 glow">
                  <Phone className="h-7 w-7 text-destructive" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-destructive/40 bg-destructive/15 px-2.5 py-0.5 text-xs font-medium text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  SOS
                </span>
              </div>

              <div>
                <h3 className="text-base font-semibold text-destructive">
                  Emergency Help
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Instantly connect with stadium medical and safety services.
                </p>
              </div>

              <Button
                variant="destructive"
                size="lg"
                className="w-full"
                onClick={handleEmergency}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call for Help
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
