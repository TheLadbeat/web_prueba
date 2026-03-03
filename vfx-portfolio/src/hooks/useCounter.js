import { useEffect } from 'react'

/**
 * Animates elements with data-target and data-suffix attributes.
 * Triggered once when the element enters the viewport.
 */
export function useCounter() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el     = e.target
          const target = +el.dataset.target
          const suffix = el.dataset.suffix || ''
          let count    = 0
          const step   = target / 60
          const iv     = setInterval(() => {
            count = Math.min(count + step, target)
            el.textContent = Math.floor(count) + suffix
            if (count >= target) clearInterval(iv)
          }, 22)
          observer.unobserve(el)
        })
      },
      { threshold: 0.5 }
    )
    document.querySelectorAll('[data-target]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
