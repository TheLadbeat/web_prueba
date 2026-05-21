import { useState, useEffect, useRef } from 'react'

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function rand() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)]
}

/**
 * useScramble — resolves each character of `target` from random noise
 * to its final value in a left-to-right cascade.
 *
 * Spaces are preserved immediately and do not scramble.
 *
 * @param {string} target    — full string to reveal (e.g. "MARCOS MUÑOZ")
 * @param {number} startMs   — delay before the first char resolves (ms)
 * @param {number} duration  — time from first char to last char resolving (ms)
 *                             Increase for a slower, more dramatic effect.
 * @returns {string[]}         current character array to render
 */
export function useScramble(target, { startMs = 600, duration = 1600 } = {}) {
  const chars = target.split('')
  const [display, setDisplay] = useState(() => chars.map(() => rand()))
  const rafRef   = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    // Only non-space chars participate in the cascade
    const nonSpaceIndices = chars
      .map((ch, i) => ch !== ' ' ? i : null)
      .filter(i => i !== null)

    // Each non-space char resolves at an evenly-spaced time across [startMs … startMs+duration]
    const resolveAt = new Array(chars.length).fill(0)
    nonSpaceIndices.forEach((idx, rank) => {
      resolveAt[idx] = startMs + (duration * rank) / Math.max(nonSpaceIndices.length - 1, 1)
    })

    const tick = (now) => {
      if (!startRef.current) startRef.current = now
      const elapsed = now - startRef.current

      setDisplay(
        chars.map((ch, i) => {
          if (ch === ' ')              return ' '
          if (elapsed >= resolveAt[i]) return ch    // locked to final char
          return rand()                              // still scrambling
        })
      )

      const allDone = nonSpaceIndices.every(i => elapsed >= resolveAt[i])
      if (!allDone) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return display
}
