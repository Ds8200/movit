export const API_BASE_URL = 'https://api.openbusstride.com/v1';

export const API_ENDPOINTS = {
  VEHICLE_LOCATIONS: '/vehicle-locations',
  ROUTE_TIMETABLE: '/route-timetable',
  GTFS_STOPS: '/gtfs_stops/list',
  GTFS_ROUTES: '/gtfs_routes/list',
} as const;

export const MAP_CONFIG = {
  DEFAULT_CENTER: [35.2137, 31.7683] as [number, number], // Israel center
  DEFAULT_ZOOM: 12,
  MIN_ZOOM: 6,
  MAX_ZOOM: 18,
  POLLING_INTERVAL: 30000, // 30 seconds
} as const;

export const ISRAEL_CENTER: [number, number] = [34.8516, 31.0461]; // Jerusalem coordinates
export const DEFAULT_ZOOM = 8;

export const VEHICLE_LOCATIONS_ENDPOINT = '/vehicle-locations';
export const ROUTE_TIMETABLE_ENDPOINT = '/route-timetable';

export const MARKER_STYLES = {
  BUS: {
    icon: '/icons/bus-marker.svg',
    size: [32, 32],
    anchor: [0.5, 0.5],
  },
  STOP: {
    icon: '/icons/stop-marker.svg',
    size: [24, 24],
    anchor: [0.5, 0.5],
  },
  USER: {
    icon: '/icons/user-marker.svg',
    size: [32, 32],
    anchor: [0.5, 0.5],
  },
  DESTINATION: {
    icon: '/icons/destination-marker.svg',
    size: [32, 32],
    anchor: [0.5, 0.5],
  },
} as const;

export const ROUTE_STYLES = {
  SELECTED: {
    stroke: {
      color: '#007bff',
      width: 4,
    },
  },
  HOVER: {
    stroke: {
      color: '#6c757d',
      width: 3,
    },
  },
} as const;

export const API_QUERY_PARAMS = {
  DEFAULT_LIMIT: 100,
  DEFAULT_PAGE: 1,
} as const;

export const MAP_DEFAULTS = {
  CENTER: [35.2137, 31.7683], // Tel Aviv coordinates
  ZOOM: 12,
  MIN_ZOOM: 8,
  MAX_ZOOM: 18,
};

export const POLLING_INTERVALS = {
  BUS_LOCATIONS: 30000, // 30 seconds
  ROUTE_UPDATES: 60000, // 1 minute
};

export const ERROR_MESSAGES = {
  LOCATION_DENIED: 'Please enable location services to find nearby bus stops.',
  API_ERROR: 'Failed to fetch data from the server. Please try again later.',
  NO_BUSES: 'No buses are currently in service.',
  NO_ROUTES: 'No routes found for the selected bus.',
  NO_STOPS: 'No stops found for the selected route.',
}; 