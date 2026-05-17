import { useState, useEffect } from 'react'
import { REEL_URL, REEL_EMBED, REEL_OEMBED } from '../../data/config'

export default function Reel() {
  const [playing,   setPlaying]   = useState(false)
  const [thumbUrl,  setThumbUrl]  = useState(null)   // fetched from Vimeo oEmbed
  const [thumbFail, setThumbFail] = useState(false)  // fallback to gradient if fetch fails

  // Fetch Vimeo thumbnail via public oEmbed endpoint (no auth needed for public videos)
  useEffect(() => {
    fetch(OREEL_EMBED)
      .then(r => r.json())
      .then(d => { if (d.thumbnail_url) setThumbUrl(d.thumbnail_url) })
      .catch(() => setThumbFail(true))
  }, [])

  return (
    <div id="reel">
      <div className="reel-bg-glow" aria-hidden="true" />
      <div className="reel-inner">
        <p  className="reel-label reveal">Demo Reel · 2025</p>
        <h2 className="reel-title reveal reveal-delay-1">MARCOS MUNOZ — VFX COMPOSITOR</h2>

        {/*
          Outer wrapper carries the reveal animation and NEVER changes className.
          The inner div handles click/playing state — React re-renders here
          never touch the element that .visible was added to.
        */}
        <div className="reel-embed-outer reveal-scale reveal-delay-2">
          <div
            className={`reel-embed-wrap${playing ? ' reel-playing' : ''}`}
            onClick={!playing ? () => setPlaying(true) : undefined}
            style={{ cursor: playing ? 'default' : 'none' }}
          >
            {playing ? (
              <iframe
                src={REEL_EMBED}
                title="Marcos Munoz VFX Demo Reel 2025"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                {/* Thumbnail — Vimeo oEmbed image, or gradient fallback */}
                {thumbUrl && !thumbFail ? (
                  <img
                    className="reel-thumb"
                    src={thumbUrl}
                    alt="Demo Reel thumbnail"
                    draggable="false"
                  />
                ) : (
                  <div className="reel-thumb-fallback" aria-hidden="true" />
                )}
                <div className="reel-thumb-overlay" />
                <div className="reel-play-btn" aria-label="Play reel">
                  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="36" stroke="white" strokeOpacity=".7" strokeWidth="1.5"/>
                    <path d="M33 27l22 13-22 13V27z" fill="white"/>
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>

        <a href={REEL_URL} target="_blank" rel="noreferrer" className="reel-link">
          Open on Vimeo
        </a>
      </div>
    </div>
  )
}
