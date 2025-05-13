import { atom } from 'jotai';
import { BusMarker, StopMarker, MapState, UserLocation, Destination, RouteSegment } from '@/types/map';

// Map state
export const mapStateAtom = atom<MapState>({
  center: [35.2137, 31.7683], // Tel Aviv coordinates
  zoom: 12,
  viewState: 'idle',
  selectedBus: null
});

// Bus locations
export const busLocationsAtom = atom<BusMarker[]>([]);

// Selected bus
export const selectedBusAtom = atom<BusMarker | null>(null);

// Selected route
export const selectedRouteAtom = atom<Route | null>(null);

// Route stops
export const routeStopsAtom = atom<StopMarker[]>([]);

// User location
export const userLocationAtom = atom<UserLocation | null>(null);

// Destination
export const destinationAtom = atom<Destination | null>(null);

// Loading states
export const isLoadingBusLocationsAtom = atom<boolean>(false);
export const isLoadingRouteStopsAtom = atom<boolean>(false);
export const isLoadingUserLocationAtom = atom<boolean>(false);

// Error states
export const busLocationsErrorAtom = atom<string | null>(null);
export const routeStopsErrorAtom = atom<string | null>(null);
export const userLocationErrorAtom = atom<string | null>(null);

// UI state
export const isSidebarOpenAtom = atom<boolean>(false);
export const isSearchOpenAtom = atom<boolean>(false);

export interface RouteStep {
  distance: number;
  duration: number;
  instruction: string;
  geometry: any;
}

export interface Route {
  id: string;
  geometry: any;
  distance: number;
  duration: number;
  steps: RouteStep[];
  start: {
    name: string;
    coordinates: [number, number];
  };
  end: {
    name: string;
    coordinates: [number, number];
  };
} 