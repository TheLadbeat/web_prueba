// ═══════════════════════════════════════════════
//  HOOK — useScrollProgress
//  Returns scroll percentage (0–100) and whether
//  the user has scrolled past a threshold (for nav).
// ═══════════════════════════════════════════════

import { useEffect, useRef } from 'react';

/**
 * @param {Object} options
 * @param {React.RefObject} options.progressBarRef  - ref to the progress bar DOM element
 * @param {React.RefObject} options.navRef          - ref to the nav DOM element
 * @param {number}          options.navThreshold    - scroll Y to trigger nav style (default 60)
 */
export function useScrollProgress({
  progressBarRef,
  navRef,
  navThreshold = 60,
} = {}) {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled    = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const pct = totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0;

      // Update progress bar width directly (no React state = no re-render)
      if (progressBarRef?.current) {
        progressBarRef.current.style.width = `${pct}%`;
      }

      // Toggle nav "scrolled" class
      if (navRef?.current) {
        navRef.current.classList.toggle('scrolled', scrolled > navThreshold);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [progressBarRef, navRef, navThreshold]);
}
