import { TRANSLATIONS } from '@/constants/translations';
import { RouteStop } from '@/types';
import { formatTime } from '@/utils/date';
import styles from './StopItem.module.scss';

interface StopItemProps {
  stop: RouteStop;
}

export function StopItem({ stop }: StopItemProps) {
  return (
    <div className={styles.stopItem}>
      <div className={styles.stopInfo}>
        <h4>{stop.name}</h4>
        <p className={styles.stopCode}>{TRANSLATIONS.stop} {stop.code}</p>
      </div>
      {stop.arrivalTime && (
        <div className={styles.stopTime}>
          <span>{TRANSLATIONS.arrival}: {formatTime(stop.arrivalTime)}</span>
          {stop.departureTime && (
            <span>{TRANSLATIONS.departure}: {formatTime(stop.departureTime)}</span>
          )}
        </div>
      )}
    </div>
  );
} 