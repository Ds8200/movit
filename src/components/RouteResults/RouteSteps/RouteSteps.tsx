import { TRANSLATIONS } from '@/constants/translations';
import { RouteStep } from '@/store/atoms';
import styles from './RouteSteps.module.scss';

interface RouteStepsProps {
  steps: RouteStep[];
}

export function RouteSteps({ steps }: RouteStepsProps) {
  return (
    <div className={styles.routeSteps}>
      <h3>{TRANSLATIONS.routeSteps}</h3>
      {steps.map((step, index) => (
        <div key={index} className={styles.step}>
          <div className={styles.stepNumber}>{index + 1}</div>
          <div className={styles.stepContent}>
            <h4>{step.instruction}</h4>
            <p className={styles.distance}>
              {Math.round(step.distance)} {TRANSLATIONS.meters}
            </p>
            <p className={styles.duration}>
              {Math.round(step.duration / 60)} {TRANSLATIONS.minutes}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
} 