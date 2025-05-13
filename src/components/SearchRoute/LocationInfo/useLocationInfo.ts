import { useState, useEffect } from 'react';
import { ERROR_MESSAGES } from '@/constants';

interface Location {
  lat: number;
  lng: number;
}

export function useLocationInfo() {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(ERROR_MESSAGES.LOCATION_NOT_SUPPORTED);
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(ERROR_MESSAGES.LOCATION_DENIED);
        setIsLoading(false);
      }
    );
  }, []);

  return {
    currentLocation,
    isLoading,
    error,
  };
} 