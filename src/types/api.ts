export interface SiriVehicleLocation {
  id: string;
  lineRef: string;
  operatorRef: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  bearing: number;
  status: 'IN_SERVICE' | 'OUT_OF_SERVICE' | 'NOT_IN_SERVICE';
  timestamp: string;
}

export interface RouteTimetable {
  id: string;
  lineRef: string;
  operatorRef: string;
  stops: StopTimetable[];
}

export interface StopTimetable {
  id: string;
  name: string;
  code: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  arrivalTime: string;
  departureTime: string;
}

export interface GtfsStop {
  id: string;
  name: string;
  code: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  city: string;
}

export interface GtfsRoute {
  id: string;
  lineRef: string;
  operatorRef: string;
  name: string;
  description: string;
}

export interface ApiResponse<T> {
  data: T[];
  metadata: {
    total: number;
    page: number;
    per_page: number;
  };
} 