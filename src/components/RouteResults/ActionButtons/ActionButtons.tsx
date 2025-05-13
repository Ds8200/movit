import { TRANSLATIONS } from '@/constants/translations';
import styles from './ActionButtons.module.scss';

export default function ActionButtons() {
  return (
    <div className={styles.actions}>
      <button className={styles.actionButton} onClick={() => window.print()}>
        {TRANSLATIONS.printRoute}
      </button>
      <button
        className={`${styles.actionButton} ${styles.shareButton}`}
        onClick={() => {
          // Handle share
          console.log('Share route');
        }}
      >
        {TRANSLATIONS.shareRoute}
      </button>
    </div>
  );
} 