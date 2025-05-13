import { SiriVehicleLocation, GtfsStop } from './api';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface MapState {
  center: [number, number];
  zoom: number;
  viewState: 'idle' | 'loading' | 'error';
  selectedBus: BusMarker | null;
}

export interface BusMarker {
  vehicleId: string;
  latitude: number;
  longitude: number;
  bearing: number;
  status: string;
  lineRef: string;
  operatorRef: string;
  icon?: string;
  size?: [number, number];
  anchor?: [number, number];
}

export interface StopMarker {
  id: string;
  name: string;
  code: string;
  latitude: number;
  longitude: number;
  coordinates: [number, number];
  arrivalTime?: string;
  departureTime?: string;
}

export interface RoutePolyline {
  coordinates: [number, number][];
  style: {
    stroke: {
      color: string;
      width: number;
    };
  };
}

export interface UserLocation {
  coordinates: Coordinates;
  accuracy: number;
  timestamp: number;
}

export interface Destination {
  stop: GtfsStop;
  arrivalTime?: string;
}

export interface RouteSegment {
  id: string;
  startStop: StopMarker;
  endStop: StopMarker;
  routeNumber: string;
  estimatedTime: number;
  distance: number;
} 