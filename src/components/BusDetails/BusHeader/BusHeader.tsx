import { TRANSLATIONS } from '@/constants/translations';
import { BusLocation } from '@/types';
import styles from './BusHeader.module.scss';

interface BusHeaderProps {
  selectedBus: BusLocation | null;
}

export function BusHeader({ selectedBus }: BusHeaderProps) {
  if (!selectedBus) {
    return (
      <div className={styles.header}>
        <h2>{TRANSLATIONS.busDetails}</h2>
        <p>{TRANSLATIONS.selectBus}</p>
      </div>
    );
  }

  return (
    <div className={styles.header}>
      <h2>{TRANSLATIONS.busDetails} {selectedBus.lineRef}</h2>
      <p className={styles.operator}>{TRANSLATIONS.operator}: {selectedBus.operatorRef}</p>
    </div>
  );
} 