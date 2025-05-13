import { useAtom } from 'jotai';
import { selectedBusAtom } from '@/store/atoms';
import { selectedBusStopsSelector } from '@/store/selectors';
import { BusHeader } from './BusHeader/BusHeader';
import { StopsList } from './StopsList/StopsList';
import styles from './BusDetails.module.scss';

export default function BusDetails() {
  const [selectedBus] = useAtom(selectedBusAtom);
  const [stops] = useAtom(selectedBusStopsSelector);

  return (
    <div className={styles.sidebar}>
      <BusHeader selectedBus={selectedBus} />
      {selectedBus && <StopsList stops={stops} />}
    </div>
  );
} 