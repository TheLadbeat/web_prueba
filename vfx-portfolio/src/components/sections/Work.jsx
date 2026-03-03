import { useState, useRef } from 'react'
import { featuredProjects, projects } from '../../data/projects'
import { artPalettes, accentColors } from '../../data/palettes'

function ProjectCard({ project, idx, onHover, onLeave, onClick }) {
  const acc = accentColors[project.color]
  return (
    <div
      className="wc"
      onMouseEnter={() => onHover(idx)}
      onMouseLeave={onLeave}
      onClick={() => onClick(project)}
    >
      {/* Art background */}
      <div
        className="wc-art"
        style={{ background: artPalettes[project.color] }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 45%, ${acc} 0%, transparent 60%)`
        }} />
      </div>

      {/* Static poster content */}
      <div className="wc-poster-content">
        <span className="wc-format-badge">{project.format}</span>
        <div className="wc-poster-title">{project.title}</div>
      </div>

      <span className="wc-year-badge">{project.year}</span>

      {/* Hover overlay */}
      <div className="wc-overlay">
        <div className="wc-overlay-inner">
          <p className="wc-ov-cat">{project.cat}</p>
          <h3 className="wc-ov-title">{project.title}</h3>
          <p className="wc-ov-role">{project.studio}</p>
        </div>
      </div>
    </div>
  )
}

// Build a unique list of color indices present in featured projects,
// mapped to bg layer indices 0–N for CSS classes.
const BG_LAYERS = Array.from({ length: 15 }, (_, i) => i) // 0-14

export default function Work({ onOpenModal, onShowProjects }) {
  const [activeColor, setActiveColor] = useState(null)
  const timerRef = useRef(null)

  const handleHover = (idx) => {
    clearTimeout(timerRef.current)
    setActiveColor(featuredProjects[idx]?.color ?? null)
  }

  const handleLeave = () => {
    timerRef.current = setTimeout(() => setActiveColor(null), 180)
  }

  return (
    <section id="work">
      {/* ── Cinematic background stage ── */}
      <div id="work-bg-stage">
        <div className={`wbg wbg-default${activeColor === null ? ' active' : ''}`} />
        {BG_LAYERS.map(i => (
          <div
            key={i}
            className={`wbg wbg-${i}${activeColor === i ? ' active' : ''}`}
          />
        ))}
      </div>

      <div className="s-header reveal">
        <span className="s-num">01</span>
        <h2 className="s-title">Work</h2>
        <span className="s-sub">Film · TV · Commercials · Music Video · Exhibitions</span>
      </div>

      <div className="work-grid">
        {featuredProjects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            idx={i}
            onHover={handleHover}
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
