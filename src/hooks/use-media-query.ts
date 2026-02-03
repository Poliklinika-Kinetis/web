'use client'

import { useState, useEffect } from 'react';

/**
 * Custom hook to track a media query match
 * @param query - Media query string (e.g., "(max-width: 639px)")
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check media query on client side only
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [query]);

  return matches;
}

/**
 * Convenience hook for mobile detection
 * Uses the same breakpoint as defined in custom-media.css
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 639px)');
}
