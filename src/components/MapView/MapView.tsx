import { RMap, RLayerTile, RLayerVector } from 'rlayers';
import { fromLonLat } from 'ol/proj';
import { useAtom } from 'jotai';
import { mapStateAtom, busLocationsAtom, routeStopsAtom } from '@/store/atoms';
import { MapState } from '@/types';
import { ISRAEL_CENTER, DEFAULT_ZOOM } from '@/constants';
import { BusFeatures } from './BusFeatures/BusFeatures';
import { StopFeatures } from './StopFeatures/StopFeatures';
import styles from './MapView.module.scss';

export default function MapView() {
  const [mapState, setMapState] = useAtom(mapStateAtom);
  const [busLocations] = useAtom(busLocationsAtom);
  const [routeStops] = useAtom(routeStopsAtom);

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
            zoom: zoom,
            viewState: 'idle'
          }));
        }}
      >
        <RLayerTile
          url="https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attributions="© OpenStreetMap contributors"
        />
        <RLayerVector>
          <BusFeatures busLocations={busLocations} />
        </RLayerVector>
        <RLayerVector>
          <StopFeatures routeStops={routeStops} />
        </RLayerVector>
      </RMap>
    </div>
  );
} 