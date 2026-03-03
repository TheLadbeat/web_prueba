// Replace YOUTUBE_VIDEO_ID with your actual YouTube video ID.
// Example: for https://www.youtube.com/watch?v=dQw4w9WgXcQ
//           the ID is dQw4w9WgXcQ
const YOUTUBE_VIDEO_ID = '2n5tyYBc9Og'

const EMBED_URL =
  `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}` +
  `?rel=0&modestbranding=1&color=white&iv_load_policy=3`

export default function Reel() {
  return (
    <div id="reel">
      <div className="reel-bg-glow" aria-hidden="true" />
      <div className="reel-inner">
        <p className="reel-label">Demo Reel &middot; 2025</p>
        <h2 className="reel-title">MARCOS MUNOZ &mdash; VFX COMPOSITOR</h2>
        <div className="reel-embed-wrap">
          <iframe
            src={EMBED_URL}
            title="Marcos Munoz VFX Demo Reel 2025"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`}
          target="_blank"
          rel="noreferrer"
          className="reel-link"
        >
          Open on YouTube
        </a>
      </div>
    </div>
  )
}
