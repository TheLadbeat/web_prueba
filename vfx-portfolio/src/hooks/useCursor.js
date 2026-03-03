import { useEffect, useRef } from 'react'

/**
 * Custom cursor: small dot follows exactly, ring follows with soft lerp.
 * Call once in App.
 */
export function useCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e) => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    }

    // Lerp ring with factor 0.28 — subtle delay, not sluggish
    let rafId
    const animate = () => {
      const p = pos.current
      p.rx += (p.mx - p.rx) * 0.28
      p.ry += (p.my - p.ry) * 0.28
      ring.style.left = p.rx + 'px'
      ring.style.top  = p.ry + 'px'
      rafId = requestAnimationFrame(animate)
    }
    animate()

    // Hover targets: grow ring on interactive elements
    const grow  = () => ring.classList.add('big')
    const shrink = () => ring.classList.remove('big')

    const attachHover = () => {
      document.querySelectorAll('a, button, .wc, .wc-see-all, .ap-card, .credit-card').forEach(el => {
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    }
    attachHover()

    document.addEventListener('mousemove', onMove)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return { dotRef, ringRef }
}
