// ═══════════════════════════════════════════════
//  HOOK — useCursor
//  Tracks mouse position for custom cursor,
//  with a lagging ring effect via rAF.
// ═══════════════════════════════════════════════

import { useEffect, useRef, useCallback } from 'react';

export function useCursor() {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);

  // Live mouse coords (no React state → zero re-renders)
  const mouse = useRef({ x: 0, y: 0 });
  const ring  = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  /** Move dot to exact mouse position */
  const onMouseMove = useCallback((e) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;

    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top  = `${e.clientY}px`;
    }
  }, []);

  /** rAF loop: lerp ring toward cursor */
  const animateRing = useCallback(() => {
    ring.current.x += (mouse.current.x - ring.current.x) * 0.11;
    ring.current.y += (mouse.current.y - ring.current.y) * 0.11;

    if (ringRef.current) {
      ringRef.current.style.left = `${ring.current.x}px`;
      ringRef.current.style.top  = `${ring.current.y}px`;
    }
    rafId.current = requestAnimationFrame(animateRing);
  }, []);

  /** Add/remove "big" class on interactive elements */
  const addHoverListeners = useCallback(() => {
    const selectors = 'a, button, .wc, .reel-btn, .skill-card, .credit-card, .award-item, [data-cursor-big]';
    const els = document.querySelectorAll(selectors);

    const enter = () => ringRef.current?.classList.add('big');
    const leave = () => ringRef.current?.classList.remove('big');

    els.forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    // return cleanup
    return () => {
      els.forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animateRing);

    // Small delay so all DOM elements are mounted before attaching
    const timer = setTimeout(() => {
      const cleanup = addHoverListeners();
      return cleanup;
    }, 500);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId.current);
      clearTimeout(timer);
    };
  }, [onMouseMove, animateRing, addHoverListeners]);

  return { cursorRef, ringRef };
}
