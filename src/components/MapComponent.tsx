'use client';

import dynamic from 'next/dynamic';
import { BusLocation } from '@/types/bus';

// Prevent any server-side rendering of the map
const Map = dynamic(
  () => import('./ClientMap'),
  {
    ssr: false,
    loading: () => (
      <div className="map-container" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading map...</div>
      </div>
    )
  }
);

interface MapComponentProps {
  busLocations: BusLocation[];
  center: [number, number];
  zoom: number;
}

// This component will only render on the client
export default function MapComponent(props: MapComponentProps) {
  return <Map {...props} />;
} 