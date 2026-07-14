'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  User,
  Bell,
  Globe,
  Moon,
  Shield,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Camera,
} from 'lucide-react';
import { PageHeader, GlassCard } from '@/components/dashboard/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/components/providers/auth-provider';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    crowd: true,
    emergency: true,
    transport: false,
    food: false,
  });
  const [profile, setProfile] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    location: 'MetLife Stadium, NJ',
  });

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your account and preferences"
        icon={Settings}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <GlassCard delay={0}>
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="h-24 w-24 border-2 border-primary/30">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl font-bold">
                  {profile.name?.[0]?.toUpperCase() || profile.email?.[0]?.toUpperCase() || 'G'}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <h3 className="mt-4 font-semibold text-lg">{profile.name || 'Guest User'}</h3>
            <p className="text-sm text-muted-foreground">{profile.email || 'Not signed in'}</p>
            <div className="mt-4 w-full space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="truncate">{profile.email || '—'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{profile.phone || 'No phone set'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{profile.location}</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-6 gap-2 text-destructive hover:text-destructive glass"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
        </GlassCard>

        {/* Settings forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile info */}
          <GlassCard delay={0.05}>
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Profile Information</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="bg-white/5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="bg-white/5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+1 555-0000"
                  className="bg-white/5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="bg-white/5"
                />
              </div>
            </div>
          </GlassCard>

          {/* Notifications */}
          <GlassCard delay={0.1}>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <div className="space-y-4">
              {[
                { key: 'crowd', label: 'Crowd Density Alerts', desc: 'Get notified about high crowd density' },
                { key: 'emergency', label: 'Emergency Alerts', desc: 'Critical safety notifications' },
                { key: 'transport', label: 'Transport Updates', desc: 'Metro, bus, and taxi availability' },
                { key: 'food', label: 'Food Recommendations', desc: 'AI-powered dining suggestions' },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{n.label}</p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[n.key as keyof typeof notifications]}
                    onCheckedChange={(checked) => {
                      setNotifications({ ...notifications, [n.key]: checked });
                      toast.success(`${n.label} ${checked ? 'enabled' : 'disabled'}`);
                    }}
                  />
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Appearance */}
          <GlassCard delay={0.15}>
            <div className="flex items-center gap-2 mb-4">
              <Moon className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Appearance</h3>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Toggle between dark and light theme</p>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => {
                  setTheme(checked ? 'dark' : 'light');
                  toast.success(`Switched to ${checked ? 'dark' : 'light'} mode`);
                }}
              />
            </div>
          </GlassCard>

          {/* Security */}
          <GlassCard delay={0.2}>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Security</h3>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start glass" onClick={() => toast.info('Password reset link sent to your email')}>
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start glass" onClick={() => toast.info('2FA setup coming soon')}>
                Enable Two-Factor Authentication
              </Button>
            </div>
          </GlassCard>

          {/* Save button */}
          <div className="flex justify-end">
            <Button className="gap-2 glow" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
