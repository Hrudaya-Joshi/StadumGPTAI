// Dummy data for StadiumGPT AI — simulates real-time stadium data

import type {
  StadiumInfo,
  CrowdZone,
  Gate,
  FoodSpot,
  TransportOption,
  EmergencyAlert,
  VolunteerTask,
  NavPoint,
  AnalyticsData,
  MatchInfo,
} from '@/types';

export const stadiumInfo: StadiumInfo = {
  name: 'MetLife Stadium',
  city: 'New York / New Jersey',
  capacity: 82500,
  currentAttendance: 78430,
};

export const currentMatch: MatchInfo = {
  homeTeam: 'Brazil',
  awayTeam: 'Argentina',
  time: '8:00 PM EST',
  date: 'July 15, 2026',
  stadium: 'MetLife Stadium',
  group: 'Group Stage — Group F',
};

export const crowdZones: CrowdZone[] = [
  { id: 'z1', name: 'Gate A Concourse', density: 72, level: 'high', queueTime: 12, risk: 'caution' },
  { id: 'z2', name: 'Gate B Concourse', density: 45, level: 'moderate', queueTime: 6, risk: 'safe' },
  { id: 'z3', name: 'Gate C Concourse', density: 88, level: 'critical', queueTime: 18, risk: 'warning' },
  { id: 'z4', name: 'Gate D Concourse', density: 38, level: 'moderate', queueTime: 4, risk: 'safe' },
  { id: 'z5', name: 'Section 100-110', density: 65, level: 'high', queueTime: 8, risk: 'caution' },
  { id: 'z6', name: 'Section 111-120', density: 52, level: 'moderate', queueTime: 5, risk: 'safe' },
  { id: 'z7', name: 'Section 121-130', density: 78, level: 'high', queueTime: 10, risk: 'caution' },
  { id: 'z8', name: 'Food Court North', density: 91, level: 'critical', queueTime: 15, risk: 'warning' },
  { id: 'z9', name: 'Food Court South', density: 55, level: 'moderate', queueTime: 7, risk: 'safe' },
  { id: 'z10', name: 'Parking Lot A', density: 30, level: 'low', queueTime: 2, risk: 'safe' },
];

export const gates: Gate[] = [
  { id: 'g1', name: 'Gate A — North', position: { lat: 40.8135, lng: -74.0745 }, crowdLevel: 'high', waitTime: 12 },
  { id: 'g2', name: 'Gate B — East', position: { lat: 40.8125, lng: -74.0735 }, crowdLevel: 'moderate', waitTime: 6 },
  { id: 'g3', name: 'Gate C — South', position: { lat: 40.8115, lng: -74.0745 }, crowdLevel: 'critical', waitTime: 18 },
  { id: 'g4', name: 'Gate D — West', position: { lat: 40.8125, lng: -74.0755 }, crowdLevel: 'moderate', waitTime: 4 },
];

export const navPoints: NavPoint[] = [
  { id: 'n1', name: 'Gate A — North', type: 'gate', position: { lat: 40.8135, lng: -74.0745 }, distance: 120, walkTime: 2 },
  { id: 'n2', name: 'Gate B — East', type: 'gate', position: { lat: 40.8125, lng: -74.0735 }, distance: 200, walkTime: 3 },
  { id: 'n3', name: 'Gate C — South', type: 'gate', position: { lat: 40.8115, lng: -74.0745 }, distance: 180, walkTime: 3 },
  { id: 'n4', name: 'Gate D — West', type: 'gate', position: { lat: 40.8125, lng: -74.0755 }, distance: 150, walkTime: 2 },
  { id: 'n5', name: 'Stadium Grill', type: 'food', position: { lat: 40.8128, lng: -74.0742 }, distance: 30, walkTime: 1 },
  { id: 'n6', name: 'Taco Stand', type: 'food', position: { lat: 40.8122, lng: -74.0748 }, distance: 60, walkTime: 1 },
  { id: 'n7', name: 'Coffee Corner', type: 'food', position: { lat: 40.8130, lng: -74.0750 }, distance: 40, walkTime: 1 },
  { id: 'n8', name: 'Washroom — Section 110', type: 'washroom', position: { lat: 40.8126, lng: -74.0740 }, distance: 50, walkTime: 1 },
  { id: 'n9', name: 'Washroom — Section 115', type: 'washroom', position: { lat: 40.8124, lng: -74.0752 }, distance: 70, walkTime: 1 },
  { id: 'n10', name: 'Medical Center — North', type: 'medical', position: { lat: 40.8132, lng: -74.0748 }, distance: 100, walkTime: 2 },
  { id: 'n11', name: 'Medical Center — South', type: 'medical', position: { lat: 40.8118, lng: -74.0742 }, distance: 150, walkTime: 2 },
  { id: 'n12', name: 'Emergency Exit 7', type: 'exit', position: { lat: 40.8127, lng: -74.0738 }, distance: 40, walkTime: 1 },
  { id: 'n13', name: 'Emergency Exit 9', type: 'exit', position: { lat: 40.8123, lng: -74.0758 }, distance: 80, walkTime: 1 },
  { id: 'n14', name: 'Emergency Exit 12', type: 'exit', position: { lat: 40.8133, lng: -74.0752 }, distance: 90, walkTime: 2 },
  { id: 'n15', name: 'Parking Lot A', type: 'parking', position: { lat: 40.8140, lng: -74.0760 }, distance: 300, walkTime: 4 },
  { id: 'n16', name: 'Parking Lot B', type: 'parking', position: { lat: 40.8110, lng: -74.0730 }, distance: 400, walkTime: 5 },
  { id: 'n17', name: 'Your Seat — Sec 112, Row 14, Seat 7', type: 'seat', position: { lat: 40.8125, lng: -74.0745 }, distance: 0, walkTime: 0 },
];

