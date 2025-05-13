import { TRANSLATIONS } from '@/constants/translations';
import styles from './SearchInput.module.scss';
import { useSearchInput } from './useSearchInput';

interface SearchInputProps {
  onSuggestionSelect: (suggestion: { display_name: string; lat: string; lon: string }) => void;
}

export function SearchInput({ onSuggestionSelect }: SearchInputProps) {
  const {
    searchQuery,
    suggestions,
    isLoading,
    error,
    handleSearchChange,
    handleSuggestionClick,
  } = useSearchInput();

  const handleSuggestionSelect = (suggestion: { display_name: string; lat: string; lon: string }) => {
    handleSuggestionClick(suggestion);
    onSuggestionSelect(suggestion);
  };

  return (
    <div className={styles.searchInput}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder={TRANSLATIONS.enterDestination}
        dir="rtl"
      />
      {isLoading && <p className={styles.loading}>{TRANSLATIONS.searching}</p>}
      {error && <p className={styles.error}>{error}</p>}
      {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionSelect(suggestion)}>
              <strong>{suggestion.display_name}</strong>
              <span>
                {TRANSLATIONS.coordinates}: {suggestion.lat}, {suggestion.lon}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 