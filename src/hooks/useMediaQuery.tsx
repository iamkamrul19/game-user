import { useEffect, useState } from "react";

/**
 * Custom hook to track media query match.
 * @param query - media query string (e.g., '(max-width: 768px)')
 * @returns boolean indicating if the query matches
 */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Listen for changes
    mediaQueryList.addEventListener("change", listener);

    // Set initial state
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
