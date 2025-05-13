import { useMemo } from 'react';
import { RFeature, RStyle } from 'rlayers';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { RouteStop } from '@/types';

interface StopFeaturesProps {
  routeStops: RouteStop[];
}

export function StopFeatures({ routeStops }: StopFeaturesProps) {
  return useMemo(() => {
    return routeStops.map((stop: RouteStop) => {
      const coordinates = fromLonLat([stop.longitude, stop.latitude]);
      return (
        <RFeature
          key={stop.id}
          geometry={new Point(coordinates)}
        >
          <RStyle.RStyle>
            <RStyle.RIcon
              src="/icons/stop-marker.svg"
              scale={0.5}
              anchor={[0.5, 0.5]}
            />
          </RStyle.RStyle>
        </RFeature>
      );
    });
  }, [routeStops]);
} 