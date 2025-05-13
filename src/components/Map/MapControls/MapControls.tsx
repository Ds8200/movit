import { RControl } from 'rlayers';
import styles from './MapControls.module.scss';

export function MapControls() {
  return (
    <div className={styles.controls}>
      <div className={styles.scaleLine}>
        <RControl.RScaleLine />
      </div>
      <div className={styles.zoomControl}>
        <RControl.RZoom />
      </div>
      <div className={styles.fullScreenControl}>
        <RControl.RFullScreen />
      </div>
    </div>
  );
} 