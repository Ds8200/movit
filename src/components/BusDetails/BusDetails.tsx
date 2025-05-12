import { useAtom } from 'jotai';
import { selectedBusAtom, routeStopsAtom, isSidebarOpenAtom } from '@/store/atoms';
import { selectedBusStopsSelector } from '@/store/selectors';
import styles from './BusDetails.module.scss';

export default function BusDetails() {
  const [selectedBus] = useAtom(selectedBusAtom);
  const [isOpen] = useAtom(isSidebarOpenAtom);
  const [stops] = useAtom(selectedBusStopsSelector);

  if (!isOpen || !selectedBus) return null;

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2>Bus {selectedBus.lineRef}</h2>
        <p className={styles.operator}>Operator: {selectedBus.operatorRef}</p>
      </div>

      <div className={styles.stopsList}>
        <h3>Route Stops</h3>
        {stops.map((stop) => (
          <div key={stop.id} className={styles.stopItem}>
            <div className={styles.stopInfo}>
              <h4>{stop.name}</h4>
              <p className={styles.stopCode}>Stop {stop.code}</p>
            </div>
            {stop.arrivalTime && (
              <div className={styles.stopTime}>
                <span>Arrival: {formatTime(stop.arrivalTime)}</span>
                {stop.departureTime && (
                  <span>Departure: {formatTime(stop.departureTime)}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function formatTime(timeString: string): string {
  const date = new Date(timeString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
} 