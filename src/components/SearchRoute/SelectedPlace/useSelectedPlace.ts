import { useState, useCallback } from 'react';
import { API_BASE_URL, API_ENDPOINTS, ERROR_MESSAGES } from '@/constants';
import { useSetAtom } from 'jotai';
import { selectedRouteAtom, userLocationAtom } from '@/store/atoms';
import { useAtom } from 'jotai';

interface Place {
  display_name: string;
  lat: string;
  lon: string;
}

export function useSelectedPlace(selectedPlace: Place | null) {
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setSelectedRoute = useSetAtom(selectedRouteAtom);
  const [currentLocation] = useAtom(userLocationAtom);

  const findRoute = useCallback(async () => {
    if (!selectedPlace || !currentLocation) {
      setError(ERROR_MESSAGES.NO_LOCATION);
      return;
    }

    try {
      setIsSearching(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.ROUTE}/${currentLocation.longitude},${currentLocation.latitude};${selectedPlace.lon},${selectedPlace.lat}`,
        {
          headers: {
            'Accept-Language': 'he',
          },
        }
      );

      if (!response.ok) {
        throw new Error(ERROR_MESSAGES.API_ERROR);
      }

      const data = await response.json();
      if (!data.routes || data.routes.length === 0) {
        throw new Error(ERROR_MESSAGES.NO_ROUTES);
      }

      setSelectedRoute(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.API_ERROR);
    } finally {
      setIsSearching(false);
    }
  }, [selectedPlace, currentLocation, setSelectedRoute]);

  return {
    isSearching,
    error,
    findRoute,
  };
} 