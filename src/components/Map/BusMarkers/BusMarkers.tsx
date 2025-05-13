import { RLayerVector, RFeature, RStyle, ROverlay } from 'rlayers';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { BusLocation } from '@/types/bus';
import styles from './BusMarkers.module.scss';

interface BusMarkersProps {
  busLocations: BusLocation[];
}

export function BusMarkers({ busLocations }: BusMarkersProps) {
  return (
    <RLayerVector>
      {busLocations.map((bus) => (
        <RFeature
          key={bus.id}
          geometry={new Point(fromLonLat([bus.longitude, bus.latitude]))}
        >
          <RStyle.RStyle>
            <ROverlay>
              <div className={styles.busMarker}>
                <span className={styles.busNumber}>{bus.routeNumber}</span>
              </div>
            </ROverlay>
          </RStyle.RStyle>
        </RFeature>
      ))}
    </RLayerVector>
  );
} 