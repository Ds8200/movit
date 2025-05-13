'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import SearchRoute from '@/components/SearchRoute/SearchRoute';
import styles from './page.module.scss';
import BusDetails from '@/components/BusDetails/BusDetails';
import RouteResults from '@/components/RouteResults/RouteResults';

// Dynamically import the MapComponent with no SSR
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <div>טוען מפה...</div>
});

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.sidebar}>
        <Suspense fallback={<div>טוען...</div>}>
          <SearchRoute />
        </Suspense>
        <BusDetails />
        <RouteResults />
      </div>
      <div className={styles.mapContainer}>
        <Suspense fallback={<div>טוען מפה...</div>}>
          <MapComponent
            busLocations={[]}
            center={[34.7818, 32.0853]} // תל אביב
            zoom={12}
          />
        </Suspense>
      </div>
    </main>
  );
} 