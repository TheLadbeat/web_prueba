import { useEffect, useRef } from 'react'
import { REEL_URL } from '../../data/config'

/**
 * Hero section — clip-path character reveal on the name.
 *
 * Each letter starts with clip-path:inset(0 102% 0 0) (hidden) and
 * transitions to clip-path:inset(0 0% 0 0) (visible) via CSS transition.
 * Delay is staggered: characters within a word get +50ms each, and each
 * new word adds a 150ms offset so MARCOS → MUÑOZ → REYES cascade in order.
 *
 * The reveal is triggered by adding class "revealed" to each .hero-letter
 * after mount, with the stagger applied via inline transition-delay.
 */

const WORDS = ['MARCOS', 'MUÑOZ', 'REYES']
const CHAR_DELAY  = 52    // ms between consecutive characters
const WORD_OFFSET = 160   // ms extra offset per word
const START_DELAY = 600   // ms before first character reveals (after pageload)

export default function Hero({ onShowProjects }) {
  const nameRef = useRef(null)

  useEffect(() => {
    const el = nameRef.current
    if (!el) return

    // Collect all .hero-letter spans
    const letters = Array.from(el.querySelectorAll('.hero-letter'))

    // Assign each letter its delay, then add .revealed after that delay
    letters.forEach((span, i) => {
      const delay = parseInt(span.dataset.delay || '0', 10)
      setTimeout(() => span.classList.add('revealed'), delay)
    })
  }, [])

  // Build per-letter delay values
  let letterIndex = 0
  const wordsWithDelays = WORDS.map((word, wi) => {
    const wordStart = START_DELAY + wi * WORD_OFFSET
    const letters = word.split('').map((ch, ci) => {
      const delay = wordStart + letterIndex * CHAR_DELAY
      letterIndex++
      return { ch, delay }
    })
    letterIndex++ // small extra pause between words
    return { word, letters }
  })

  return (
    <section id="hero">
      <div className="hero-bg">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
      </div>
      <div className="hero-vignette" />

      <div className="hero-content">
        <div className="hero-left">

          <p className="hero-eyebrow">VFX Digital Compositor · Nuke · Film &amp; TV</p>

          <h1 className="hero-name" ref={nameRef} aria-label="MARCOS MUÑOZ REYES">
            {wordsWithDelays.map(({ word, letters }) => (
              <span key={word} className="hero-word">
                {letters.map(({ ch, delay }) => (
                  <span
                    key={`${word}-${delay}`}
                    className="hero-letter"
                    data-delay={delay}
                    style={{ transitionDelay: `0ms` }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            ))}
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

      {/* Scroll indicator — absolute, bottom-right */}
      <div className="hero-scroll">
        <div className="scroll-bar" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
