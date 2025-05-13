import { TRANSLATIONS } from '@/constants/translations';
import { RouteStop } from '@/types';
import { StopItem } from '../StopItem/StopItem';
import styles from './StopsList.module.scss';

interface StopsListProps {
  stops: RouteStop[];
}

export function StopsList({ stops }: StopsListProps) {
  return (
    <div className={styles.stopsList}>
      <h3>{TRANSLATIONS.routeStops}</h3>
      {stops.map((stop) => (
        <StopItem key={stop.id} stop={stop} />
      ))}
    </div>
  );
} 