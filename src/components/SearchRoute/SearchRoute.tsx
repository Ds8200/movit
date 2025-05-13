'use client';

import { useState } from 'react';
import { LocationInfo } from './LocationInfo/LocationInfo';
import { SearchInput } from './SearchInput/SearchInput';
import { SelectedPlace } from './SelectedPlace/SelectedPlace';
import { TRANSLATIONS } from '@/constants/translations';
import styles from './SearchRoute.module.scss';

interface Place {
  display_name: string;
  lat: string;
  lon: string;
}

export default function SearchRoute() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handleSuggestionSelect = (suggestion: Place) => {
    setSelectedPlace(suggestion);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <h2>{TRANSLATIONS.findRoute}</h2>
        
        <LocationInfo />
        <SearchInput onSuggestionSelect={handleSuggestionSelect} />
        <SelectedPlace selectedPlace={selectedPlace} />
      </div>
    </div>
  );
} 