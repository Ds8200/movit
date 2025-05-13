import { TRANSLATIONS } from '@/constants/translations';
import styles from './LocationInfo.module.scss';
import { useLocationInfo } from './useLocationInfo';

export function LocationInfo() {
    const { currentLocation, isLoading, error } = useLocationInfo();

    return (
        <div className={styles.locationInfo}>
            <h3>{TRANSLATIONS.currentLocation}</h3>
            {isLoading && <p className={styles.loading}>{TRANSLATIONS.gettingLocation}</p>}
            {error && <p className={styles.error}>{error}</p>}
            {currentLocation && (
                <p>
                    {TRANSLATIONS.coordinates}: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                </p>
            )}
        </div>
    );
};
