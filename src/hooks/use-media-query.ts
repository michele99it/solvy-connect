
import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // Initial check for SSR compatibility
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      setMatches(media.matches);
      
      // Add listener for subsequent changes
      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);
      
      // Clean up
      return () => media.removeEventListener("change", listener);
    }
    
    return undefined;
  }, [query]);

  return matches;
}
