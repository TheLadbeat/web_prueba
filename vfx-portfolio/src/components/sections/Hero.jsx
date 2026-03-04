import { useRef } from 'react'
import { useHeroCanvas } from '../../hooks/useHeroCanvas'

export default function Hero({ onShowProjects }) {
  const canvasRef = useRef(null)
  useHeroCanvas(canvasRef)

  return (
    <section id="hero">
      <canvas id="hero-canvas" ref={canvasRef} />
      <div className="hero-scanlines" />
      <div className="hero-vignette" />

      <div className="hero-content">
        <div className="hero-left">
          <p className="hero-eyebrow reveal-left">VFX Digital Compositor · Nuke · Film &amp; TV</p>
          <h1 className="hero-name reveal reveal-delay-1">
            MARCOS<br /><em>MUÑOZ</em>
          </h1>
          <p className="hero-role reveal reveal-delay-2">
            Two years building real shots at El Ranchito &amp; LaLivingston —
            delivering under pressure, learning every day
          </p>
          <div className="hero-actions reveal reveal-delay-3">
            <a
              href="https://bit.ly/MMR-reel"
              target="_blank"
              rel="noreferrer"
              className="btn-reel"
            >
              <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
                <path d="M0 0l12 7L0 14V0z" />
              </svg>
              Watch Reel
            </a>
            <button className="btn-work" onClick={onShowProjects}>
              See Work →
            </button>
          </div>
        </div>

        <div className="hero-right reveal-right">
          <ul className="hero-spec-list">
            <li>Nuke</li>
            <li>Mocha Pro</li>
            <li>Blender · Maya</li>
            <li>ComfyUI · AI</li>
            <li>Python · ShotGrid</li>
          </ul>
          <div className="hero-scroll">
            <div className="scroll-bar" />
            <span>Scroll</span>
          </div>
        </div>
      </div>
    </section>
  )
}
