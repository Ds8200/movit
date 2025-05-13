import { RMap, ROSM } from 'rlayers';
import { fromLonLat } from 'ol/proj';
import { BusLocation } from '@/types/bus';
import { BusMarkers } from '../BusMarkers/BusMarkers';
import { MapControls } from '../MapControls/MapControls';
import styles from './MapView.module.scss';

interface MapViewProps {
  busLocations: BusLocation[];
  center: [number, number];
  zoom: number;
}

export function MapView({ busLocations, center, zoom }: MapViewProps) {
  return (
    <div className={styles.container}>
      <RMap
        width="100%"
        height="100%"
        initial={{ center: fromLonLat(center), zoom }}
        className={styles.map}
      >
        <ROSM />
        <MapControls />
        <BusMarkers busLocations={busLocations} />
      </RMap>
    </div>
  );
} 