import { useEffect, useRef } from 'react'
import { REEL_URL } from '../../data/config'

/**
 * Hero — clip-path reveal, letter by letter, left to right.
 *
 * Line 1: MARCOS MUÑOZ  (on one line, each word in a nowrap group)
 * Line 2: REYES
 *
 * MARCOS and MUÑOZ are wrapped in separate inline-block spans so the
 * browser can break the line only between them (not inside a word).
 * This only happens on very narrow screens; on normal/mobile widths
 * the font-size clamp keeps both words on one line.
 */

const LINE1_W1 = 'MARCOS'
const LINE1_W2 = 'MUÑOZ'
const LINE2    = 'REYES'

const CHAR_DELAY  = 18   // ms between consecutive characters
const WORD_GAP    = 36   // ms extra for the space between words
const LINE_GAP    = 55   // ms extra before line 2 starts
const START       = 280  // ms before first letter appears

function buildWord(str, startDelay) {
  return str.split('').map((ch, i) => ({
    ch,
    delay: startDelay + i * CHAR_DELAY,
    key: `${str}-${i}`,
  }))
}

const w1 = buildWord(LINE1_W1, START)
const spaceDelay = START + LINE1_W1.length * CHAR_DELAY + WORD_GAP / 2
const w2 = buildWord(LINE1_W2, spaceDelay + WORD_GAP / 2)
const line2Start = spaceDelay + WORD_GAP / 2 + LINE1_W2.length * CHAR_DELAY + LINE_GAP
const w3 = buildWord(LINE2, line2Start)

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

            {/* Line 1: MARCOS [space] MUÑOZ — each word in a no-break group */}
            <span className="hero-word">
              {/* MARCOS */}
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {w1.map(({ ch, delay, key }) => (
                  <span key={key} className="hero-letter" data-delay={delay}>{ch}</span>
                ))}
              </span>
              {/* space */}
              <span
                className="hero-letter hero-letter-space"
                data-delay={spaceDelay}
                style={{ display: 'inline-block' }}
              >&nbsp;</span>
              {/* MUÑOZ */}
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {w2.map(({ ch, delay, key }) => (
                  <span key={key} className="hero-letter" data-delay={delay}>{ch}</span>
                ))}
              </span>
            </span>

            {/* Line 2: REYES */}
            <span className="hero-word">
              {w3.map(({ ch, delay, key }) => (
                <span key={key} className="hero-letter" data-delay={delay}>{ch}</span>
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
