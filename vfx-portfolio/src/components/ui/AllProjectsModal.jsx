import { useState, useEffect, useRef } from 'react'
import { projects }                    from '../../data/projects'
import { artPalettes, accentColors }   from '../../data/palettes'
import { lockScroll, unlockScroll }    from '../../utils/scrollLock'

/**
 * All-projects modal.
 *
 * Filter animation strategy
 * ──────────────────────────
 * Cards are filtered in JS (not hidden with CSS), so the grid reflows
 * without empty gaps. Each visible card gets key={id+filter} so React
 * remounts it on every filter change, triggering the CSS cardIn animation
 * from scratch. Stagger delay is applied via inline style based on the
 * card's position across ALL visible projects (not per-year), so the
 * cascade reads top-left → bottom-right naturally.
 *
 * Year sections stay in the DOM. When a year has zero visible projects,
 * the section gets class "empty" which transitions max-height → 0 and
 * opacity → 0 via CSS. When projects return, the class is removed and
 * the section expands back.
 */

function ProjectCard({ project, filterKey, staggerIndex, onClick }) {
  const acc    = accentColors[project.color]
  const hasImg = Boolean(project.images?.square)
  return (
    <div
      key={`${project.id}-${filterKey}`}
      className="ap-card"
      style={{ animationDelay: `${Math.min(staggerIndex * 42, 340)}ms` }}
      onClick={() => onClick(project)}
    >
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
      <div className="ap-card-vignette" />
      <span className="ap-card-format">{project.format}</span>
      <span className="ap-card-year-badge">{project.year}</span>
      <div className="ap-card-title-always">{project.title}</div>
      <div className="ap-card-overlay">
        <div className="ap-card-info">
          <p  className="ap-card-cat"  >{project.cat}</p>
          <h3 className="ap-card-title">{project.title}</h3>
        </div>
      </div>
    </div>
  )
}

// ── Module-level constants (computed once) ────────────────────────────────────

// Unique formats sorted by frequency desc
const ALL_FORMATS = (() => {
  const counts = {}
  projects.forEach(p => { counts[p.format] = (counts[p.format] || 0) + 1 })
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b))
})()

// Projects grouped by year desc, within year sorted by month desc (nulls last)
const BY_YEAR = (() => {
  const map = {}
  projects.forEach(p => {
    if (!map[p.year]) map[p.year] = []
    map[p.year].push(p)
  })
  return Object.keys(map)
    .sort((a, b) => +b - +a)
    .map(year => ({
      year,
      items: map[year].slice().sort((a, b) => {
        if (a.month == null && b.month == null) return 0
        if (a.month == null) return 1
        if (b.month == null) return -1
        return b.month - a.month
      }),
    }))
})()

// ── Component ─────────────────────────────────────────────────────────────────

export default function AllProjectsModal({ open, onClose, onOpenProject }) {
  const bodyRef            = useRef(null)
  const [filter, setFilter] = useState('All')

  // Reset filter + scroll when modal opens
  useEffect(() => {
    if (!open) return
    setFilter('All')
    if (bodyRef.current) bodyRef.current.scrollTop = 0
  }, [open])

  // Scroll lock — cleanup-only (no double-unlock)
  useEffect(() => {
    if (!open) return
    lockScroll()
    return () => unlockScroll()
  }, [open])

  // Escape key
  useEffect(() => {
    if (!open) return
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, onClose])

  // Build visible project list — filtered, with a global stagger index
  // We iterate years in order so the stagger index flows top-to-bottom
  let globalStagger = 0
  const yearSections = BY_YEAR.map(({ year, items }) => {
    const visible = filter === 'All'
      ? items
      : items.filter(p => p.format === filter)

    const cardsWithIndex = visible.map(p => {
      const idx = globalStagger++
      return { project: p, staggerIndex: idx }
    })

    return { year, all: items, visible: cardsWithIndex }
  })

  const visibleCount = yearSections.reduce((n, s) => n + s.visible.length, 0)

  return (
    <div className={`apm${open ? ' open' : ''}`} role="dialog" aria-modal="true">
      <div className="apm-backdrop" onClick={onClose} />

      <div className="apm-panel">
        {/* Sticky header */}
        <header className="apm-header">
          <div className="apm-header-left">
            <button className="apm-back" onClick={onClose}>&#8592; Back</button>
            <span className="apm-title">ALL WORK</span>
            <span className="apm-count">
              {visibleCount} {visibleCount === 1 ? 'project' : 'projects'}
            </span>
          </div>
          <button className="apm-close" onClick={onClose} aria-label="Close">&#x2715;</button>
        </header>

        {/* Filter bar */}
        <div className="apm-filter-wrap">
          <div className="apm-filter">
            <button
              className={`apm-filter-btn${filter === 'All' ? ' active' : ''}`}
              onClick={() => setFilter('All')}
            >
              All
            </button>
            {ALL_FORMATS.map(fmt => (
              <button
                key={fmt}
                className={`apm-filter-btn${filter === fmt ? ' active' : ''}`}
                onClick={() => setFilter(fmt)}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable body */}
        <div className="apm-body" ref={bodyRef}>
          <div className="ap-content">
            {yearSections.map(({ year, visible }) => {
              const isEmpty = visible.length === 0
              return (
                <div
                  key={year}
                  className={`ap-year-section${isEmpty ? ' empty' : ''}`}
                >
                  {/* Inner wrapper required for grid-template-rows collapse trick */}
                  <div className="ap-year-section-inner">
                    <div className="ap-year-divider">
                      <div className="ap-year-num">{year}</div>
                      <div className="ap-year-line" />
                    </div>
                    <div className="ap-year-grid">
                      {visible.map(({ project, staggerIndex }) => (
                        <ProjectCard
                          key={`${project.id}-${filter}`}
                          project={project}
                          filterKey={filter}
                          staggerIndex={staggerIndex}
                          onClick={onOpenProject}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
