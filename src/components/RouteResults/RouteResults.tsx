import { useAtom } from 'jotai';
import { selectedRouteAtom, Route } from '@/store/atoms';
import { TRANSLATIONS } from '@/constants/translations';
import RouteSummary from './RouteSummary/RouteSummary';
import { RouteSteps } from './RouteSteps/RouteSteps';
import ActionButtons from './ActionButtons/ActionButtons';
import styles from './RouteResults.module.scss';

export default function RouteResults() {
  const [selectedRoute] = useAtom(selectedRouteAtom);

  if (!selectedRoute) {
    return null;
  }

  return (
    <div className={styles.routeResults}>
      <h2>{TRANSLATIONS.routeDetails}</h2>
      <RouteSummary route={selectedRoute} numberOfStops={selectedRoute.steps.length} />
      <RouteSteps steps={selectedRoute.steps} />
      <ActionButtons />
    </div>
  );
} 