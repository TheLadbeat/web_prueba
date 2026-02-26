import './Reel.css';

export default function Reel() {
  const handleClick = () => {
    // Replace this with an actual modal video embed in production
    alert('Demo reel player would open here.\nIntegrate with Vimeo or YouTube embed.');
  };

  return (
    <div id="reel" className="reel">
      <div className="reel-bg" aria-hidden="true" />
      <div className="reel-scanlines" aria-hidden="true" />

      <div className="reel-content">
        <button
          className="reel-btn"
          onClick={handleClick}
          aria-label="Play demo reel"
          data-cursor-big
        >
          <svg
            className="reel-play-icon"
            width="20" height="24"
            viewBox="0 0 20 24"
            fill="white"
            aria-hidden="true"
          >
            <path d="M1 1.5l18 10.5L1 22.5V1.5z" />
          </svg>
        </button>

        <h2 className="reel-title">2024 DEMO REEL</h2>
        <p className="reel-sub">Eight years. Forty productions. One frame at a time.</p>
        <p className="reel-year">Showreel · 3:42</p>
      </div>
    </div>
  );
}
