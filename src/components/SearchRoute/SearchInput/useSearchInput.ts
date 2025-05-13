import { useState, useCallback } from 'react';
import { API_BASE_URL, API_ENDPOINTS, ERROR_MESSAGES } from '@/constants';

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

export function useSearchInput() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchChange = useCallback(async (value: string) => {
    setSearchQuery(value);
    setError(null);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.SEARCH}?q=${encodeURIComponent(value)}&format=json&limit=5`,
        {
          headers: {
            'Accept-Language': 'he',
          },
        }
      );

      if (!response.ok) {
        throw new Error(ERROR_MESSAGES.API_ERROR);
      }

      const data = await response.json();
      setSuggestions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.API_ERROR);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSuggestionClick = useCallback((suggestion: Suggestion) => {
    setSearchQuery(suggestion.display_name);
    setSuggestions([]);
  }, []);

  return {
    searchQuery,
    suggestions,
    isLoading,
    error,
    handleSearchChange,
    handleSuggestionClick,
  };
} 