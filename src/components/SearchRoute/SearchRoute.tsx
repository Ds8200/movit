import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  userLocationAtom,
  isLoadingUserLocationAtom,
  userLocationErrorAtom,
  isSearchOpenAtom,
} from '@/store/atoms';
import { API_BASE_URL, API_ENDPOINTS } from '@/constants';
import { GtfsStop } from '@/types/api';
import styles from './SearchRoute.module.scss';

export default function SearchRoute() {
  const [isOpen] = useAtom(isSearchOpenAtom);
  const [userLocation, setUserLocation] = useAtom(userLocationAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingUserLocationAtom);
  const [error, setError] = useAtom(userLocationErrorAtom);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GtfsStop[]>([]);
  const [selectedStop, setSelectedStop] = useState<GtfsStop | null>(null);

  // Get user's current location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
        setError(null);
      },
      (error) => {
        setError(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
    setIsLoading(false);
  }, []);

  // Search for stops
  const searchStops = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.GTFS_STOPS}?stop_name=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch stops');
      }

      setSuggestions(data.data);
    } catch (err) {
      console.error('Error searching stops:', err);
      setSuggestions([]);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchStops(query);
  };

  // Handle stop selection
  const handleStopSelect = (stop: GtfsStop) => {
    setSelectedStop(stop);
    setSearchQuery(stop.stop_name);
    setSuggestions([]);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <h2>Find a Route</h2>
        
        {/* Current Location */}
        <div className={styles.locationInfo}>
          {isLoading ? (
            <p>Getting your location...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : userLocation ? (
            <p>Current Location: {userLocation.coordinates.latitude.toFixed(6)}, {userLocation.coordinates.longitude.toFixed(6)}</p>
          ) : null}
        </div>

        {/* Destination Search */}
        <div className={styles.searchInput}>
          <input
            type="text"
            placeholder="Enter destination stop..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {suggestions.length > 0 && (
            <ul className={styles.suggestions}>
              {suggestions.map((stop) => (
                <li
                  key={stop.id}
                  onClick={() => handleStopSelect(stop)}
                >
                  <strong>{stop.stop_name}</strong>
                  <span>Stop {stop.stop_code}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Selected Stop */}
        {selectedStop && (
          <div className={styles.selectedStop}>
            <h3>Selected Destination</h3>
            <p>{selectedStop.stop_name}</p>
            <p className={styles.stopCode}>Stop {selectedStop.stop_code}</p>
            <button
              className={styles.findRouteButton}
              onClick={() => {
                // Handle find route
                console.log('Find route to:', selectedStop);
              }}
            >
              Find Route
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 