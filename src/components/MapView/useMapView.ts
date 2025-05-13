import { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  mapStateAtom,
  busLocationsAtom,
  selectedBusAtom,
  routeStopsAtom,
  isLoadingBusLocationsAtom,
  busLocationsErrorAtom,
} from '@/store/atoms';
import { API_BASE_URL, API_ENDPOINTS, MAP_CONFIG } from '@/constants';
import { BusMarker, StopMarker } from '@/types/map';
import { SiriVehicleLocation, RouteTimetable, GtfsStop } from '@/types/api';

export function useMapView() {
  const [mapState, setMapState] = useAtom(mapStateAtom);
  const [, setBusLocations] = useAtom(busLocationsAtom);
  const [, setSelectedBus] = useAtom(selectedBusAtom);
  const [, setRouteStops] = useAtom(routeStopsAtom);
  const [, setIsLoading] = useAtom(isLoadingBusLocationsAtom);
  const [, setError] = useAtom(busLocationsErrorAtom);

  // Fetch bus locations
  const fetchBusLocations = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.VEHICLE_LOCATIONS}?limit=${MAP_CONFIG.POLLING_INTERVAL}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch bus locations');
      }

      const busMarkers: BusMarker[] = data.data.map((bus: SiriVehicleLocation) => ({
        id: bus.id,
        coordinates: {
          latitude: bus.coordinates.latitude,
          longitude: bus.coordinates.longitude,
        },
        lineRef: bus.lineRef,
        operatorRef: bus.operatorRef,
        bearing: bus.bearing,
        status: bus.status,
      }));

      setBusLocations(busMarkers);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch route stops for a bus
  const fetchRouteStops = async (lineRef: string) => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.ROUTE}?line_ref=${lineRef}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch route stops');
      }

      const stopIds = data.data.map((timetable: RouteTimetable) => timetable.stops.map(stop => stop.id)).flat();
      const stopsResponse = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.GTFS_STOPS}?stop_id=${stopIds.join(',')}`
      );
      const stopsData = await stopsResponse.json();

      if (!stopsResponse.ok) {
        throw new Error(stopsData.message || 'Failed to fetch stop details');
      }

      const stopMarkers: StopMarker[] = stopsData.data.map((stop: GtfsStop) => ({
        id: stop.id,
        coordinates: {
          latitude: stop.coordinates.latitude,
          longitude: stop.coordinates.longitude,
        },
        name: stop.name,
        code: stop.code,
      }));

      setRouteStops(stopMarkers);
    } catch (err) {
      console.error('Error fetching route stops:', err);
    }
  };

  // Handle bus click
  const handleBusClick = (bus: BusMarker) => {
    setSelectedBus(bus);
    fetchRouteStops(bus.lineRef);
  };

  // Handle map movement
  const handleMapMove = (center: [number, number], zoom: number) => {
    setMapState((prev) => ({
      ...prev,
      center,
      zoom,
    }));
  };

  // Poll for bus locations
  useEffect(() => {
    fetchBusLocations();
    const interval = setInterval(fetchBusLocations, MAP_CONFIG.POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return {
    mapState,
    handleMapMove,
    handleBusClick,
  };
} 