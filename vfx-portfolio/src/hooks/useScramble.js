import { useState, useEffect, useRef } from 'react'

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function rand(chars) {
  return chars[Math.floor(Math.random() * chars.length)]
}

/**
 * useScramble — resolves a string character by character with random noise.
 *
 * Each character scrambles for a while, then snaps to its final value.
 * The space between words is preserved and never scrambles.
 *
 * @param {string}   target    — final text to resolve to
 * @param {number}   startMs   — ms before first char starts resolving (default 500)
 * @param {number}   duration  — ms from first to last char resolving (default 900)
 * @returns {string[]}          — array of current characters to render
 */
export function useScramble(target, { startMs = 500, duration = 900 } = {}) {
  const chars   = target.split('')
  const [display, setDisplay] = useState(() => chars.map(() => ' '))
  const rafRef  = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    // Each char resolves at a linearly spaced time within [startMs, startMs+duration]
    const resolveAt = chars.map((_, i) => {
      if (chars[i] === ' ') return 0   // spaces resolve immediately
      const nonSpaces = chars.filter(c => c !== ' ').length
      const rank = chars.slice(0, i + 1).filter(c => c !== ' ').length - 1
      return startMs + (duration * rank) / Math.max(nonSpaces - 1, 1)
    })

    const tick = (now) => {
      if (!startRef.current) startRef.current = now
      const elapsed = now - startRef.current

      setDisplay(chars.map((ch, i) => {
        if (ch === ' ') return ' '
        if (elapsed >= resolveAt[i]) return ch          // resolved
        return rand(CHARSET)                             // still scrambling
      }))

      const allDone = chars.every((ch, i) => ch === ' ' || elapsed >= resolveAt[i])
      if (!allDone) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return display
}
