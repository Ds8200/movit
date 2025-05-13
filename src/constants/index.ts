export const API_BASE_URL = 'https://nominatim.openstreetmap.org';

export const API_ENDPOINTS = {
  SEARCH: '/search',
  ROUTE: 'https://router.project-osrm.org/route/v1/driving',
  VEHICLE_LOCATIONS: '/vehicles/locations',
  ROUTE_TIMETABLE: '/routes/timetable',
  GTFS_STOPS: '/stops/gtfs'
};

export const MAP_CONFIG = {
  DEFAULT_CENTER: [34.7818, 32.0853], // תל אביב
  DEFAULT_ZOOM: 12,
  MIN_ZOOM: 6,
  MAX_ZOOM: 18,
  POLLING_INTERVAL: 30000, // 30 seconds
};

export const ISRAEL_CENTER: [number, number] = [34.8516, 31.0461]; // Jerusalem coordinates
export const DEFAULT_ZOOM = 8;

export const VEHICLE_LOCATIONS_ENDPOINT = '/vehicles/locations';
export const ROUTE_TIMETABLE_ENDPOINT = '/routes/timetable';

export const MARKER_STYLES = {
  BUS: {
    color: '#007bff',
    size: 20,
  },
  STOP: {
    color: '#28a745',
    size: 15,
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
  color: '#007bff',
  weight: 5,
  opacity: 0.7,
};

export const API_QUERY_PARAMS = {
  DEFAULT_LIMIT: 100,
  DEFAULT_PAGE: 1,
} as const;

export const MAP_DEFAULTS = {
  CENTER: [34.7818, 32.0853], // Tel Aviv coordinates
  ZOOM: 12,
  MIN_ZOOM: 8,
  MAX_ZOOM: 18,
};

export const POLLING_INTERVALS = {
  BUS_LOCATIONS: 30000, // 30 seconds
  ROUTE_UPDATES: 60000, // 1 minute
};

export const ERROR_MESSAGES = {
  LOCATION_NOT_SUPPORTED: 'הדפדפן שלך לא תומך במיקום גיאוגרפי',
  LOCATION_DENIED: 'נדרש אישור למיקום גיאוגרפי',
  API_ERROR: 'שגיאה בחיבור לשרת',
  NO_ROUTES: 'לא נמצאו מסלולים',
  NO_BUSES: 'לא נמצאו אוטובוסים',
  NO_LOCATION: 'לא נמצא מיקום נוכחי. אנא הפעל שירותי מיקום.',
}; 