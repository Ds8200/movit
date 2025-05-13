import { TRANSLATIONS } from '@/constants/translations';
import styles from './SelectedPlace.module.scss';
import { useSelectedPlace } from './useSelectedPlace';

interface SelectedPlaceProps {
  selectedPlace: {
    display_name: string;
    lat: string;
    lon: string;
  } | null;
}

export function SelectedPlace({ selectedPlace }: SelectedPlaceProps) {
  const { isSearching, error, findRoute } = useSelectedPlace(selectedPlace);

  if (!selectedPlace) return null;

  return (
    <div className={styles.selectedPlace}>
      <h3>{TRANSLATIONS.selectedDestination}</h3>
      <p>
        <strong>{selectedPlace.display_name}</strong>
        <br />
        {TRANSLATIONS.coordinates}: {selectedPlace.lat}, {selectedPlace.lon}
      </p>
      {error && <p className={styles.error}>{error}</p>}
      <button onClick={findRoute} disabled={isSearching}>
        {isSearching ? TRANSLATIONS.searching : TRANSLATIONS.findRouteButton}
      </button>
    </div>
  );
} 