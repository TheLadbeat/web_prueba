import { projects } from '../../data/projects'

/**
 * Credits section.
 * Data comes from projects.js — no hardcoded arrays to keep in sync.
 *
 * Ticker: all projects × 2 for seamless CSS loop.
 * Grid: first 6 projects by most recent year, then order field.
 */

const TICKER_ITEMS   = [...projects, ...projects]  // doubled for seamless loop
const GRID_CREDITS   = projects
  .slice()
  .sort((a, b) => +b.year - +a.year || (a.order ?? 99) - (b.order ?? 99))
  .slice(0, 6)

export default function Credits() {
  return (
    <div id="credits">
      <div className="credits-header">
        <div className="s-header reveal" style={{ marginBottom: 0 }}>
          <span className="s-num">02</span>
          <h2 className="s-title">Credits</h2>
          <span className="s-sub">Selected production work</span>
        </div>
      </div>

      {/* Scrolling ticker */}
      <div className="credits-ticker-wrap">
        <div className="credits-ticker">
          {TICKER_ITEMS.map((p, i) => (
            <span key={i} className="credit-item">
              <span className="credit-title">{p.title}</span>
              <span className="credit-role">{p.role}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Featured credits grid */}
      <div className="credits-grid">
        {GRID_CREDITS.map((p, i) => (
          <div
            key={p.id}
            className={`credit-card reveal${i % 3 !== 0 ? ` reveal-delay-${i % 3}` : ''}`}
          >
            <div className="cc-info">
              <div className="cc-name">{p.title}</div>
              <div className="cc-meta">{p.role} · {p.studio}</div>
            </div>
            <div className="cc-year">{p.year}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
