'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Bot,
  Navigation,
  Users,
  Bus,
  UtensilsCrossed,
  Accessibility,
  HandHeart,
  ShieldAlert,
  Settings,
  ChartColumnBig,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/ai-assistant', label: 'AI Assistant', icon: Bot },
  { href: '/dashboard/navigation', label: 'Navigation', icon: Navigation },
  { href: '/dashboard/crowd', label: 'Crowd Heatmap', icon: Users },
  { href: '/dashboard/transport', label: 'Transport', icon: Bus },
  { href: '/dashboard/food', label: 'Food', icon: UtensilsCrossed },
  { href: '/dashboard/emergency', label: 'Emergency', icon: ShieldAlert },
  { href: '/dashboard/accessibility', label: 'Accessibility', icon: Accessibility },
  { href: '/dashboard/volunteer', label: 'Volunteer', icon: HandHeart },
  { href: '/dashboard/admin', label: 'Admin', icon: ChartColumnBig },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-72 transform transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col glass-strong border-r border-white/10">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent glow">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold gradient-text">StadiumGPT</h1>
                <p className="text-xs text-muted-foreground">World Cup 2026</p>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                    active
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <item.icon
                    className={cn(
                      'relative h-5 w-5 shrink-0',
                      active && 'text-primary'
                    )}
                  />
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom badge */}
          <div className="px-4 py-4 border-t border-white/10">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-medium text-success">System Online</span>
              </div>
              <p className="text-xs text-muted-foreground">
                MetLife Stadium • Live
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
