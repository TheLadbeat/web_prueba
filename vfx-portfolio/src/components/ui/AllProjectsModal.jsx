import { useState, useMemo, useEffect, useRef } from 'react'
import { projects }                    from '../../data/projects'
import { artPalettes, accentColors }   from '../../data/palettes'
import { lockScroll, unlockScroll }    from '../../utils/scrollLock'

/**
 * All-projects modal — full-viewport overlay.
 *
 * Features:
 *  - Format filter bar (All + one button per unique format).
 *  - Within each year, projects sorted by month descending (nulls last).
 *  - Filtered-out cards fade + scale down; filtered-in cards restore.
 *  - Scroll lock (ref-counted, no double-unlock).
 */

function ProjectCard({ project, filteredOut, onClick }) {
  const acc    = accentColors[project.color]
  const hasImg = Boolean(project.images?.square)
  return (
    <div
      className={`ap-card${filteredOut ? ' filtered-out' : ''}`}
      onClick={filteredOut ? undefined : () => onClick(project)}
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

// Unique formats in display order (sorted by frequency desc, then alpha)
const ALL_FORMATS = (() => {
  const counts = {}
  projects.forEach(p => { counts[p.format] = (counts[p.format] || 0) + 1 })
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b))
})()

// Group and sort by year desc, then month desc within year (nulls last)
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

export default function AllProjectsModal({ open, onClose, onOpenProject }) {
  const bodyRef      = useRef(null)
  const [filter, setFilter] = useState('All')

  // Reset filter when modal opens
  useEffect(() => {
    if (open) setFilter('All')
  }, [open])

  // Scroll lock — cleanup-only pattern avoids double-unlock.
  useEffect(() => {
    if (!open) return
    lockScroll()
    if (bodyRef.current) bodyRef.current.scrollTop = 0
    return () => unlockScroll()
  }, [open])

  // Reset modal internal scroll on close so each open starts at top.
  useEffect(() => {
    if (open) return
    if (bodyRef.current) bodyRef.current.scrollTop = 0
  }, [open])

  // Escape key
  useEffect(() => {
    if (!open) return
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, onClose])

  const visibleCount = useMemo(() =>
    filter === 'All' ? projects.length : projects.filter(p => p.format === filter).length
  , [filter])

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
            {BY_YEAR.map(({ year, items }) => {
              const visibleItems = items.filter(p => filter === 'All' || p.format === filter)
              const hasVisible = visibleItems.length > 0
              return (
                <div key={year} className={`ap-year-block${hasVisible ? ' has-visible' : ' is-empty'}`}>
                  <div className="ap-year-divider">
                    <div className="ap-year-num">{year}</div>
                    <div className="ap-year-line" />
                  </div>
                  <div className="ap-year-grid">
                    {visibleItems.map(p => (
                      <ProjectCard
                        key={p.id}
                        project={p}
                        filteredOut={false}
                        onClick={onOpenProject}
                      />
                    ))}
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
