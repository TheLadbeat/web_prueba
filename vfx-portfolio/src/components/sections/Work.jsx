import { useState, useRef, useCallback } from 'react'
import { featuredProjects, projects } from '../../data/projects'
import { artPalettes, accentColors }  from '../../data/palettes'

/**
 * Work — cinematic background + transparency cards.
 *
 * Rapid-hover fix
 * ───────────────
 * The race condition when moving fast: rAF callbacks scheduled for a previous
 * hover fire AFTER the next hover's state updates, overwriting `current.current`
 * and activating the wrong slot.
 *
 * Fix: each handleHover call gets a monotonic `generation` counter. The rAF
 * callback checks that its generation is still the latest before committing.
 * Stale callbacks (from fast moves) are silently dropped.
 */

function ProjectCard({ project, isActive, onHover, onLeave, onClick }) {
  const acc    = accentColors[project.color]
  const hasImg = Boolean(project.images?.square)
  return (
    <div
      className={`wc${isActive ? ' active' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
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

const BG_INDICES = Array.from({ length: 15 }, (_, i) => i)

export default function Work({ onOpenModal, onShowProjects }) {
  const [activeBg,    setActiveBg]    = useState(null)
  const [activeCard,  setActiveCard]  = useState(null)  // project id
  const [slots, setSlots] = useState([
    { src: null, active: false },
    { src: null, active: false },
  ])

  const current    = useRef(0)
  const generation = useRef(0)   // monotonic counter — stale rAF callbacks are dropped
  const leaveTimer = useRef(null)

  const handleHover = useCallback((project) => {
    clearTimeout(leaveTimer.current)
    setActiveBg(project.color)
    setActiveCard(project.id)

    const wide = project.images?.wide ?? null
    const gen  = ++generation.current   // claim this generation

    if (wide) {
      const next = current.current === 0 ? 1 : 0
      const prev = current.current

      // Write new src into inactive slot (invisible, no flash)
      setSlots(s => {
        const n = [...s]
        n[next] = { src: wide, active: false }
        return n
      })

      // After two rAFs (guarantees browser painted the new backgroundImage)
      // activate next, deactivate prev — but ONLY if still the latest hover
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (gen !== generation.current) return   // stale — a newer hover won
          setSlots(s => {
            const n = [...s]
            n[next] = { src: wide,        active: true  }
            n[prev] = { src: n[prev].src, active: false }
            return n
          })
          current.current = next
        })
      })
    } else {
      // No wide image — fade out both image slots
      setSlots(s => s.map(slot => ({ ...slot, active: false })))
    }
  }, [])

  const handleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => {
      setActiveBg(null)
      setActiveCard(null)
      setSlots(s => s.map(slot => ({ ...slot, active: false })))
    }, 80)
  }, [])

  const anyImgActive = slots.some(s => s.active)

  return (
    <section id="work">
      <div id="work-bg-stage">
        <div className={`wbg wbg-default${activeBg === null ? ' active' : ''}`} />
        {BG_INDICES.map(i => (
          <div key={i}
            className={`wbg wbg-${i}${activeBg === i && !anyImgActive ? ' active' : ''}`}
          />
        ))}
        {slots.map((slot, i) => (
          <div
            key={i}
            className={`wbg-img${slot.active ? ' active' : ''}`}
            style={slot.src ? { backgroundImage: `url(${slot.src})` } : undefined}
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
