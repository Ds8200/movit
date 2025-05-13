import { useMemo } from 'react';
import { RFeature, RStyle } from 'rlayers';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { useSetAtom } from 'jotai';
import { mapStateAtom } from '@/store/atoms';
import { BusLocation, MapState } from '@/types';

interface BusFeaturesProps {
  busLocations: BusLocation[];
}

export function BusFeatures({ busLocations }: BusFeaturesProps) {
  const setMapState = useSetAtom(mapStateAtom);

  return useMemo(() => {
    return busLocations.map((bus: BusLocation) => {
      const coordinates = fromLonLat([bus.longitude, bus.latitude]);
      return (
        <RFeature
          key={bus.vehicleId}
          geometry={new Point(coordinates)}
          onClick={(e) => {
            e.target.get('features').forEach((feature: any) => {
              setMapState((prev: MapState) => ({
                ...prev,
                selectedBus: bus
              }));
            });
          }}
        >
          <RStyle.RStyle>
            <RStyle.RIcon
              src="/icons/bus-marker.svg"
              scale={0.5}
              anchor={[0.5, 0.5]}
            />
          </RStyle.RStyle>
        </RFeature>
      );
    });
  }, [busLocations, setMapState]);
} 