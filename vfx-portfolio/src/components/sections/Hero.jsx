import { REEL_URL } from '../../data/config'

export default function Hero({ onShowProjects }) {
  return (
    <section id="hero">
      {/* Background: subtle gradient + grain handled by CSS */}
      <div className="hero-bg" />
      <div className="hero-vignette" />

      <div className="hero-content">

        {/* ── LEFT: main text ── */}
        <div className="hero-left">
          <p className="hero-eyebrow">VFX Digital Compositor · Nuke · Film &amp; TV</p>

          <h1 className="hero-name">
            MARCOS<br />MUÑOZ
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

        {/* ── RIGHT: poster montage image ── */}
        <div className="hero-right">
          <div className="hero-poster-wrap">
            <img
              src="/images/montaje_posters.webp"
              alt="Production credits montage"
              className="hero-poster-img"
              draggable="false"
            />
            <div className="hero-poster-overlay" />
          </div>
          <div className="hero-scroll">
            <div className="scroll-bar" />
            <span>Scroll</span>
          </div>
        </div>

      </div>
    </section>
  )
}
