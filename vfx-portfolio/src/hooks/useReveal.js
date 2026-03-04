import { useEffect } from 'react'

/**
 * IntersectionObserver reveal system.
 *
 * Supported classes:
 *   .reveal          fade + slide up (default)
 *   .reveal-left     fade + slide from left
 *   .reveal-right    fade + slide from right
 *   .reveal-scale    fade + scale up
 *   .reveal-fade     fade only
 *
 * Delay helpers: .reveal-delay-1 … .reveal-delay-6
 * All become visible when they cross the viewport threshold.
 * Re-runs when `deps` changes (page transition, modal open, etc).
 */

const SELECTORS = [
  '.reveal',
  '.reveal-left',
  '.reveal-right',
  '.reveal-scale',
  '.reveal-fade',
].join(', ')

export function useReveal(deps = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.10, rootMargin: '0px 0px -40px 0px' }
    )

    const id = setTimeout(() => {
      document.querySelectorAll(SELECTORS).forEach((el) => {
        if (!el.classList.contains('visible')) observer.observe(el)
      })
    }, 60)

    return () => {
      clearTimeout(id)
      observer.disconnect()
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}
