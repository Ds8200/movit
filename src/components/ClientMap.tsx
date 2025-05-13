'use client';

import { useEffect, useState } from 'react';
import { RMap, ROSM } from 'rlayers';
import { fromLonLat } from 'ol/proj';
import { BusLocation } from '@/types/bus';
import { BusMarkers } from './Map/BusMarkers/BusMarkers';
import { MapControls } from './Map/MapControls/MapControls';
import { LocationError } from './Map/LocationError/LocationError';
import styles from './ClientMap.module.scss';

interface ClientMapProps {
  busLocations: BusLocation[];
  center: [number, number];
  zoom: number;
}

// Default to Tel Aviv coordinates
const DEFAULT_CENTER: [number, number] = [34.7818, 32.0853];

export default function ClientMap(props: ClientMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if geolocation is supported
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationError(false),
        () => setLocationError(true)
      );
    } else {
      setLocationError(true);
    }
  }, []);

  if (!isMounted) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading map...</div>
      </div>
    );
  }

  if (locationError) {
    return <LocationError />;
  }

  return (
    <div className={styles.container}>
      <RMap
        width="100%"
        height="100%"
        initial={{ center: fromLonLat(DEFAULT_CENTER), zoom: props.zoom }}
        className={styles.map}
      >
        <ROSM />
        <MapControls />
        <BusMarkers busLocations={props.busLocations} />
      </RMap>
    </div>
  );
} 