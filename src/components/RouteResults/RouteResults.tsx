import { useAtom } from 'jotai';
import { selectedRouteAtom, routeStopsAtom } from '@/store/atoms';
import { RouteSegment } from '@/types/map';
import styles from './RouteResults.module.scss';

export default function RouteResults() {
  const [selectedRoute] = useAtom(selectedRouteAtom);
  const [routeStops] = useAtom(routeStopsAtom);

  if (!selectedRoute) return null;

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.resultsBox}>
        <h2>Route Details</h2>

        {/* Route Summary */}
        <div className={styles.routeSummary}>
          <div className={styles.summaryItem}>
            <span className={styles.label}>Total Distance</span>
            <span className={styles.value}>
              {calculateTotalDistance(selectedRoute.coordinates)} km
            </span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.label}>Estimated Time</span>
            <span className={styles.value}>
              {calculateEstimatedTime(selectedRoute.coordinates)} min
            </span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.label}>Number of Stops</span>
            <span className={styles.value}>{routeStops.length}</span>
          </div>
        </div>

        {/* Route Steps */}
        <div className={styles.routeSteps}>
          <h3>Route Steps</h3>
          {routeStops.map((stop, index) => (
            <div key={stop.id} className={styles.step}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.stepContent}>
                <h4>{stop.name}</h4>
                <p className={styles.stopCode}>Stop {stop.code}</p>
                {stop.arrivalTime && (
                  <p className={styles.time}>
                    Arrival: {formatTime(stop.arrivalTime)}
                  </p>
                )}
                {stop.departureTime && (
                  <p className={styles.time}>
                    Departure: {formatTime(stop.departureTime)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.actionButton} onClick={() => window.print()}>
            Print Route
          </button>
          <button
            className={`${styles.actionButton} ${styles.shareButton}`}
            onClick={() => {
              // Handle share
              console.log('Share route');
            }}
          >
            Share Route
          </button>
        </div>
      </div>
    </div>
  );
}

function formatTime(timeString: string): string {
  const date = new Date(timeString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function calculateTotalDistance(coordinates: { latitude: number; longitude: number }[]): number {
  let totalDistance = 0;
  for (let i = 1; i < coordinates.length; i++) {
    totalDistance += calculateDistance(coordinates[i - 1], coordinates[i]);
  }
  return Math.round(totalDistance / 1000); // Convert to kilometers
}

function calculateEstimatedTime(coordinates: { latitude: number; longitude: number }[]): number {
  const distance = calculateTotalDistance(coordinates);
  const averageSpeed = 30; // km/h
  return Math.round((distance / averageSpeed) * 60); // Convert to minutes
}

function calculateDistance(
  coord1: { latitude: number; longitude: number },
  coord2: { latitude: number; longitude: number }
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (coord1.latitude * Math.PI) / 180;
  const φ2 = (coord2.latitude * Math.PI) / 180;
  const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
} 