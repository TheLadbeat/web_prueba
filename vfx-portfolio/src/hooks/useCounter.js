// ═══════════════════════════════════════════════
//  HOOK — useCounter
//  Animates a number from 0 → target when the
//  element enters the viewport.
// ═══════════════════════════════════════════════

import { useEffect, useRef } from 'react';

/**
 * @param {number} target    - final value
 * @param {string} suffix    - text appended after number (e.g. "+", " yrs")
 * @param {number} duration  - animation duration in ms (default 1400)
 * @returns React ref to attach to the DOM element
 */
export function useCounter(target, suffix = '', duration = 1400) {
  const ref     = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const steps    = 60;
        const interval = duration / steps;
        const step     = target / steps;
        let   count    = 0;

        const iv = setInterval(() => {
          count = Math.min(count + step, target);
          el.textContent = Math.floor(count) + (count >= target ? suffix : '');
          if (count >= target) clearInterval(iv);
        }, interval);

        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, duration]);

  return ref;
}
