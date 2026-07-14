'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  Flame,
  Cross,
  Shield,
  Baby,
  Phone,
  AlertTriangle,
  MapPin,
  Clock,
  Bot,
  Send,
  LogOut,
} from 'lucide-react';
import { PageHeader, GlassCard, RiskBadge } from '@/components/dashboard/shared';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { emergencyAlerts } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const emergencyTypes = [
  { type: 'fire', label: 'Fire', icon: Flame, color: 'text-orange-400', ring: 'ring-orange-500/30', glow: 'glow' },
  { type: 'medical', label: 'Medical', icon: Cross, color: 'text-red-400', ring: 'ring-red-500/30', glow: '' },
  { type: 'security', label: 'Security', icon: Shield, color: 'text-yellow-400', ring: 'ring-yellow-500/30', glow: '' },
  { type: 'lost-child', label: 'Lost Child', icon: Baby, color: 'text-blue-400', ring: 'ring-blue-500/30', glow: '' },
] as const;

const typeIconMap: Record<string, typeof Flame> = {
  fire: Flame,
  medical: Cross,
  security: Shield,
  'lost-child': Baby,
};

const exits = [
  { id: '7', label: 'Emergency Exit 7', distance: '40m', walkTime: '1 min' },
  { id: '9', label: 'Exit 9', distance: '80m', walkTime: '2 min' },
  { id: '12', label: 'Exit 12', distance: '90m', walkTime: '3 min' },
];

interface ChatMsg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function EmergencyDashboardPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const requestInstructions = async (type: string, location?: string) => {
    const loc = location || 'current section';
    const prompt = `Emergency: ${type} at ${loc}. Generate evacuation instructions.`;
    setActiveType(type);
    await sendToAI(prompt);
  };

  const sendToAI = async (prompt: string) => {
    const userMsg: ChatMsg = { id: `u-${Date.now()}`, role: 'user', content: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await res.json();
      const aiMsg: ChatMsg = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: data.response || data.error || 'Unable to generate instructions.',
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      toast.error('Failed to get evacuation instructions.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    sendToAI(text);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Emergency Dashboard" icon={ShieldAlert}>
        <Button variant="destructive" size="sm" className="gap-2">
          <Phone className="h-4 w-4" /> Emergency Hotline
        </Button>
      </PageHeader>

      {/* Emergency Type Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {emergencyTypes.map((t, i) => (
          <motion.div
            key={t.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <button
              onClick={() => requestInstructions(t.label)}
              className={cn(
                'glass glass-hover w-full rounded-2xl p-5 text-left transition-all hover:ring-2',
                t.ring,
                activeType === t.label && 'ring-2 ' + t.ring
              )}
            >
              <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl glass', t.color, t.glow)}>
                <t.icon className="h-6 w-6" />
              </div>
              <p className="mt-3 font-semibold">{t.label}</p>
              <p className="text-xs text-muted-foreground mt-1">Tap for AI instructions</p>
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* AI Evacuation Instructions */}
        <GlassCard className="flex flex-col" delay={0.2}>
          <div className="mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">AI Evacuation Instructions</h2>
          </div>

          <div ref={scrollRef} className="mb-4 max-h-80 space-y-3 overflow-y-auto scrollbar-thin pr-1">
            {messages.length === 0 && (
              <div className="glass rounded-xl p-4 text-sm text-muted-foreground">
                Select an emergency type above or describe your situation below to receive AI-generated evacuation guidance.
              </div>
            )}
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'rounded-xl px-4 py-3 text-sm whitespace-pre-wrap',
                  msg.role === 'user'
                    ? 'bg-primary/15 border border-primary/20 ml-8'
                    : 'glass mr-8'
                )}
              >
                {msg.content}
              </motion.div>
            ))}
            {loading && (
              <div className="glass rounded-xl px-4 py-3 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Describe your emergency situation..."
              rows={2}
              className="flex-1 resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-primary/50"
              disabled={loading}
            />
            <Button type="submit" size="icon" disabled={loading || !input.trim()} className="self-end">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </GlassCard>

        {/* Nearest Exits */}
        <GlassCard delay={0.3}>
          <div className="mb-4 flex items-center gap-2">
            <LogOut className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Nearest Exits</h2>
          </div>
          <div className="space-y-3">
            {exits.map((exit, i) => (
              <motion.div
                key={exit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass glass-hover flex items-center justify-between rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20 text-green-400">
                    <LogOut className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{exit.label}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {exit.distance}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="gap-1 border-green-500/30 text-green-400">
                  <Clock className="h-3 w-3" /> {exit.walkTime}
                </Badge>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Active Emergency Alerts */}
      <GlassCard delay={0.4}>
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h2 className="font-semibold">Active Emergency Alerts</h2>
        </div>
        <div className="space-y-3">
          {emergencyAlerts.map((alert, i) => {
            const Icon = typeIconMap[alert.type] || AlertTriangle;
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="glass glass-hover flex items-center justify-between rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg glass">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium capitalize">{alert.type.replace('-', ' ')}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {alert.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RiskBadge level={alert.severity} />
                  <Badge
                    variant={alert.status === 'active' ? 'destructive' : 'secondary'}
                    className="capitalize"
                  >
                    {alert.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {alert.time}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
