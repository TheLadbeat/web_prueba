import { useMemo, useEffect, useRef } from 'react'
import { projects } from '../../data/projects'

function shuffle(arr, seed) {
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Seamless infinite ticker — pixel-perfect loop.
 *
 * The `translateX(-50%)` approach breaks when the two halves don't land
 * on exactly the same pixel boundary (sub-pixel rounding, font hinting,
 * varying screen widths).  Instead we:
 *
 *   1. Render N copies of items in a single flat list.
 *   2. Wrap ONE copy's worth of items in a <span ref> we can measure.
 *   3. After mount, read its `offsetWidth` and store it in a CSS var
 *      --ct-one-w on the track element.
 *   4. The animation keyframe translates by exactly calc(-1 * var(--ct-one-w))
 *      pixels — independent of viewport width, font metrics, etc.
 *   5. We render enough copies to always fill the viewport even on ultra-wide
 *      screens (4 copies should be ample; the track must be ≥ 2× viewport).
 *
 * Because we only translate by exactly one copy's width, the content at
 * position 0 is visually identical to position –(one-copy-width), so the
 * browser reset is invisible.
 */
export default function CreditsTicker({ direction = 'left', seed = 1, speed = 42 }) {
  const items    = useMemo(() => shuffle(projects, seed), [seed])
  const trackRef = useRef(null)
  const oneRef   = useRef(null)   // ref on the first copy — we measure this

  // After paint, measure and set the CSS variable
  useEffect(() => {
    const track = trackRef.current
    const one   = oneRef.current
    if (!track || !one) return

    const update = () => {
      const w = one.offsetWidth
      if (w > 0) track.style.setProperty('--ct-one-w', `${w}px`)
    }

    update()
    // Re-measure if fonts load late or window resizes
    window.addEventListener('resize', update, { passive: true })
    // Wait for web fonts
    if (document.fonts?.ready) document.fonts.ready.then(update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Two copies: the loop resets at exactly one-copy width, so 2× is enough
  const COPIES = 2
  const copies = Array.from({ length: COPIES }, (_, ci) => (
    <span
      key={ci}
      ref={ci === 0 ? oneRef : undefined}
      className="ct-copy"
    >
      {items.map((p, i) => (
        <span key={i} className="ct-item">
          <span className="ct-title">{p.title}</span>
          <span className="ct-format">{p.format}</span>
          <span className="ct-dot" aria-hidden="true">·</span>
        </span>
      ))}
    </span>
  ))

  const animStyle = {
    animationName:           direction === 'right' ? 'ctScrollRight' : 'ctScrollLeft',
    animationDuration:       `${speed}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  }

  return (
    <div className="ct-wrap">
      <div className="ct-fade ct-fade-l" />
      <div className="ct-fade ct-fade-r" />
      <div className="ct-track" ref={trackRef} style={animStyle}>
        {copies}
      </div>
    </div>
  )
}
