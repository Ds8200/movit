import { Route } from '@/store/atoms';
import { TRANSLATIONS } from '@/constants/translations';
import { calculateTotalDistance, calculateEstimatedTime } from '@/utils/route';
import styles from './RouteSummary.module.scss';

interface RouteSummaryProps {
  route: Route;
  numberOfStops: number;
}

export default function RouteSummary({ route, numberOfStops }: RouteSummaryProps) {
  return (
    <div className={styles.routeSummary}>
      <div className={styles.summaryItem}>
        <span className={styles.label}>{TRANSLATIONS.totalDistance}</span>
        <span className={styles.value}>
          {calculateTotalDistance(route)} {TRANSLATIONS.kilometers}
        </span>
      </div>
      <div className={styles.summaryItem}>
        <span className={styles.label}>{TRANSLATIONS.estimatedTime}</span>
        <span className={styles.value}>
          {calculateEstimatedTime(route)} {TRANSLATIONS.minutes}
        </span>
      </div>
      <div className={styles.summaryItem}>
        <span className={styles.label}>{TRANSLATIONS.numberOfStops}</span>
        <span className={styles.value}>{numberOfStops}</span>
      </div>
    </div>
  );
} 