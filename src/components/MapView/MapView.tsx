import { useEffect, useMemo } from 'react';
import { RMap, RLayerTile, RLayerVector, RFeature, RStyle } from 'rlayers';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { useAtom } from 'jotai';
import { mapStateAtom, busLocationsAtom, selectedBusAtom, routeStopsAtom } from '@/store/atoms';
import { MapState, BusLocation, RouteStop } from '@/types';
import { ISRAEL_CENTER, DEFAULT_ZOOM } from '@/constants';
import styles from './MapView.module.scss';

const MapView = () => {
  const [mapState, setMapState] = useAtom(mapStateAtom);
  const [busLocations] = useAtom(busLocationsAtom);
  const [selectedBus] = useAtom(selectedBusAtom);
  const [routeStops] = useAtom(routeStopsAtom);

  // Create map features from bus locations
  const busFeatures = useMemo(() => {
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

  // Create map features from route stops
  const stopFeatures = useMemo(() => {
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

  return (
    <div className={styles.mapContainer}>
      <RMap
        width="100%"
        height="100%"
        initial={{ center: fromLonLat(ISRAEL_CENTER), zoom: DEFAULT_ZOOM }}
        onMoveEnd={(e) => {
          const map = e.target;
          const view = map.getView();
          const center = view.getCenter();
          const zoom = view.getZoom();
          
          setMapState((prev: MapState) => ({
            ...prev,
            center: center,
            zoom: zoom
          }));
        }}
      >
        <RLayerTile
          url="https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attributions="© OpenStreetMap contributors"
        />
        <RLayerVector>
          {busFeatures}
        </RLayerVector>
        <RLayerVector>
          {stopFeatures}
        </RLayerVector>
      </RMap>
    </div>
  );
};

export default MapView; 