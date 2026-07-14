// Shared TypeScript types for StadiumGPT AI

export type CrowdLevel = 'low' | 'moderate' | 'high' | 'critical';
export type RiskLevel = 'safe' | 'caution' | 'warning' | 'critical';

export interface StadiumInfo {
  name: string;
  city: string;
  capacity: number;
  currentAttendance: number;
}

export interface CrowdZone {
  id: string;
  name: string;
  density: number; // 0-100
  level: CrowdLevel;
  queueTime: number; // minutes
  risk: RiskLevel;
}

export interface Gate {
  id: string;
  name: string;
  position: { lat: number; lng: number };
  crowdLevel: CrowdLevel;
  waitTime: number;
}

export interface FoodSpot {
  id: string;
  name: string;
  cuisine: string;
  distance: number; // meters
  waitTime: number; // minutes
  rating: number;
  veg: boolean;
  priceRange: string;
}

export interface TransportOption {
  id: string;
  type: 'metro' | 'bus' | 'taxi' | 'rideshare' | 'walking';
  name: string;
  eta: number; // minutes
  duration: number; // minutes
  cost: string;
  crowd: CrowdLevel;
}

export interface EmergencyAlert {
  id: string;
  type: 'fire' | 'medical' | 'security' | 'lost-child';
  location: string;
  severity: RiskLevel;
  status: 'active' | 'resolved';
  time: string;
}

export interface VolunteerTask {
  id: string;
  type: 'navigation' | 'emergency' | 'lost-found' | 'translation';
  title: string;
  location: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  time: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface NavPoint {
  id: string;
  name: string;
  type: 'gate' | 'food' | 'washroom' | 'medical' | 'exit' | 'parking' | 'seat';
  position: { lat: number; lng: number };
  distance: number;
  walkTime: number;
}

export interface AnalyticsData {
  visitors: number;
  crowdDensity: number;
  revenue: number;
  queueLength: number;
  securityAlerts: number;
  energyUsage: number;
  wasteCollected: number;
}

export interface MatchInfo {
  homeTeam: string;
  awayTeam: string;
  time: string;
  date: string;
  stadium: string;
  group: string;
}
