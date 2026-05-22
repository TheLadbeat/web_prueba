import { useState, useRef, useCallback } from 'react'
import { featuredProjects, projects } from '../../data/projects'
import { artPalettes, accentColors }  from '../../data/palettes'

/**
 * Work — cinematic background + transparency cards.
 *
 * Background image architecture
 * ─────────────────────────────
 * Instead of a double-buffer with two shared slots, we mount ONE layer per
 * project that has a wide image, all permanently in the DOM.
 *
 * On hover we set that project's layer to opacity:1 and all others to
 * opacity:0.  Because each layer is an independent DOM element, CSS can
 * transition correctly from ANY mid-transition value — no jump, no stale
 * rAF callback problem.  Moving fast just starts a new transition from
 * wherever the opacity currently is.
 */

function ProjectCard({ project, isActive, onHover, onLeave, onClick }) {
  const acc    = accentColors[project.color]
  const hasImg = Boolean(project.images?.square)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = (e.clientX - left) / width   // 0-1
    const y = (e.clientY - top)  / height  // 0-1
    const rotY =  (x - 0.5) * 14           // -7 to +7 deg
    const rotX = -(y - 0.5) * 10           // -5 to +5 deg
    card.style.transition = 'transform 0.08s ease'
    card.style.transform  = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`
    card.style.boxShadow  = `${-rotY * 1.5}px ${rotX * 1.5}px 28px rgba(0,0,0,.55)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease'
    card.style.transform  = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)'
    card.style.boxShadow  = ''
    onLeave()
  }

  return (
    <div
      ref={cardRef}
      className={`wc${isActive ? ' active' : ''}`}
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
    >
      <div
        className={`wc-art${hasImg ? '' : ' gradient-only'}`}
        style={hasImg ? undefined : { background: artPalettes[project.color] }}
      >
        {hasImg ? (
          <img className="wc-art-img" src={project.images.square}
            alt={project.title} loading="lazy" draggable="false" />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 50% 45%, ${acc} 0%, transparent 60%)`
          }} />
        )}
      </div>
      <div className="wc-poster-content">
        <span className="wc-format-badge">{project.format}</span>
        <div className="wc-poster-title">{project.title}</div>
      </div>
      <span className="wc-year-badge">{project.year}</span>
      <div className="wc-overlay">
        <div className="wc-overlay-inner">
          <p  className="wc-ov-cat"  >{project.cat}</p>
          <h3 className="wc-ov-title">{project.title}</h3>
        </div>
      </div>
    </div>
  )
}

// Projects that have a wide image — each gets a permanent bg layer
const IMG_PROJECTS = featuredProjects.filter(p => p.images?.wide)
const BG_INDICES   = Array.from({ length: 15 }, (_, i) => i)

export default function Work({ onOpenModal, onShowProjects }) {
  const [activeBg,   setActiveBg]   = useState(null)   // color index | null
  const [activeImg,  setActiveImg]  = useState(null)   // project id | null
  const [activeCard, setActiveCard] = useState(null)   // project id | null
  const leaveTimer = useRef(null)

  const handleHover = useCallback((project) => {
    clearTimeout(leaveTimer.current)
    setActiveBg(project.color)
    setActiveCard(project.id)
    setActiveImg(project.images?.wide ? project.id : null)
  }, [])

  const handleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => {
      setActiveBg(null)
      setActiveCard(null)
      setActiveImg(null)
    }, 80)
  }, [])

  return (
    <section id="work">
      <div id="work-bg-stage">
        {/* Default dark bg */}
        <div className={`wbg wbg-default${activeBg === null ? ' active' : ''}`} />

        {/* Gradient layers — shown when no image active */}
        {BG_INDICES.map(i => (
          <div key={i}
            className={`wbg wbg-${i}${activeBg === i && !activeImg ? ' active' : ''}`}
          />
        ))}

        {/* One permanent image layer per project with a wide image.
            CSS opacity transitions always work correctly because each
            layer is independent — no jump when moving fast. */}
        {IMG_PROJECTS.map(p => (
          <div
            key={p.id}
            className={`wbg-img${activeImg === p.id ? ' active' : ''}`}
            style={{ backgroundImage: `url(${p.images.wide})` }}
            aria-hidden="true"
          />
        ))}
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
            isActive={activeCard === p.id}
            onHover={() => handleHover(p)}
            onLeave={handleLeave}
            onClick={onOpenModal}
          />
        ))}
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
