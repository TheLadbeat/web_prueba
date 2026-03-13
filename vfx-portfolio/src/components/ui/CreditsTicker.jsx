import { useMemo } from 'react'
import { projects } from '../../data/projects'

/**
 * Single infinite ticker strip.
 *
 * Props:
 *   direction  'left' | 'right'  — scroll direction
 *   seed       number            — used to produce a deterministic shuffle
 *                                  so the two strips look different
 *   speed      number            — animation duration in seconds (default 40)
 */

function shuffle(arr, seed) {
  // Seeded Fisher-Yates so each strip gets a different but stable order
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function CreditsTicker({ direction = 'left', seed = 1, speed = 42 }) {
  const items = useMemo(() => shuffle(projects, seed), [seed])

  // Duplicate for seamless loop
  const doubled = [...items, ...items]

  const animStyle = {
    animationDuration: `${speed}s`,
    animationDirection: direction === 'right' ? 'reverse' : 'normal',
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
