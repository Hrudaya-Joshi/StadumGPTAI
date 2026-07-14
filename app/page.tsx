'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Bot,
  Navigation,
  Users,
  ShieldAlert,
  Languages,
  Accessibility,
  Bus,
  UtensilsCrossed,
  Leaf,
  ArrowRight,
  Play,
  Sparkles,
  MapPin,
  Activity,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Navigation,
    title: 'AI Navigation',
    description: 'Find your gate, seat, washroom, and exits with intelligent routing and live walking times.',
    color: 'from-primary/20 to-primary/5',
  },
  {
    icon: Users,
    title: 'Crowd Intelligence',
    description: 'Real-time heatmaps, queue status, congestion alerts, and risk levels across the stadium.',
    color: 'from-accent/20 to-accent/5',
  },
  {
    icon: ShieldAlert,
    title: 'Emergency AI',
    description: 'AI-generated evacuation instructions, nearest exits, and instant emergency response.',
    color: 'from-destructive/20 to-destructive/5',
  },
  {
    icon: Languages,
    title: 'Multilingual Assistant',
    description: 'Speak any language — get instant translations and support in 8+ languages.',
    color: 'from-chart-5/20 to-chart-5/5',
  },
  {
    icon: Accessibility,
    title: 'Accessibility',
    description: 'Wheelchair routes, voice navigation, audio assistance, and high-contrast mode.',
    color: 'from-warning/20 to-warning/5',
  },
  {
    icon: Bus,
    title: 'Transportation',
    description: 'Metro, bus, taxi, rideshare, and walking — AI recommends the fastest option.',
    color: 'from-success/20 to-success/5',
  },
  {
    icon: UtensilsCrossed,
    title: 'Food Assistant',
    description: 'Discover nearby food courts with ratings, wait times, and AI recommendations.',
    color: 'from-primary/20 to-primary/5',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'Energy usage tracking, waste collection analytics, and eco-friendly guidance.',
    color: 'from-success/20 to-success/5',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background bg-grid relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent glow">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold gradient-text">StadiumGPT AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <Link href="/login" className="hover:text-foreground transition-colors">Sign In</Link>
        </div>
        <Link href="/login">
          <Button size="sm" className="gap-2">
            Get Started <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-6 lg:px-12 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-8"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">Powered by Google Gemini AI</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance"
        >
          <span className="gradient-text">StadiumGPT AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance"
        >
          The Intelligent AI Companion for FIFA World Cup 2026
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/login">
            <Button size="lg" className="gap-2 text-base h-12 px-8 glow">
              Get Started <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="gap-2 text-base h-12 px-8 glass">
              <Play className="h-5 w-5" /> Live Demo
            </Button>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { icon: MapPin, label: 'Stadiums', value: '16' },
            { icon: Users, label: 'Live Attendance', value: '78K+' },
            { icon: Activity, label: 'Zones monitored', value: '120+' },
            { icon: Globe, label: 'Languages', value: '8+' },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-6">
              <s.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-3xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 px-6 lg:px-12 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything you need, <span className="gradient-text">powered by AI</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From navigation to emergency response, StadiumGPT AI transforms the fan experience
            at the FIFA World Cup 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group"
            >
              <div className="glass glass-hover rounded-2xl p-6 h-full relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl glass mb-4">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-4xl mx-auto text-center glass-strong rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
          <div className="relative">
            <Bot className="h-12 w-12 text-primary mx-auto mb-4 animate-float" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to experience the future of stadium intelligence?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of fans using StadiumGPT AI for a seamless World Cup 2026 experience.
            </p>
            <Link href="/login">
              <Button size="lg" className="gap-2 h-12 px-8 glow">
                Get Started Now <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 px-6 lg:px-12 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold">StadiumGPT AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built for FIFA World Cup 2026 • Powered by Google Gemini
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
