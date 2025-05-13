import { TRANSLATIONS } from '@/constants/translations';
import styles from './LocationError.module.scss';

export function LocationError() {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <p>{TRANSLATIONS.locationPermissionRequired}</p>
        <p className={styles.subMessage}>{TRANSLATIONS.usingDefaultLocation}</p>
      </div>
    </div>
  );
} 