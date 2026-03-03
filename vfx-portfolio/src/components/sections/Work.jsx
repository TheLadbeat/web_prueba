import { useState, useRef } from "react"
import { featuredProjects, projects } from "../../data/projects"
import { artPalettes, accentColors } from "../../data/palettes"

/**
 * A single project card on the main Work grid.
 * - images.square  → shown as card background (1:1)
 * - images.wide    → shown blurred as the section background on hover (16:9)
 */
function ProjectCard({ project, onHover, onLeave, onClick }) {
  const acc    = accentColors[project.color]
  const hasImg = Boolean(project.images?.square)

  return (
    <div
      className="wc"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => onClick(project)}
    >
      {/* Art — real image or gradient fallback */}
      <div
        className={`wc-art${hasImg ? "" : " gradient-only"}`}
        style={hasImg ? undefined : { background: artPalettes[project.color] }}
      >
        {hasImg ? (
          <img
            className="wc-art-img"
            src={project.images.square}
            alt={project.title}
            loading="lazy"
            draggable="false"
          />
        ) : (
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse at 50% 45%, ${acc} 0%, transparent 60%)`
          }} />
        )}
      </div>

      {/* Permanent vignette + labels */}
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

// Gradient bg layer indices 0-14
const BG_INDICES = Array.from({ length: 15 }, (_, i) => i)

export default function Work({ onOpenModal, onShowProjects }) {
  const [activeBg,  setActiveBg]  = useState(null)  // palette color index
  const [hoverWide, setHoverWide] = useState(null)   // wide image src or null
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
        <div className={`wbg wbg-default${activeBg === null ? " active" : ""}`} />

        {/* Gradient layers — shown when no wide image */}
        {BG_INDICES.map(i => (
          <div
            key={i}
            className={`wbg wbg-${i}${activeBg === i && !hoverWide ? " active" : ""}`}
          />
        ))}

        {/*
          Wide image layer — separate element so blur never affects the gradient layers.
          inset:-24px + filter:blur(18px) is applied via .wbg-img in CSS.
        */}
        <div
          className={`wbg-img${hoverWide ? " active" : ""}`}
          style={hoverWide ? { backgroundImage: `url(${hoverWide})` } : undefined}
          aria-hidden="true"
        />
      </div>

      <div className="s-header reveal">
        <span className="s-num">01</span>
        <h2 className="s-title">Work</h2>
        <span className="s-sub">Film &middot; TV &middot; Commercials &middot; Music Video &middot; Exhibitions</span>
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
