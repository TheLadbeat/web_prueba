import { useEffect } from 'react'

/**
 * Observes all .reveal elements and adds .visible when they enter the viewport.
 * Re-runs when `deps` change (e.g. after a page transition).
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}
