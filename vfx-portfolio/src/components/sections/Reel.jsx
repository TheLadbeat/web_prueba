import { useState } from 'react'

const YOUTUBE_VIDEO_ID = '2n5tyYBc9Og'
const THUMB_URL = `https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`
const EMBED_URL =
  `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}` +
  `?rel=0&modestbranding=1&color=white&iv_load_policy=3&autoplay=1`
const WATCH_URL = `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`

export default function Reel() {
  const [playing, setPlaying] = useState(false)

  return (
    <div id="reel">
      <div className="reel-bg-glow" aria-hidden="true" />
      <div className="reel-inner">
        <p  className="reel-label reveal">Demo Reel · 2025</p>
        <h2 className="reel-title reveal reveal-delay-1">MARCOS MUNOZ — VFX COMPOSITOR</h2>

        {/*
          Outer wrapper carries the reveal animation and NEVER changes className.
          The inner div handles click/playing state so React re-renders
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
                src={EMBED_URL}
                title="Marcos Munoz VFX Demo Reel 2025"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  className="reel-thumb"
                  src={THUMB_URL}
                  alt="Demo Reel thumbnail"
                  draggable="false"
                />
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

        <a href={WATCH_URL} target="_blank" rel="noreferrer" className="reel-link">
          Open on YouTube
        </a>
      </div>
    </div>
  )
}
