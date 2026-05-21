import { REEL_URL } from '../../data/config'
import { useScramble } from '../../hooks/useScramble'

/**
 * Hero section.
 *
 * hero-name: each character is a <span> driven by useScramble.
 * The scroll indicator sits absolute in the bottom-right of #hero
 * (outside hero-left) so it anchors to the edge regardless of text width.
 */
export default function Hero({ onShowProjects }) {
  const marcosChars = useScramble('MARCOS', { startMs: 450, duration: 700 })
  const munozChars  = useScramble('MUÑOZ',  { startMs: 650, duration: 700 })

  return (
    <section id="hero">
      <div className="hero-bg" />
      <div className="hero-vignette" />

      <div className="hero-content">
        <div className="hero-left">

          <p className="hero-eyebrow">VFX Digital Compositor · Nuke · Film &amp; TV</p>

          <h1 className="hero-name" aria-label="MARCOS MUÑOZ">
            <span className="hero-word">
              {marcosChars.map((ch, i) => (
                <span key={i} className="hero-char">{ch}</span>
              ))}
            </span>
            <br />
            <span className="hero-word">
              {munozChars.map((ch, i) => (
                <span key={i} className="hero-char">{ch}</span>
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

      {/* Scroll indicator — absolute, anchored to bottom-right of #hero */}
      <div className="hero-scroll">
        <div className="scroll-bar" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