export const foodSpots: FoodSpot[] = [
  { id: 'f1', name: 'Stadium Grill', cuisine: 'American — Burgers, Fries, Hot Dogs', distance: 30, waitTime: 5, rating: 4.5, veg: false, priceRange: '$$' },
  { id: 'f2', name: 'Taco Stand', cuisine: 'Mexican — Tacos, Burritos, Nachos', distance: 60, waitTime: 3, rating: 4.2, veg: true, priceRange: '$' },
  { id: 'f3', name: 'Coffee Corner', cuisine: 'Cafe — Coffee, Pastries, Sandwiches', distance: 40, waitTime: 2, rating: 4.7, veg: true, priceRange: '$' },
  { id: 'f4', name: 'Pizza Palace', cuisine: 'Italian — Pizza, Calzones, Garlic Bread', distance: 80, waitTime: 7, rating: 4.3, veg: true, priceRange: '$$' },
  { id: 'f5', name: 'Asian Wok', cuisine: 'Asian — Noodles, Stir-fry, Dumplings', distance: 100, waitTime: 9, rating: 4.4, veg: true, priceRange: '$$' },
  { id: 'f6', name: 'BBQ Pit', cuisine: 'American — Ribs, Brisket, Wings', distance: 120, waitTime: 11, rating: 4.6, veg: false, priceRange: '$$$' },
  { id: 'f7', name: 'Veggie Garden', cuisine: 'Vegetarian — Salads, Wraps, Smoothies', distance: 50, waitTime: 4, rating: 4.1, veg: true, priceRange: '$$' },
  { id: 'f8', name: 'Ice Cream Parlor', cuisine: 'Desserts — Ice Cream, Sundaes, Shakes', distance: 70, waitTime: 3, rating: 4.8, veg: true, priceRange: '$' },
];

export const transportOptions: TransportOption[] = [
  { id: 't1', type: 'metro', name: 'Metro Line 3', eta: 4, duration: 25, cost: '$2.90', crowd: 'moderate' },
  { id: 't2', type: 'bus', name: 'Bus Route 47', eta: 6, duration: 40, cost: '$2.75', crowd: 'low' },
  { id: 't3', type: 'bus', name: 'Bus Route 12', eta: 8, duration: 35, cost: '$2.75', crowd: 'low' },
  { id: 't4', type: 'taxi', name: 'Taxi Rank — Gate D', eta: 10, duration: 20, cost: '$18-25', crowd: 'low' },
  { id: 't5', type: 'rideshare', name: 'Uber / Lyft — Gate C', eta: 5, duration: 22, cost: '$15-22', crowd: 'moderate' },
  { id: 't6', type: 'walking', name: 'Walking Path — Plaza', eta: 0, duration: 15, cost: 'Free', crowd: 'low' },
];

