import { useEffect, useRef } from 'react'

/**
 * Custom cursor: dot follows exactly, ring lerps (.28 factor).
 *
 * iframe handling
 * ───────────────
 * Browsers give iframes their own cursor context — we cannot move our
 * custom cursor inside a cross-origin iframe.  Instead, when the pointer
 * enters an iframe we hide both cursor elements (the native iframe cursor
 * takes over naturally).  On mouseleave of the iframe we re-show them.
 */
export function useCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })
  const hidden  = useRef(false)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches ||
                    ('ontouchstart' in window) ||
                    navigator.maxTouchPoints > 0
    if (isTouch) {
      document.body.classList.add('touch-device')
      return
    }

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // ── Helpers ──────────────────────────────────────────────
    const setCursorVisible = (v) => {
      hidden.current = !v
      const op = v ? '' : '0'
      dot.style.opacity  = op
      ring.style.opacity = op
    }

    // ── Mouse position ────────────────────────────────────────
    const onMove = (e) => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
      if (!hidden.current) {
        dot.style.left = e.clientX + 'px'
        dot.style.top  = e.clientY + 'px'
      }
    }

    // ── Lerp loop ─────────────────────────────────────────────
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

    // ── Grow/shrink on interactive elements ──────────────────
    const grow   = () => ring.classList.add('big')
    const shrink = () => ring.classList.remove('big')
    const handleEnter = (e) => {
      if (e.target.closest('a, button, .wc, .wc-see-all, .ap-card, .credit-card')) grow()
    }
    const handleLeave = (e) => {
      if (e.target.closest('a, button, .wc, .wc-see-all, .ap-card, .credit-card')) shrink()
    }

    // ── iframe handling ───────────────────────────────────────
    // We can't track the mouse inside an iframe; hide custom cursor there.
    const onIframeEnter = () => setCursorVisible(false)
    const onIframeLeave = () => {
      setCursorVisible(true)
      // Resync dot to last known position immediately
      dot.style.left = pos.current.mx + 'px'
      dot.style.top  = pos.current.my + 'px'
    }

    // Delegate iframe detection to document (works for dynamically added iframes)
    const onMouseOver = (e) => {
      handleEnter(e)
      if (e.target.tagName === 'IFRAME') onIframeEnter()
    }
    const onMouseOut = (e) => {
      handleLeave(e)
      if (e.target.tagName === 'IFRAME') onIframeLeave()
    }

    document.addEventListener('mousemove',  onMove)
    document.addEventListener('mouseover',  onMouseOver)
    document.addEventListener('mouseout',   onMouseOut)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout',  onMouseOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return { dotRef, ringRef }
}
