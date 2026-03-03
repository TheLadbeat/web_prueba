export default function Reel() {
  return (
    <div id="reel">
      <div className="reel-bg" />
      <div className="reel-scanlines" />
      <div className="reel-content">
        <a
          href="https://bit.ly/MMR-reel"
          target="_blank"
          rel="noreferrer"
          className="reel-btn"
          aria-label="Watch demo reel"
        >
          <svg className="reel-play" width="20" height="24" viewBox="0 0 20 24" fill="white">
            <path d="M1 1.5l18 10.5L1 22.5V1.5z" />
          </svg>
        </a>
        <h2 className="reel-title">DEMO REEL 2025</h2>
        <p className="reel-sub">
          Two years of real shots — features, TV, commercials, music videos, exhibitions.
        </p>
        <p className="reel-year">bit.ly/MMR-reel</p>
      </div>
    </div>
  )
}
