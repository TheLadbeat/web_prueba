const TICKER_CREDITS = [
  { title: 'Society of the Snow',         role: 'VFX Junior Compositor' },
  { title: 'Leave the World Behind',      role: 'VFX Junior Compositor' },
  { title: 'Lionel',                      role: 'VFX Digital Compositor' },
  { title: 'La Coleccionista',            role: 'VFX Digital Compositor' },
  { title: 'La Ruta Vol. 2: Ibiza',       role: 'VFX Digital Compositor' },
  { title: 'Nails',                       role: 'VFX Digital Compositor' },
  { title: 'Problema Cabrón — Residente', role: 'VFX Junior Compositor' },
  { title: 'El Corte Inglés Christmas',   role: 'VFX Junior Compositor' },
]

const GRID_CREDITS = [
  { name: 'Society of the Snow',         meta: 'VFX Junior Compositor · El Ranchito VFX', year: '2023' },
  { name: 'Leave the World Behind',      meta: 'VFX Junior Compositor · El Ranchito VFX', year: '2023' },
  { name: 'Problema Cabrón (Residente)', meta: 'VFX Junior Compositor · El Ranchito VFX', year: '2023' },
  { name: 'Lionel',                      meta: 'VFX Digital Compositor · LaLivingston',   year: '2025' },
  { name: 'La Coleccionista',            meta: 'VFX Digital Compositor · LaLivingston',   year: '2025' },
  { name: 'La Ruta Vol. 2: Ibiza',       meta: 'VFX Digital Compositor · LaLivingston',   year: '2025' },
]

// Duplicate ticker for seamless loop
const TICKER_DOUBLED = [...TICKER_CREDITS, ...TICKER_CREDITS]

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
          {TICKER_DOUBLED.map((c, i) => (
            <span key={i} className="credit-item">
              <span className="credit-title">{c.title}</span>
              <span className="credit-role">{c.role}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Featured credits grid */}
      <div className="credits-grid">
        {GRID_CREDITS.map((c, i) => (
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
