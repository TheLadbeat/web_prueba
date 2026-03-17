import { useMemo } from 'react'
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
 * Seamless infinite ticker.
 *
 * The trick for a perfect loop:
 *  - Render items × 2 (doubled array).
 *  - For LEFT scroll:  animate 0 → -50%  (width of one copy). At loop reset
 *    position is 0 again — looks identical → seamless.
 *  - For RIGHT scroll: animate -50% → 0. At loop reset position is -50%
 *    again — seamless.
 *  - We use two SEPARATE @keyframes (ctScrollLeft / ctScrollRight) so there
 *    is no `animation-direction: reverse` which causes a visible jump on
 *    every loop reset.
 */
export default function CreditsTicker({ direction = 'left', seed = 1, speed = 42 }) {
  const items   = useMemo(() => shuffle(projects, seed), [seed])
  const doubled = [...items, ...items]

  const animStyle = {
    animationName:     direction === 'right' ? 'ctScrollRight' : 'ctScrollLeft',
    animationDuration: `${speed}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  }

  return (
    <div className="ct-wrap">
      <div className="ct-fade ct-fade-l" />
      <div className="ct-fade ct-fade-r" />
      <div className="ct-track" style={animStyle}>
        {doubled.map((p, i) => (
          <span key={i} className="ct-item">
            <span className="ct-title">{p.title}</span>
            <span className="ct-format">{p.format}</span>
            <span className="ct-dot" aria-hidden="true">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