export const emergencyAlerts: EmergencyAlert[] = [
  { id: 'e1', type: 'medical', location: 'Section 118, Row 22', severity: 'warning', status: 'active', time: '2 min ago' },
  { id: 'e2', type: 'lost-child', location: 'Food Court North', severity: 'caution', status: 'active', time: '5 min ago' },
  { id: 'e3', type: 'security', location: 'Gate C Entrance', severity: 'critical', status: 'active', time: '1 min ago' },
  { id: 'e4', type: 'fire', location: 'Parking Lot B', severity: 'caution', status: 'resolved', time: '15 min ago' },
];

export const volunteerTasks: VolunteerTask[] = [
  { id: 'v1', type: 'navigation', title: 'Guide to Section 112', location: 'Gate A', status: 'in-progress', priority: 'medium', time: '3 min ago' },
  { id: 'v2', type: 'emergency', title: 'Medical assistance needed', location: 'Section 118', status: 'pending', priority: 'high', time: '1 min ago' },
  { id: 'v3', type: 'lost-found', title: 'Lost wallet reported', location: 'Food Court South', status: 'pending', priority: 'low', time: '8 min ago' },
  { id: 'v4', type: 'translation', title: 'Spanish translation needed', location: 'Gate B', status: 'completed', priority: 'medium', time: '12 min ago' },
  { id: 'v5', type: 'navigation', title: 'Wheelchair route to Section 109', location: 'Gate D', status: 'pending', priority: 'high', time: '2 min ago' },
  { id: 'v6', type: 'lost-found', title: 'Lost child — reunited', location: 'Food Court North', status: 'completed', priority: 'high', time: '20 min ago' },
];

export const analyticsData: AnalyticsData = {
  visitors: 78430,
  crowdDensity: 72,
  revenue: 1284500,
  queueLength: 14,
  securityAlerts: 3,
  energyUsage: 8450,
  wasteCollected: 320,
};

// Time-series data for charts
export const visitorTrendData = [
  { time: '4PM', visitors: 12000 },
  { time: '5PM', visitors: 28000 },
  { time: '6PM', visitors: 45000 },
  { time: '6:30PM', visitors: 58000 },
  { time: '7PM', visitors: 68000 },
  { time: '7:30PM', visitors: 74000 },
  { time: '8PM', visitors: 78430 },
];

export const crowdTrendData = [
  { time: '4PM', density: 15 },
  { time: '5PM', density: 34 },
  { time: '6PM', density: 55 },
  { time: '6:30PM', density: 70 },
  { time: '7PM', density: 82 },
  { time: '7:30PM', density: 90 },
  { time: '8PM', density: 72 },
];

export const queueTrendData = [
  { time: '4PM', gate_a: 3, gate_b: 2, gate_c: 4, gate_d: 2 },
  { time: '5PM', gate_a: 8, gate_b: 5, gate_c: 10, gate_d: 4 },
  { time: '6PM', gate_a: 14, gate_b: 8, gate_c: 18, gate_d: 6 },
  { time: '7PM', gate_a: 12, gate_b: 6, gate_c: 20, gate_d: 5 },
  { time: '8PM', gate_a: 8, gate_b: 4, gate_c: 14, gate_d: 3 },
];

export const energyUsageData = [
  { time: '4PM', usage: 4200 },
  { time: '5PM', usage: 5100 },
  { time: '6PM', usage: 6300 },
  { time: '7PM', usage: 7800 },
  { time: '8PM', usage: 8450 },
];

export const wasteCollectionData = [
  { zone: 'North', collected: 85, recycled: 60 },
  { zone: 'South', collected: 72, recycled: 48 },
  { zone: 'East', collected: 90, recycled: 70 },
  { zone: 'West', collected: 73, recycled: 55 },
];

export const recentActivities = [
  { id: 'a1', action: 'New emergency alert — Security at Gate C', time: '1 min ago', type: 'alert' },
  { id: 'a2', action: 'Volunteer assigned to Section 118', time: '3 min ago', type: 'volunteer' },
  { id: 'a3', action: 'Crowd density warning — Food Court North', time: '5 min ago', type: 'crowd' },
  { id: 'a4', action: 'Lost child reunited with family', time: '8 min ago', type: 'resolved' },
  { id: 'a5', action: 'Transport recommendation: Metro Line 3', time: '10 min ago', type: 'transport' },
  { id: 'a6', action: 'New food rating: Ice Cream Parlor 4.8★', time: '12 min ago', type: 'food' },
  { id: 'a7', action: 'Accessibility request: Wheelchair route to Sec 109', time: '15 min ago', type: 'accessibility' },
  { id: 'a8', action: 'Energy usage spike detected — 8450 kWh', time: '18 min ago', type: 'energy' },
];

export const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];
