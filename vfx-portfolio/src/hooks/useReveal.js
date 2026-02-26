// ═══════════════════════════════════════════════
//  HOOK — useReveal
//  Attaches an IntersectionObserver to all
//  elements with the class "reveal" inside
//  a given container ref, adding "visible" when
//  they enter the viewport.
// ═══════════════════════════════════════════════

import { useEffect } from 'react';

/**
 * @param {React.RefObject} containerRef - scope root (defaults to document)
 * @param {number}          threshold    - intersection ratio trigger (default 0.12)
 */
export function useReveal(containerRef = null, threshold = 0.12) {
  useEffect(() => {
    const root = containerRef?.current ?? document;
    const elements = root.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [containerRef, threshold]);
}
