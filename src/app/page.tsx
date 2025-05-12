'use client';

import { Suspense } from 'react';
import MapView from '@/components/MapView/MapView';
import BusDetails from '@/components/BusDetails/BusDetails';
import SearchRoute from '@/components/SearchRoute/SearchRoute';
import RouteResults from '@/components/RouteResults/RouteResults';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchRoute />
          <BusDetails />
          <RouteResults />
        </Suspense>
      </aside>
      <main className={styles.mapContainer}>
        <Suspense fallback={<div>Loading map...</div>}>
          <MapView />
        </Suspense>
      </main>
    </div>
  );
} 