import { useMemo } from 'react'
import { projects } from '../../data/projects'

export default function Credits() {
  const tickerCredits = useMemo(() => (
    projects
      .filter(p => p.year === '2026' || p.year === '2025' || p.year === '2023')
      .slice(0, 8)
      .map(p => ({ title: p.title, role: p.role }))
  ), [])

  const gridCredits = useMemo(() => (
    projects
      .slice()
      .sort((a, b) => (+b.year - +a.year) || ((b.month ?? -1) - (a.month ?? -1)))
      .slice(0, 6)
      .map(p => ({
        name: p.title,
        meta: `${p.role} · ${p.studio}`,
        year: p.year,
      }))
  ), [])

  const tickerDoubled = [...tickerCredits, ...tickerCredits]

  return (
    <div id="credits">
      <div className="credits-header">
        <div className="s-header reveal" style={{ marginBottom: 0 }}>
          <span className="s-num">02</span>
          <h2 className="s-title">Credits</h2>
          <span className="s-sub">Selected production work</span>
        </div>
      </div>

      <div className="credits-ticker-wrap">
        <div className="credits-ticker">
          {tickerDoubled.map((c, i) => (
            <span key={`${c.title}-${i}`} className="credit-item">
              <span className="credit-title">{c.title}</span>
              <span className="credit-role">{c.role}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="credits-grid">
        {gridCredits.map((c, i) => (
          <div
            key={c.name}
            className={`credit-card reveal${i % 3 !== 0 ? ` reveal-delay-${i % 3}` : ''}`}
          >
            <div className="cc-info">
              <div className="cc-name">{c.name}</div>
              <div className="cc-meta">{c.meta}</div>
            </div>
            <div className="cc-year">{c.year}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
