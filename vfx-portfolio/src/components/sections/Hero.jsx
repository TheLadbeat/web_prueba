import { REEL_URL } from '../../data/config'
import { useScramble } from '../../hooks/useScramble'

/**
 * Hero section.
 *
 * MARCOS and MUÑOZ each have their own scramble instance running in
 * parallel — MUÑOZ starts 300ms later so they overlap but are offset.
 * Both are on the same line with a non-scrambling space between them.
 *
 * The scroll indicator is absolute at the bottom-right of #hero.
 */
export default function Hero({ onShowProjects }) {
  const marcosChars = useScramble('MARCOS', { startMs: 400, duration: 900 })
  const munozChars  = useScramble('MUÑOZ',  { startMs: 700, duration: 900 })

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

          <h1 className="hero-name" aria-label="MARCOS MUÑOZ">
            {marcosChars.map((ch, i) => (
              <span key={'m' + i} className="hero-char">{ch}</span>
            ))}
            <span className="hero-char">&nbsp;</span>
            {munozChars.map((ch, i) => (
              <span key={'n' + i} className="hero-char">{ch}</span>
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

      {/* Scroll indicator — absolute, bottom-right of #hero */}
      <div className="hero-scroll">
        <div className="scroll-bar" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
