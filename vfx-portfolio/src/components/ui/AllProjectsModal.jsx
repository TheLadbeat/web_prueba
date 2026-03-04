import { useMemo, useEffect, useRef } from 'react'
import { projects }            from '../../data/projects'
import { artPalettes, accentColors } from '../../data/palettes'
import { lockScroll, unlockScroll }  from '../../utils/scrollLock'

/**
 * All-projects modal — full-viewport overlay, slides up over main page.
 *
 * z-index 7500  (below the project-detail modal at 8200)
 *
 * Scroll behaviour
 *   - Main-page scroll is locked via shared scrollLock utility (ref-counted).
 *   - When a project-detail modal opens on top, it adds another lock so
 *     the page stays frozen even after this modal's own lock releases.
 *   - .apm-body scrolls independently; overscroll-behavior:contain stops bleed.
 */

function ProjectCard({ project, onClick }) {
  const acc    = accentColors[project.color]
  const hasImg = Boolean(project.images?.square)
  return (
    <div className="ap-card" onClick={() => onClick(project)}>
      <div
        className={`ap-card-art${hasImg ? '' : ' gradient-only'}`}
        style={hasImg ? undefined : { background: artPalettes[project.color] }}
      >
        {hasImg ? (
          <img
            className="ap-card-img"
            src={project.images.square}
            alt={project.title}
            loading="lazy"
            draggable="false"
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 50% 45%, ${acc} 0%, transparent 60%)`
          }} />
        )}
      </div>
      <span className="ap-card-format">{project.format}</span>
      <span className="ap-card-year-badge">{project.year}</span>
      <div className="ap-card-overlay">
        <div className="ap-card-info">
          <p className="ap-card-cat">{project.cat}</p>
          <h3 className="ap-card-title">{project.title}</h3>
          <p className="ap-card-role">{project.studio}</p>
        </div>
      </div>
    </div>
  )
}

export default function AllProjectsModal({ open, onClose, onOpenProject }) {
  const bodyRef = useRef(null)

  // Lock main-page scroll while open
  useEffect(() => {
    if (open) {
      lockScroll()
      if (bodyRef.current) bodyRef.current.scrollTop = 0
    } else {
      unlockScroll()
    }
    return () => { if (open) unlockScroll() }
  }, [open])

  // Escape key
  useEffect(() => {
    if (!open) return
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, onClose])

  // Group by year descending
  const byYear = useMemo(() => {
    const map = {}
    projects.forEach(p => {
      if (!map[p.year]) map[p.year] = []
      map[p.year].push(p)
    })
    return Object.keys(map)
      .sort((a, b) => +b - +a)
      .map(year => ({ year, items: map[year] }))
  }, [])

  return (
    <div className={`apm${open ? ' open' : ''}`} role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="apm-backdrop" onClick={onClose} />

      <div className="apm-panel">
        {/* Sticky header */}
        <header className="apm-header">
          <div className="apm-header-left">
            <button className="apm-back" onClick={onClose}>&#8592; Back</button>
            <span className="apm-title">ALL WORK</span>
            <span className="apm-count">{projects.length} projects · 2023–2026</span>
          </div>
          <button className="apm-close" onClick={onClose} aria-label="Close">&#x2715;</button>
        </header>

        {/* Scrollable body — overscroll-behavior:contain via CSS */}
        <div className="apm-body" ref={bodyRef}>
          <div className="ap-content">
            {byYear.map(({ year, items }) => (
              <div key={year}>
                <div className="ap-year-divider">
                  <div className="ap-year-num">{year}</div>
                  <div className="ap-year-line" />
                </div>
                <div className="ap-year-grid">
                  {items.map(p => (
                    <ProjectCard
                      key={p.id}
                      project={p}
                      onClick={onOpenProject}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
