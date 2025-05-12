import { atom } from 'jotai';
import { StopMarker } from '@/types/map';
import { busLocationsAtom, userLocationAtom, selectedBusAtom, routeStopsAtom } from './atoms';

// Find nearest stop to user location
export const nearestStopSelector = atom((get) => {
  const userLocation = get(userLocationAtom);
  const stops = get(routeStopsAtom);

  if (!userLocation || stops.length === 0) return null;

  return stops.reduce((nearest: StopMarker | null, stop: StopMarker) => {
    if (!nearest) return stop;

    const nearestDistance = calculateDistance(
      userLocation.coordinates,
      nearest.coordinates
    );
    const currentDistance = calculateDistance(
      userLocation.coordinates,
      stop.coordinates
    );

    return currentDistance < nearestDistance ? stop : nearest;
  }, null);
});

// Get all stops for selected bus route
export const selectedBusStopsSelector = atom((get) => {
  const selectedBus = get(selectedBusAtom);
  const stops = get(routeStopsAtom);

  if (!selectedBus) return [];

  return stops.filter((stop) => stop.id.startsWith(selectedBus.lineRef));
});

// Calculate route details
export const routeDetailsSelector = atom((get) => {
  const stops = get(routeStopsAtom);
  if (stops.length < 2) return null;

  return {
    stops,
    totalDistance: calculateTotalDistance(stops),
    estimatedDuration: calculateEstimatedDuration(stops),
  };
});

// Helper functions
function calculateDistance(point1: { latitude: number; longitude: number }, point2: { latitude: number; longitude: number }): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (point1.latitude * Math.PI) / 180;
  const φ2 = (point2.latitude * Math.PI) / 180;
  const Δφ = ((point2.latitude - point1.latitude) * Math.PI) / 180;
  const Δλ = ((point2.longitude - point1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function calculateTotalDistance(stops: StopMarker[]): number {
  let totalDistance = 0;
  for (let i = 0; i < stops.length - 1; i++) {
    totalDistance += calculateDistance(stops[i].coordinates, stops[i + 1].coordinates);
  }
  return totalDistance;
}

function calculateEstimatedDuration(stops: StopMarker[]): number {
  // Assuming average speed of 30 km/h in urban areas
  const averageSpeed = 30 * 1000 / 3600; // m/s
  const totalDistance = calculateTotalDistance(stops);
  return totalDistance / averageSpeed;
} 