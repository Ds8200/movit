import { SiriVehicleLocation, GtfsStop } from './api';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface MapState {
  center: [number, number];
  zoom: number;
  viewState: 'idle' | 'loading' | 'error';
}

export interface BusMarker extends SiriVehicleLocation {
  icon?: string;
  size?: [number, number];
  anchor?: [number, number];
}

export interface StopMarker extends GtfsStop {
  icon?: string;
  size?: [number, number];
  anchor?: [number, number];
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