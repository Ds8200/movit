export interface MapState {
  center: [number, number];
  zoom: number;
  selectedBus: BusLocation | null;
}

export interface BusLocation {
  vehicleId: string;
  lineRef: string;
  operatorRef: string;
  latitude: number;
  longitude: number;
  bearing: number;
  status: string;
}

export interface RouteStop {
  id: string;
  name: string;
  code: string;
  latitude: number;
  longitude: number;
  arrivalTime?: string;
  departureTime?: string;
} 