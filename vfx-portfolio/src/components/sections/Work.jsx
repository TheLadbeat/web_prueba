import { useState, useRef } from 'react'
import { featuredProjects, projects } from '../../data/projects'
import { artPalettes, accentColors } from '../../data/palettes'

/**
 * A single project card on the main Work grid.
 * Uses images.square when available, falls back to CSS gradient.
 * Uses images.wide for the section-level hover background.
 */
function ProjectCard({ project, onHover, onLeave, onClick }) {
  const acc     = accentColors[project.color]
  const hasImg  = project.images?.square

  return (
    <div
      className="wc"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => onClick(project)}
    >
      {/* Art background — image or gradient */}
      <div
        className="wc-art"
        style={hasImg ? undefined : { background: artPalettes[project.color] }}
      >
        {hasImg ? (
          <img
            className="wc-art-img"
            src={project.images.square}
            alt={project.title}
            loading="lazy"
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 50% 45%, ${acc} 0%, transparent 60%)`
          }} />
        )}
      </div>

      {/* Poster content */}
      <div className="wc-poster-content">
        <span className="wc-format-badge">{project.format}</span>
        <div className="wc-poster-title">{project.title}</div>
      </div>
      <span className="wc-year-badge">{project.year}</span>

      {/* Hover overlay */}
      <div className="wc-overlay">
        <div className="wc-overlay-inner">
          <p  className="wc-ov-cat"  >{project.cat}</p>
          <h3 className="wc-ov-title">{project.title}</h3>
          <p  className="wc-ov-role" >{project.studio}</p>
        </div>
      </div>
    </div>
  )
}

// All unique palette indices that may appear as bg layers
const BG_INDICES = Array.from({ length: 15 }, (_, i) => i)

export default function Work({ onOpenModal, onShowProjects }) {
  const [activeBg, setActiveBg] = useState(null) // palette color index OR 'img'
  const [hoverWide, setHoverWide] = useState(null) // wide image src or null
  const timerRef = useRef(null)

  const handleHover = (project) => {
    clearTimeout(timerRef.current)
    setActiveBg(project.color)
    setHoverWide(project.images?.wide || null)
  }

  const handleLeave = () => {
    timerRef.current = setTimeout(() => {
      setActiveBg(null)
      setHoverWide(null)
    }, 180)
  }

  return (
    <section id="work">
      {/* ── Cinematic bg stage ── */}
      <div id="work-bg-stage">
        {/* Default dark bg */}
        <div className={`wbg wbg-default${activeBg === null ? ' active' : ''}`} />

        {/* Gradient layers (fallback) */}
        {BG_INDICES.map(i => (
          <div
            key={i}
            className={`wbg wbg-${i}${activeBg === i && !hoverWide ? ' active' : ''}`}
          />
        ))}

        {/* Wide image layer — fades in when project has images.wide */}
        {hoverWide && (
          <div
            className="wbg active"
            style={{
              backgroundImage: `url(${hoverWide})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(.4) saturate(.8)',
            }}
          />
        )}
      </div>

      <div className="s-header reveal">
        <span className="s-num">01</span>
        <h2 className="s-title">Work</h2>
        <span className="s-sub">Film · TV · Commercials · Music Video · Exhibitions</span>
      </div>

      <div className="work-grid">
        {featuredProjects.map(p => (
          <ProjectCard
            key={p.id}
            project={p}
            onHover={() => handleHover(p)}
            onLeave={handleLeave}
            onClick={onOpenModal}
          />
        ))}

        {/* See All card */}
        <div className="wc-see-all" onClick={onShowProjects}>
          <div className="wc-see-all-inner">
            <div className="wc-see-all-label">SEE<br />ALL</div>
            <div className="wc-see-all-rule" />
            <div className="wc-see-all-sub">{projects.length} projects</div>
          </div>
        </div>
      </div>
    </section>
  )
}
