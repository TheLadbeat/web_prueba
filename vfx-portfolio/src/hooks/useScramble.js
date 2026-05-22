import { useState, useEffect, useRef } from 'react'

// Extended charset: uppercase letters + numbers + symbols
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?+×=~^*<>/|\\'

function rand() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)]
}

/**
 * useScramble — resolves each character of `target` from random noise
 * to its final value in a left-to-right cascade.
 *
 * Characters scramble at ~20fps (throttled from 60fps rAF) so the
 * random symbols are legible and feel deliberate, not chaotic.
 * Spaces are never scrambled.
 *
 * @param {string} target   — string to reveal (e.g. "MARCOS")
 * @param {number} startMs  — ms before first char resolves
 * @param {number} duration — ms from first to last char resolving
 * @returns {string[]}        current character array
 */
export function useScramble(target, { startMs = 500, duration = 1400 } = {}) {
  const chars = target.split('')
  const [display, setDisplay] = useState(() => chars.map(ch => ch === ' ' ? ' ' : rand()))
  const rafRef    = useRef(null)
  const startRef  = useRef(null)
  const frameRef  = useRef(0)   // throttle counter

  useEffect(() => {
    const nonSpaceIdx = chars
      .map((ch, i) => ch !== ' ' ? i : null)
      .filter(i => i !== null)

    const resolveAt = new Array(chars.length).fill(0)
    nonSpaceIdx.forEach((idx, rank) => {
      resolveAt[idx] = startMs + (duration * rank) / Math.max(nonSpaceIdx.length - 1, 1)
    })

    const tick = (now) => {
      if (!startRef.current) startRef.current = now
      const elapsed = now - startRef.current

      // Throttle: update scramble chars every 3rd frame (~20fps)
      frameRef.current = (frameRef.current + 1) % 3
      if (frameRef.current === 0) {
        setDisplay(
          chars.map((ch, i) => {
            if (ch === ' ')               return ' '
            if (elapsed >= resolveAt[i])  return ch
            return rand()
          })
        )
      }

      const allDone = nonSpaceIdx.every(i => elapsed >= resolveAt[i])
      if (!allDone) rafRef.current = requestAnimationFrame(tick)
      else {
        // Final frame: lock all to correct chars
        setDisplay(chars.map(ch => ch))
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return display
}
