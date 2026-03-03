import { useEffect, useRef } from 'react'

/**
 * Custom cursor: dot follows exactly, ring follows with soft lerp (.28 factor).
 * Automatically disabled on touch/mobile devices — body.touch-device class
 * is also added so CSS can restore native cursor.
 */
export function useCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })
  const enabled = useRef(false)

  useEffect(() => {
    // Detect touch device — disable custom cursor entirely
    const isTouch = window.matchMedia('(hover: none)').matches ||
                    ('ontouchstart' in window) ||
                    navigator.maxTouchPoints > 0

    if (isTouch) {
      document.body.classList.add('touch-device')
      return // skip all cursor logic
    }

    enabled.current = true
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e) => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    }

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

    const grow   = () => ring.classList.add('big')
    const shrink = () => ring.classList.remove('big')

    // Delegate hover to document (works even after DOM changes)
    const handleEnter = (e) => {
      if (e.target.closest('a, button, .wc, .wc-see-all, .ap-card, .credit-card')) grow()
    }
    const handleLeave = (e) => {
      if (e.target.closest('a, button, .wc, .wc-see-all, .ap-card, .credit-card')) shrink()
    }
    document.addEventListener('mouseover',  handleEnter)
    document.addEventListener('mouseout',   handleLeave)
    document.addEventListener('mousemove',  onMove)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', handleEnter)
      document.removeEventListener('mouseout',  handleLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return { dotRef, ringRef }
}
