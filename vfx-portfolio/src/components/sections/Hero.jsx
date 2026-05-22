import { useEffect, useRef } from 'react'
import { REEL_URL } from '../../data/config'

/**
 * Hero — clip-path reveal, letter by letter, left to right.
 *
 * Layout: two lines
 *   Line 1 → MARCOS MUÑOZ  (11 chars + 1 space)
 *   Line 2 → REYES         (5 chars)
 *
 * Every character (including the space) gets its own <span>.
 * Each span starts with clip-path:inset(0 102% 0 0) = fully hidden.
 * A setTimeout per letter adds class "revealed" which transitions
 * clip-path to inset(0 0% 0 0) = fully visible.
 * Letters appear strictly one-by-one: M → A → R → C → O → S →   → M → U → Ñ → O → Z
 * then after a small pause → R → E → Y → E → S
 */

const LINE1 = 'MARCOS MUÑOZ'   // 12 chars incl. space
const LINE2 = 'REYES'

const CHAR_DELAY  = 55   // ms between consecutive letters
const LINE_GAP    = 90   // extra ms before line 2 starts after line 1 ends
const START       = 550  // ms before first letter appears

function buildLine(str, startDelay) {
  return str.split('').map((ch, i) => ({
    ch,
    delay: startDelay + i * CHAR_DELAY,
    key: `${ch}-${i}-${startDelay}`,
  }))
}

const line1Letters = buildLine(LINE1, START)
const line2Start   = START + LINE1.length * CHAR_DELAY + LINE_GAP
const line2Letters = buildLine(LINE2, line2Start)

export default function Hero({ onShowProjects }) {
  const nameRef = useRef(null)

  useEffect(() => {
    const el = nameRef.current
    if (!el) return
    const spans = Array.from(el.querySelectorAll('.hero-letter'))
    spans.forEach(span => {
      const delay = parseInt(span.dataset.delay, 10)
      setTimeout(() => span.classList.add('revealed'), delay)
    })
  }, [])

  return (
    <section id="hero">
      <div className="hero-bg" />
      <div className="hero-vignette" />

      <div className="hero-content">
        <div className="hero-left">

          <p className="hero-eyebrow">VFX Digital Compositor · Nuke · Film &amp; TV</p>

          <h1 className="hero-name" ref={nameRef} aria-label="MARCOS MUÑOZ REYES">
            {/* Line 1: MARCOS MUÑOZ */}
            <span className="hero-word">
              {line1Letters.map(({ ch, delay, key }) => (
                <span
                  key={key}
                  className={`hero-letter${ch === ' ' ? ' hero-letter-space' : ''}`}
                  data-delay={delay}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))}
            </span>

            {/* Line 2: REYES */}
            <span className="hero-word">
              {line2Letters.map(({ ch, delay, key }) => (
                <span
                  key={key}
                  className="hero-letter"
                  data-delay={delay}
                >
                  {ch}
                </span>
              ))}
            </span>
          </h1>

          <p className="hero-role">
            Compositing real shots at El&nbsp;Ranchito &amp; LaLivingston.
            Credits include <em>Society&nbsp;of&nbsp;the&nbsp;Snow</em> and{' '}
            <em>Leave&nbsp;the&nbsp;World&nbsp;Behind</em>.
          </p>

          <div className="hero-avail">
            <span className="hero-avail-dot" />
            Madrid · Open to relocation
          </div>

          <div className="hero-actions">
            <a href={REEL_URL} target="_blank" rel="noreferrer" className="btn-reel">
              <svg width="11" height="13" viewBox="0 0 11 13" fill="currentColor">
                <path d="M0 0l11 6.5L0 13V0z" />
              </svg>
              Watch Reel
            </a>
            <button className="btn-work" onClick={onShowProjects}>
              See Work →
            </button>
          </div>

        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-bar" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
