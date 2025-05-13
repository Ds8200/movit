export interface BusLocation {
  id: string;
  routeNumber: string;
  latitude: number;
  longitude: number;
  heading?: number;
  speed?: number;
  lastUpdate?: string;
} 